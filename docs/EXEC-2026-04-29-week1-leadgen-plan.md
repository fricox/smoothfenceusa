# Plan Semana 1 — Lead Generation Multicanal (2026-04-29)

> Las 3 Search campaigns están ENABLED pero MAX_CONV requiere 14-21 días de learning. Para conseguir leads ESTA SEMANA hay que paralelizar canales. Este doc es el playbook concreto.

---

## Por qué no alcanza con Google Ads paid solo en semana 1

PMax baseline: 0.17% CR. Las 3 nuevas Search campaigns en learning phase con solo 6 conversiones históricas para entrenar MAX_CONV. Realista semana 1:

| Canal | Leads esperados sem 1 | Costo |
|---|---|---|
| Google Ads Search (3 camp.) | 2-5 | ~$420 |
| Local Services Ads | 3-7 (si activa rápido) | ~$150 |
| Meta Lead Ads | 5-8 | ~$140 |
| Referidos + GBP optimizado | 1-3 | $0 |
| **TOTAL semana 1** | **11-23 leads** | **~$710** |

Sin LSA + Meta + GBP = 2-5 leads / semana. Con multicanal = 11-23.

---

## Track A — Local Services Ads (LSA) — Fede ejecuta

> **Por qué primero:** pay-per-LEAD (no per-click), $25-40/lead típico en fence FL. Aparece arriba del Search organic con badge "Google Guaranteed". Aprobación 3-7 días, después entrega leads en 24h.

**URL:** [ads.google.com/local-services-ads](https://ads.google.com/local-services-ads/start)

**Pasos:**
1. Login con `federico@smoothfenceusa.com` (la cuenta admin de Smooth Fence USA).
2. Click **Get started**. Selección de business type: **Home services → Fencing** (o "Fence company").
3. Service area: ZIPs / cities de Jacksonville + St. Augustine + Ponte Vedra + Daytona + Ormond + Port Orange (los mismos de las Search campaigns).
4. Services offered: Vinyl Fence, Aluminum Fence, Wood Fence, Chain-link, Privacy Fence, Pool Fence, Ornamental, Picket, Repair, New Installation.
5. Hours: Mon-Sat 8 AM – 6 PM Eastern (matches lo que tenemos en GBP).
6. Upload:
   - Florida fence contractor license (number + scan/PDF).
   - General liability insurance certificate (scan/PDF, vigente).
7. Background check: aceptar — cuesta ~$30, lo paga Google si no pasa, sino se descuenta del primer lead. Tarda 3-5 días.
8. Reviews: Google va a sincronizar con tu GBP — si tenés 5.0 / 19 reviews ya está, sino traer reviews antes de aplicar.
9. Set weekly budget: arrancá con **$200/sem** (~$28/d). Pay-per-lead, vas a recibir 5-8 leads/sem a $25-40/lead.

**Mientras esperás aprobación (3-7 días):** trabajar Track B y C en paralelo.

**Cuando esté live:** Smooth Fence aparece en el bloque de 3 anunciantes "Google Guaranteed" arriba de TODO en búsquedas tipo "fence company jacksonville". CTR alto, intent altísimo.

---

## Track B — Meta Lead Ads (Facebook + Instagram) — Yo ayudo

> **Por qué:** form en Meta (sin LP), submit en 2 taps, leads en 24-48h sin learning phase como Google.

### B.1 — Setup pre-requisitos (verificar antes)

- [ ] Facebook page de Smooth Fence USA existe y está verificada (necesario para Lead Ads)
- [ ] Instagram business account linkeada a la FB page
- [ ] Meta Business Manager (business.facebook.com) creado con la FB page bajo ownership
- [ ] Pixel de Facebook instalado en smoothfenceusa.com (ideal pero no bloqueador para Lead Ads — el form es nativo de Meta)
- [ ] Privacy policy publicada en `/privacy` (legal requirement para forms de lead — Meta NO acepta sin esto)

Si falta algún ítem, avisame cuál y lo cubrimos.

### B.2 — Campaign 1 (arrancar acá)

**Objective:** Leads (no Traffic, no Engagement)

**Campaign name:** `Meta · Jacksonville · Fence Lead`

**Budget:** $20/d ($140/sem) — daily budget, no campaign budget

**Audience:**
- Location: 25 mile radius around **Jacksonville, FL** (incluye Atlantic Beach, Jax Beach, Neptune Beach, San Marco)
- Age: 28-65
- Gender: All
- Detailed targeting (broad, NO over-narrow):
  - Demographics → Home Ownership → **Homeowners**
  - Interests → Real Estate, Home Improvement, Home & Garden, DIY, Backyard Renovation
  - Behaviors → Engaged Shoppers
- Languages: English, Spanish
- Placements: Automatic (Facebook + Instagram + Audience Network + Messenger)
- Optimization: For lead generation events (default cuando el objective es Leads)

### B.3 — Ad creative (3 variantes para test)

**Primary text (caption):**
```
Need a fence in Jacksonville? Get your free estimate in 60 seconds.

✓ Licensed & Insured FL contractor
✓ Vinyl, Aluminum, Wood, Chain-Link
✓ Same-day quote · 24-hour site visit
✓ Financing available — no credit hit
✓ 1-3 day installation

Tap to get your free quote — no spam, no pressure.
```

**Headline (versión corta arriba del CTA):**
```
Free Fence Estimate Jacksonville
```

**Description (debajo del headline):**
```
Vinyl, Aluminum, Wood. Licensed & Insured.
```

**CTA button:** `Get Quote`

**Imagen / Video (3 variantes):**
1. Foto job recientemente terminado en Jacksonville (vinyl o aluminum, casa típica FL). 1080x1080 (square) + 1080x1920 (story).
2. Antes/después de un install (split image o carousel 2 fotos).
3. Video corto 15s del owner Fede mostrando un job (más conversión, voz personal).

### B.4 — Lead Form (instant inside Meta)

**Form name:** `Smooth Fence Jacksonville Quote`

**Intro screen:**
- Headline: `Get Your Free Fence Estimate`
- Description: `Same-day reply. Free site visit within 24 hours. No pressure, no obligation.`
- Image: same hero image como el ad.

**Questions (mínimo, max conversion):**
1. Full name (auto-fill from FB profile)
2. Phone (auto-fill, required)
3. Email (auto-fill, required)
4. ZIP code (text input, required)
5. ✋ NO agregar más preguntas — cada pregunta extra = -10% conversion rate.

**Privacy policy URL:** `https://smoothfenceusa.com/privacy` (debe existir publicada)

**Custom disclaimer (opcional pero buena practice):**
```
By submitting, you agree to receive a phone call or text from Smooth Fence USA about your fence project. Reply STOP anytime to opt out.
```

**Thank-you screen:**
- Headline: `Thanks! We'll call you within 24 hours.`
- Description: `Or call us right now at (386) 403-9460 for an instant quote.`
- Button: `Call Smooth Fence` → tel:+13864039460

### B.5 — CRM connection

Meta Lead Ads guarda leads en Meta Business Suite → Lead Center. Para que lleguen al Google Sheet de leads + email de Fede:

**Opción A (manual, OK semana 1):** Fede check Lead Center 2x/día, bajar CSV, importar a sheet.

**Opción B (automático, recomendado mes 1):** Conectar via **Zapier** o **Make.com**:
- Trigger: New Meta Lead
- Action 1: Append row to Google Sheet "Leads"
- Action 2: Send email to `federico@smoothfenceusa.com` + `f3d3x5@gmail.com`
- Action 3: Send SMS to Fede phone vía Twilio (response time critical)

Setup Zapier: ~20 min. Costo: free tier alcanza para <100 leads/mo.

### B.6 — Replicar para St. Augustine + Daytona después de validar Jax

Si Jacksonville Meta Lead campaign genera 3+ leads en 5 días con CPL <$40, replicar:
- `Meta · St. Augustine · Fence Lead` — $15/d, mismo audience pero geo St. Augustine + Ponte Vedra
- `Meta · Daytona · Fence Lead` — $15/d, geo Daytona + Ormond + Port Orange

Total Meta Lead Ads steady state: $50/d ($350/sem).

---

## Track C — GBP optimization + outreach orgánico — Fede ejecuta

> **Free, alto ROI.** GBP es el canal #1 de leads en local services. Outreach a clientes existentes = referidos.

### C.1 — Google Business Profile (Fede, 30 min hoy)

URL: [business.google.com](https://business.google.com)

- [ ] Subir 5 fotos nuevas de jobs recientes (antes/después si tenés). Resolución min 1024x1024. Tagear ciudad en cada una.
- [ ] Verificar que la lista de Services esté completa: Vinyl Fence Installation, Aluminum Fence Installation, Wood Fence Installation, Chain-Link Fence Installation, Privacy Fence, Pool Fence, Fence Repair, Fence Removal, Free Fence Estimate.
- [ ] Verificar Service Areas listadas: Jacksonville, Atlantic Beach, Jax Beach, Neptune Beach, St. Augustine, Ponte Vedra, St. Johns County, Daytona Beach, Ormond Beach, Port Orange.
- [ ] Hours of operation: Mon-Sat 8 AM – 6 PM, Sunday Closed.
- [ ] Crear post de "Update": foto + texto "Recently completed: vinyl privacy fence in [neighborhood], Jacksonville. Same-day quote, 3-day install. Get your free estimate at smoothfenceusa.com" (1 post / semana mínimo durante 4 semanas).
- [ ] Responder TODOS los reviews pendientes (incluso los 5★). Template para 5★: "Thanks [name]! Glad we could help with your [type] fence. — Fede @ Smooth Fence USA". Para reviews <5★: respuesta personal, ofrecer remediar.

### C.2 — Outreach a clientes existentes (Fede, 20 min)

Texto/llamada a últimos 10 clientes:
```
Hey [name], soy Fede de Smooth Fence USA. ¿Cómo va la cerca?
Una pregunta: ¿conocés a alguien que ande pensando en cerca?
Tenemos una promo de financiamiento sin credit hit este mes y agradezco mucho cualquier referido.
Cualquier nombre que me pases te mando un Starbucks de regalo si cierra ;)
```

Estimado: 1-2 referidos. Convierten al 50%+ (vs ads al 2-3%).

### C.3 — Posts en redes locales (Fede, 15 min)

- Nextdoor (Jacksonville + St. Augustine + Daytona neighborhoods donde tenés alcance) — 1 post con foto antes/después y "any neighbors looking for fence let me know, free estimate"
- Facebook neighborhood groups (buscar "Jacksonville neighbors", "Ponte Vedra residents", "Daytona homeowners") — mismo post adaptado a cada grupo

---

## Track D — Funnel speed (CRÍTICO — multiplica TODO arriba)

Dato concreto: respondé a un lead en **<5 min** → close rate 5-9x más alto que >1h ([Lead Connect study](https://leadconnect.io/lead-response-management-study/)).

- [ ] Push notification del Google Sheet "Leads" al celular de Fede vía IFTTT/Zapier (cada nuevo row → notif). Setup: 10 min.
- [ ] Auto-response email al lead 30s después de submit:
  ```
  Subject: ✓ Got your fence quote request — calling you in 15 min
  Hey [first name], thanks for reaching out!
  Fede from Smooth Fence USA here. I'll call you in the next 15 min from (386) 403-9460.
  In the meantime if you want to call me directly: (386) 403-9460.
  Talk soon — Fede
  ```
- [ ] Speed > script: un "hola, recibí tu pedido, ¿buen momento?" en 3 min gana sobre llamada profesional 2h después.

---

## Métricas a trackear daily (5 min/día durante 14 días)

| Métrica | Donde mirar | Target sem 1 | Target sem 2 |
|---|---|---|---|
| Google Ads — Cost / Conversions / CR | ads.google.com (las 3 camp.) | CR >1% | CR >1.5% |
| Google Ads — Search Terms | Keywords → Search Terms | Pause keywords con >10 clicks 0 conv | Add 5+ negativas/sem |
| LSA — Lead count | LSA Dashboard | Aprobación pendiente | 5+ leads/sem |
| Meta — Lead count + CPL | Meta Ads Manager | 3-5 leads | <$40 CPL |
| GBP — Profile views / Direction requests | GBP Insights | +10% vs baseline | +20% |
| Response time avg | Manual log | <5 min | <3 min |

---

## Targets agregados semana 1 vs semana 2

| Métrica | Semana 1 | Semana 2 |
|---|---|---|
| Total leads (todos canales) | **11-23** | **20-35** |
| Costo paid total | ~$710 | ~$840 |
| CPA blended | $30-65 | $25-45 |
| Closed deals (asumiendo 20% close rate) | 2-5 | 4-7 |

---

## Riesgos y heads-up

1. **LSA puede tardar 7-10 días en aprobar** si background check se demora. Si pasa eso, aumentar Meta budget temporalmente para compensar.
2. **Meta Lead quality es típicamente menor** que Google Ads Search (intent menor en social). Esperar CPL bajo pero close rate también más bajo (~10-15% vs 25%+ en Search).
3. **GBP changes pueden tardar 24-72h** en propagar a búsquedas reales. Posts updates aparecen casi inmediato.
4. **NO** apagar las Search campaigns aunque CPL parezca alto en semana 1. MAX_CONV está aprendiendo. Día 14 es el punto de re-evaluación.

---

*Doc creado 2026-04-29 PM tarde, después de auditoría completa de las 3 campañas Search. Plan vigente para los próximos 14 días.*
