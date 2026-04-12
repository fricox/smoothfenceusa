# Setup: Google Tag Manager + GA4

## 1. Create a GTM Container

1. Go to [tagmanager.google.com](https://tagmanager.google.com)
2. Create a new container for `smoothfenceusa.com` (Web)
3. Copy the Container ID (format: `GTM-XXXXXXX`)

## 2. Set the Environment Variable

In your Vercel project settings (or `.env.local` for local dev):

```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

The GTM script in `app/layout.tsx` is **completely inert** unless this env var
is set. No tracking code loads without it.

## 3. Configure GA4 in GTM

Inside GTM, create these tags:

### GA4 Configuration Tag
- Tag Type: Google Analytics: GA4 Configuration
- Measurement ID: `G-XXXXXXXXXX` (from your GA4 property)
- Trigger: All Pages

### GA4 Event — Lead Form Submit
- Tag Type: Google Analytics: GA4 Event
- Event Name: `lead_form_submit`
- Trigger: Custom Event, Event name = `lead_form_submit`
- Event Parameters (from dataLayer):
  - `form_type` — "quick_contact" or "estimator"
  - `gclid`
  - `utm_source`
  - `utm_medium`
  - `utm_campaign`

## 4. Google Ads Conversion Tracking

### Import GA4 Conversions
1. In Google Ads, go to Tools > Conversions
2. Click "+ New conversion action" > Import > Google Analytics 4
3. Select the `lead_form_submit` event
4. Set conversion value and counting as needed

### Or use a GTM Conversion Tag
- Tag Type: Google Ads Conversion Tracking
- Conversion ID + Label from your Google Ads account
- Trigger: Custom Event `lead_form_submit`

## 5. Testing

1. Set `NEXT_PUBLIC_GTM_ID` in `.env.local`
2. Run `npm run dev`
3. Open GTM Preview mode (Tag Assistant)
4. Navigate to `/lp/free-estimate?gclid=test123&utm_source=google&utm_medium=cpc`
5. Submit the form
6. Verify in Tag Assistant that `lead_form_submit` event fires with correct parameters

## dataLayer Events Reference

```javascript
// Pushed on every form submission
{
  event: "lead_form_submit",
  form_type: "quick_contact" | "estimator",
  gclid: "...",
  utm_source: "...",
  utm_medium: "...",
  utm_campaign: "...",
  utm_term: "...",
  utm_content: "..."
}
```
