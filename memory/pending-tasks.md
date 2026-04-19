# Tareas pendientes — Smooth Fence USA

_Última actualización: 2026-04-19 ~22:00 ET. P0-6 mergeado (PR #3, commit `f33c2ec`). P0-1 en review (PR pending). **Próximo en cola: P0-2 (Trust bar en hero home).**_

> 🎯 **Fuente de verdad para las próximas 2-3 semanas:** `PLAN_CLICK_TO_LEAD_2026-04-19.md`.
> Ver `AUDIT_2026-04-19.md` para el informe completo del audit previo.
> ~~Ver `CONTINUAR_MANANA_2026-04-20.md`~~ → release cerrado 2026-04-19, handoff obsoleto.

---

## 🎯 Plan clic→lead v2 — bloque P0 (prioridad inmediata)

Detalle completo en `PLAN_CLICK_TO_LEAD_2026-04-19.md` (v2, ajustado post-feedback de Fede). Un PR por tarea vía Claude Code.

- [ ] **P0-2** — Trust bar en hero home (license + rating + years + counties). **← siguiente en cola**
- [ ] **P0-3** — Payment Calculator Hearth en `/financing` (ataca 14 Loan Starts / 0 Completes).
- [ ] **P0-4** — 5 LPs por condado `app/lp/fence-[county]` con estimator principal.
- [ ] **P0-5** — Actualizar KB de Fency con KB bilingüe de Hearth (Opción A: upsert a fila `main`).
- [/] **P0-1** — Estimador como convertidor primario en hero + LPs. **In review** — branch `feat/p0-1-estimator-primary-cta`, PR pending. Cambios: hero home Calendly label "Schedule" → "Schedule site visit"; LPs (`/lp/free-estimate`, `/lp/vinyl-fence`, `/lp/aluminum-fence`) ahora abren con `<EstimatorClient inline />` arriba, `QuickContactForm` baja como fallback. Hero home queda con estimator embebido a la derecha (ya estaba).
- [x] **P0-6** — QuickContactForm: mensaje opcional. ✅ Mergeado 2026-04-19, PR #3, commit `f33c2ec`. `requiredFields` en `/api/quote` ya no incluye `message`; empty se normaliza a `"(sin mensaje)"`. Form: textarea sin `required`, label "Mensaje (opcional) / Message (optional)", placeholder bilingüe nuevo.

**Tarea cancelada:** P0-3 v1 (sticky CTA mobile) — ya existe `FloatingButtons` con SMS+WhatsApp.

**Después de P0:** aceptar recs Google Ads (Sitelinks + PMax Ad Strength) + subir budget $6.50 → **$25/día** + crear 5 Ad Groups por condado.

## 🎯 Plan clic→lead v2 — bloque P1 (semana 2)

- [ ] **P1-1** — Promesa "Site visit within 24 h" (mientras agarramos tracción; el quote ya es instantáneo via estimador).
- [ ] **P1-2** — Testimonials con foto + ciudad above estimator.
- [ ] **P1-3** — FAQ completo del KB de Hearth en `/faq` por 4 categorías (About Us, Services, Service Area & Estimates, Financing) + JSON-LD FAQPage.
- [ ] **P1-4** — Exit-intent modal con email + guía PDF.
- [ ] **P1-5** — Tracking de click en `tel:` / `sms:` / WhatsApp.
- [ ] **P1-6** — Fency mobile: auto-open tuning + posición vs FloatingButtons.

## 🎯 Plan clic→lead v2 — bloque P2 (después)

- [ ] **P2-1** — Core Web Vitals (LCP/CLS/INP).
- [ ] **P2-2** — Retargeting Google Ads (audience 30 d).
- [ ] **P2-3** — A/B test framework (Vercel Edge Config + GA4).

---

Formato: `[ ]` pendiente · `[/]` en curso · `[x]` completado

---

## 🔎 Audit 2026-04-19 PM (Lily + Financing Web Tools + Google Ads)

### Hallazgos clave

- **Lily NO está "en draft" — ya atiende llamadas reales** desde el número (386) 261-6512. Dashboard Hearth 30-day: 4 llamadas atendidas, 1 spam filtrada, 4 nuevos leads, 2 citas agendadas. Transcripts vistos: Laura Ramírez (vinyl repair, 18-Apr), Federik Correa ×2 (wooden estimate, 17-Apr con cita Mon 4:30 PM).
- **KB real = 4 grupos (no 11)**: About Us · Services Offered · Service Area & Estimates · Financing & Pricing. Memoria anterior decía 11 — consolidado. Goals & Questions con 11 preguntas. Guidelines completas. SMS automático post-llamada con link al estimador. Los 3 toggles (Scheduling · Offer Financing · Recording Disclaimer) **ya están ON** (mal interpretado antes como OFF).
- **Closing mejorada:** "Thanks for calling Smooth Fence USA! We've sent a text to your phone with our estimator link so you can get a quick quote. Have a great day!" (antes solo "Thanks for calling... have a great day").
- **14 Loan Starts / 0 Completes / 0 Qualified / 0 Funds** en dashboard Hearth tras <24h del deploy del `FinancingBanner`. Tráfico confirmado pero abandono temprano en funnel.
- **Google Ads (30-day):** "Get a Free Estimate Today" PMax, $6.50/día → 2,194 impr · 66 clicks · CTR 3.01% · CPC $1.17 · $77.06 costo · **1 Primary conv + 1 Secondary** · CPA $77 · opt score 87.3%. 5 recs abiertas: Sitelinks, Ad Strength (PMax asset groups), Video asset, Upload Customer Match, Use conversion data for CM.
- **Financing Web Tools dashboard** (`/dashboard/marketing/financing-web-tools`) ofrece: offer link (ya usado), 4 banners pre-hechos (700×110 / 310×120 / 310×310 / 310×610), **Payment Calculator widget interactivo**, copy pre-escrito. Ver sección de plan abajo.

### Plan propuesto (esperando confirmación explícita de Fede)

- [ ] **#62 — Aceptar recs baratas de Ads** (Sitelinks + PMax asset strength). Score 87.3% → ≥90% esperado. No toca presupuesto.
- [ ] **#63 — Decidir nuevo presupuesto de Ads** (actual $6.50/día). Fede dará monto exacto. Target razonable: ≥$20/día para tener suficiente señal.
- [ ] **#61 — Integrar Hearth Payment Calculator widget en `/financing`** como complemento al CTA existente. Opcionalmente añadir copy pre-escrito ("Loan amounts up to $250,000 · Funding within 1-3 days · No prepayment penalties"). NO tocar banners pre-hechos de Hearth (nuestro `FinancingBanner` custom es mejor-brandeado).

### Estado de Hearth Pay™

- Fede **ya envió correo a Hearth Support** (2026-04-19 ~mañana). Esperando respuesta. Plan B sigue con Stripe.

---

## ✅ Release 2026-04-19 — Hearth Financing Web Tools + SEO multi-condado (CERRADO)

- [x] **PR #2 mergeado a main.** Commit `c6c6de1` en main, +22 deltas.
- [x] **Deploy a prod** disparado por Vercel automático tras el merge. Live en ~1-2 min.
- [x] **Smoke tests sobre smoothfenceusa.com (9/9 ✓):**
  - [x] `/financing` → CTA "Apply with GetHearth" activo · URL merchant-specific con UTM · `target="_blank"` + `rel="noopener noreferrer"`.
  - [x] Home (`/`) → banner `large` con "FINANCING AVAILABLE" + "$417/mo" + `utm_content=home`.
  - [x] `/services` → banner `inline` con `utm_content=services_page`.
  - [x] `/lp/free-estimate` → banner `inline` con `utm_content=lp_free_estimate`.
  - [x] `/lp/vinyl-fence` → banner `inline` con `utm_content=lp_vinyl_fence`.
  - [x] `/lp/aluminum-fence` → banner `inline` con `utm_content=lp_aluminum_fence`.
  - [x] SEO multi-condado: meta description home menciona los 5 condados · JSON-LD `areaServed` con 5 `AdministrativeArea` · `addressLocality: "Palm Coast"` preservado.
  - [x] Rich Results Test: "No items detected" (esperado: `FencingContractor`/`LocalBusiness` no genera rich results per Google).
  - [x] Schema Markup Validator (schema.org): `FencingContractor` detectado, 5 condados, sin errores.
  - [x] ES bonus: switch a Español renderiza "FINANCIAMIENTO DISPONIBLE / Tu cerca desde $417/mes / Precalifica en 60 segundos".
- [x] **Rama remota borrada** via GitHub UI (botón "Delete branch" post-merge).

## ✅ Cleanup local — completado 2026-04-19 ~15:30 ET

Fede ejecutó la limpieza desde `~/Projects/smoothfenceusa`:

- [x] Destrabado `.git/index.lock` + `.git/HEAD.lock` con `rm -f` (el sandbox los re-generaba cada vez que Claude corría un git desde allá).
- [x] `git reset HEAD` → índice sincronizado con HEAD, working tree clean.
- [x] `git checkout main` → main local en `25eaef2` (merge commit de PR #2), alineado con `origin/main`.
- [x] `git branch -D feat/hearth-financing-seo-multicounty` → rama local borrada (estaba en `25eaef2`).
- [x] `git push origin --delete feat/...` devolvió "remote ref does not exist" → GitHub auto-borró la rama remota cuando Fede la re-pusheó esta mañana (auto-delete-head-branches detectó que el SHA ya estaba en main).
- [x] Eliminados `tsconfig.check.json` y `tsconfig.check.tsbuildinfo`.
- [x] `git branch -a | grep feat/hearth` → "branch gone ✓".
- [x] Verificado log: HEAD → main → origin/main → origin/HEAD todos en `25eaef2`. Tag `v1.0-pre-hearth` + backup branch preservados en `0990a7f`.

**Lección capturada:** si Claude corre comandos git desde el sandbox mientras Fede tiene el repo abierto, se generan locks cruzados. En adelante Claude solo hace lecturas (`git log`, `git status`, `git diff`) desde el sandbox; cualquier `git reset`/`checkout`/`branch` lo pide a Fede.

## 🔴 Inmediato (este fin de semana)

- [x] **Fase 0 — Backup pre-Hearth.** Cerrada 2026-04-19 01:39 ET (§12 firmada). Incluye: tag `v1.0-pre-hearth`, branch de seguridad, export GTM, copia del CRM (Sheets), screenshots Ads/GA4, export Calendly y Rosie.
- [ ] **Llamar a Hearth Support por Hearth Pay™ declined.**
  - Subtarea opcional: pedirle a Claude la nota con puntos a cubrir antes de la llamada (respuesta a Q4 que quedó abierta en la sesión `local_cca08659`).

## 🟠 Siguiente (tras backup)

- [x] **Fase 1 — Setup Voice AI en Hearth ("Lily") — completado 2026-04-18.**
  - ✅ Voice: Female Voice 1.
  - ✅ Welcome + Closing Message (EN).
  - ✅ KB cargado: 11 grupos, 63 Q&As (EN only), guardado y verificado tras reload.
  - ✅ Goals & Questions (10 campos del KB v1.1).
  - ✅ Guidelines (identity + escalation + pricing + closing).
  - ✅ Call routing / escalation.
  - ✅ Language detection + business hours.
  - 📋 Falta todavía: Scheduling event types, team/timezone, QuickBooks OAuth, templates de email/SMS follow-up.
- [ ] **Completar resto de Fase 1 (fuera de AI Agent Config).**
  - ~~Scheduling → replicar event types del Calendly actual~~ → **descartado 2026-04-18**: Hearth no tiene public booking URL. Decisión A (híbrido): Calendly queda en el sitio, Hearth queda interno. Ver `CALENDLY_HEARTH_DECISION_2026-04-18.md`.
  - Team, timezone, integraciones (QuickBooks OAuth — Fede termina el login).
  - Template de email/SMS follow-up.
- [ ] **Fase 2 — 6 test calls + validación antes de activar Lily.**
- [ ] **Suscribir feed `.ics` de Hearth en Google Calendar** (ver instrucciones en `CALENDLY_HEARTH_DECISION_2026-04-18.md`).
- [ ] **Verificar sync Hearth → GCal** con un evento de prueba.

## 🆕 Detectados en el audit del 2026-04-19 — ejecutados 2026-04-19

- [x] **Activar CTA de GetHearth en `/financing`.** Reemplazado `url: "#hearth"` por la URL merchant-specific `https://app.gethearth.com/partners/smooth-fence-usa/federico/apply` con UTM params; eliminada rama "coming soon"; CTA abre en nueva pestaña (`target="_blank"`).
- [x] **Integrar Hearth Financing Web Tools en páginas clave.** Creado componente reusable `components/sections/FinancingBanner.tsx` (variantes `large`/`inline`, bilingüe EN/ES, UTM-tracked). Insertado en:
  - Home `app/page.tsx` — variant `large`, entre WhyChooseUs y ServiceArea.
  - `/services` — variant `inline`, entre ServicesSection y ServicesFAQ.
  - `/lp/free-estimate` — variant `inline`, tras QuickContactForm.
  - `/lp/vinyl-fence` — variant `inline`, entre benefits y QuickContactForm.
  - `/lp/aluminum-fence` — variant `inline`, entre benefits y QuickContactForm.
- [x] **SEO multi-condado.** Palm Coast → Flagler · Volusia · St. Johns · Duval · Putnam en:
  - Metadata root (`app/layout.tsx` title + description) + JSON-LD `areaServed` expandido a 5 `AdministrativeArea`.
  - Metadata por página (10 archivos): home, about, services, hoas-permits, contact, gallery, financing, 3 LPs.
  - `lib/translations.ts` — 10 strings EN + 10 ES (hero tagline, trust experience, serviceArea sub, contact location, footer tagline, services tagline/heading/FAQ, about p1, hoa intro).
  - Footer, GalleryClient copy, Hero alt-text.
  - Dejados tal cual: JSON-LD `addressLocality: "Palm Coast"` (postal sede real), `gallery/data.ts` (tags por proyecto), email receipts (`api/webhooks/*`, `api/estimator/*`).
- [ ] **Watch GA4 503.** Revisar si el endpoint `g/collect` sigue devolviendo 503 en los próximos audits diarios.
- [x] **Commit + push rama `feat/hearth-financing-seo-multicounty`.** Completado 2026-04-19 — commit `c6c6de1` creado desde sandbox, push local hecho por Fede tras liberar `.git/index.lock`.
- [x] **Crear PR en GitHub.** Completado 2026-04-19 — PR #2 abierto: https://github.com/fricox/smoothfenceusa/pull/2 · `main ← feat/hearth-financing-seo-multicounty` · 1 commit · 19 files · +227/-66 · body con Summary + Test plan.

## 🟡 Abierto — decisiones de producto

- [ ] **Definir dirección de Track B.** Fede dijo "aun no" en `local_9a05ef77`. Opciones sobre la mesa:
  - A) Lanzar campañas de Google Ads reales.
  - B) Automatización y CRM avanzado.
  - C) Expansión del sitio (más landing pages, blog SEO, galería).
  - D) Escalar Fency (agendar en Calendly, estimados preliminares, follow-up frío).
  - **Nota:** También queda pendiente confirmar si el **Preview Lab** diseñado en Phase 4 (`smoothfence-preview-lab-*.md`) sigue siendo Track B o se archiva.

- [ ] **Clarificar "actualizar la base de datos de la recepcionista IA".**
  - ¿Se refiere a la KB de Lily en Hearth (pegar KB)? ¿O a la KB de Fency en Supabase (editar vía panel admin)?

## 🟢 Marketing y crecimiento

- [ ] **Organizar la campaña de ads.**
  - Estado actual: solo $6.50/día, 0 leads reales aún, ad strength poor.
  - Por definir: CPA objetivo, escalado de presupuesto, canales (Google / Meta / TikTok), creatividades nuevas, segmentación.
  - Ver estado de tracking en `memory/lead-conversion.md`.

- [ ] **Crear páginas de redes sociales.**
  - Plataformas por definir: IG, FB, TikTok, YT, LinkedIn.
  - Por definir: handle, branding, post inicial, calendario.

- [ ] **Plan para cerrar ≥1 lead/día.**
  - Definir: fuentes de lead, SLA de respuesta, guion de cierre, seguimiento.
  - Input: métricas vigentes de `lead-conversion-audit-2026-04-16.md`.

## 🔵 Monitoreo pasivo

- [/] **Scheduled task `lead-conversion-audit`** corriendo diario 9:05 AM ET.
  - Desactivar cuando llegue el primer `lead_form_submit` real limpio.

---

## Completados recientes (para contexto — no borrar)

- [x] Track A — pipeline de atribución desplegado en producción (ver `memory/track-a-b.md`).
- [x] Fency — chatbot LIVE, leads fluyendo a Sheets.
- [x] Google Business Profile — fotos, horarios, reseñas.
- [x] Arquitectura de conversiones Google Ads limpia (único Primary = `lead_form_submit`).
- [x] Calendly "Free Fence Estimate" configurado (Eastern locked, teléfono required, dirección required).
- [x] KB de Hearth v1.1 bilingüe finalizado (`HEARTH_KB_paste_v1.1.md`).
- [x] Diseño Track B locked (18 decisiones D-01 a D-18 en 3 docs).

---

## 🔧 Tech debt detectada (no urgente)

- **Hardcoded English en hero dark de las 3 LPs** — detectado en P0-1. Las LPs `/lp/*` tienen tagline + H1 + sub hardcodeados en EN, sin pasar por `useLanguage()`. Migrar a `tr.lp.*` cuando se haga P0-4 (que va a tocar ese pattern de todas formas para los 5 condados nuevos). Archivos:
  - `app/lp/free-estimate/page.tsx:18-26` — "Limited-Time Offer", "Get Your Free Fence Estimate Today", sub "No obligation, no pressure...".
  - `app/lp/vinyl-fence/page.tsx:18-26` — "#1 Choice in Northeast Florida", "Vinyl Fence Installation", sub "Zero maintenance...".
  - `app/lp/aluminum-fence/page.tsx:18-26` — "Elegant & Durable", "Aluminum Fence Installation", sub "Rust-proof, pool-code compliant...".
  - `app/lp/vinyl-fence/page.tsx:33-55` y `app/lp/aluminum-fence/page.tsx:33-55` — los 4 benefit cards también en EN hardcoded.

## Notas / ideas sueltas

(Agregar aquí cualquier cosa suelta que surja antes de priorizarla.)
