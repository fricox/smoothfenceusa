# SmoothFenceUSA — Setup del CRM en Google Sheets

Guía paso a paso para que el pipeline unificado funcione. Toma ~20 minutos.

## Resumen del flujo

```
┌─────────────┐  ┌──────────┐  ┌────────┐  ┌──────────┐
│  Estimator  │  │ Contact  │  │ Stripe │  │ Calendly │
└──────┬──────┘  └────┬─────┘  └───┬────┘  └────┬─────┘
       │              │             │            │
       │              │             │            │
       ▼              ▼             ▼            ▼
   /api/estimator  /api/quote   /api/webhooks/stripe
                                              /api/webhooks/calendly
       │              │             │            │
       └──────┬───────┴─────────────┴────────────┘
              │  (todos llaman pushLeadEvent en lib/sheets.ts)
              ▼
      GOOGLE_SHEETS_WEBHOOK_URL  ──►  Apps Script  ──►  Hoja "Leads"
```

Cada evento es una **fila nueva** en la hoja. La columna `leadId` (= email del cliente en minúsculas) te permite agrupar todos los eventos de un mismo cliente con una tabla dinámica o un filtro.

## 1) Crear la hoja "Leads"

1. Abre tu Google Sheet actual (la que ya recibe webhooks de Stripe).
2. Crea una nueva pestaña llamada **`Leads`**.
3. En la fila 1, pega estos encabezados (fila completa, en este orden):

```
submittedAt | leadId | type | source | status | fullName | email | phone | address | zip | fenceType | height | linearFeet | gates | removal | premium | hoa | estimateLow | estimateHigh | depositAmount | stripeSessionId | visitDate | installDate | earliestInstallDate | preferredDate | notes | message
```

4. Congela la primera fila: **View → Freeze → 1 row**.

## 2) Apps Script — código completo

1. En tu Google Sheet: **Extensions → Apps Script**.
2. Borra todo el código existente y pega lo siguiente:

```javascript
const SHEET_NAME = "Leads";

const HEADERS = [
  "submittedAt", "leadId", "type", "source", "status",
  "fullName", "email", "phone",
  "address", "zip",
  "fenceType", "height", "linearFeet", "gates", "removal", "premium", "hoa",
  "estimateLow", "estimateHigh",
  "depositAmount", "stripeSessionId",
  "visitDate", "installDate", "earliestInstallDate", "preferredDate",
  "notes", "message"
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    const row = HEADERS.map(h => (data[h] !== undefined && data[h] !== null) ? data[h] : "");
    sheet.appendRow(row);

    // Color code by status
    const lastRow = sheet.getLastRow();
    const statusCol = HEADERS.indexOf("status") + 1;
    const statusCell = sheet.getRange(lastRow, statusCol);
    const colors = {
      "new": "#fff4cc",
      "visit_scheduled": "#cfe8ff",
      "visit_done": "#d9f0ff",
      "deposit_paid": "#d4f4dd",
      "install_scheduled": "#b2cf7f",
      "install_done": "#679d38",
      "completed": "#125036",
      "canceled": "#f5c2c2"
    };
    if (colors[data.status]) {
      statusCell.setBackground(colors[data.status]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("SmoothFenceUSA CRM endpoint — POST only");
}
```

3. Guarda con el ícono 💾 (Ctrl+S).
4. **Deploy → New deployment**:
   - Type: **Web app**
   - Description: `SmoothFenceUSA CRM v2`
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** y autoriza los permisos.
5. Copia la **Web app URL** que Google te da (termina en `/exec`).

## 3) Actualizar la variable de entorno

En **Vercel → Project Settings → Environment Variables**, actualiza (o crea):

```
GOOGLE_SHEETS_WEBHOOK_URL = https://script.google.com/macros/s/XXXX/exec
```

Aplica a los tres entornos (Production, Preview, Development) y haz un **redeploy**.

## 4) Probar que funciona

Desde tu terminal local, **reemplazando la URL de ejemplo por la tuya** (la que termina en `/exec`). Nota el flag `-L` — es obligatorio porque Apps Script siempre responde con un redirect 302 que `curl` debe seguir:

```bash
curl -L -X POST "https://script.google.com/macros/s/TU_ID_AQUI/exec" \
  -H "Content-Type: application/json" \
  -d '{"submittedAt":"2026-04-08T20:00:00Z","leadId":"test@example.com","type":"lead_created","source":"contact","status":"new","fullName":"Test User","email":"test@example.com","phone":"386-555-0123","message":"Prueba manual"}'
```

Respuesta esperada: `{"ok":true}`

Abre tu Sheet — deberías ver una nueva fila con la celda `status` coloreada amarillo claro. Si la ves, el CRM está vivo.

**⚠️ No uses `$GOOGLE_SHEETS_WEBHOOK_URL`** en el curl a menos que hayas hecho `export GOOGLE_SHEETS_WEBHOOK_URL="..."` primero en esa misma terminal. Esa variable vive en Vercel, no en tu shell local.

## 5) Configurar el webhook de Calendly

Esto captura automáticamente cada cita agendada (visitas de estimado e instalaciones).

1. Ve a **Calendly → Integrations & apps → API & Webhooks → Webhook Subscriptions**.
2. Click **+ Create New Webhook**.
3. Rellena:
   - **URL to receive events:** `https://smoothfenceusa.com/api/webhooks/calendly`
   - **Events:** marca `invitee.created` e `invitee.canceled`
   - **Scope:** User (o Organization si tienes equipo)
4. Calendly te mostrará un **Signing Key** — cópialo.
5. En Vercel, crea la variable:
   ```
   CALENDLY_WEBHOOK_SIGNING_KEY = <la key que te dio Calendly>
   ```
   Redeploy.

**Nota:** el webhook de Calendly funciona incluso sin signing key (el endpoint lo acepta si la env var no existe), pero por seguridad **sí configúralo** en producción.

### Verificación

Agenda una cita de prueba en tu Calendly (en cualquiera de los dos eventos). En segundos deberías ver una nueva fila en la hoja con:
- `source = calendly`
- `type = visit_booked` (para el 30min) o `install_booked` (para installation)
- `status = visit_scheduled` o `install_scheduled`
- `visitDate` o `installDate` con la fecha de la cita

## 6) Cómo leer el pipeline

En Google Sheets:

- **Ver todos los eventos de un cliente**: filtra por `leadId` = su email.
- **Ver leads activos**: filtra `status` que no sea `completed` ni `canceled`.
- **Ver cuántos depósitos pagados este mes**: filtra `type = deposit_paid` + mes actual.
- **Dashboard visual**: crea una pestaña `Dashboard` con tablas dinámicas:
  - Filas: `status`
  - Valores: `COUNTA(leadId)`
  → tendrás un conteo por etapa del funnel.

## 7) Cuándo migrar a HubSpot Free

Cuando empieces a sentir que:
- Tienes más de 20 leads por semana y filtrar Sheets es tedioso.
- Quieres secuencias de email automáticas ("follow up a los 3 días").
- Quieres ver el pipeline como tablero Kanban en tu celular.
- Quieres que los eventos del mismo cliente se **unifiquen** en un solo registro (no una fila por evento).

Para migrar: HubSpot Free importa un CSV directamente. Exportas la hoja `Leads`, agrupas por `leadId` (con una fórmula o pivot), y la subes a HubSpot. Avísame cuando llegues a ese punto y armamos el CSV.

---

## Troubleshooting

**No llegan los datos a Sheets después de deploy**
- Verifica en Vercel que `GOOGLE_SHEETS_WEBHOOK_URL` esté en el entorno de Production.
- Verifica que el Apps Script esté desplegado como **Web app** (no como API executable).
- Verifica que el acceso sea "Anyone" (anónimo).
- Mira los logs en Vercel (Runtime Logs) para ver si hay errores.

**El webhook de Calendly no llega**
- En Calendly → Webhook Subscriptions, mira "Last delivery" — si dice error, el endpoint está devolviendo 401 o 500.
- Si es 401: el `CALENDLY_WEBHOOK_SIGNING_KEY` está mal o no coincide. Quítalo temporalmente de Vercel para permitir webhooks sin firmar y verificar el resto.
- Si es 500: revisa logs de Vercel.

**Aparecen filas duplicadas**
- Es normal — el modelo es append-only. Cada evento es una fila. Un mismo cliente tendrá varias filas (lead_created, visit_booked, deposit_paid, install_booked, etc). Agrúpalas por `leadId`.
