# Meta Lead Ads Setup Guide — Smooth Fence USA (2026-04-29)

> Walkthrough completo para crear la primera Meta Lead Ad campaign (Jacksonville). Replicar idéntico para St. Augustine y Daytona después de validar.

---

## Pre-requisitos (verificar antes de arrancar)

| Item | URL para verificar | Status |
|---|---|---|
| Facebook page de Smooth Fence USA verificada | facebook.com/SmoothFenceUSA (o nombre real) | ☐ |
| Instagram business account linkeada a la FB page | instagram.com → Settings → Business | ☐ |
| Meta Business Manager creado con la FB page | business.facebook.com | ☐ |
| Pixel de Facebook instalado en smoothfenceusa.com | events manager | ☐ (ideal pero no bloqueador) |
| Privacy policy publicada en `/privacy` | smoothfenceusa.com/privacy | ☐ (LEGAL REQUIREMENT) |

**Si falta cualquier item, completar primero. Meta NO acepta lead forms sin privacy policy URL.**

---

## Paso 1 — Ir a Meta Ads Manager y crear campaign

URL: [adsmanager.facebook.com/adsmanager](https://www.facebook.com/adsmanager/)

1. Click verde **+ Create**.
2. **Buying type:** Auction (default).
3. **Campaign objective:** **Leads**. (NO Traffic, NO Engagement, NO Awareness.)
4. Click **Continue**.

---

## Paso 2 — Campaign settings

| Field | Value |
|---|---|
| Campaign name | `Meta · Jacksonville · Fence Lead` |
| Special ad categories | None |
| Buying type | Auction |
| Campaign budget optimization (CBO) | OFF (mejor control con ad-set budget) |
| A/B test | Skip por ahora |

Click **Next**.

---

## Paso 3 — Ad set settings

### Identity
| Field | Value |
|---|---|
| Ad set name | `Jax · Homeowners · Lead Form` |
| Conversion location | **On your Facebook & Instagram** (Lead Form, NO website) |
| Performance goal | Maximize number of leads |

### Budget & schedule
| Field | Value |
|---|---|
| Budget | **Daily budget** $20.00 |
| Start date | Today |
| End date | None (continuous) |

### Audience
**Define new audience** (no usar saved):

| Setting | Value |
|---|---|
| Custom audiences | None at start (no website pixel data yet) |
| Locations | **People living in this location** + radius pin: **25 mi around Jacksonville, FL** |
| Age | 28 - 65 |
| Gender | All |
| Languages | English (US), Spanish |

**Detailed targeting** (Browse → click each, AND-combine):
- **Demographics → Home → Home Ownership → Homeowners**
- **Interests → Home & Garden** (or "Home Improvement" if shown)
- **Interests → Real Estate**
- **Behaviors → Engaged Shoppers**

**Detailed targeting expansion:** ON (Meta extiende cuando ve oportunidad de mejor performance).

### Placements
**Advantage+ placements:** ON (default — Facebook + Instagram + Audience Network + Messenger).

Click **Next**.

---

## Paso 4 — Ad creative

### Identity
| Field | Value |
|---|---|
| Facebook page | Smooth Fence USA |
| Instagram account | @smoothfenceusa (linkeado) |

### Format
**Single image or video** (más conversion que Carousel para lead ads).

Crear **3 ad variants** dentro del ad set (Meta optimiza la mejor):

---

### Ad variant 1 — Foto job terminado

**Imagen / Video:**
- Foto job recientemente terminado en Jacksonville (vinyl o aluminum, casa típica FL).
- Specs: 1080×1080 (square, principal) + 1080×1920 (story) + 1200×628 (feed wide) — Meta acepta upload de variantes.

**Primary text (caption arriba de la imagen):**
```
Need a fence in Jacksonville? Get your free estimate in 60 seconds.

✓ Licensed & Insured FL contractor
✓ Vinyl, Aluminum, Wood, Chain-Link
✓ Same-day quote · 24-hour site visit
✓ Financing available — no credit hit
✓ 1-3 day installation

Tap to get your free quote — no spam, no pressure.
```

**Headline (corto, encima del CTA):**
```
Free Fence Estimate Jacksonville
```

**Description (debajo del headline):**
```
Vinyl, Aluminum, Wood. Licensed & Insured.
```

**Call-to-action button:** `Get Quote`

---

### Ad variant 2 — Antes/Después

Misma copy. Imagen: split image (50/50) o carousel de 2 fotos: izquierda "before" (yard sin fence), derecha "after" (fence terminado). Tagline visible en la imagen: `Your yard, transformed in 1-3 days`.

---

### Ad variant 3 — Video del owner

Video corto (15s) de Fede caminando por un job terminado, mostrando trabajo, voz personal:
> "Hey, I'm Fede from Smooth Fence USA. We just finished this vinyl privacy fence in Jacksonville in 2 days. Free estimate, licensed and insured. Tap below — I'll call you within the hour."

Misma copy + headline + CTA. Video boosta CR ~30-40% en local services.

---

## Paso 5 — Lead Form (instant form inside Meta)

Click **+ Create form** debajo del Lead Form section.

### Form name
`Smooth Fence Jacksonville Quote`

### Form type
**More volume** (default — minimiza fricción, max submits).
NO uses "Higher intent" — agrega un review screen extra que baja CR ~30%.

### Intro (opcional pero recomendado)

| Field | Value |
|---|---|
| Headline | `Get Your Free Fence Estimate` |
| Description (paragraph) | `Same-day reply. Free site visit within 24 hours. No pressure, no obligation. Vinyl, aluminum, wood, chain-link — we install it all in 1-3 days.` |
| Image | Misma hero image que el ad |

### Questions (mínimo, max conversion)

Activar SOLO estos campos:
1. ☑ **Full name** (auto-fill from FB profile, optional editable)
2. ☑ **Phone** (auto-fill, REQUIRED)
3. ☑ **Email** (auto-fill, REQUIRED)
4. ☑ **ZIP code** — agregar como **custom question** type "Short answer", required

✋ **NO agregar** "What type of fence?", "Length in feet?", "Best time to call?". Cada pregunta extra = -10% CR. Sacamos eso en la llamada de follow-up.

### Privacy policy

| Field | Value |
|---|---|
| Privacy policy URL | `https://smoothfenceusa.com/privacy` |
| Custom disclaimer (optional) | `By submitting, you agree to receive a phone call or text from Smooth Fence USA about your fence project. Reply STOP anytime to opt out.` |

### Thank-you screen

| Field | Value |
|---|---|
| Headline | `Thanks! We'll call you within 24 hours.` |
| Description | `Or call us right now at (386) 403-9460 for an instant quote.` |
| Button text | `Call Smooth Fence` |
| Button action | Call business → `+13864039460` |

### Tracking parameters (URL params para attribution)

Add UTM tags:
- `utm_source=meta`
- `utm_medium=lead_ad`
- `utm_campaign=jax_lead_form`
- `utm_content=v1` (cambiá v2/v3 según el ad variant)

---

## Paso 6 — Lead delivery

Meta guarda leads en **Business Suite → Lead Center**. Para que lleguen al CRM existente:

### Opción A — Manual (semana 1, ok)
- Fede revisa Lead Center 2x/día (mañana + tarde).
- Bajar CSV semanal y agregar al Google Sheet "Leads" para attribution unificada.

### Opción B — Automatización via Zapier (recomendado mes 1)
1. Crear cuenta gratis en zapier.com.
2. Trigger: **Facebook Lead Ads → New Lead**.
3. Connect FB account → seleccionar Page Smooth Fence USA → seleccionar form `Smooth Fence Jacksonville Quote`.
4. Action 1: **Google Sheets → Create Spreadsheet Row**:
   - Spreadsheet: `Leads`
   - Worksheet: `Sheet1`
   - Map fields: full_name, phone, email, zip, utm_source=meta, utm_campaign=jax_lead_form, created_time
5. Action 2: **Email by Zapier → Send Outbound Email**:
   - To: `federico@smoothfenceusa.com, f3d3x5@gmail.com`
   - Subject: `🔔 New META Lead — {full_name} ({zip})`
   - Body: lead details + "Reply within 5 min"
6. (Opcional) Action 3: **SMS by Twilio → Send SMS** a teléfono de Fede.

Setup Zapier total: ~25 min. Free tier: 100 tasks/mo (más que suficiente).

---

## Paso 7 — Publicar y monitorear

1. Click **Publish** (verde, abajo a la derecha).
2. Meta entra a Review (1-24h típico, con pago configurado).
3. Una vez aprobado, ad empieza a servir.

### Daily check (5 min)

- Ads Manager → Ad set "Jax · Homeowners · Lead Form":
  - Impressions, Reach, Cost per lead (CPL), Lead count.
- Lead Center → bajar leads del día.
- Response time: cada lead respondido en <5 min ideal.

### Targets primer 7 días

| Métrica | Target |
|---|---|
| Impressions/d | 5,000-10,000 |
| Click-through rate | >1% |
| Cost per lead | $25-45 |
| Lead count semana 1 | 5-8 |
| Quality (legitimate phone numbers) | >80% |

### Si CPL > $60 al día 4

- Pausar ad variants con peor CTR.
- Achicar audience: quitar "Engaged Shoppers", probar solo Homeowners + Real Estate.
- Probar otra hero image.

---

## Paso 8 — Replicar para St. Augustine y Daytona (cuando Jax valide)

Después de 5-7 días, si Jacksonville Meta ad genera ≥5 leads con CPL <$40:

1. **Duplicar campaign** desde Ads Manager (right-click → Duplicate).
2. Cambiar:
   - Campaign name → `Meta · St. Augustine · Fence Lead`
   - Budget → $15/d
   - Audience location → 25 mi around St. Augustine, FL
   - Form name → `Smooth Fence St. Augustine Quote`
   - Lead form questions: cambiar mention de "Jacksonville" por "St. Augustine"
3. Publish.

Repetir para Daytona ($15/d, 25 mi around Daytona Beach FL).

Total Meta steady state: $50/d ($1,500/mo) — match al gasto de Google Ads paid.

---

## Costos totales paid week 1

| Canal | Daily | Semanal | Mensual proyectado |
|---|---|---|---|
| Google Ads Search × 3 | $60 | $420 | $1,800 |
| Meta Lead Ads (Jax solo sem 1) | $20 | $140 | $600 |
| LSA (estimado, lead-based) | ~$22 | $150 | $640 |
| **TOTAL paid (sem 1)** | **$102** | **$710** | **~$3,000/mo** |

Si las 3 fuentes performan bien, ~25 leads sem 1 = ~$28 CPA blended. Mejor que el PMax baseline ($183/lead).

---

*Doc creado 2026-04-29 PM tarde. Si Fede tiene dudas mientras lo arma, mencionar a próxima sesión Claude que se está usando este guide.*
