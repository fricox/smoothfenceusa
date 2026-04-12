# Track A — Handoff Document

## What Was Implemented

Track A adds **paid-ads attribution** to the SmoothFenceUSA lead funnel:

1. **Attribution Capture** (`lib/attribution.ts`)
   - Reads `gclid` + 5 UTM params from the URL on page load
   - Stores in `sessionStorage` (survives navigation within the same tab)
   - First-touch model: only overwrites if the current URL has params

2. **Attribution Component** (`components/ui/AttributionCapture.tsx`)
   - "use client" component mounted in the root layout
   - Calls `captureAttribution()` on mount, renders nothing

3. **Sheets Integration** (`lib/sheets.ts`)
   - `LeadEvent` interface extended with 6 optional attribution fields
   - Payload includes `gclid`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`

4. **API Routes** (`app/api/quote/route.ts`, `app/api/estimator/route.ts`)
   - Accept attribution fields from request body
   - Pass them through to `pushLeadEvent()`
   - Attribution data appended to owner notification emails

5. **Form Integration** (`components/forms/QuickContactForm.tsx`, `app/estimator/EstimatorClient.tsx`)
   - On submit, call `getAttribution()` and merge into POST body
   - Push `lead_form_submit` event to GTM dataLayer

6. **Conditional GTM** (`app/layout.tsx`)
   - GTM script only loads if `NEXT_PUBLIC_GTM_ID` env var is set
   - Includes `<noscript>` fallback iframe
   - LocalBusiness JSON-LD structured data added

7. **Landing Pages** (`app/lp/free-estimate/`, `app/lp/vinyl-fence/`, `app/lp/aluminum-fence/`)
   - Standalone ad landing pages with `noindex` meta
   - Each includes `QuickContactForm`
   - Designed for Google Ads campaigns

## Files Created

| File | Purpose |
|------|---------|
| `lib/attribution.ts` | Core attribution capture/retrieval logic |
| `components/ui/AttributionCapture.tsx` | Client component for layout mount |
| `app/lp/free-estimate/page.tsx` | Generic free estimate landing page |
| `app/lp/vinyl-fence/page.tsx` | Vinyl fence ad landing page |
| `app/lp/aluminum-fence/page.tsx` | Aluminum fence ad landing page |
| `docs/SETUP_ATTRIBUTION_COLUMNS.md` | Google Sheets column setup guide |
| `docs/SETUP_GTM_GA4.md` | GTM + GA4 configuration guide |
| `docs/TRACK_A_HANDOFF.md` | This document |

## Files Modified

| File | Changes |
|------|---------|
| `app/layout.tsx` | Added GTM script (conditional), AttributionCapture, JSON-LD |
| `lib/sheets.ts` | Added 6 attribution fields to LeadEvent + payload |
| `app/api/quote/route.ts` | Accept + forward attribution fields, append to email |
| `app/api/estimator/route.ts` | Accept + forward attribution fields, append to email |
| `components/forms/QuickContactForm.tsx` | Read attribution on submit, push dataLayer |
| `app/estimator/EstimatorClient.tsx` | Read attribution on submit, push dataLayer |

## What Was NOT Changed

- Homepage design/copy
- Estimator logic or pricing
- Validation rules
- Chatbot integration
- Phone/SMS/WhatsApp links
- Calendly integration
- `/pay` flow
- Existing routes (no renames)
- No Track B work

## Rollback

Single commit — revert with:
```bash
git revert <commit-hash>
```

## Next Steps (for whoever picks this up)

1. **Set up GTM**: Follow `docs/SETUP_GTM_GA4.md`
2. **Update Google Sheet**: Follow `docs/SETUP_ATTRIBUTION_COLUMNS.md`
3. **Create Google Ads campaigns** pointing to `/lp/free-estimate`, `/lp/vinyl-fence`, `/lp/aluminum-fence`
4. **Test end-to-end**: Visit landing page with UTMs, submit form, verify Sheets row has attribution
