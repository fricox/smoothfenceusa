# Handoff — 2026-05-05 — Stripe Go-Live ejecutado

**Estado al cierre:** Stripe Live mode activo y validado end-to-end con $50 reales. Site acepta pagos reales desde hoy.

---

## Lo que se hizo en la sesión

### Migración Stripe Test → Live (1.5h)

Punto de partida: Fede ya había cambiado el toggle del Stripe Dashboard a Live, pero los pagos del sitio seguían cayendo en sandbox. Diagnóstico: las env vars en Vercel todavía eran Test (`sk_test_*`, `pk_test_*`).

**Acciones:**

1. **Auditoría de env vars** (vía Chrome MCP en Vercel) — confirmé que `STRIPE_SECRET_KEY` era `sk_test_51TK2vJKBCj4bg5k99kdLCeDJhv0NYD9MFMPDUxkYMpIPnRQK...` y los tags "Needs Attention" en STRIPE_SECRET_KEY y STRIPE_WEBHOOK_SECRET. La publishable key ya estaba en `pk_live_*` (banner TEST MODE en `/pay` ya estaba oculto).

2. **Webhook Live recreado en Stripe** — Fede creó un nuevo endpoint en Stripe Live (Developers → Webhooks → Add endpoint) apuntando a `https://smoothfenceusa.com/api/webhooks/stripe` con event `checkout.session.completed`. El webhook anterior (`whsec_Hfk4vpf7k7CcKB2Ea7Bcgrx0Kt6JCKe4`) era Test y no aplicaba en Live.

3. **3 env vars actualizadas en Vercel Production** (Fede manualmente, mi automatización vía Chrome MCP no podía drivear bien la UI de Vercel para edits de vars sensitive):
   - `STRIPE_SECRET_KEY` → `sk_live_*`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → `pk_live_*`
   - `STRIPE_WEBHOOK_SECRET` → `whsec_*` del webhook Live nuevo

4. **Redeploy disparado** — Vercel mostró un banner "A new deployment is needed" después de los cambios de env vars; click en Redeploy → modal de confirmación → Production seleccionado → commit `ec85afc` (`feat(tracking): centralize tracking + cover phone/financing/purchase #16`). Build Ready en 52s.

5. **Verificación de Live mode (sin tocar plata real):**
   - `/pay` cargó sin banner TEST MODE ✓
   - Click en Pay $500 con datos test → redirect a `https://checkout.stripe.com/g/pay/cs_live_a1Nj3eCrmqVPsRWTczyJ0aZikR951PGZdx9t4AQVYZmYXyTh1oV7HMnJd1...`
   - El prefix **`cs_live_`** es prueba conclusiva: el server creó la session con `sk_live_*`. (Si fuera test sería `cs_test_*`.) Session abandonada — sin cobro.

6. **3 métodos de pago nuevos activados** en `Default · Your account` payment configuration (`pmc_1TK2viGz5Po3HwNjH4sshnP8`):
   - **Affirm** (BNPL crítico para tickets $1k-$10k+ — fence projects son el caso de uso ideal)
   - **Afterpay / Clearpay** (pay in 4 sin interés, US)
   - **Google Pay** (Android mobile conversion)

7. **Smoke test real con $50** (el form tiene mínimo $50, no $1) — Fede pagó $50 con tarjeta personal:
   - ✓ Pago `succeeded` en Stripe Live Dashboard
   - ✓ Email cliente llegó
   - ✓ Email owner llegó a `LEADS_TO_EMAIL`
   - ✓ Row `deposit_paid` en Google Sheets CRM
   - ✓ Refund manual desde Stripe Dashboard

---

## Estado del repo al cierre

Sin cambios de código en esta sesión. El último commit en `main` sigue siendo `ec85afc` (PR #16 de Apr 13 — centralize tracking). Toda la migración fue de configuración (env vars + Stripe Dashboard).

Docs actualizados hoy:
- `docs/go-live-checklist.md` — todos los items del swap marcados ✅ con fechas; secciones "Día 1", "Semana 1" y rollback plan se mantienen como pendientes.
- `docs/MEMORY.md` — sección "Current status" reescrita para 2026-05-05; sección de env vars actualizada (sk_live, pk_live, nuevo whsec).
- Este archivo (`HANDOFF-2026-05-05-stripe-live.md`).

---

## Pendientes inmediatos (próximas 24-48h)

**Mobile validation (15 min):**
- Abrir `/pay` en **iPhone real** → confirmar que el botón Apple Pay aparece en Stripe Checkout.
- Abrir `/pay` en **Android Chrome con tarjeta guardada** → confirmar Google Pay aparece.
- Si alguno NO aparece: ir a Stripe Dashboard → Settings → Payment method domains, verificar que `smoothfenceusa.com` está registrado y validado. Si no, agregarlo.

**Email deliverability (10 min):**
- Mandar un pago de test a 3 cuentas distintas (Gmail / Outlook / iCloud) para confirmar que los emails de confirmación no caen en spam. Si caen, verificar SPF/DKIM en DNS de `mail.smoothfenceusa.com` con Resend.

**3 toggles en Stripe Checkout settings (5 min, requiere Public details llenas):**
1. Stripe Dashboard → Settings → Public details → llenar: business name, support email/phone/address, terms URL, privacy URL.
2. Después en Settings → Payments → "Checkout and Payment Links" tab → Store policies → activar:
   - Refund and return policy
   - Legal policies
   - Contact Information

Esto reduce disputas porque los clientes ven antes del pago las políticas y a quién contactar si hay problema.

---

## Pendientes semana 1

**Conversion tracking validation:**
- Verificar en GA4 → Realtime que el evento `purchase` se dispara cuando ocurre un pago real. `lib/track.ts` ya está conectado según `docs/PLAN-2026-04-29-ads-pivot.md`, pero falta confirmarlo con un pago Live real.
- Cross-reference Stripe → GA4 → Google Ads para detectar abandono en checkout (`begin_checkout` sin `purchase`).

**Decisiones abiertas:**
- **Stripe Tax** para FL — sales tax automático en checkout. Pro: cumplimiento. Contra: 0.5% de cada transacción + complejidad de configuración. Decidir.
- **Refund policy oficial publicada en `/terms`** — el doc interno con porcentajes por ventana (cancela 7+ días antes del install = X% reembolso, etc.) todavía no se redactó. Es buena práctica para defenderse de disputas y chargebacks.

**Sandbox report follow-ups (de `docs/sandbox-test-report-2026-04-20.md`):**
- #5: Context / escape hatch en `/pay` cuando se llega sin prefill (Flow B)
- #7: Delay auto-open del Fency widget en rutas de conversión
- #8: Sacar PII del query string de `/pay` (privacy)
- #11: Enriquecer metadata de Stripe Session (source, utm, linearFeet)

---

## Notas para futuras sesiones de Claude

**Stripe Dashboard y Stripe Checkout están bloqueados desde Chrome MCP.** Son sitios financieros — `dashboard.stripe.com` y `checkout.stripe.com` retornan "This site is not allowed due to safety restrictions" y "This site is blocked" respectivamente. Workaround: pedirle a Fede screenshots y darle instrucciones step-by-step. **Truco útil:** cuando se redirige a Stripe Checkout, leer la URL via `tabs_context_mcp` — el prefix `cs_live_*` vs `cs_test_*` es prueba conclusiva del modo sin necesitar abrir la página.

**Vercel UI:** se puede drivear desde Chrome MCP, pero los menús "..." de las env vars son finickiy — usé JavaScript directo (`button.click()`) para abrirlos cuando los clicks normales no respondían. Para edits de valores sensitive, fue más rápido pedirle a Fede que pegue manualmente que pelear con el form (los inputs están en componentes React con state que no siempre se setea cleanly via `form_input`).

**Account IDs útiles para referencia:**
- Stripe account: `acct_1TK2vBGz5Po3HwNj`
- Default payment method config (la que usa el sitio): `pmc_1TK2viGz5Po3HwNjH4sshnP8`
- DocuSign Payments config (NO tocar): `pmc_1TTnGiGz5Po3HwNjTQZuG3in`
- Vercel project: `vercel.com/fricoxs-projects/smoothfenceusa`

---

*Última actualización: 2026-05-05.*
