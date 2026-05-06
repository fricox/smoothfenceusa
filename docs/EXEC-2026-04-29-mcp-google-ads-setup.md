# Execution Sheet — Google Ads MCP server (2026-04-29)

> Material listo para ejecutar el plan de las 3 campañas Search via Claude Code, sin tocar la UI a mano. Construido el 2026-04-29 PM.
>
> **Status: ✅ LIVE end-to-end** — server built + registered + connected + credentials filled + connectivity verified. Listo para ejecutar las 5 mutations del plan (1 shared negative list + 3 Search campaigns + apply negatives).

---

## Qué se construyó

Un servidor MCP local en `~/.claude/mcp/google-ads/` que expone el API de Google Ads como herramientas que Claude Code puede llamar directamente. Reemplaza el camino "manual UI" o "Google Ads Editor" del doc anterior `EXEC-2026-04-29-google-ads-setup.md` — ahora la creación de las 3 campañas se hace con 4-5 tool calls, no clicks.

**Registrado en Claude Code:** sí (user scope, en `~/.claude.json`). `claude mcp list` confirma `✓ Connected`.

**Disponible desde:** cualquier directorio, cualquier sesión de Claude Code.

---

## Tools disponibles

Todas con prefijo `gads_`:

| Tool | Lectura/Escritura | Para qué |
|---|---|---|
| `gads_list_accessible_customers` | R | Sanity check + descubrir IDs |
| `gads_query` | R | GAQL crudo |
| `gads_list_campaigns` | R | Lista campañas con id, status, budget |
| `gads_get_campaign_metrics` | R | Cost/clicks/conv últimos N días |
| `gads_pause_campaign` | W | Pausar |
| `gads_enable_campaign` | W | Activar |
| `gads_create_shared_negative_list` | W | Crear shared library de negativas + bulk add |
| `gads_apply_shared_negative_list` | W | Linkear shared list a campañas |
| `gads_suggest_geo_targets` | R | Resolver "Jacksonville, FL" → geo target ID |
| `gads_create_search_campaign` | W | **Crea campaña completa** (budget + geo + langs + ad group + keywords + RSA) en 1 call. Default status PAUSED. |

---

## Estado de credenciales (2026-04-29 PM): ✅ COMPLETO

Los 4 pasos de credenciales se completaron el 2026-04-29 PM:

1. ✅ MCC creada `989-758-5666`, cuenta `889-512-6127` linkeada.
2. ✅ Developer Token obtenido en API Center (tier **Explorer Access** — 15k ops/día, suficiente para el plan). Solicitud de **Basic Access** enviada con design doc `~/Downloads/SmoothFenceUSA-GoogleAdsAPI-DesignDoc.doc`. Google revisa en 1-3 días hábiles.
3. ✅ Google Cloud project `Smooth Fence USA` (id `western-grid-492123-q2`) creado en org Workspace, Google Ads API habilitada, OAuth consent screen Internal, OAuth Client "Desktop app" creado. Client ID + Secret guardados.
4. ✅ Refresh token generado vía loopback flow (`get_refresh_token.py`), escrito directo en `.env` (103 chars).
5. ✅ Conectividad verificada: `list_accessible_customers` → `[8895126127, 9897585666]`. GAQL contra cuenta operativa retorna PMax existente PAUSED.

**Credenciales en `~/.claude/mcp/google-ads/.env` (chmod 600):**
- GOOGLE_ADS_DEVELOPER_TOKEN ✓
- GOOGLE_ADS_CLIENT_ID ✓
- GOOGLE_ADS_CLIENT_SECRET ✓
- GOOGLE_ADS_REFRESH_TOKEN ✓
- GOOGLE_ADS_CUSTOMER_ID=8895126127
- GOOGLE_ADS_LOGIN_CUSTOMER_ID=9897585666
- GOOGLE_ADS_USE_PROTO_PLUS=true

---

## ~~Credenciales pendientes~~ (sección obsoleta — completada arriba)

Guía detallada: `~/.claude/mcp/google-ads/README.md`. Resumen:

### Paso 1 — Developer Token (1-2 días hábiles de espera por aprobación de Google)

1. Necesitás una **MCC** (Manager Account). Si no tenés, creá una en https://ads.google.com/home/tools/manager-accounts/ y linkeá la cuenta de Smooth Fence (`889-512-6127`).
2. Loggeado en la **MCC** (no la cuenta normal): **Tools → Setup → API Center** → aceptar ToS.
3. Aplicar a **Basic Access** (formulario corto: "internal automation, no third-party access, ~10 calls/day"). Mientras esperan aprobación, el dev token funciona contra cuentas de test inmediatamente y rate-limited en producción.

### Paso 2 — OAuth client (5 min)

1. https://console.cloud.google.com/ → crear proyecto.
2. APIs & Services → **Library** → habilitar "Google Ads API".
3. APIs & Services → **OAuth consent screen** → External → llenar app name/email → agregar tu cuenta de Google como Test User → guardar (dejar en estado "Testing", no publicar).
4. APIs & Services → **Credentials → Create OAuth client ID** → tipo "Desktop app" → copiar Client ID + Client Secret.

### Paso 3 — Refresh token (2 min)

```sh
cd ~/.claude/mcp/google-ads
# editar .env y pegar GOOGLE_ADS_CLIENT_ID + GOOGLE_ADS_CLIENT_SECRET
~/.claude/mcp/google-ads/.venv/bin/python get_refresh_token.py
# abrir URL → autorizar → pegar code → copiar refresh token al .env
```

### Paso 4 — Customer ID en `.env`

- `GOOGLE_ADS_CUSTOMER_ID=8895126127` (Smooth Fence USA, sin guiones)
- `GOOGLE_ADS_LOGIN_CUSTOMER_ID=` el ID de la MCC sin guiones, **solo si** accedés vía MCC. Vacío si no.

### Paso 5 — Verificar

En Claude Code: "Lista los customers accesibles del MCP google-ads". Debería devolver `8895126127`.

---

## Plan de ejecución una vez con credenciales

Asumiendo `.env` completo y aprobación de Basic Access. Es lo que Claude correrá en la próxima sesión:

### 1. Sanity check

```
gads_list_accessible_customers
gads_list_campaigns
```

Confirmar que la PMax `Get a Free Estimate Today` (id 23737136551) sigue PAUSED.

### 2. Crear shared negative list

`gads_create_shared_negative_list` con:
- `name = "Master Negatives - Fence"`
- `keywords = [...]` (los ~75 de la sección C de `EXEC-2026-04-29-google-ads-setup.md`)

Devuelve `shared_set_resource_name` que vamos a guardar.

### 3. Crear las 3 campañas (cada una en 1 call)

Para Jacksonville:

```python
gads_create_search_campaign(
    name="Search · Jacksonville · Fence",
    daily_budget_usd=20.00,
    final_url="https://smoothfenceusa.com/lp/fence-jacksonville",
    keywords=[
        {"text": "vinyl fence jacksonville", "match_type": "EXACT"},
        {"text": "fence installation jacksonville", "match_type": "EXACT"},
        {"text": "fence company jacksonville", "match_type": "EXACT"},
        {"text": "aluminum fence jacksonville", "match_type": "EXACT"},
        {"text": "wood fence jacksonville", "match_type": "EXACT"},
        {"text": "privacy fence jacksonville", "match_type": "EXACT"},
        {"text": "fence contractor jacksonville", "match_type": "PHRASE"},
        {"text": "free fence estimate jacksonville", "match_type": "PHRASE"},
        {"text": "fence builders jacksonville", "match_type": "PHRASE"},
        {"text": "fence repair jacksonville fl", "match_type": "PHRASE"},
        {"text": "new fence jacksonville", "match_type": "PHRASE"},
        {"text": "fence quote jacksonville", "match_type": "PHRASE"},
        {"text": "fence installation atlantic beach", "match_type": "EXACT"},
        {"text": "fence installation jacksonville beach", "match_type": "EXACT"},
        {"text": "fence company jacksonville beach", "match_type": "PHRASE"},
        {"text": "vinyl fence jax", "match_type": "PHRASE"},
    ],
    headlines=[
        {"text": "Fence Installation in Jacksonville", "pinned_field": "HEADLINE_1"},
        {"text": "Free Estimate in 60 Seconds", "pinned_field": "HEADLINE_2"},
        {"text": "Licensed & Insured Florida"},
        {"text": "Vinyl, Aluminum, Wood, Chain-Link"},
        {"text": "Same-Day Quote Promise"},
        {"text": "24-Hour Site Visit"},
        {"text": "5.0 Stars · 19 Reviews"},
        {"text": "Financing Available · No Credit Hit"},
        {"text": "(386) 403-9460"},
        {"text": "Privacy Fences in Jacksonville"},
        {"text": "Local Florida Fence Pros"},
        {"text": "HOA & Permits Handled"},
        {"text": "1-3 Day Installation"},
        {"text": "No Pressure · No Obligation"},
        {"text": "Get Your Jacksonville Fence Quote"},
    ],
    descriptions=[
        "Free, no-pressure estimate. Licensed & insured local Florida team. Financing available — pre-qualify in 60 seconds with no credit hit.",
        "Serving Jacksonville and surrounding areas. Vinyl, aluminum, wood, chain-link. Same-day quote, 24-hour site visit promise.",
        "We pull permits, handle HOAs, and finish installation in 1-3 days. 5.0 stars, 19 Google reviews. Get your free Jacksonville estimate now.",
        "Pre-qualify for financing in 60 seconds with no impact to your credit. Vinyl, aluminum, wood — same-day quote in Jacksonville.",
    ],
    geo_location_names=[
        "Jacksonville, FL",
        "Atlantic Beach, FL",
        "Jacksonville Beach, FL",
        "Neptune Beach, FL",
    ],
    bidding_strategy="MAXIMIZE_CONVERSIONS",
    network_search_partners=False,
    network_content=False,
    location_targeting_setting="PRESENCE",
    path1="jacksonville",
    path2="fence-quote",
    status="PAUSED",  # default — review in UI before enabling
)
```

Idéntico para St. Augustine ($15/d, geo St. Augustine + Ponte Vedra + St. Johns + Vilano Beach, LP `/lp/fence-st-augustine`, paths `st-augustine`/`fence-quote`) y Daytona ($15/d, geo Daytona + Ormond + Port Orange + Holly Hill + Deltona, LP `/lp/fence-daytona`, paths `daytona`/`fence-quote`).

Cada llamada devuelve `campaign_id` que guardamos.

### 4. Atar negativas a las 3 campañas

```
gads_apply_shared_negative_list(
    shared_set_resource_name="<del paso 2>",
    campaign_ids=[<id1>, <id2>, <id3>]
)
```

### 5. Revisión manual en UI

Antes de habilitar:
- Verificar geo en cada campaña.
- Verificar que el conversion goal "Submit lead form" esté heredado del account default (debería estarlo automáticamente).
- Verificar que las negativas aparecen aplicadas.
- (Opcional) Agregar sitelinks + callouts + call extension + structured snippets — hoy más rápido en la UI; los tools no están wired aún.

### 6. Activar

```
gads_enable_campaign(campaign_id=<id1>)
gads_enable_campaign(campaign_id=<id2>)
gads_enable_campaign(campaign_id=<id3>)
```

---

## Caveats / heads-up

1. **Basic Access para producción:** sin aprobación, los writes a producción pueden fallar con "developer token only approved for test accounts". Mientras esperás aprobación: podés crear una cuenta de test del API y probar el flujo full end-to-end ahí.
2. **OAuth en modo Testing:** mientras Fede sea Test User en el OAuth consent screen, el refresh token no expira. Si publicás la app, los refresh tokens caducan a los 7 días.
3. **Ad extensions no están en tools.** Sitelinks/callouts/call/structured snippets se agregan después en la UI o requieren extender server.py. Es ~200 LOC más cuando haga falta.
4. **Status default = PAUSED.** Las campañas creadas no gastan plata hasta que llames `gads_enable_campaign`. Esto es a propósito — siempre revisar primero.
5. **Idempotencia:** correr `gads_create_search_campaign` con el mismo nombre 2 veces creará 2 campañas duplicadas. Verificar con `gads_list_campaigns` primero.

---

## Si hay problemas

- `claude mcp list` debería mostrar `google-ads ✓ Connected`. Si no, ver `~/.claude/mcp/google-ads/.env`.
- Para debugging: correr `~/.claude/mcp/google-ads/.venv/bin/python ~/.claude/mcp/google-ads/server.py` directo no abre stdio — el server espera ser invocado por Claude. Para tests aislados, usar `gads_list_accessible_customers` desde Claude.
- Para reset: `claude mcp remove google-ads --scope user && rm -rf ~/.claude/mcp/google-ads`. Después rebuild siguiendo la historia de este doc.
