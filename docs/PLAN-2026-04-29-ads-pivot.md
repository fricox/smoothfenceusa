# Plan — Pivot Google Ads + LPs (2026-04-29)

> Fede gastó plata en Google Ads y no entraron clientes. Este documento diagnostica el problema y propone los cambios concretos. **Esperando aprobación antes de ejecutar.**

---

## 1. Diagnóstico — qué encontré hoy

### Google Ads (cuenta 889-512-6127, ventana ~7 días)

Métrica | Valor
---|---
Costo | $183
Clicks | 111
Impressions | 2,430
CTR | 4.57% (decente)
Avg CPC | $1.65 (bajo, normal en fence)
**Interactions / Raw leads** | **588 / 1.00**
**Tasa de conversión** | **~0.17% (catastrófica)**
Optimization score | 70.7%
Conversion tracking | OK (3 goals recording, lead_form_submit primary)
Top bid signal | Desktop, weekdays 10AM-6PM

**1 sola campaña activa**: `Get a Free Estimate Today` — es **Performance Max** (PMax). Una sola campaña, un solo asset group, sin segmentación geográfica fina.

### Las 5 LPs

Las 5 están live (HTTP 200) y comparten el componente `CountyLanding`. Auditando `/lp/fence-duval` (la que apuntás a Jacksonville):

✅ Lo que funciona:
- GTM y gtag cargan, `lead_form_submit` se dispara correctamente al submit
- Carga rápida (492ms)
- `noindex, nofollow` (correcto para ads)
- Estimator está arriba del fold

❌ Lo que mata la conversión:
1. **Nav completo en el header**: 14 links (Home, Services, Gallery, About, HOAs, Financing, FAQ, Contact, Pay, Free Quote, etc.). Una LP de paid debería tener **solo logo + teléfono**, no el menú entero. El usuario llega del ad y se distrae.
2. **El form de contacto está a 3.23 viewports de scroll**. Hay que bajar 3 pantallas para llegar al form de "preguntá rápido". Solo el estimator queda arriba del fold.
3. **Título/H1 dice "Duval County"** — pero la gente NO busca "fence Duval County", busca "fence Jacksonville", "fence installation Jacksonville", "vinyl fence Jacksonville". **Mismatch entre keyword del ad y headline del LP.**
4. **Multiples CTAs compiten**: Calendly, Estimator, Pay, Hearth, form. Cada CTA es un fork → menos conversión.

### Hipótesis del por qué no caen clientes

```
PMax (broad audience) → Llega gente con bajo intent
                     → LP con nav completo → distracción
                     → H1 dice "Duval County" → no matchea con la búsqueda
                     → Form a 3+ pantallas de scroll
                     → Bounce
```

Con CTR 4.57% y CPC $1.65 los ads no son el problema *creativo*. El problema es **targeting (PMax demasiado amplio) + LP que no convierte**.

---

## 2. Decisión estratégica: qué priorizamos

Decisión que ya tomaste: priorizar **Jacksonville (Duval), St. Augustine (St. Johns), Daytona/Ormond (Volusia), Palatka (Putnam)**. **Pausar Palm Coast/Flagler.**

Mi recomendación de orden de prioridad por ROI esperado:

1. **Jacksonville** — mercado más grande, mayor población, más búsquedas mensuales
2. **St. Augustine / Ponte Vedra** — alto ticket promedio (Ponte Vedra es zona alta)
3. **Daytona / Ormond Beach** — mercado mediano
4. **Palatka** — mercado chico, dejarlo de cola con budget mínimo o pausado al inicio

---

## 3. Plan de ejecución — 3 fases

### FASE 1 — Rework de las LPs (HOY, antes de tocar ads)

Trabajo en código, deploy via Vercel.

**1.1 — Crear layout específico para LPs (`app/lp/layout.tsx`)**
- Sin el nav completo del sitio
- Solo logo SmoothFenceUSA + teléfono `(386) 403-9460` (clickable como tel:)
- Sin links a Services, Gallery, About, FAQ, Pay, etc.
- Footer minimal (copyright, dirección, sin links cruzados)

**1.2 — Refactor `CountyLanding` para usar nombre de ciudad**
- H1 cambia de "Fence Installation in Duval County" → "Fence Installation in Jacksonville, FL"
- Title meta: "Fence Installation in Jacksonville, FL | Smooth Fence USA"
- Description: "Vinyl, aluminum & wood fence installation in Jacksonville. Free estimate in 60 seconds. Licensed & insured."
- Sub-headline mantiene "Serving all of Duval County" como aclaración

**1.3 — Crear LPs city-specific** (rutas nuevas, mismas LP component pero con override de ciudad):
- `/lp/fence-jacksonville` (Duval)
- `/lp/fence-st-augustine` (St. Johns)
- `/lp/fence-daytona` (Volusia)
- (Mantenemos `/lp/fence-duval`, `/lp/fence-st-johns`, `/lp/fence-volusia` como aliases — apuntan al mismo componente, el ads decide cuál usar)

**1.4 — Mover el form arriba**
- En el hero: `H1 → Estimator → Form en 2 columnas` (estimator izquierda, form derecha en desktop)
- O: `Hero con H1 + bullet de trust + form lateral` y el estimator después
- Objetivo: form en viewport inicial sin scroll en desktop, máximo 1 scroll en mobile

**1.5 — Reducir CTAs**
- Sacar el banner de Hearth de la LP (queda en /financing)
- Sacar el botón Calendly del medio (queda solo el form como conversión principal)
- El botón "Pay" en header desaparece (junto con todo el nav)
- Solo CTAs: el form, el estimator, y el teléfono en el header

**1.6 — Trust elements arriba del fold**
- "★★★★★ 4.9 (47 Google reviews)" o el rating real
- "Licensed & Insured | FL Lic #XXXX"
- "Free estimate in 60 seconds"
- "Serving Jacksonville since [year]"

### FASE 2 — Reorganizar Google Ads (HOY, después del deploy)

**2.1 — Pausar PMax actual**
- "Get a Free Estimate Today" → estado Paused (no eliminamos, queda como histórico)

**2.2 — Crear 3 campañas Search nuevas** (1 por ciudad)

| Campaña | Geo target | LP | Budget/día inicial |
|---|---|---|---|
| Search - Jacksonville | Jacksonville metro (Duval) -10mi | `/lp/fence-jacksonville` | $20 |
| Search - St. Augustine | St. Johns county (St. Augustine, Ponte Vedra, St. Johns city) | `/lp/fence-st-augustine` | $15 |
| Search - Daytona | Volusia (Daytona, Ormond, Port Orange, Deltona) | `/lp/fence-daytona` | $15 |

Total inicial: **$50/día** (vs ~$26/día actual).

**2.3 — Keywords por campaña** (phrase + exact, no broad)

Jacksonville:
- "vinyl fence jacksonville" exact
- "fence installation jacksonville" phrase
- "fence company jacksonville" phrase
- "aluminum fence jacksonville" exact
- "wood fence jacksonville" exact
- "privacy fence jacksonville" phrase
- "fence contractor jacksonville" phrase
- "free fence estimate jacksonville" phrase

(Mismas estructuras para St. Augustine y Daytona reemplazando ciudad)

**2.4 — Negative keywords (críticas para no quemar plata)**
- diy, do it yourself
- repair, repairing, fix, fixing
- rental, rent
- jobs, hiring, career
- free (sí, "free" como keyword negativa porque atrae buscadores de regalos)
- cheap, cheapest
- tampa, miami, orlando, gainesville, ocala (cities afuera del target)
- depot, lowes, home depot
- chain link only (a menos que querás capturar chain-link específicamente)

**2.5 — Bidding strategy**
- Empezar con **Maximize Conversions** sin tCPA (ya tenemos 1 conversión histórica, suficiente para que aprenda)
- Después de 14-21 días de data, evaluar pasar a **Target CPA** con un valor objetivo
- NO usar Maximize Clicks (atrae junk)

**2.6 — Ad copy** (Responsive Search Ads, 3 ads por campaña)

Headlines (15 max, hago 12):
- Fence Installation in [City]
- Free Estimate in 60 Seconds
- Licensed & Insured Florida
- Vinyl, Aluminum, Wood, Chain-Link
- Same-Day Quote
- 24-Hour Site Visit
- 5-Star Rated Local
- Financing Available
- (386) 403-9460
- Privacy Fences in [City]
- Fence Pros [City]
- Get Your Quote Today

Descriptions (4):
- Free, no-pressure estimate. Licensed & insured local team. Financing available — pre-qualify in 60 seconds.
- Serving [City] and surrounding areas. Vinyl, aluminum, wood. Same-day quote, 24h site visit.
- We pull permits, handle HOAs, and finish in 1-3 days. Get your free estimate now.
- 5-star rated. Pre-qualify for financing in seconds with no credit hit.

**2.7 — Ad extensions**
- Sitelinks: Estimator, Financing (que linkee a la LP, no al sitio público), Gallery (solo si la podemos servir noindex), Reviews
- Callouts: "Licensed & Insured", "Free Estimate", "Same-Day Quote", "Financing Available"
- Call extension: (386) 403-9460
- Location extension: dirección del negocio
- Lead form extension: (opcional, instant lead inside Google)

### FASE 3 — Medición y optimización (continuo, primeras 2 semanas)

**3.1 — Daily check (5 min/día)**
- Search Terms report → agregar negative keywords nuevas
- Conversiones del día → si 0 después de día 3-4 con $50/día, hay que ajustar

**3.2 — Reglas de pausa**
- Si una campaña gasta >$60 sin 1 conversión → bajar budget 50% y revisar keywords
- Si una keyword tiene >40 clicks y 0 conversiones → pausar

**3.3 — Métricas objetivo (después de 14 días con la nueva estructura)**
- CTR > 5%
- Conversion rate > 3% (vs 0.17% actual)
- CPA < $40 por lead capturado
- Al menos 5-8 leads/semana entre las 3 campañas

---

## 4. Lo que necesito de vos antes de ejecutar

1. **Aprobación del plan** (este doc) — sí / cambios / preguntas
2. **Un dato del negocio** que necesito para los ads:
   - ¿Cuántas reviews tenés en Google y cuál es el rating? (para el trust strip de las LPs)
   - ¿Año en que arrancaste el negocio? (para "Serving Jacksonville since YYYY")
   - ¿Tu Florida fence contractor license number? (para el footer de LP)
3. **Confirmación de budget**: ¿$50/día está bien para empezar? (= $1,500/mes proyectado)

---

## 5. Tiempo estimado

- Fase 1 (LPs): 1.5–2 hrs de trabajo en código + deploy
- Fase 2 (Ads): 45 min – 1 hr
- Fase 3: ~10 min/día de check

Total HOY: ~3 hrs si ejecutamos todo seguido.

---

## 6. Riesgos / heads-up

- Branch local `feat/p0-5-fency-kb-refactor` tiene WIP de Stripe hardening + Fency KB. Voy a abrir un branch nuevo `feat/lp-paid-rework` desde main para no mezclar.
- Las nuevas LPs city-specific son URLs nuevas → cuando las apuntemos en ads, Google Ads aprende desde cero. Por eso es importante tener buen volumen de keywords + budget para que el algoritmo tenga data.
- Pausar la PMax pierde el "learning" que ya hizo. Si vemos que no funciona, podemos volver, pero no recomiendo.

---

*Esperando tu OK para arrancar. Si querés cambios al plan, decime cuáles.*
