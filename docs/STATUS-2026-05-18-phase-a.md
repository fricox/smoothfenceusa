
## Deploy

Vercel auto-deploy on push a `main`. Esperar ~2 min para deploy completion,
luego repetir el smoke contra `https://www.smoothfenceusa.com`.

Post-deploy smoke set adicional:
- Header `Content-Signal: ai-train=...` presente desde edge (no solo dev).
- `https://www.smoothfenceusa.com/.well-known/agent-card.json` retorna 200
  con `Content-Type: application/json`.
- `https://www.smoothfenceusa.com/services.md` retorna 200 con
  `Content-Type: text/markdown` o `text/plain` (Vercel default).
- robots.txt incluye `User-agent: GPTBot` con `Allow: /`.

## Out of scope

- Submission a `isitagentready.com` (esperar Phase B para tener score con
  MCP)
- Submission a mcp.so / smithery / awesome-mcp-servers (Phase B)
- IndexNow ping
- Case study en `lufer.ai/cases/smoothfenceusa` (post-Phase A + verify)
- Anthropic Connectors Directory (Phase B)
- ES bilingual twins (Phase A.2)

## Owner sign-off

- [x] Federico revisa el patch en preview branch o local
- [x] Smoke local PASS
- [x] Approve merge a `main`
- [x] Auto-deploy a `https://smoothfenceusa.com` completed
- [x] Smoke prod PASS
- [x] Update este STATUS doc con deploy hash

## Shipped 2026-05-18

- **PR #29 merged**: squash → main commit `207faaf` (22 files, 1540 insertions)
- **Vercel deploy**: `DVef6stjEJvdFGzLXafhfXf1Z3e2` (auto-deploy on push to main, success)
- **Canonical host**: `https://smoothfenceusa.com` (apex). `www.` returns 307 → apex.

### Prod smoke results (9 checks, all PASS)

| # | Check | Result |
|---|---|---|
| 1 | `robots.txt` | 200 — 9 per-bot allows (GPTBot, ClaudeBot, anthropic-ai, Google-Extended, PerplexityBot, Applebot-Extended, CCBot, Bytespider, Amazonbot) + catch-all `*` + Sitemap line |
| 2 | `sitemap.xml` | 200 — 9 `<loc>` entries, `/faq` present |
| 3 | `llms.txt` | 200, `text/plain`, Link header → agent-card + skills + self alternate |
| 4 | `.well-known/agent-card.json` | 200, valid JSON, capabilities a2a/tasks/tools/memory |
| 5 | `/services.md` twin | 200, `text/markdown; charset=utf-8` |
| 6 | `/services` HTML headers | `Content-Signal: ai-train=no, search=yes, ai-input=yes` + `Link: </services.md>; rel="alternate"; type="text/markdown"` |
| 7 | `SKILL.md` SHA256 prod-side | `4e1493b2fda5351e776e59c5c36e6ae4136c0d6e7b96e683b37a34691b15722d` — **matches** manifest digest |
| 8 | `/lp/*` X-Robots-Tag | `noindex, nofollow` present |
| 9 | HTML route regression | `/`, `/services`, `/financing`, `/privacy`, `/faq`, `/gallery`, `/about`, `/contact`, `/hoas-permits` all 200; `/api/contact` OPTIONS 204 |

### Known cosmetic issue (non-blocking)

- `robots.txt` `Sitemap:` line points to `https://www.smoothfenceusa.com/sitemap.xml` (the `www` variant) because `BASE_URL` in `app/sitemap.ts` was set to `https://www.smoothfenceusa.com`. Crawlers follow the 307 to apex, so functionally fine. Future cleanup: change BASE_URL to apex form in `app/sitemap.ts` for consistency with `agent-card.json` and `llms.txt` Link headers.

— CC-SF
