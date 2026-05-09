# Pending — Meta Ads MCP activation (2026-05-13)

> ✅ **DONE 2026-05-06** — Meta Ads MCP fully activated ahead of schedule. Fede successfully created the System User (named `SmoothFenceAdsMCP` per Meta naming policy), generated long-lived token with 5 scopes, populated `~/.claude/mcp/meta-ads/.env`, and registered the MCP in `~/.claude.json`. Connectivity verified via direct Graph API calls. **Pending:** Fede close+reopen Claude Code so the MCP loads, then Code instance creates `Meta · Jacksonville · Fence Lead` campaign correctly via `meta_create_lead_campaign()`.
>
> **Important ID corrections from this journey:** ad account ID = **1383011116921424**. Page ID = **993273483878852**. App ID = **947645468185855**. (Older drafts of this doc and earlier `STATUS` notes referenced a different ad account ID by mistake — corrected during MCP setup verification.)
>
> **Setup gotchas captured in `~/.claude/projects/...GENAI/memory/reference_meta_ads_mcp.md`** — device flag, naming policy (no multi-hyphen), 3 levels of permissions (token scopes + system user assignment + app-to-ad-account connection).
>
> This doc is conserved as historical (the recipe followed). Current state in `docs/STATUS-2026-05-06.md`.

> **Original status (pre-2026-05-06):** BLOCKED until 2026-05-13. Facebook imposed a 7-day cooldown on creating System Users in Smooth Fence USA Business Portfolio (triggered 2026-05-06).
>
> **Pre-condition for resuming:** Cooldown must be lifted. If Facebook still blocks creation on 2026-05-13, wait another day and retry.

---

## What's already done (don't redo)

- ✅ **Meta Developer account** created on Fede's wife's Facebook (Fede's own account was permanently blocked by the "device you don't usually use" security flag — investigated, no Meta-side fix; documented in `feedback_google_ads_automation.md`).
- ✅ **Facebook Developer App** created, linked to Smooth Fence USA Business Portfolio.
- ✅ **Marketing API** product added to the app.
- ✅ **Business Verification** for FIKOX LLC submitted to Meta — was `En revisión` as of 2026-05-06, expected approval by 2026-05-13 (1-2 business days). Not blocking for Lead Ads via API in Development Mode.
- ✅ **Meta Ads MCP server** code written at `~/.claude/mcp/meta-ads/` with 12 tools (`meta_list_ad_accounts`, `meta_create_lead_campaign`, `meta_list_leads`, etc.). Venv created, deps installed, imports verified. **Just needs `.env` populated.**
- ✅ **Meta · Jacksonville · Fence Lead** draft campaign exists in Ads Manager (created manually by Fede, currently with `Delivery: No ads` status — incomplete because steps 4-5 of the wizard never happened).

## What's left for 2026-05-13

### Step 1 — Create System User (the blocked step)

URL: [business.facebook.com/settings/system-users](https://business.facebook.com/settings/system-users)

Or navigate: Configuración → Usuarios → Usuarios del sistema.

Click **"Agregar"** → Create system user dialog opens:

| Field | Value | Notes |
|---|---|---|
| System user name | **`SmoothFenceAdsMCP`** | NO hyphens — Meta rejected `smoothfence-ads-mcp` for "too many hyphens" |
| System user role | **Admin** | Required for Marketing API mutations |

Click **"Create system user"**.

### Step 2 — Assign 3 assets

Click on the newly-created `SmoothFenceAdsMCP` → click **"Asignar activos"** (or "Add Assets"):

| Asset type | Specific asset | Permission |
|---|---|---|
| **Apps** | The Smooth Fence developer app (created on wife's account) | **"Control total"** or **"Manage app"** |
| **Cuentas publicitarias** | `Smooth Fence Ads (1383011116921424)` | **"Control total"** |
| **Páginas** | Smooth Fence USA Page | **"Control total"** |

Repeat the assign-assets dialog 3 times if needed (or do all 3 in one dialog if Meta UI allows).

### Step 3 — Generate token

In the system user detail panel, click **"Generar nuevo token"**:

- **App:** select the app you assigned in Step 2
- **Token expiration:** **"Nunca"** / **"Never"** (CRITICAL — otherwise expires in 60 days)
- **Permisos / Scopes:** check all 5:
  - ☑ `ads_management`
  - ☑ `ads_read`
  - ☑ `business_management`
  - ☑ `pages_show_list`
  - ☑ `leads_retrieval`

Click **"Generar token"**.

⚠️ **THE TOKEN IS DISPLAYED ONLY ONCE.** Copy the entire string (looks like `EAAxxxx...zzzz`, ~200 chars) before closing the dialog. If lost, must regenerate.

### Step 4 — Get Page ID

URL: [business.facebook.com/settings/pages](https://business.facebook.com/settings/pages) → click on Smooth Fence Page → ID visible in URL or under Page name. Usually 15-16 digit number.

### Step 5 — Send Fede credentials to Claude

Block to send:

```
META_APP_ID=               # 16-digit App ID, top of developer app dashboard
META_APP_SECRET=           # App Settings → Basic → App Secret → Show
META_ACCESS_TOKEN=EAA...   # the long string from Step 3
META_AD_ACCOUNT_ID=1383011116921424
META_PAGE_ID=              # from Step 4
META_INSTAGRAM_ACTOR_ID=   # optional, from Instagram business account if linked
```

### Step 6 — Claude executes (estimated 5-10 min)

When credentials arrive, Claude will:

1. **Save credentials** to `~/.claude/mcp/meta-ads/.env` (chmod 600).
2. **Register the MCP** in `~/.claude.json` under `mcpServers`:
   ```json
   "meta-ads": {
     "type": "stdio",
     "command": "/Users/fikoxllc/.claude/mcp/meta-ads/.venv/bin/python",
     "args": ["/Users/fikoxllc/.claude/mcp/meta-ads/server.py"],
     "env": {}
   }
   ```
3. **Restart Claude Code session** (Fede confirms) so the MCP loads.
4. **Connectivity test:** run `meta_list_ad_accounts()` — should return Smooth Fence Ads account info.
5. **Diagnose existing draft:** check if `Meta · Jacksonville · Fence Lead` (the manually-created one with no ads) is salvageable or should be deleted and recreated cleanly.
6. **One-shot create lead campaign:** run `meta_create_lead_campaign()` with copy/audience/budget from `META-ADS-SETUP-GUIDE.md`. Requires:
   - Image hash from `meta_upload_image(/path/to/jax-job-photo.jpg)` — Fede provides 1 photo of a recent Jacksonville fence install.
   - Lead form ID from `meta_create_lead_form(privacy_policy_url="https://smoothfenceusa.com/privacy", ...)`.
   - Geo city lookup via `meta_search_targeting(query="Jacksonville", type_="adgeolocation")`.
7. **Verify** in Ads Manager UI that the campaign is built correctly, then enable.

### Reference docs

- `~/.claude/mcp/meta-ads/README.md` — MCP setup guide.
- `Projects/smoothfenceusa/docs/META-ADS-SETUP-GUIDE.md` — campaign copy, audience, budget plan, lead form questions, Zapier CRM integration.
- `Projects/smoothfenceusa/docs/EXEC-2026-04-29-week1-leadgen-plan.md` — multi-channel context (LSA + Meta + GBP).

---

## If 2026-05-13 attempt fails again

If the cooldown didn't lift or another security flag triggers:

**Option A — Use existing user account instead.** Make Fede's wife's user (the Developer account) into the Admin of the ad account directly. Skip system user. Generate a User Access Token instead (60-day expiration, refresh manually). Less ideal but works.

**Option B — Zapier fallback.** No developer app + no system user needed. Pre-built Meta Lead Ads → Google Sheets / email integration. ~$30/mo. Setup ~30 min. Detail in `META-ADS-SETUP-GUIDE.md` section B.5 Option B.

**Option C — Wait + try from Fede's main device.** The developer account is still on wife's Facebook. After more device-trust accumulates (using Facebook normally for another 1-2 weeks), Fede's account may unlock and the whole flow becomes available on his side.

---

*Doc created 2026-05-06. Resume on 2026-05-13.*
