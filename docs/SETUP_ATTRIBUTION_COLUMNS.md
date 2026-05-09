# Setup: Attribution Columns in Google Sheets

Track A sends 6 additional fields with every lead event. You need to add
matching columns in the Google Sheet so the Apps Script can map them.

## Columns to Add

Add these columns **after** the existing `message` column, in this exact order:

| Column Header   | Field Key      | Example Value            |
|-----------------|----------------|--------------------------|
| `gclid`         | `gclid`        | `EAIaIQobChMI...`       |
| `utm_source`    | `utm_source`   | `google`                 |
| `utm_medium`    | `utm_medium`   | `cpc`                    |
| `utm_campaign`  | `utm_campaign` | `spring_2026_vinyl`      |
| `utm_term`      | `utm_term`     | `vinyl fence palm coast` |
| `utm_content`   | `utm_content`  | `hero_cta`               |

## Apps Script Update

In the existing `doPost(e)` function inside the Apps Script editor, the
payload fields are mapped positionally. Add these 6 fields at the end of the
`sheet.appendRow([...])` call:

```javascript
data.gclid || "",
data.utm_source || "",
data.utm_medium || "",
data.utm_campaign || "",
data.utm_term || "",
data.utm_content || "",
```

## Verification

1. Open the Google Sheet
2. Submit a test lead from `/lp/free-estimate?utm_source=test&utm_medium=cpc`
3. Verify that `utm_source` and `utm_medium` appear in the correct columns
4. Submit a lead from the homepage (no UTMs) — attribution columns should be empty
