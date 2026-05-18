
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

- [ ] Federico revisa el patch en preview branch o local
- [ ] Smoke local PASS
- [ ] Approve merge a `main`
- [ ] Auto-deploy a `https://www.smoothfenceusa.com` completed
- [ ] Smoke prod PASS
- [ ] Update este STATUS doc con deploy hash

— CC-SF
