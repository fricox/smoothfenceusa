# STATUS 2026-05-18 PM — Meta Lead Ads launch prep

Public handshake doc. CC-SF authored. Covers the post-Phase-A work:
Decision Day Search Jacksonville pause + Meta Lead Ads launch pre-work
(notification webhook + Conversions API). Launch held 24h for Pixel
creation (Facebook security flag).

## 1. Search Jacksonville Decision Day — NO-GO

Per `project_smoothfenceusa_status.md` criteria documented after 2026-05-05
cleanup, evaluated 13 days of data on campaign `23805497162`:

| Criterion | Threshold | Actual | Verdict |
|---|---|---|---|
| Clicks 7d | ≥10 | 12 | PASS |
| Conversions 13d | ≥1 | **0** | **FAIL** |
| `search_rank_lost_impression_share` | <60% | **85.9%** | **FAIL HARD** |
| RSA Ad Strength | Good/Excellent | **POOR, POOR** (both ads) | **FAIL** |

3/4 fail → **PAUSED Jacksonville** (`gads_pause_campaign` on `23805497162`).
All 3 Search campaigns + PMax now PAUSED. Account cold-start auth signal
insufficient — re-attempt Search in 3-6 months.

CTR was healthy (8%, well above Search benchmark 3-5%) — the issue is
account-level ad rank, not creative or targeting.

## 2. Meta App moved to Live Mode (2026-05-18 PM)

Fede completed Meta Developer app Basic Settings (icon 1024×1024,
privacy URL, user data deletion URL, category, contact email) and
toggled to Live Mode. App Review formal NOT required — direct toggle
worked. Unblocks ad creative + ad creation (subcode 1885183 resolved).

App ID: `947645468185855` ("Smooth Fence Ada MCP")
Ad Account: `1383011116921424`
Page: `993273483878852`
Business: `993282177211316`

## 3. Gap #1 — Real-time lead notification (SHIPPED)

**Goal**: Meta Lead Ads convert ~100x better with 5-min response than
1-hour response. Manual Ads Manager polling was insufficient. Now: every
5 min the local poller checks the lead form and pushes any new submissions
to a SF site webhook that fires email (Resend) + Sheets (existing CRM).

**Architecture:**

```
~/.claude/mcp/meta-ads/lead-poller.py  (Python stdlib, 220 lines)
   ↓ launchd, every 300 sec
   ↓ POST + Bearer auth
/api/leads/meta-notify  (SF site, Vercel)
   ├─ Resend email to info@smoothfenceusa.com (same infra as /api/quote)
   ├─ pushLeadEvent to Google Sheets CRM (source=meta_lead_ads)
   └─ dispatchMetaCapiEvent(Lead, system_generated)  ← Gap #2 hook
```

**Files added:**
- `~/.claude/mcp/meta-ads/lead-poller.py` (NEW)
- `~/.claude/mcp/meta-ads/.env` (extended with LEAD_FORM_IDS, LEAD_NOTIFY_ENDPOINT, LEAD_NOTIFY_SECRET)
- `~/Library/LaunchAgents/com.smoothfenceusa.lead-poller.plist` (NEW)
- `app/api/leads/meta-notify/route.ts` (NEW, 235 lines after Gap #2 wire)
- `lib/sheets.ts` (1 line — `meta_lead_ads` added to LeadSource union)

**Vercel env vars added:**
- `META_LEAD_NOTIFY_SECRET` (Production + Development)

**Verification (2026-05-18 PM):**
- POST direct via curl → HTTP 200, `email_sent=true, sheets_pushed=true`
- POST via poller `--test` → same
- Fede confirmed 2 test emails received at info@smoothfenceusa.com
- launchd job loaded (PID 82538), first cron tick OK
- State persisted in `~/.claude/mcp/meta-ads/lead-poller-state.json`

**Commits:** `aa13735` (endpoint + LeadSource extension)

**Gotcha logged:** `cat secret.txt | vercel env add` includes trailing
newline → stored as `value\n` literal. Fix: `printf '%s' "value"` instead.

## 4. Gap #2 — Meta Conversions API server-side (CODE SHIPPED, runtime pending Pixel)

**Goal**: Bypass iOS 14.5+ Pixel signal loss (~30-40% of browser events
blocked). Server-side dispatch gives Advantage+ full conversion signal.

**Architecture:**

```
Various events
  ├─ /api/quote/route.ts          → Lead event (site contact form)
  ├─ /api/leads/meta-notify       → Lead event (Meta lead form submit)
  └─ /api/webhooks/stripe/route.ts → Purchase event (real revenue)
        ↓ all use:
   dispatchMetaCapiEvent() from lib/meta-capi.ts
        ↓ POST
   Meta Graph /events  (PII SHA256 hashed)
```

**File added:** `lib/meta-capi.ts` (NEW, 231 lines)

**Files touched (additive, fire-and-forget pattern):**
- `app/api/quote/route.ts` (+38 lines after sheets push)
- `app/api/leads/meta-notify/route.ts` (+45 lines after sheets push)
- `app/api/webhooks/stripe/route.ts` (+37 lines after sheets push)

**Design properties:**
- Fire-and-forget — never blocks user response if Meta API down/slow
- Silent no-op if `META_PIXEL_ID` or `META_CAPI_TOKEN` env unset
  (deploy safe before Pixel exists)
- SHA256 hashes all PII: email, phone, first/last name, ZIP, city,
  state, country, external_id
- Dedup IDs: `meta-lead-<form_lead_id>`, `stripe-<session_id>`,
  random for site form (no Pixel yet, dedup not yet meaningful)
- Action sources: `website` for site events, `system_generated` for
  Meta lead form (since lead originated in Meta UI, not on smoothfenceusa.com)
- fbc extraction from `?fbclid=` query param, fbp from `_fbp` cookie

**Required env vars (pending after Pixel creation):**
- `META_PIXEL_ID` (numeric)
- `META_CAPI_TOKEN` (falls back to `META_ACCESS_TOKEN` if unset)
- `META_CAPI_TEST_CODE` (optional, for Test Events tab during verification)

**Commits:** `63c16cc` (lib + 3 route wires)

**Pixel creation BLOCKED 24h** (2026-05-18 PM): Fede attempted Pixel
creation in Business Settings; Facebook security flag triggered cooldown
post-Live-Mode toggle. Resumes 2026-05-19.

API path was also tested: `POST {business_id}/adspixels` returned subcode
1784018 ("Business has not accepted Pixel Terms of Service") — only UI
acceptance unlocks creation. Fede action required, not CC-SF.

## 5. Meta Jacksonville campaign — copy + budget LOCKED for 2026-05-19 launch

**Copy (decided by CC-SF per Fede's spec "SEO + LLM + CTA"):**

Primary text (357 chars):
> Free fence installation estimate in Jacksonville, FL. Smooth Fence USA
> installs wood, vinyl, aluminum, chain-link, and ranch rail fences across
> Duval, Clay, and St. Johns counties. Licensed, insured, locally owned.
> Same-day quote, install scheduling within 24 hours. Tap to request your
> free estimate — 30-second form, no obligation.

Headline (33 chars): `Free Fence Quote · Jacksonville FL`

Description (30 chars): `Licensed · Insured · Local Crews`

**Rationale**: SEO hits 5 material long-tails + 3 county entities. LLM
extractable factual structure. CTA stack ("free", "same-day", "30-second",
"tap to request"). Consistent vocabulary with Phase A `/services.md` +
agent-card.json → cross-channel brand cohesion for future LLM queries.

**Targeting:**
- Geo: Jacksonville FL key `2428577` + 25mi radius
- Age: 25-65
- Languages: EN + ES (locale id 6 + 23)
- Audience: Advantage+ (algorithm picks)
- Placements: Advantage+ Placements
- Optimization: LEAD_GENERATION
- CTA: GET_QUOTE
- Creative image hash: `013a99ff88aad65d440cd8a51d4cc44e` (aluminum black vertical)

**Budget $20/d** with day-7 decision gate:
- CPL <$15 → scale to $30/d
- CPL $15-25 → hold, complete learning
- CPL >$25 → pause + revise
- 0 conversions → diagnose creative
- Pre-decision risk cap: $140 (7d × $20)

**Old partial campaign `120245375045020770`** stays PAUSED as orphan;
delete after 7 days clean.

## 6. Execution order for 2026-05-19

```
T+24h ─── Facebook security flag lifts
  ↓
[1] Fede: create Pixel in Business Settings → Data Sources         2 min
[2] Fede: copy Pixel ID, paste to CC-SF                            30 sec
[3] CC-SF: vercel env add META_PIXEL_ID + META_CAPI_TOKEN          30 sec
[4] CC-SF: vercel deploy --prod (or empty commit → auto-deploy)    90 sec
[5] CC-SF: dispatch test events with META_CAPI_TEST_CODE set       1 min
           verify in Meta Events Manager → Test Events tab
[6] CC-SF: meta_create_lead_campaign(... status="PAUSED")          30 sec
           returns campaign_id, adset_id, creative_id, ad_id
[7] Fede: visual review in Ads Manager + OK                        2 min
[8] CC-SF: meta_enable_campaign(campaign_id)                       10 sec
[9] First impressions live in 5-10 min                              —
[10] Lead poller already active — first form submit → email <5min   —
```

Total Fede time tomorrow: ~5 min. CC-SF time: ~5 min.

## 7. Out-of-scope for this work (deferred to Phase 2.1)

- Client-side CAPI for phone/financing/calendly clicks (only server-side
  Lead + Purchase wired today). Adding client wrapper requires touching
  components beyond zero-touch list; deferred until value is demonstrated.
- Meta Pixel browser-side installation (currently no Pixel in `<head>`).
  CAPI alone provides server-side signal; Pixel-CAPI dedup is a later
  optimization.
- Whatsapp click-to-message ad variant (Hispanic market test, deferred).
- AI creative generation (Higgsfield/Nanobanana) for variant A/B testing
  — Phase 2 once Meta launch baseline is established.
- Auto-pause rules (programmatic pacing based on CPL thresholds) — Phase 3.

## 8. Out-of-scope (CLI-GENAI / Lufer)

- Sem 2 MASTER_PLAN: 50 PYMES targets + outreach scripts + proposal
  template. Pending Fede's "arranquemos Sem 2" trigger.
- Phase B: external MCP at `agent.smoothfenceusa.com` (Cloudflare Pages,
  DNS by Fede).
- Phase A.2: ES routes + ES twins + hreflang.
- Case study at `lufer.ai/cases/smoothfenceusa` post-Phase-B verification.

— CC-SF
