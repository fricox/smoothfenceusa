# Plan Clic → Lead v2 — Smooth Fence USA

_Creado: 2026-04-19 · **Ajustado tras feedback de Fede el mismo día.** Objetivo: maximizar conversión de clic a lead. Baseline: 1 Primary conv / $77 CPA / 30 días con $6.50/día. Nuevo budget confirmado: $25/día._

---

## Cambios respecto a v1

Tras review de Fede, esta v2 corrige:

1. **Jerarquía de conversores redefinida.** El form de contacto NO es el convertidor principal. Los convertidores reales son, en orden: (1) **Estimador instantáneo**, (2) **Fency** (chatbot), (3) **Calendly** para agendar la visita, (4) **Llamadas/SMS/WhatsApp** al (386) 403-9460. El `QuickContactForm` es fallback.
2. **P0-3 (Sticky CTA mobile) eliminado.** `FloatingButtons` ya existe con SMS + WhatsApp. Sólo agregamos tracking.
3. **P1-1 reenfocado.** El quote es instantáneo (ya lo da el estimador); la promesa es sobre **agendar la visita dentro de 24 h** mientras la empresa agarra tracción.
4. **P1-3 ampliado.** El FAQ de la web se arma con el **contenido completo del KB de Lily** (las 4 categorías consolidadas: About Us, Services Offered, Service Area & Estimates, Financing & Pricing), presentado visualmente por categorías.
5. **Nueva tarea P0-5: actualizar la KB de Fency** con el mismo contenido bilingüe del KB de Hearth. Así Fency y Lily hablan igual.
6. **Número de Lily NO se publica.** El número público es (386) 403-9460 que redirige a Lily. Esto se respeta en toda integración de tracking y LPs.

---

## Reglas de arquitectura (aplican a todas las tareas)

Fede pidió explícitamente no acumular deuda técnica. Claude Code debe respetar estas reglas en cada PR:

1. **Cero código "puente" que haya que borrar después.** Cada cambio debe poder vivir en el repo tal cual cuando evolucione el sistema — si algo es temporal, se marca con `// TODO(vN):` y la referencia al plan de evolución.
2. **Source-of-truth en git siempre que se pueda.** Contenido (KB, testimonios, condados) va en archivos versionados, no en base de datos como single source. La DB replica desde git vía scripts idempotentes (`npm run sync-*`).
3. **Cambios aditivos, no destructivos.** Refactors futuros deben poder agregarse sin reescribir. Si una tarea introduce un patrón que limita evolución futura, se documenta el por qué y el camino de salida.
4. **Una feature, un PR.** Nada de PRs que mezclan 3 tareas. Un PR por tarea del plan.
5. **Tests o smoke tests obligatorios antes de merge.** Aunque sea una verificación manual documentada en el PR body.
6. **No tocar código fuera del scope de la tarea.** Si Claude Code encuentra algo que "aprovecha para arreglar", lo anota pero no lo mergea en el mismo PR.
7. **Si una tarea requiere decisión de producto no documentada, parar y preguntar a Fede** — no inventar (ej: número de licencia, copy específico, fotos).

---

## Cómo usar este documento

Este plan lo diseñó Claude (Cowork) y lo ejecuta **Claude Code** dentro del repo. Flujo:

1. Fede abre `claude` en `~/Projects/smoothfenceusa`.
2. Claude Code lee `CLAUDE.md` + `memory/` + este archivo automáticamente.
3. Fede le pasa a Claude Code una tarea: "ejecuta **Tarea P0-1** de `PLAN_CLICK_TO_LEAD_2026-04-19.md`".
4. Claude Code hace el cambio, abre PR, corre tests.
5. Fede revisa/mergea, vuelve acá y me dice qué pasó; yo actualizo memoria.

Cada tarea está autocontenida: **objetivo**, **archivos**, **criterios de aceptación**, **métrica**.

---

## Jerarquía de conversores (fuente de verdad)

| # | Canal | Dónde vive hoy | Rol en el funnel |
|---|---|---|---|
| 1 | **Estimador instantáneo** | Hero home + `/estimator` + LPs | **Principal.** Cotización al toque + captura datos + dispara `lead_form_submit`. |
| 2 | **Fency (chatbot web)** | Burbuja en todo el sitio, auto-open 5 s | Captura leads, educa, handoff a WhatsApp/SMS. **Debe tener el mismo KB que Lily.** |
| 3 | **Calendly** | Hero "Schedule site visit" + `/contact` | Agendar visita presencial (Eastern locked, teléfono/dirección obligatorios). |
| 4 | **Llamadas / SMS / WhatsApp** al (386) 403-9460 | Header, footer, `FloatingButtons`, estimator, financing | Contacto directo. El número público redirige a Lily. |
| 5 | **QuickContactForm** | `/contact`, `/lp/*` | Fallback si no encontraron otra ruta. No es el que convierte. |

**Consecuencia operativa:** las palancas de P0 y P1 apuntan a reforzar los canales 1–4, no al 5. El `QuickContactForm` solo se toca para que, cuando se use, no trabe por fricción tonta.

---

## Tabla de prioridades v2

| # | Tarea | Canal impactado | Impacto | Esfuerzo |
|---|---|---|---|---|
| ~~**P0-1**~~ ✅ | ~~Reforzar visibilidad del estimador en hero + LPs~~ — **done in review** branch `feat/p0-1-estimator-primary-cta` | Estimador | +10–20% conv form | 1–2 h |
| **P0-2** | Trust bar en hero home (license + rating + years + counties) | Estimador, Calendly | +5–10% clic→lead | 1–2 h |
| **P0-3** | Payment Calculator Hearth en `/financing` | Financing funnel | Bajar 14 Loan Starts → Completes | 2–3 h |
| **P0-4** | 5 LPs por condado `app/lp/fence-[county]` | Ads scale | +20–40% Quality Score | 3–4 h |
| **P0-5** | Actualizar KB de Fency con el KB bilingüe de Hearth | Fency | +20–35% conv chat | 2 h (si Opción A) |
| **P0-6** | QuickContactForm: mensaje opcional | Fallback | +15–25% conv del fallback | 5 min |
| **P1-1** | Promesa "Site visit scheduled within 24 h" en LPs + hero | Todos | +5–10% clic→lead | 30 min |
| **P1-2** | Testimonials con foto + ciudad en LPs + home | Todos | +5–15% conv | 2–3 h |
| **P1-3** | FAQ completo del KB de Hearth por categorías en `/faq` + snippets | Educación, SEO, Fency | +5–10% conv + SEO | 3–4 h |
| **P1-4** | Exit-intent modal con email-only capture | Rescate | +5–10% leads rescatados | 2 h |
| **P1-5** | Tracking de click en `tel:`, `sms:`, WhatsApp | Medición | Visibilidad | 30 min |
| **P1-6** | Fency: revisar visibilidad en mobile + auto-open tuning | Fency | +3–8% chat opens | 30 min |
| **P2-1** | Core Web Vitals (LCP/CLS/INP) | Todos + SEO | Quality Score + SEO | 2–4 h |
| **P2-2** | Retargeting Google Ads (audience 30 d) | Ads | +15–30% conv remarketing | 1.5 h |
| **P2-3** | A/B test framework (Vercel Edge Config + GA4) | Medición iterativa | Mide cada cambio | 4–6 h |

**Total P0: ~1.5 días de Claude Code.**

---

## Bloque P0 — Semana 1

### Tarea P0-1 — Reforzar visibilidad del estimador en hero + LPs

**Por qué:** el estimador **ya es el convertidor más fuerte** (lead instantáneo). Hoy en hero home comparte protagonismo con un botón Calendly y tiene `FenceAnimation`; en LPs directamente no aparece. Objetivo: que el estimador sea la primera acción visible en home y en las 3 LPs existentes + 5 nuevas.

**Archivos:**
- `components/sections/Hero.tsx`
- `app/lp/free-estimate/page.tsx`
- `app/lp/vinyl-fence/page.tsx`
- `app/lp/aluminum-fence/page.tsx`

**Cambios:**
1. **Hero home:** orden visual actual (headline + botón Calendly + FenceAnimation | estimator) queda OK — el estimator ya está ahí a la derecha. **Cambio chico:** cambiar el label del botón Calendly de "Schedule" a "Schedule site visit" para que quede claro que es el paso 2 (después de ver el quote). No tocar el layout.
2. **Las 3 LPs existentes (`/lp/*`):** hoy abren con hero dark + `QuickContactForm`. Reemplazar el form por el **`EstimatorClient inline`** (mismo componente que el hero), dejando el `QuickContactForm` abajo como fallback con copy "Preferís sólo dejar tu pregunta?" en vez de ser protagonista.
3. Mantener el `FinancingBanner` y trust signals existentes.

**Criterios de aceptación:**
- En mobile y desktop, la primera acción del hero (home) y de cada LP es el estimator.
- El estimator dispara `lead_form_submit` con `form_type: "estimator"` y la LP como `utm_content` preservada.
- `QuickContactForm` sigue visible pero abajo, con copy de fallback.
- Build + lint + typecheck limpios.

**Métrica post-deploy:** ratio `lead_form_submit (form_type=estimator)` vs `lead_form_submit (form_type=quick_contact)` en GA4. Objetivo: estimador toma >70% del total.

---

### Tarea P0-2 — Trust bar en hero home

**Por qué:** hoy el hero no tiene señales de confianza above-the-fold. 4 elementos simples bajan duda antes del primer scroll.

**Archivos:**
- `components/sections/Hero.tsx`
- `contexts/translations.ts`
- (Nuevo si hace falta) `components/sections/TrustBar.tsx` para reusar en LPs

**Cambios:**
1. Strip entre subheading y botones con 4 items (**decisión de Fede 2026-04-19: genérico + 5 estrellas sin conteo**):
   - **Licensed & Insured** (texto genérico; no poner número de licencia).
   - **⭐ 5.0 Google Rating** (sin conteo de reviews; cuando haya volumen grande se agrega).
   - **500+ Fences Installed** (consistente con LPs).
   - **Same-Day Response** · Mon–Sat.
2. Iconos Lucide (`ShieldCheck`, `Star`, `CheckCircle2`, `Clock`).
3. `bg-white/80 backdrop-blur-sm` para no romper hero image.
4. Reutilizar en hero de las 3 LPs + las 5 nuevas.

**Criterios de aceptación:**
- Visible sin scrollear en desktop 1440×900 y mobile 390×844.
- Strings bilingües EN/ES.
- Sin número de licencia (decisión Fede).
- Sin conteo de reviews (decisión Fede).

---

### Tarea P0-3 — Payment Calculator de Hearth en `/financing`

**Por qué:** Hearth dashboard muestra 14 Loan Starts / 0 Completes tras <24 h del deploy de `FinancingBanner`. El visitante clickea el CTA pero abandona antes de completar. Un calculator interactivo **dentro** del sitio baja ansiedad sobre el monto y pre-califica en <60 s.

**Archivos:**
- `app/financing/FinancingClient.tsx`
- Nuevo: `components/sections/FinancingCalculator.tsx`
- `contexts/translations.ts`

**Cambios:**
1. Claude Code debe consultar el dashboard de Hearth Financing Web Tools para tomar el embed script/iframe del Payment Calculator. Claude (Cowork) ya mapeó el dashboard — el widget está entre "offer link", "banners pre-diseñados" y "copy pre-escrito". Si Claude Code no puede acceder, Fede copia el embed y lo pega.
2. `FinancingCalculator.tsx` carga el script sólo en cliente (`useEffect`), con fallback si falla.
3. Insertar debajo del hero de `/financing`, antes del CTA actual.
4. Agregar 3 bullets: "Loan amounts up to $250,000" · "Funding within 1–3 days" · "No prepayment penalties" (copy oficial de Hearth).

**Criterios de aceptación:**
- Widget visible en `/financing` desktop y mobile.
- No genera errores en consola ni rompe CSP.
- Fallback graceful si el script externo falla.
- Opcional: evento GA4 `financing_calculator_interact` al primer slider move.

**Métrica post-deploy:** Loan Starts → Completes ratio en dashboard Hearth. Hoy 14/0 = 0%, objetivo >20% en 14 días.

---

### Tarea P0-4 — 5 LPs por condado

**Por qué:** LPs geo-targeteadas suben Quality Score en Ads → baja CPC 20–40% → más clicks por $25/día.

**Archivos:**
- Nuevo: `app/lp/fence-[county]/page.tsx` (dynamic route con `generateStaticParams`).
- Nuevo: `lib/counties.ts` con data de los 5 condados.

**Los 5 condados:**
1. `fence-flagler` — Palm Coast, Flagler Beach, Bunnell.
2. `fence-volusia` — Daytona Beach, Ormond Beach, DeLand, Port Orange.
3. `fence-st-johns` — St. Augustine, Ponte Vedra, St. Johns.
4. `fence-duval` — Jacksonville, Jax Beach, Atlantic Beach.
5. `fence-putnam` — Palatka, Interlachen, Crescent City.

**Estructura de cada LP:**
1. Hero H1: "Fence Installation in {County} County, Florida".
2. Subheading: "Vinyl, aluminum, wood, and chain-link. Instant quote online, site visit scheduled within 24 h."
3. **Trust bar** (componente de P0-2).
4. **EstimatorClient inline** (principal).
5. Lista de cities del condado.
6. 2–3 testimonials (dummy bilingües hasta que P1-2 los traiga reales).
7. `FinancingBanner` variant="inline" con `source="lp_fence_{county}"`.
8. FAQ corto (4 preguntas: tiempo, HOA, materiales, financiamiento) — link al `/faq` completo de P1-3 cuando exista.
9. Calendly link como secondary CTA.
10. `QuickContactForm` fallback al final.

**Metadata dinámica:**
- `title: "Fence Installation in {County} County, FL | Smooth Fence USA"`
- `description: "Top-rated fence contractor in {County} County — {cities}. Vinyl, aluminum, wood, chain-link. Instant quote + site visit within 24 h."`
- `robots: { index: false, follow: false }`.
- JSON-LD `LocalBusiness` con `areaServed: {County} County`.

**Criterios de aceptación:**
- 5 rutas navegables, pre-renderizadas en build.
- Cada una con metadata + JSON-LD válido.
- Estimator dispara `lead_form_submit` con `utm_content=lp_fence_{county}`.
- `FinancingBanner` con `source` correcto.

**Post-merge (Fede en Google Ads UI):** crear 5 Ad Groups, uno por condado, location target = ese condado, Final URL = su LP, keywords "fence installer {county}", "{city} fence".

---

### Tarea P0-5 — Actualizar KB de Fency con KB bilingüe de Hearth

**Por qué:** hoy el KB de Fency vive en Supabase fila `main` con contenido antiguo. El KB de Lily es el más rico: 63 Q&As en 11 grupos (consolidados en 4 en Hearth) y está **bilingüe EN/ES**. Alinear los dos bots = mensaje consistente + Fency convierte mejor porque responde más y mejor.

**Decisión de Fede 2026-04-19: Opción A ahora, con arquitectura diseñada para que el upgrade a B sea aditivo (no reescribir ni tirar).**

### Política anti-deuda técnica

Opción A se implementa con estas reglas para que cuando hagamos Opción B en el futuro **no haya código que desarmar**:

1. **Source-of-truth del KB vive en git**, no en Supabase.
   - Nuevo archivo versionado: `smoothfence-chatbot/lib/chatbot/knowledge/content/kb.md`.
   - Formato: markdown bilingüe estructurado con headings consistentes por categoría y Q&A (ver estructura abajo).
   - Ventaja: PRs con diff visible, history, rollback fácil, y cuando hagamos Opción B el mismo archivo se parsea a rows de tabla — no hay que inventar fuente nueva.

2. **Script de sync idempotente**, no edición manual en el admin UI.
   - Nuevo: `smoothfence-chatbot/scripts/sync-kb.ts` (Node/TS).
   - Lee `kb.md`, hace `.upsert()` a Supabase fila `main` de tabla `knowledge`.
   - Agregar a `package.json`: `"sync-kb": "tsx scripts/sync-kb.ts"`.
   - Se corre `npm run sync-kb` cuando se edita `kb.md`. Idempotente (no duplica, no daña nada si se corre 2 veces).

3. **Admin UI de Fency queda read-only**, con banner claro.
   - `/admin/knowledge` muestra el contenido actual pero no deja editar.
   - Banner arriba: "📝 El contenido se edita en `lib/chatbot/knowledge/content/kb.md` del repo. Para propagar cambios: `npm run sync-kb`."
   - Evita confusión de "¿por qué mi edit desapareció?" después del próximo sync.
   - Alternativa si romper la edición es molesto: dejar editable pero advertir que cualquier edit se pierde al próximo sync.

4. **NO tocar `loader.ts`, `schema.sql` ni agregar tablas nuevas.**
   - Opción A usa la fila `main` como siempre. El engine actual sigue igual.
   - Regla dura: cero cambios al runtime de Fency en esta tarea.

5. **Cero código "puente" que haya que borrar en Opción B.** El único archivo nuevo en producción es `kb.md` (que se preserva) y `sync-kb.ts` (que cuando exista Opción B se actualiza mínimamente para escribir a las tablas estructuradas en vez de a la fila `main` — no se tira, se edita).

### Estructura de `kb.md`

```markdown
# Smooth Fence USA — Knowledge Base

> Source of truth. Edit this file and run `npm run sync-kb` to propagate to Fency.
> Same content fuels Lily (Hearth) — keep in sync when KB changes.

Last synced: YYYY-MM-DD

---

## About Us

### Q: How long have you been in business? / ¿Cuánto tiempo llevan en el negocio?

**EN:** Smooth Fence USA has been serving Northeast Florida since [year]. We're licensed and insured…

**ES:** Smooth Fence USA atiende el Noreste de Florida desde [año]. Estamos licenciados y asegurados…

### Q: What's your warranty? / ¿Qué garantía ofrecen?

**EN:** 5-year workmanship warranty on all installations…

**ES:** 5 años de garantía de mano de obra en todas las instalaciones…

---

## Services Offered

### Q: Do you do chain-link commercial fencing? / ¿Hacen cercas commercial chain-link?

**EN:** Yes — any height, any linear footage. Common for businesses, storage yards…

**ES:** Sí — cualquier altura, cualquier metraje. Común en negocios, patios de almacenamiento…

(... resto de Q&As ...)

---

## Service Area & Estimates

(... Q&As de condados, agendar visita, qué incluye el quote ...)

---

## Financing & Pricing

(... Q&As de Hearth, por qué no damos precios por teléfono, etc. ...)
```

**Ventaja del formato:** cuando hagamos Opción B, un script de 40 líneas parsea esto a filas: cada `## Heading` → `knowledge_group`, cada `### Q:` → `knowledge_qa` con `question_en`, `question_es`, `answer_en`, `answer_es` extraídos de los bloques **EN:** y **ES:**. No hay que reescribir contenido, solo agregar tablas + actualizar `loader.ts`.

### Implementación (paso a paso para Claude Code)

1. **Leer fuentes:** `HEARTH_KB_paste_v1.1.md` + `memory/hearth.md` (sección del KB) + cualquier otro doc del KB bilingüe. Consolidar en memoria el contenido completo.
2. **Crear `smoothfence-chatbot/lib/chatbot/knowledge/content/kb.md`** con la estructura de arriba y todo el contenido de Lily.
3. **Crear `smoothfence-chatbot/scripts/sync-kb.ts`** que:
   - Lee `kb.md` desde disco (relativo al repo).
   - Lee env vars `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (confirmar nombres exactos con `.env.example`).
   - Hace `supabase.from('knowledge').upsert({ id: 'main', content: fileContent })`.
   - Imprime "✅ KB synced — {N} chars".
4. **Actualizar `smoothfence-chatbot/package.json`:** agregar `"sync-kb": "tsx scripts/sync-kb.ts"` en `scripts`. Instalar `tsx` como devDep si no está.
5. **Correr `npm run sync-kb`** una vez para cargar el contenido en Supabase.
6. **Actualizar `smoothfence-chatbot/app/admin/knowledge/page.tsx`:** hacer el textarea read-only + agregar banner de "source-of-truth en `kb.md`". Si es complejo hacer read-only limpio, al menos agregar el banner de advertencia y dejar la edición como está (será escrituras que se pisan al próximo sync).
7. **Documentar en `CLAUDE.md` del chatbot** (`smoothfence-chatbot/CLAUDE.md` si existe, sino crear una nota): el flujo de edición del KB.
8. **Test manual** antes de mergear:
   - Abrir Fency en staging/prod.
   - Preguntar: "Do you do commercial chain-link?" → debe responder "Yes — any height, any linear footage…".
   - Preguntar: "¿Cuánto cuesta un vinyl de 6ft?" → debe responder "no damos precios por teléfono, ofrecemos visita gratis" (según Guidelines de Lily).
   - Preguntar en ES: "¿Hacen pool enclosures?" → responde en ES según KB (sí vinyl/aluminum/chain-link, no screen enclosures).

**Criterios de aceptación:**
- Existe `kb.md` en el repo con contenido completo bilingüe.
- `npm run sync-kb` funciona y es idempotente.
- Fila `main` en Supabase tiene el contenido sincronizado.
- Admin UI tiene banner o es read-only.
- Tests manuales pasan (3 preguntas clave).
- `loader.ts`, `schema.sql`, y engine sin modificaciones.

**Métrica post-deploy:** ratio `chat_session_with_lead / total_chat_sessions` en Supabase (hoy baseline por medir; mejora esperada +20–35% cuando Fency responde tan rico como Lily).

### Cuando llegue el momento de Opción B (referencia futura)

1. Agregar tablas `knowledge_group` + `knowledge_qa` a `schema.sql`.
2. Escribir parser en `scripts/sync-kb.ts` que además de upsertear el bloque en fila `main` (por compatibilidad), parsea el markdown y puebla las tablas estructuradas.
3. Actualizar `loader.ts` para leer de tablas en vez de fila `main`.
4. Actualizar admin UI para CRUD por Q&A.
5. Deprecar fila `main` (dejar nulleable o borrar cuando se verifique que loader usa las tablas).

**Nota:** los pasos 1–5 son **aditivos**, no destructivos. Nada de lo que se hace en Opción A queda como "código a tirar". El único archivo que se reescribe es `sync-kb.ts` (y aún así el 80% queda).

---

### Tarea P0-6 — QuickContactForm: mensaje opcional

**Por qué:** el form es fallback, no principal, pero cuando se usa no hay razón para pedir mensaje obligatorio. Bajar fricción del safety net no cuesta nada.

**Archivos:**
- `components/forms/QuickContactForm.tsx`

**Cambios:**
1. Quitar `required` del `<textarea>` message (línea ~143).
2. Label → "Mensaje (opcional) / Message (optional)".
3. Placeholder invitador: "Contanos si necesitás algo puntual".
4. Confirmar que `/api/quote` acepta `message` vacío o lo normaliza a `"(sin mensaje)"`.

**Criterio de aceptación:** enviar form con sólo name + phone OK, lead llega al Sheets.

---

## Bloque P1 — Semana 2

### Tarea P1-1 — Promesa "Site visit within 24 h"

**Por qué:** el quote ya es instantáneo (estimador). Lo que falta por comunicar es el timing de la **visita presencial**. Mientras agarramos tracción, prometemos 24 h para que el lead perciba velocidad.

**Archivos:**
- `contexts/translations.ts`
- `components/sections/Hero.tsx`
- Las 3 LPs existentes + las 5 nuevas.

**Cambios:**
1. Banner amarillo slim above-hero en LPs: "⚡ Instant online quote · Site visit scheduled within 24 h".
2. En hero home: agregar sub-line abajo del subheading: "Instant quote online · Site visit within 24 hours".
3. Bilingüe: "Presupuesto online al toque · Visita agendada dentro de las 24 h".

**Criterio de aceptación:** visible above-the-fold en home y LPs. Mobile y desktop.

**Nota:** cuando la empresa tenga más tracción, revisar si el 24 h sigue siendo sostenible o hay que suavizar a "same-week".

---

### Tarea P1-2 — Testimonials con foto + ciudad

**Archivos:**
- Nuevo: `components/sections/TestimonialsCarousel.tsx`
- Nuevo: `lib/testimonials.ts` (name, city, rating, quote, photo_url, project_type).

**Requiere de Fede:** 4–6 reviews reales de Google + foto/inicial. Si no hay fotos, círculos con iniciales + color de marca.

**Dónde:** arriba del estimator/form en LPs y debajo del hero en home.

---

### Tarea P1-3 — FAQ completo del KB de Hearth en la web

**Por qué:** el KB de Lily tiene 63 Q&As bilingües organizadas. Exponerlas en la web responde objeciones, mejora SEO (long-tail queries), y alimenta Fency indirectamente (usuarios que prefieren leer).

**Archivos:**
- Nuevo: `app/faq/page.tsx` + metadata.
- Nuevo: `components/sections/FAQCategory.tsx` (acordeón por categoría).
- Nuevo: `lib/faq.ts` con los Q&As parseados desde el KB, bilingües.
- `contexts/translations.ts` si hace falta.

**Categorías (alineadas con los 4 grupos consolidados de Hearth):**
1. **About Us** — quiénes somos, years in business, licensing, warranty.
2. **Services Offered** — vinyl, aluminum, wood, chain-link, gates, pool enclosures, commercial chain-link, lo que NO hacemos (screen enclosures, gate automation).
3. **Service Area & Estimates** — qué condados, cómo se agenda la visita, qué incluye el quote, tiempo de respuesta.
4. **Financing & Pricing** — Hearth Financing, rangos, por qué no damos precios por teléfono, payment options.

**Cambios:**
1. Claude Code parsea `HEARTH_KB_paste_v1.1.md` (y versión bilingüe) y genera `lib/faq.ts`.
2. `FAQCategory.tsx` con acordeón accesible (keyboard nav, ARIA) — una tarjeta por categoría, Q&As dentro como `<details>` para que el contenido esté en HTML plano (los crawlers y LLMs leen `<details>` como texto expandido, los acordeones pintados con JS no siempre).
3. `/faq` con header + 4 secciones + CTA "Still have questions? Chat with Fency / Call / Free estimate".

**Decisión de Fede 2026-04-19: SEO + AEO (Answer Engine Optimization) para que IAs externas (ChatGPT, Perplexity, Google SGE, Claude.ai, Gemini) prioricen e indexen el sitio.** Entonces el `/faq` tiene que cumplir doble propósito: SEO clásico + GEO/AEO.

**Checklist de SEO + AEO para `/faq`:**
- `robots: { index: true, follow: true }` — explícito público e indexable.
- `<link rel="canonical">` a `smoothfenceusa.com/faq`.
- Metadata: `title` + `description` optimizadas (incluir "fence FAQ", "fence installation questions Florida", nombres de condados).
- JSON-LD `FAQPage` completo con cada Q&A tipado `Question` / `Answer` — dispara rich results en Google y es la señal #1 que leen agentes IA externos para entender estructura.
- JSON-LD `BreadcrumbList` para la navegación.
- Cada Q&A con `<h3>` para la pregunta (no `<button>`) — crawlers ponen peso en headings.
- Respuestas escritas **self-contained**: cada respuesta tiene sentido leída sola, sin contexto de la anterior (los LLMs citan respuestas sueltas, no párrafos).
- Respuestas empiezan con la conclusión ("Sí, ofrecemos financiamiento a través de Hearth..."), no con rodeo — formato compatible con cómo Perplexity/SGE citan.
- Primera oración de cada respuesta ≤ 30 palabras (snippet-friendly).
- Mencionar el nombre de la empresa y los condados servidos dentro de las respuestas clave, no solo en la metadata (los LLMs construyen contexto desde el texto visible).
- Tablas con datos estructurados (ej. tabla de condados + cities) — agentes IA las parsean bien.
- Anchors estables: `#about-us`, `#services-offered`, `#service-area-estimates`, `#financing-pricing` + uno por Q&A.
- `sitemap.xml` lista `/faq`.
- **`llms.txt` en raíz del dominio** (convención emergente para guiar a LLMs): resumen del negocio + links a las páginas prioritarias (`/`, `/faq`, `/services`, `/financing`, las 5 LPs por condado).

4. En LPs, dejar FAQ corto (4 preguntas) + cada una linkea a `/faq#{anchor}` para que el visitante y el crawler lleguen al FAQ completo.

**Criterios de aceptación:**
- `/faq` navegable, accesible (teclado + screen reader).
- Bilingüe EN/ES via `useLanguage`.
- Rich Results Test: `FAQPage` válido, detectado como eligible para rich results.
- GA4 event `faq_open` por apertura de Q&A.
- `llms.txt` accesible en `smoothfenceusa.com/llms.txt`.
- Smoke test: pedir a un crawler como `curl -A "GPTBot"` o `curl -A "PerplexityBot"` → el HTML devuelve el contenido de las Q&A en texto plano (no requiere JS).

---

### Tarea P1-4 — Exit-intent modal

**Archivos:**
- Nuevo: `components/ExitIntentModal.tsx`.
- Nuevo: `public/guides/fence-guide-florida.pdf` (Fede/Claude genera).
- Nuevo: `/api/guide-request`.

**Trigger:** mouseleave viewport por arriba (desktop); scroll-up rápido (mobile).

**Oferta:** email-only → guía gratis "Cómo elegir la cerca correcta en Florida". Email al Sheets con `source: exit_intent`.

**UX:** máx 1 vez por sesión (localStorage). Cerrable. No bloquea contenido.

---

### Tarea P1-5 — Tracking de click en tel/sms/WhatsApp

**Archivos:**
- `components/layout/Header.tsx`, `components/layout/Footer.tsx`
- `components/ui/FloatingButtons.tsx`
- `app/financing/FinancingClient.tsx`, `app/contact/page.tsx`, `app/gallery/GalleryClient.tsx`, `app/estimator/EstimatorClient.tsx`

**Cambios:** `onClick` que dispara:

```ts
window.dataLayer?.push({
  event: "phone_call_click" | "sms_click" | "whatsapp_click",
  source: "header" | "footer" | "floating" | "hero" | "financing" | ...,
});
```

Crear 3 conversions en GA4 + importar a Google Ads como **Secondary** (no Primary — decisión previa).

---

### Tarea P1-6 — Fency: visibilidad mobile + auto-open tuning

**Por qué:** el auto-open a 5 s funciona en desktop; en mobile puede ser agresivo o taparse con el sticky FloatingButtons. Verificar UX y ajustar.

**Archivos:**
- `smoothfence-chatbot/components/ChatWidget.tsx`
- Reconfirmar `AUTO_OPEN_MS = 5000`.

**Cambios:**
1. Screenshot del chat widget en mobile 390×844 con `FloatingButtons` visible → decidir si convive o si el widget colapsa a icono hasta tap.
2. Si el auto-open en mobile es invasivo, subir a 15 s o disable en mobile (solo abrir con tap).
3. Si el icono de Fency se tapa con FloatingButtons, reposicionar Fency a `bottom-6 right-6` y FloatingButtons a `bottom-6 left-6` (si no lo están ya).

---

## Bloque P2

### P2-1 — Core Web Vitals
Lighthouse + PSI. Foco: `hero-fence-optimized.jpg` (LCP), estimator altura variable (CLS), framer-motion en mobile (INP).

### P2-2 — Retargeting Google Ads
Audience Website Visitors 30 d → campaña PMax separada apuntando a `/lp/free-estimate`, budget $5–10/día.

### P2-3 — A/B test framework
Vercel Edge Config + GA4 `experiment_variant`. Primer test: hero headline actual vs variante con offer explícito.

---

## Google Ads — qué hacer después de P0

1. **Aceptar 2 recs baratas:** Sitelinks (4 apuntando a `/services`, `/gallery`, `/financing`, `/lp/free-estimate`) + PMax Ad Strength.
2. **Ignorar:** Video asset + Customer Match ×2.
3. **Subir presupuesto:** $6.50/día → **$25/día**.
4. **Después de P0-4:** 5 Ad Groups nuevos (uno por condado) con location target + Final URL + keywords geo.
5. **Watch 14 días:** Primary conv, CPA, Quality Score.

---

## Memoria — protocolo

Al cerrar cada tarea:
- Mark done en `memory/pending-tasks.md`.
- Si cambió el estado de un sistema, actualizar `memory/status-snapshot.md` + archivo temático (`hearth.md`, `recepcionista-ia.md`, etc.).
- Métrica post-deploy: anotarla en el archivo temático + `lead-conversion.md` si aplica.

---

## Instalación de Claude Code en este repo

### 1. Instalar

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Alternativa: `brew install --cask claude-code` (updates manuales con `brew upgrade`).

### 2. Autenticación

```bash
cd ~/Projects/smoothfenceusa
claude
```

Browser para login con cuenta Claude (Pro / Max / Team / Enterprise / Console). Credenciales persisten.

### 3. Detecta `CLAUDE.md` automáticamente

Sí. Lee la raíz y todo lo que referencie (incluido `memory/`).

### 4. Modos

Interactivo: `claude`.
One-shot: `claude "ejecuta Tarea P0-1 de PLAN_CLICK_TO_LEAD_2026-04-19.md"`.

### 5. Flags útiles

`-p` / `--print`: no-interactive + imprime + sale.
`-c`: continúa la última conversación del directorio.
`-r`: reanuda sesión anterior.

### 6. Permisos

Aprobación por cambio (no por repo). Podés activar "Accept all" en sesión cuando ya revisaste el plan.

---

## Flujo "Cowork manda, Claude Code ejecuta"

```
Cowork (yo) → plan + memoria
    ↓
Fede (vos) → claude "ejecuta Tarea P0-X"
    ↓
Claude Code → branch + cambios + tests + PR
    ↓
Fede → revisa, mergea
    ↓
Cowork → actualizo memoria, apunto siguiente
```

**Prompts recomendados:**

```
# conservador (diff antes de commit)
claude "leé Tarea P0-1 de PLAN_CLICK_TO_LEAD_2026-04-19.md.
mostrame el diff antes de aplicarlo. no commit hasta que te diga 'dale'."

# autónomo
claude "ejecutá Tarea P0-1 de PLAN_CLICK_TO_LEAD_2026-04-19.md.
crea branch, hacé el cambio, corré tests, abrí PR."

# lote
claude "ejecutá P0-1, P0-2 y P0-6 en orden.
un PR por tarea. parala si algún test falla."
```

---

## Criterio de éxito (2 semanas post-P0, $25/día)

| Métrica | Hoy | Objetivo |
|---|---|---|
| Primary conv (`lead_form_submit`) | 1 / 30 d | **≥10 / 30 d** |
| CPA | $77 | **≤$30** |
| Conv rate Ads | <2% | **≥5%** |
| `phone_call_click` + `sms_click` | 0 | **≥20 / 30 d** |
| Hearth funnel (Starts/Completes/Qualified) | 14/0/0 | **≥30/6/2** |
| Fency sessions with lead | baseline TBD | **+25%** |

Si no se mueven, ajustamos en P1/P2.
