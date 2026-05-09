# Go-Live Checklist — Stripe Test → Live

**Status: ✅ EXECUTED 2026-05-05.** Smooth Fence USA is now in Stripe Live mode. This document is preserved as the procedural record of what was done plus the remaining post-live items.

---

## Pre-flight (1-2 días antes)

- [x] **Cuenta Stripe Live activada.** Activated por Fede antes de hoy. Identity verification + bank account confirmados.
- [ ] **Stripe Tax decisión.** ⏳ Aún pendiente. Decidir si activar Stripe Tax para FL (sales tax automático en checkout). No bloqueó el go-live; se puede activar más adelante sin downtime.
- [ ] **Refund policy documentada.** ⏳ El doc interno todavía no se redactó. La página `/terms` existe pero no tiene la política específica de cancelación con porcentajes por ventana de tiempo. Tarea pendiente — no bloqueó el go-live.
- [ ] **Legal:** Términos y Privacy linkeados desde Stripe Checkout. Hay 3 toggles en Stripe Dashboard → Settings → Payments → Checkout and Payment Links → Store policies (Refund/Return, Legal, Contact info) que activan esto automáticamente. Pendiente activarlos — requiere antes llenar Stripe → Settings → Public details con business info y URLs (terms, privacy).
- [x] **Vercel env vars de prod listas.**

## Env var swap (día del go-live) — ✅ COMPLETADO 2026-05-05

En el proyecto de Vercel (Production environment):

- [x] Rotar `STRIPE_SECRET_KEY`: `sk_test_*` → `sk_live_*`
- [x] Rotar `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: `pk_test_*` → `pk_live_*`
- [x] `STRIPE_WEBHOOK_SECRET` actualizado con el `whsec_*` del webhook Live nuevo
- [x] `RESEND_API_KEY` — sin cambios; ya era prod
- [x] `LEADS_TO_EMAIL` — sin cambios; apunta a la casilla owner correcta
- [x] `EMAIL_FROM = no-reply@mail.smoothfenceusa.com` — DNS verificado
- [x] `GOOGLE_SHEETS_WEBHOOK_URL` — sin cambios; es el sheet de prod
- [x] `NEXT_PUBLIC_SITE_URL = https://smoothfenceusa.com`

## Crear webhook Live en Stripe Dashboard — ✅ COMPLETADO 2026-05-05

1. [x] Stripe Dashboard toggle en **Live**.
2. [x] Developers → Webhooks → "Add endpoint" (Fede recreó — el webhook anterior era Test, no aplica en Live).
3. [x] Endpoint URL: `https://smoothfenceusa.com/api/webhooks/stripe`
4. [x] Events: `checkout.session.completed`
5. [x] Signing secret copiado.
6. [x] Pegado en Vercel como `STRIPE_WEBHOOK_SECRET` (Production).
7. [x] Redeploy disparado desde Vercel UI (banner "Redeploy" tras update de env vars). Build Ready en 52s.

## Deploy + smoke tests — ✅ COMPLETADO 2026-05-05

- [x] Redeploy de Production desde Vercel UI con la última config (commit `ec85afc`).
- [x] `/pay` ya no muestra el banner "MODO DE PRUEBA" — confirma que `pk_live_*` está activo en runtime.
- [x] Verificación intermedia vía Chrome MCP: click en Pay redirigió a `checkout.stripe.com/g/pay/cs_live_...` — el prefix `cs_live_` confirma que el server creó la session en Live mode con `sk_live_*`.
- [x] **Smoke test real con $50** (el form tiene mínimo $50, no $1):
  - [x] Stripe Dashboard (Live) muestra el pago como `succeeded`.
  - [x] Email de confirmación llegó a la casilla del cliente.
  - [x] Email owner llegó a `LEADS_TO_EMAIL`.
  - [x] Row en Google Sheets CRM con `stripeSessionId` real.
  - [x] `/pay/success` se mostró con la fecha de install correcta.
- [x] **Refund del smoke test** desde Stripe Dashboard (Live → Payments → Refund).

## Métodos de pago activados en `Default · Your account` (`pmc_1TK2viGz5Po3HwNjH4sshnP8`) — 2026-05-05

Activados durante la sesión:
- ✅ **Affirm** (newly enabled) — BNPL clave para proyectos $1k-$10k+. Stripe muestra el badge "as low as $X/mo" automáticamente en checkout.
- ✅ **Afterpay / Clearpay** (newly enabled) — pay in 4 sin interés, US/Canada.
- ✅ **Google Pay** (newly enabled) — necesario para conversion en Android mobile.

Ya estaban activos:
- ✅ Cards (Visa/MC/Amex), Apple Pay, Cash App Pay, Amazon Pay, Link, Klarna.

Métodos regionales irrelevantes para US (Bancontact, BLIK, EPS, Pix, Multibanco, Cartes Bancaires Pending, etc.) están en estado mixto pero no afectan al cliente US — Stripe los oculta automáticamente.

Métodos correctamente desactivados: Stablecoins/Crypto, ACH Direct Debit, Bank Transfers, Sunbit, Zip, todos los métodos asiáticos (Alipay, WeChat, Kakao, Naver, PAYCO, Samsung Pay).

## DocuSign Payments config aparte

Stripe Dashboard también muestra una segunda configuración: `Default · DocuSign Payments account` (`pmc_1TTnGiGz5Po3HwNjTQZuG3in`). Esa la creó la integración con DocuSign para sus propios cobros (firmas + pago). **No tocar** — es separada del `/api/checkout` del sitio.

---

## Monitoreo post-go-live (primera hora) — ⏳ PENDIENTE

Hacer en las próximas 1-3 horas si llega tráfico:

- [ ] Mantener abierto Stripe Dashboard (Live → Payments) durante 1h.
- [ ] Vercel logs en vivo: `vercel logs --follow` para capturar cualquier 500 en `/api/checkout` o `/api/webhooks/stripe`.
- [ ] Si aparece un real customer:
  - [ ] Verificar que el pago está `succeeded` en Stripe.
  - [ ] Verificar que ambos emails (customer + owner) llegaron.
  - [ ] Verificar row en Sheets CRM.
  - [ ] Dar seguimiento manual por WhatsApp al customer dentro de 15 min.

## Día 1 post-live — ⏳ PENDIENTE

- [ ] **Mobile real test** — abrir `/pay` en iPhone real → confirmar que aparece Apple Pay button en Stripe Checkout. Abrir en Android (Chrome) con tarjeta guardada → confirmar Google Pay button. Si no aparecen, verificar Stripe Dashboard → Settings → Payment method domains que `smoothfenceusa.com` esté registrado y validado.
- [ ] Revisar Stripe → Disputes dashboard. Debería estar vacío.
- [ ] Checkear que los emails no caen en spam (mandar test a 3 cuentas: Gmail, Outlook, iCloud).
- [ ] Activar 3 toggles en Stripe → Settings → Payments → Checkout and Payment Links → Store policies (Refund/Return, Legal policies, Contact info). Requiere primero llenar Public details (business info + URLs de terms/privacy).

## Semana 1 — ⏳ PENDIENTE

- [ ] Revisar conversion funnel en GA4: `begin_checkout` → `purchase`. Cross-reference con Stripe para detectar sesiones abandonadas.
- [ ] Verificar que `lib/track.ts` empuja el evento `purchase` a GTM/GA4 cuando el webhook `checkout.session.completed` corre. Si no aparece en GA4 Realtime durante un pago real, hay que arreglar el wire-up.
- [ ] Empezar items P1 del reporte de sandbox (ver `docs/sandbox-test-report-2026-04-20.md`, items 5-12). Los más valiosos: #5 context en `/pay` para visitantes directos, #7 delay del Fency widget en rutas de conversión, #8 sacar PII del query string, #11 enriquecer metadata de Stripe Session.
- [ ] Decidir si activar Stripe Tax para FL.
- [ ] Decidir si publicar refund policy detallada en `/terms`.
- [ ] Si hubo 3+ pagos exitosos: consolidar aprendizajes en una reunión corta Fede + Claude.

## Rollback plan (si surge un incidente serio)

- [ ] En Vercel env vars: revertir `STRIPE_SECRET_KEY` y `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` a los valores `sk_test_*` / `pk_test_*`. Las keys Test originales todavía existen en Stripe — están en Developers → API keys con el toggle en Test.
- [ ] Redeploy desde Vercel UI.
- [ ] En Stripe Dashboard (Live): disable el webhook endpoint (no hace falta borrarlo).
- [ ] Para customers que hayan pagado en la ventana defectuosa: manual refund + disculpa por WhatsApp + agendar visita gratis.
- [ ] Post-mortem en `docs/incidents/YYYY-MM-DD-go-live-rollback.md`.

---

## Contactos de emergencia

- **Stripe Support:** https://support.stripe.com (24/7 chat para cuentas activas).
- **Vercel Status:** https://www.vercel-status.com.
- **Resend Status:** https://status.resend.com.
- **Google Apps Script Status:** https://www.google.com/appsstatus.

---

*Última ejecución: 2026-05-05 (go-live exitoso). Próxima revisión: cuando se active Stripe Tax o se publique refund policy oficial.*
