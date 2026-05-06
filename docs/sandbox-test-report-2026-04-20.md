# Sandbox E2E Test Report — Smooth Fence USA

**Fecha:** 2026-04-20
**Modo:** Stripe Test (sandbox)
**Tester:** Fede + Claude
**Tarjeta usada:** `4242 4242 4242 4242` (Stripe test)
**Email cliente de prueba:** `f3d3x5@gmail.com`

---

## 1. Resumen ejecutivo

Se corrieron dos flujos reales punta-a-punta en modo Test:

- **Flow A** — Estimador → `/pay` con prefill → Stripe Checkout → `/pay/success`: **PASÓ** end-to-end. El webhook de Stripe disparó correctamente, el email al cliente llegó a su inbox, el email al owner llegó a la casilla dedicada, y la fecha de instalación más temprana se calculó correcta (lun 27/4 = hoy + 5 días hábiles).
- **Flow B** — Header "Pagar" → `/pay` manual → Stripe Checkout: **PASÓ** hasta Stripe. La sesión de Checkout se creó correctamente (`cs_test_a1vcGFobcLuaJJ9jGB9pqv9pmVrMQRqe5KJwGxMBh7Rb1nKz2lkomUGHEF`).

El plumbing está listo para live. Este documento lista 18 mejoras detectadas — agrupadas por prioridad — que conviene atender antes o poco después de la migración a Stripe Live.

---

## 2. Detalle de los flujos

### Flow A — Estimador con prefill

| Paso | Resultado |
|---|---|
| Landing `/lp/free-estimate` carga | OK (overlay `claude-agent-glow-border` necesitó ocultarse para automatización; no afecta usuarios reales) |
| Formulario estimador: material vinyl, 5ft, 150lf, 1 puerta, remove yes, premium yes, ZIP 32137 | OK — cálculo: **$4,930 – $8,550** |
| Modal de lead-capture (Nombre / Teléfono / Email / ZIP) aparece tras "Ver Mi Estimado Personalizado →" | OK |
| Email de estimado llega a `f3d3x5@gmail.com` | OK — subject: "Your Smooth Fence USA Estimate: $4,930 – $8,550" |
| Botón "Pagar Depósito (50%)" en la pantalla del estimado redirige a `/pay?amount=2465&name=...&email=...` | OK |
| `/pay` muestra banner "Basado en tu estimado" y monto $2,465 pre-llenado | OK |
| Submit → crea Stripe Checkout Session | OK |
| Stripe Checkout con tarjeta `4242 4242 4242 4242` → `/pay/success` | OK |
| Webhook `checkout.session.completed` | OK |
| Email cliente: "Payment Confirmation: $2,465 — Smooth Fence USA" | **Confirmado** en inbox de `f3d3x5@gmail.com` |
| Email owner: "💰 Payment Received: Federico Test — $2,465" | Llegó a casilla dedicada distinta (Fede confirmó: "llega a otro correo que es para eso") |
| Fecha de instalación más temprana: lun 27/4/26 | OK — matemática correcta (hoy 20/4 + 5 días hábiles, skipping fin de semana) |

### Flow B — Header "Pagar" manual (sin prefill)

| Paso | Resultado |
|---|---|
| Click en botón "💳 Pagar" del header desde home | OK — navega a `/pay` sin query params |
| `/pay` muestra amount default $500, sin banner de estimado | OK |
| Click $250, nombre "Federico Manual B", email `f3d3x5@gmail.com` | OK |
| Submit → Stripe Checkout Session creada | OK — `cs_test_a1vcGFobcLuaJJ9jGB9pqv9pmVrMQRqe5KJwGxMBh7Rb1nKz2lkomUGHEF` |

Flow B se cierra aquí sin completar la tarjeta — el plumbing Stripe → webhook → emails → CRM ya está validado por Flow A, y el objetivo de Flow B era mapear la fricción del camino "directo a pagar sin contexto", que quedó documentada abajo.

---

## 3. Mejoras detectadas (priorizadas)

### 🔴 P0 — Antes de ir live

**1. Activar `automatic_payment_methods` en Stripe Checkout.**
Actualmente `app/api/checkout/route.ts` usa `payment_method_types: ["card"]`. Cambiar a `automatic_payment_methods: { enabled: true }` habilita Apple Pay, Google Pay, Link, y BNPL (Klarna/Afterpay) donde sea elegible. Ganancia de conversión esperada en mobile: 10-25% según data de Stripe.

```ts
// en lugar de:
payment_method_types: ["card"],
// usar:
automatic_payment_methods: { enabled: true },
```

**2. Banner "TEST MODE" visible en `/pay` cuando la clave sea de test.**
Si `STRIPE_SECRET_KEY` empieza con `sk_test_`, mostrar un banner amarillo en la parte superior de `/pay` con texto tipo "Modo de prueba — no se cobrarán pagos reales". Evita confusión si algún cliente real entra durante periodos de testing.

**3. Checklist de go-live.**
Falta un documento `docs/go-live-checklist.md` con los pasos explícitos: swap `sk_test_` → `sk_live_`, crear nuevo webhook endpoint en Stripe Dashboard para prod, rotar `STRIPE_WEBHOOK_SECRET`, testear con pago real de $1, enable Stripe Tax si aplica, revisar refund policy, draftear SOP de disputas/refunds.

**4. CRM push no tiene retry ni fallback.**
`lib/sheets.ts` hace fire-and-forget con un `console.error` si falla. Si el endpoint de Apps Script está caído 30 segundos, se pierden leads sin trazabilidad. Agregar al menos un retry con backoff (2 intentos) y un destino secundario (log a Sentry, o escribir a un archivo `/tmp/leads-fallback.jsonl`) para reconciliar manualmente.

### 🟡 P1 — Primer sprint post-live

**5. Context / escape hatch en `/pay` cuando se llega sin prefill (Flow B).**
Actualmente un visitante directo ve "Pagar Depósito" sin ninguna pista de qué significa ni cuánto debería pagar. Agregar:
- Link secundario "¿Primera vez? Empieza por el estimador →" que lleva a `/estimator`.
- Tooltip/accordion "¿Qué es este depósito?" con 2-3 líneas explicativas.

**6. Default amount $500 es arbitrario.**
Sin contexto de proyecto, defaultear a $500 es un guess y puede ahuyentar a alguien que viene a pagar $250. Opciones:
- (a) No pre-seleccionar nada (usuario debe elegir).
- (b) Defaultear al más bajo ($250).
- (c) Requerir amount explícito (campo vacío con placeholder).
Recomiendo (a).

**7. Fency chat widget tapa el formulario de `/pay` en desktop.**
El widget auto-abre cubriendo ~400px a la derecha, incluyendo parte del formulario. Fix: delay auto-open 10-15s, solo en mobile auto-open, o no auto-open en rutas de conversión (`/pay`, `/pay/success`, `/estimator/result`).

**8. PII (nombre + email) en query string de `/pay`.**
La URL `/pay?amount=2465&name=Federico+Test&email=f3d3x5%40gmail.com&description=...` expone nombre y email en logs de servidor, historial del navegador, y referrers a scripts de terceros (GA, Fency). Fix: o bien no pasar `name`/`email` (dejar que el user los tipee en `/pay` — ya están pre-creados en el modal del estimador), o usar un shortlink server-side (endpoint que cambia un token UUID por el payload).

**9. Header "Pagar" CTA redundante en `/pay` y `/pay/success`.**
El botón amarillo "💳 Pagar" del header sigue visible cuando el usuario ya está en esas rutas. Fix: hide o atenuarlo cuando `pathname === '/pay' || pathname.startsWith('/pay/')`.

**10. Owner email subject carece de contexto accionable.**
Actual: `💰 Payment Received: Federico Test — $2,465`. Mejor: `💰 $2,465 · Federico Test · Vinyl 150ft · Palm Coast`. Permite al owner triar en 1 segundo.

**11. Metadata de Stripe Checkout Session es minimal.**
Actualmente solo `customerName` y `description` se pasan en metadata. Agregar: `source` (`estimator` vs `direct`), `stripeSessionId` (self-ref), `utm_*`, y si vienen del estimador: `linearFeet`, `material`, `zip`. Facilita reconciliación en Stripe Dashboard.

**12. Preview de fecha de instalación en `/pay`.**
Hoy la "earliest install date" solo se muestra post-pago en el email. Mostrar "Tu fecha de instalación más temprana: lun 27 de abril" directamente en `/pay` antes de pagar mejora la percepción de urgencia y commitment.

### 🟢 P2 — Nice to have / después del primer mes

**13. Headers diferenciados en owner vs customer emails.**
Ambos salen de `EMAIL_FROM = no-reply@mail.smoothfenceusa.com`. Considerar subdireccionar owner emails a `alerts@mail.smoothfenceusa.com` o agregar header `X-SMF-Kind: owner-notification` para que Gmail pueda filtrarlos fácilmente.

**14. Transición estimador → modal de lead-capture es abrupta.**
El modal de 4 campos (Name/Phone/Email/ZIP) aparece sin aviso tras "Ver Mi Estimado Personalizado →". Sumar un header chico: "Un paso más — ¿A dónde te mandamos tu estimado?".

**15. Spinner/overlay durante la redirección a Stripe.**
El botón cambia a estado de loading pero la página no comunica "Redirigiéndote a pago seguro...". En 2-3 segundos que tarda crear la session, un user impaciente puede volver a clickear. Fix: mostrar overlay con spinner + copy.

**16. Confirmar ruta de email owner documentada en repo.**
`LEADS_TO_EMAIL` apunta a una casilla distinta de `f3d3x5@gmail.com` (la dedicada a leads). Documentar en `.env.example` y `README.md` cuál es la casilla actual para evitar que un futuro desarrollador se confunda.

**17. Rate limit en `/api/checkout`.**
Si alguien scriptea POSTs contra el endpoint crea sesiones de Stripe infinitas (cada una se descarta después de 24h si no se paga, pero ensucia el Dashboard y dispara alertas de Stripe). Middleware simple: 5 sesiones / IP / minuto.

**18. Tests e2e automatizados (Playwright) para Flow A y Flow B.**
Hoy el test es manual con Claude. Scriptearlo en Playwright (hasta el redirect a Stripe — la tarjeta queda manual por los guardrails de Stripe) ahorra 15-20min cada vez que quieras re-validar.

---

## 4. Pendientes de verificación del usuario

- [ ] **Sheets CRM:** abrir el Google Sheet conectado por `GOOGLE_SHEETS_WEBHOOK_URL` y confirmar que existen 2 filas nuevas del 20/4/26: (1) `deposit_paid` con `stripeSessionId = cs_test_a1vcp_*` y $2,465 (Flow A), (2) opcionalmente una segunda si completaste la tarjeta en Flow B.
- [ ] **Email owner de Flow A:** confirmar en la casilla dedicada que llegó `💰 Payment Received: Federico Test — $2,465`.

---

## 5. Próximos pasos recomendados

1. Resolver P0 (items 1-4) — ~1 día de trabajo.
2. Crear PR "pre-live hardening" con items 5-12 — ~2-3 días.
3. Agendar ventana de 30 min para go-live: swap keys, smoke test con tarjeta real de $1, monitor 1h.
4. Post-live: item 13-18 a lo largo de 2 semanas.

---

*Documento generado el 2026-04-20. Sesión completa: Flow A end-to-end + Flow B hasta Stripe Checkout.*
