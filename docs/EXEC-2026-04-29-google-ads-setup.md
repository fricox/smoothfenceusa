# Execution Sheet — Google Ads pivot (2026-04-29)

> Material listo para pegar. Las LPs ya están en producción (PR #14 mergeado). Falta crear las campañas Search en Google Ads. Doc dividido en 3 partes: pausa de PMax, contenido de las 3 campañas nuevas, pasos en la UI.

---

## A · Pausar la campaña PMax actual

1. Ir a https://ads.google.com/aw/campaigns
2. En la fila **"Get a Free Estimate Today"**, click en el círculo verde de status (a la izquierda del nombre)
3. Seleccionar **"Pause"** → confirmar
4. Verificar que el estado pase a "Paused"

> No la borres. La pausa preserva el histórico para análisis y para reactivar si hace falta.

---

## B · Datos para las 3 campañas Search nuevas

### Campaña 1 — `Search · Jacksonville · Fence`

Setting | Valor
---|---
**Goal** | Leads
**Campaign type** | Search
**Conversion goals** | Mantener "Submit lead form" (Account default — ya está bien configurada)
**Campaign name** | `Search · Jacksonville · Fence`
**Budget (daily)** | **$20.00**
**Bidding** | **Maximize Conversions** (sin tCPA todavía — agregamos en 14 días)
**Networks** | ✓ Search · ✗ Display partners · ✗ Search partners
**Locations** | Jacksonville, FL · Atlantic Beach, FL · Jacksonville Beach, FL · Neptune Beach, FL (con radio 15 mi)
**Location options** | Presence: **People in or regularly in your targeted locations** (NO "interested in")
**Languages** | English, Spanish
**Audience segments** | Skip (que el algoritmo aprenda)
**Final URL (default)** | `https://smoothfenceusa.com/lp/fence-jacksonville`
**Display path** | `smoothfenceusa.com/jacksonville/fence-quote`

#### Keywords (1 ad group: "Jacksonville Fence")

Pegar tal cual en el campo de keywords (cada línea es una keyword; las comillas y corchetes definen match type):

```
[vinyl fence jacksonville]
[fence installation jacksonville]
[fence company jacksonville]
[aluminum fence jacksonville]
[wood fence jacksonville]
[privacy fence jacksonville]
"fence contractor jacksonville"
"free fence estimate jacksonville"
"fence builders jacksonville"
"fence repair jacksonville fl"
"new fence jacksonville"
"fence quote jacksonville"
[fence installation atlantic beach]
[fence installation jacksonville beach]
"fence company jacksonville beach"
"vinyl fence jax"
```

- `[xxx]` = Exact match
- `"xxx"` = Phrase match
- (sin marcadores = Broad — no usar)

---

### Campaña 2 — `Search · St. Augustine · Fence`

Setting | Valor
---|---
**Campaign name** | `Search · St. Augustine · Fence`
**Budget (daily)** | **$15.00**
**Bidding** | Maximize Conversions
**Locations** | St. Augustine, FL · Ponte Vedra, FL · St. Johns, FL · Vilano Beach, FL (radio 15 mi)
**Final URL** | `https://smoothfenceusa.com/lp/fence-st-augustine`
**Display path** | `smoothfenceusa.com/st-augustine/fence-quote`

#### Keywords

```
[vinyl fence st augustine]
[fence installation st augustine]
[fence company st augustine]
[aluminum fence ponte vedra]
[wood fence st augustine]
"fence contractor st augustine"
"free fence estimate st augustine"
"fence builders st augustine"
"fence quote st augustine"
"fence installation ponte vedra"
"vinyl fence ponte vedra"
"fence company ponte vedra"
[fence st johns county]
"privacy fence st augustine"
"fence company st johns fl"
```

---

### Campaña 3 — `Search · Daytona · Fence`

Setting | Valor
---|---
**Campaign name** | `Search · Daytona · Fence`
**Budget (daily)** | **$15.00**
**Bidding** | Maximize Conversions
**Locations** | Daytona Beach, FL · Ormond Beach, FL · Port Orange, FL · Holly Hill, FL · Deltona, FL (radio 12 mi)
**Final URL** | `https://smoothfenceusa.com/lp/fence-daytona`
**Display path** | `smoothfenceusa.com/daytona/fence-quote`

#### Keywords

```
[vinyl fence daytona beach]
[fence installation daytona beach]
[fence company daytona]
[aluminum fence ormond beach]
[wood fence daytona]
"fence contractor daytona"
"free fence estimate daytona"
"fence quote daytona beach"
"fence installation ormond beach"
"fence company ormond beach"
"vinyl fence port orange"
"fence installation port orange"
"fence builders daytona"
"privacy fence daytona"
"fence company volusia county"
"fence installation deltona"
```

---

## C · Negative keywords (compartidas a las 3 campañas)

> Crear un **Shared library → Negative keyword list** llamado `Master Negatives - Fence` y aplicarla a las 3 campañas. Phrase match a menos que indique [xxx] (exact).

```
diy
do it yourself
how to install
how to build
repair
repairing
fix
fixing
parts
gate parts
post parts
rental
rent
rentals
jobs
hiring
career
careers
salary
free
giveaway
cheap
cheapest
home depot
lowes
lowe's
[depot]
[lowes]
tampa
miami
orlando
gainesville
ocala
sarasota
fort lauderdale
naples
fort myers
panama city
pensacola
[fence panel]
[fence panels]
electric fence
invisible fence
dog fence
chain link gate parts
temporary fence
construction fence
horse fence
farm fence
agricultural
livestock
chicken wire
deer fence
images
pictures
photos
[clip art]
[clipart]
youtube
video
how much
cost calculator
calculator
[free estimate template]
quote template
diy guide
guide
tutorial
```

---

## D · Responsive Search Ad — UNA RSA por campaña

> Pegar las mismas headlines/descriptions reemplazando solo `[CITY]` por el nombre exacto de la ciudad (Jacksonville / St. Augustine / Daytona Beach).

### Headlines (15 totales — pegar de una)

```
Fence Installation in [CITY]
Free Estimate in 60 Seconds
Licensed & Insured Florida
Vinyl, Aluminum, Wood, Chain-Link
Same-Day Quote Promise
24-Hour Site Visit
5.0 Stars · 19 Reviews
Financing Available · No Credit Hit
(386) 403-9460
Privacy Fences in [CITY]
Local Florida Fence Pros
HOA & Permits Handled
1-3 Day Installation
No Pressure · No Obligation
Get Your [CITY] Fence Quote
```

### Long Headlines (2)

```
Fence Installation in [CITY] · Free Estimate · Licensed & Insured Florida
Vinyl, Aluminum, Wood Fences in [CITY] · Same-Day Quote · Financing Available
```

### Descriptions (4)

```
Free, no-pressure estimate. Licensed & insured local Florida team. Financing available — pre-qualify in 60 seconds with no credit hit.
Serving [CITY] and surrounding areas. Vinyl, aluminum, wood, chain-link. Same-day quote, 24-hour site visit promise.
We pull permits, handle HOAs, and finish installation in 1-3 days. 5.0 stars, 19 Google reviews. Get your free [CITY] estimate now.
Pre-qualify for financing in 60 seconds with no impact to your credit. Vinyl, aluminum, wood — same-day quote in [CITY].
```

### Pinned headlines

- Headline pos 1: pin **`Fence Installation in [CITY]`**
- Headline pos 2: pin **`Free Estimate in 60 Seconds`**
- Resto sin pinear (que el algoritmo rote)

---

## E · Ad assets (extensions) — aplicar a las 3 campañas

### Sitelinks (4)

Title | Description 1 | Description 2 | Final URL
---|---|---|---
Get Free Estimate | Submit form, reply same day | 24-hour site visit | `https://smoothfenceusa.com/lp/fence-[slug]#lp-form`
Financing | Pre-qualify in 60 seconds | No credit impact | `https://smoothfenceusa.com/financing`
Estimator | See your price range | Pick material + length | `https://smoothfenceusa.com/lp/fence-[slug]#estimator`
Reviews | 5.0 stars, 19 reviews | Local Florida team | `https://smoothfenceusa.com/lp/fence-[slug]`

(Reemplazar `[slug]` por `jacksonville`, `st-augustine`, `daytona` según campaña)

### Callouts (8 — todas iguales)

```
Licensed & Insured
Free Estimate
Same-Day Quote
24-Hour Site Visit
Financing Available
HOA & Permits Handled
1-3 Day Installation
5.0 Stars · 19 Reviews
```

### Call extension

- Phone: **(386) 403-9460**
- Schedule: Mon-Sat 8 AM – 6 PM (Eastern)

### Structured snippets

- Header: **Service catalog**
- Values: `Vinyl, Aluminum, Wood, Chain-Link, Privacy, Pool fences, Ornamental, Picket`

### Location extension

- Solo si tu Google Business Profile está linkeado. Si lo está, activarla. Si no, skipear.

---

## F · Pasos en la UI (resumen)

1. Pausar PMax actual (sección A arriba).
2. **Shared library → Negative keyword lists** → crear `Master Negatives - Fence` y pegar la lista de la sección C.
3. **+ New campaign**:
   - Goal: Leads
   - Type: Search
   - Conversion goal: dejar Submit lead form (default)
   - Llenar todo según la tabla de la campaña 1 (Jacksonville)
   - En "Negative keyword lists" aplicar `Master Negatives - Fence`
   - En el ad group: pegar keywords (sección B Jacksonville)
   - En el ad: pegar headlines + descriptions (sección D)
   - Final URL del ad: `https://smoothfenceusa.com/lp/fence-jacksonville`
   - Pinear las 2 headlines indicadas (sección D)
   - Saltar Audiences (skip)
4. Repetir para campaña 2 (St. Augustine) y campaña 3 (Daytona Beach), cambiando lo que indique cada tabla.
5. Aplicar **sitelinks · callouts · call · structured snippets** a las 3 campañas (sección E).
6. **Conversion tracking** — verificar que las 3 campañas usan las account-default goals (Submit lead form como Primary). Si no, ir a Goals → Account default → confirmar que las 3 nuevas heredaron.
7. **Save & enable** las 3 campañas.

---

## G · Daily check (primeros 14 días)

Tarea | Frecuencia | Tiempo
---|---|---
Search Terms report → agregar negativas nuevas | Diario | 5 min
Conversiones del día | Diario | 1 min
Pausar keywords con >40 clicks y 0 conv | Cada 3 días | 2 min
Revisar Quality Score por keyword | Cada 7 días | 5 min
Decision day: pasar a tCPA | Día 14 | 10 min

---

## H · Reglas de pausa (auto-rules — opcional pero recomendado)

> Configurar en **Tools → Bulk actions → Rules**:

1. **Pausar campaña si gasta >$60 sin 1 conversión en 7 días** → notify Fede (no auto-pause, solo email)
2. **Pausar keyword si tiene >40 clicks y 0 conv en 14 días** → auto-pause + notify

---

## I · Targets para validar el pivot (después de 14 días)

- CTR > 5% (vs 4.57% actual)
- Conversion rate > 3% (vs 0.17% actual = 17x mejora)
- CPA < $40
- Volumen: 5-8 leads/semana entre las 3 campañas
- Por mercado: Jacksonville liderando (mayor población = más volumen esperado)

Si esos targets se cumplen, el plan de scaling es:
- Subir budget de la campaña que mejor convierte +50%
- Bajar budget de la peor -50%
- Considerar agregar Performance Max nuevo PERO con asset groups por ciudad (no broad)

---

*Si querés que trate de drivear todo en la UI vía Chrome MCP me avisás y le doy otra vuelta — la barrera principal es que las tablas de Google Ads usan shadow DOM cerrado, pero los wizards de Create Campaign son más accesibles. Vale el intento si preferís no hacerlo manual.*
