# Project Memory — Smooth Fence USA

Index of durable facts about this project that survive across Claude sessions. Keep entries terse; detail lives in topic docs linked below.

_Last updated: 2026-05-05_

## Stack

- Next.js 14 App Router on Vercel (prod: `https://smoothfenceusa.com`)
- Stripe Checkout Sessions, API version `2025-02-24.acacia`, SDK `stripe@^17.7.0`
- Resend for transactional email, from `no-reply@mail.smoothfenceusa.com`
- Google Apps Script webhook for CRM writes (`GOOGLE_SHEETS_WEBHOOK_URL`)
- GTM + GA4 for analytics (contact_click custom event, 3 data-layer vars: channel, location, timestamp)
- Language context provides EN/ES toggle via `useLanguage()`

## Key files

- `app/api/checkout/route.ts` — creates Stripe Checkout Session. **No `payment_method_types` specified** (lets Stripe auto-enable everything eligible via Dashboard).
- `app/api/webhooks/stripe/route.ts` — handles `checkout.session.completed`, computes earliest install date (today + 5 business days), sends 2 Resend emails, pushes `deposit_paid` event to Sheets CRM.
- `app/pay/page.tsx` — deposit payment form. Client component. Reads URL params from estimator (`amount`, `name`, `email`, `description`). Preset amounts $250/$500/$750/$1000 + custom. Min $50. Shows TEST MODE banner when `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` starts with `pk_test_`.
- `app/pay/success/page.tsx` — success landing, reads `session_id` query.
- `lib/sheets.ts` — `pushLeadEvent()`. 3 retries with exponential backoff; on total failure appends to `/tmp/leads-fallback.jsonl`.
- `lib/attribution.ts` — captures UTM/gclid on client, stores in cookie for later attribution on lead events.
- `components/sections/HearthPaymentCalculator.tsx` — **static** CheckIcon + benefits panel on public `/financing`. Does NOT embed the live Hearth widget (an attempt was reverted — see `docs/HANDOFF-2026-04-23.md`).
- `app/financing/calculator/page.tsx` + `HearthWidgetEmbed.tsx` — hidden LP at `/financing/calculator` with the live Hearth v1 widget (`data-orgid="61334"`, `data-partner="smooth-fence-usa"`). `robots: noindex`, disallowed in `app/robots.ts`, not linked anywhere. URL-only preview while design integration is pending.
- `lib/financing.ts` — single source of truth for `HEARTH_APPLY_URL` (used by provider card + calculator fallback).

## Env vars (production)

- `STRIPE_SECRET_KEY` — `sk_live_*` ✅ (migrated 2026-05-05)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — `pk_live_*` ✅ (migrated 2026-05-05)
- `STRIPE_WEBHOOK_SECRET` — `whsec_*` from Live webhook ✅ (regenerated 2026-05-05, points to `https://smoothfenceusa.com/api/webhooks/stripe`, event: `checkout.session.completed`)
- `RESEND_API_KEY`, `EMAIL_FROM`, `LEADS_TO_EMAIL`
- `GOOGLE_SHEETS_WEBHOOK_URL`
- `NEXT_PUBLIC_SITE_URL = https://smoothfenceusa.com`

## Email routing convention

- **Customer emails** (estimate + payment confirmation) → whatever email the customer types on the form (e.g. `f3d3x5@gmail.com` during testing).
- **Owner emails** (`🔔 New Lead`, `💰 Payment Received`) → dedicated leads mailbox, different from `f3d3x5`. Fede confirmed: "llega a otro correo que es para eso". Document the exact address in `.env.example` when safe to do so.

## Testing conventions

- **Production now uses Live Stripe keys** — to test the payment flow, use a real card with a small amount and refund immediately. The TEST MODE banner on `/pay` only appears if env vars are reverted to `pk_test_*`.
- Test customer email convention: Fede uses `f3d3x5@gmail.com` (his secondary Gmail, `u/1` in the multi-account URL).
- Stripe Checkout is sandboxed from browser automation — card entry is always manual.
- Stripe Dashboard (`dashboard.stripe.com`) and Stripe Checkout (`checkout.stripe.com`) are both blocked from Chrome MCP for safety; Claude needs Fede to share screenshots when asking about state.
- `docs/sandbox-test-report-2026-04-20.md` is the reference e2e test run with 18 documented improvements.

## Current status (2026-05-05)

**🟢 Stripe Live mode is ACTIVE.** Migration completed today — all 3 env vars updated, new Live webhook created and connected, redeploy successful, real $50 smoke test passed end-to-end (payment, customer email, owner email, Sheets CRM row all confirmed). Refund completed.

**Payment methods now enabled in `Default · Your account` config (`pmc_1TK2viGz5Po3HwNjH4sshnP8`):**
- Cards (Visa/MC/Amex), Apple Pay, Google Pay (added today), Cash App Pay, Amazon Pay, Link, Klarna, Affirm (added today), Afterpay/Clearpay (added today). Plus regional methods that don't show to US customers (harmless).

**Stripe account ID:** `acct_1TK2vBGz5Po3HwNj`. The DocuSign Payments config (`pmc_1TTnGiGz5Po3HwNjTQZuG3in`) is owned by the DocuSign integration — do not modify.

See `docs/HANDOFF-2026-05-05-stripe-live.md` for what's next (post-live monitoring, optional improvements, Stripe Tax decision still open).

## Open topics

- [Today's handoff (2026-05-05)](HANDOFF-2026-05-05-stripe-live.md) — Stripe go-live executed, post-live monitoring + remaining decisions
- [Sandbox test report](sandbox-test-report-2026-04-20.md) — 18 improvements; P0 local (uncommitted), P1 & P2 pending
- [Go-live checklist](go-live-checklist.md) — ✅ executed 2026-05-05, see file for what was completed vs what remains for week 1
- [Previous handoff (2026-04-23)](HANDOFF-2026-04-23.md) — context for 2026-04-23 work
- [Previous handoff (2026-04-21)](HANDOFF-2026-04-21.md) — context for 2026-04-20 → 2026-04-21 work
- [Track A attribution handoff](TRACK_A_HANDOFF.md) — existing
- [GTM/GA4 setup notes](SETUP_GTM_GA4.md) — existing
- [Attribution columns setup](SETUP_ATTRIBUTION_COLUMNS.md) — existing

## Working style with Fede

- Spanish is primary language in conversation; code/docs bilingual or English.
- Fede tests real flows hands-on; Claude drives the browser + makes code edits.
- Prefers pragmatic, shippable changes over big-bang rewrites.
- Owns deployment and Stripe Dashboard actions himself — Claude drafts code/docs and runs tests.
- Two Gmail accounts in play: `federico@smoothfenceusa.com` (u/0, business) and `f3d3x5@gmail.com` (u/1, personal test mailbox).
