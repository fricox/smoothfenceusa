# Execution Snapshot — Pivot Search Campaigns (2026-04-29)

> 🧊 **FROZEN AS HISTORICAL 2026-05-06** — Este doc captura el journey completo del pivot del 2026-04-29 al 2026-05-06 (creación de campañas, journey de bid strategies MAX_CONV → TARGET_IMPRESSION_SHARE → MANUAL_CPC, cleanup del 2026-05-05, Meta MCP block). Conservado como histórico técnico/forensic. Estado actual y next steps en `docs/STATUS-2026-05-06.md`. **No actualizar más este archivo** — es snapshot del journey, no estado live.

> Pre + Post snapshot del momento exacto en que ejecutamos las 5 mutations del pivot via MCP. Este doc se llena en dos pasadas:
>
> - **Pre-execution** (escrito antes de ejecutar): qué vamos a crear, con qué parámetros, en qué orden.
> - **Post-execution** (escrito después): qué se creó realmente, IDs / resource names, errores si los hubo, próximos pasos.

---

## PRE-EXECUTION (2026-04-29 PM)

### Estado de la cuenta antes

- Customer: `8895126127` Smooth Fence USA (vía MCC `9897585666`)
- Campañas activas/pausadas:
  - `23737136551` — "Get a Free Estimate Today" — **PAUSED** — Performance Max (la que pausamos en el AM)
- No hay otras campañas, ad groups, ni shared sets relevantes para el plan.
- Conversion goals account-default: "Submit lead form" como Primary (configurado previamente, las nuevas campañas heredan).

### Plan (5 mutations en orden)

#### Mutation 1 — Shared negative keyword list

`gads_create_shared_negative_list`:
- **name:** `Master Negatives - Fence`
- **keywords:** ~75 negativas de la sección C de `EXEC-2026-04-29-google-ads-setup.md`. Mix de phrase y exact match. Categorías: DIY/repair/parts, ranking adversaries (home depot/lowes), out-of-area cities (tampa/miami/orlando…), wrong-intent (rental/jobs/free/cheap/images), wrong-product (electric/invisible/dog fence/temporary/horse/farm/agricultural).

#### Mutations 2-4 — 3 Search campaigns

Las 3 con `gads_create_search_campaign`. Defaults shared:
- `bidding_strategy="MAXIMIZE_CONVERSIONS"` (sin tCPA — esperamos 14 días con data antes de migrar a Target CPA)
- `network_search_partners=False`, `network_content=False` (Search-only)
- `location_targeting_setting="PRESENCE"` (gente en/regularmente en el área, NO "interesada en")
- `language_constants=["languageConstants/1000", "languageConstants/1003"]` (English + Spanish)
- `status="PAUSED"` (default — review antes de enable)

| # | name | Budget/d | Geo location names | Final URL | Display path | Keywords | Headlines |
|---|---|---|---|---|---|---|---|
| 2 | Search · Jacksonville · Fence | $20.00 | Jacksonville FL · Atlantic Beach FL · Jacksonville Beach FL · Neptune Beach FL | `https://smoothfenceusa.com/lp/fence-jacksonville` | `jacksonville` / `fence-quote` | 16 (mix exact/phrase) | 15 (2 pinned: H1 "Fence Installation in Jacksonville", H2 "Free Estimate in 60 Seconds") |
| 3 | Search · St. Augustine · Fence | $15.00 | St. Augustine FL · Ponte Vedra FL · St. Johns FL · Vilano Beach FL | `https://smoothfenceusa.com/lp/fence-st-augustine` | `st-augustine` / `fence-quote` | 15 | 15 (2 pinned con "St. Augustine") |
| 4 | Search · Daytona · Fence | $15.00 | Daytona Beach FL · Ormond Beach FL · Port Orange FL · Holly Hill FL · Deltona FL | `https://smoothfenceusa.com/lp/fence-daytona` | `daytona` / `fence-quote` | 16 | 15 (2 pinned con "Daytona Beach") |

Headlines + descriptions: copy de la sección D del doc EXEC, con `[CITY]` reemplazado por el nombre exacto.

#### Mutation 5 — Apply shared negatives

`gads_apply_shared_negative_list(shared_set_resource_name=<de mut.1>, campaign_ids=[<2>, <3>, <4>])`.

### Costo si quedaran enable

$50/día = $1,500/mes proyectado. **Pero quedan PAUSED** hasta verificación manual + decisión explícita de Fede.

### Validación post-write

Después de las 5 mutations, query GAQL para confirmar:

```
SELECT campaign.id, campaign.name, campaign.status,
       campaign_budget.amount_micros, campaign.bidding_strategy_type
FROM campaign
WHERE campaign.status != 'REMOVED' AND campaign.name LIKE 'Search · %'
ORDER BY campaign.id
```

Esperado: 3 filas, todas PAUSED, budgets `$20M / $15M / $15M` (en micros).

---

## POST-EXECUTION (2026-04-29 PM)

✅ **Las 5 mutations completadas.** Las 3 campañas existen en estado PAUSED, con geo + lang + ad group + keywords + RSA + master negatives atadas. RSAs en REVIEW_IN_PROGRESS (Google las revisa en ~1 día hábil).

### Resource names creados

| # | Recurso | ID | Detalles |
|---|---|---|---|
| 1 | Shared negative list (reused) | `12067614968` | "Master Negatives - Fence", 68 keywords. Ya existía con el contenido correcto — saltamos creación. |
| 2 | Campaign Jacksonville | `23805497162` | budget id 15550638940 ($20M micros = $20/d), ad_group 199164637674, RSA 199164637674~807147531039 |
| 3 | Campaign St. Augustine | `23809955914` | budget id 15540790022 ($15M = $15/d), ad_group 193294287582, RSA 193294287582~807260974775 |
| 4 | Campaign Daytona | `23805497228` | budget id 15545391576 ($15M = $15/d), ad_group 195730939603, RSA 195730939603~807147531246 |
| 5 | Apply Master Negatives → 3 campaigns | — | 3 CampaignSharedSet links: `23805497162~12067614968`, `23809955914~12067614968`, `23805497228~12067614968` |

### Geo targets resolvidos (13 ubicaciones)

| Campaign | Geo IDs | Canonical names |
|---|---|---|
| Jacksonville | 200561, 1014950, 1015068, 1015131 | Jacksonville FL (DMA-level), Atlantic Beach FL, Jacksonville Beach FL, Neptune Beach FL |
| St. Augustine | 1015203, 1015177, 9057301, 9191867 | St. Augustine FL, Ponte Vedra Beach FL, St. Johns County FL, Vilano Beach FL |
| Daytona | 1015001, 1015151, 1015179, 9052146, 1015008 | Daytona Beach FL, Ormond Beach FL, Port Orange FL, Holly Hill FL, Deltona FL |

> **Nota Jacksonville:** Google resolvió "Jacksonville, FL" al ID `200561` que es el target DMA-level (más amplio que el city-only). En la práctica es mejor para volumen de búsqueda — captura toda el área de Jacksonville.
>
> **Nota St. Augustine:** "St. Johns" resolvió a "St. Johns County" (county-level), broader que el city. Bueno para captar Ponte Vedra y zonas residenciales adyacentes.

### Setup verificado por campaña

Las 3 campañas tienen idénticamente:
- **Languages:** English (1000) + Spanish (1003) ✓
- **Bidding strategy:** MAXIMIZE_CONVERSIONS ✓
- **Status:** PAUSED ✓
- **Channel:** SEARCH ✓
- **Network settings:** Search-only (no Display partners, no Search partners, no content) ✓
- **EU political advertising:** DOES_NOT_CONTAIN ✓
- **Location targeting:** PRESENCE (people in/regularly in area) ✓

### RSA contents (idéntico a las 3 con [CITY] reemplazado)

**Headlines (15)** — H1 y H2 pinned:
1. `Fence Pros in [CITY]` — pinned HEADLINE_1
2. `Free Estimate in 60 Seconds` — pinned HEADLINE_2
3. `Licensed & Insured FL`
4. `Vinyl, Aluminum & Wood`
5. `Same-Day Quote Promise`
6. `24-Hour Site Visit`
7. `Trusted Local Pros`
8. `Financing Available`
9. `Free On-Site Visit`
10. `Privacy Fences [CITY]`
11. `Local Florida Fence Pros`
12. `HOA & Permits Handled`
13. `1-3 Day Installation`
14. `No-Pressure Estimate`
15. `Get Your [CITY] Quote`

**Descriptions (4):**
1. "Free, no-pressure estimate. Licensed & insured local FL team. Financing available."
2. "Serving [CITY]. Vinyl, aluminum, wood, chain-link. Same-day quote promise."
3. "Permits + HOA handled. 1-3 day installation. Free, no-obligation quote."
4. "Pre-qualify for Hearth financing in 60 seconds. No credit hit. Free [CITY] quote."

### Diferencias vs el plan original (EXEC-2026-04-29-google-ads-setup.md)

Cambios necesarios para cumplir RSA limits y Google Ads policies:

| Original (rechazado) | Final (aprobado) | Motivo |
|---|---|---|
| `Fence Installation in [CITY]` (34 chars) | `Fence Pros in [CITY]` | RSA headline ≤30 chars |
| `(386) 403-9460` headline | `Free On-Site Visit` | Google prohibe phone numbers en ad text — solo en Call Extensions |
| `5.0 Stars · 19 Reviews` | `Trusted Local Pros` | Rating claims requieren Seller Ratings verification |
| `Long headlines` (no soportado en RSA) | n/a — eliminados | RSA solo tiene `headlines` y `descriptions` |
| Descriptions de ~130 chars | Reescritas a ≤90 chars | RSA description limit |
| `5.0 stars on Google` en description | "Free, no-obligation quote" | Mismo motivo que headline |

### Errores resueltos durante la ejecución

1. **DUPLICATE_NAME** en shared set — la lista "Master Negatives - Fence" ya existía con los 68 keywords correctos (probablemente de un intento anterior o creación manual). Solución: detectar y reusar.
2. **EU political advertising required** — campos `contains_eu_political_advertising` faltante. Fix permanente en `server.py`: setear a `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING`.
3. **`partial_failure` no es kwarg** en v22+ del SDK. Fix permanente en `server.py`: usar el patrón Request object (`MutateXxxRequest` con `.partial_failure = True`).
4. **PROHIBITED policy finding** en RSA — phone number + rating claims. Fix: copy reescrito.
5. **Bug en error formatter** (`WhichOneof` no existe en proto-plus). Fix permanente en `server.py`: usar `str(err.error_code)` en vez de `WhichOneof`.
6. **Orphan budgets/campaigns** de runs fallidos — limpiados manualmente con `mutate_*` operations con `.remove`.

Todos los fixes en `~/.claude/mcp/google-ads/server.py` quedan persistentes para futuras ejecuciones.

### Ad extensions aplicadas (2026-04-29 PM tarde)

`gads_apply_extensions_to_campaign` (nuevo tool agregado al MCP) corrió 3 veces, una por campaña. Resultado: **36 asset-link operations exitosas** (12 por campaña × 3) — sitelinks, callouts, structured snippets. **Call extensions falló por ToS pendiente** (1 error por campaña).

#### Lo que se linkeó a las 3 campañas

**3 Sitelinks por campaña** (URLs LP-specific via slug):
| Title | Description 1 | Description 2 | Final URL |
|---|---|---|---|
| Get Free Estimate | Submit form, reply same day | 24-hour site visit | `/lp/fence-{slug}#lp-form` |
| Financing Options | Pre-qualify in 60 seconds | No credit impact | `/financing` (shared) |
| Free Estimator | See your price range | Pick material + length | `/lp/fence-{slug}#estimator` |

**8 Callouts por campaña** (mismo set en las 3):
- Licensed & Insured · Free Estimate · Same-Day Quote · 24-Hour Site Visit · Financing Available · HOA & Permits Handled · 1-3 Day Installation · Trusted Local Pros

**1 Structured Snippet por campaña** (mismo set):
- Header: `Service catalog` · Values: Vinyl Fence, Aluminum Fence, Wood Fence, Chain-Link, Privacy Fence, Pool Fence, Ornamental, Picket

Diferencias vs el plan original:
- "Reviews" sitelink eliminado (linkeaba a página con rating claim — policy risk).
- Callout "5.0 Stars · 19 Reviews" reemplazado por "Trusted Local Pros" (rating claim sin Seller Ratings).

#### Call extension — RESUELTO 2026-04-29 PM tarde ✅

Fede aceptó el ToS de call recording en la UI. El CallAsset (id `347892165150`, phone `3864039460`) se creó vía API y está linkeado a las 3 campañas. Las 3 ahora tienen 13 extensions cada una (3 sitelinks + 8 callouts + 1 structured snippet + 1 call).

Lección persistida: el ToS de call recording es estrictamente UI-only. No hay API method para aceptarlo. Confirmado por Google Ads API Forum Advisor. Una vez aceptado, persiste para siempre y todos los futuros CallAsset via API funcionan. Detalle en memoria en `feedback_google_ads_automation.md`.

---

### Auditoría completa 2026-04-29 PM tarde — verdict ✅

Auditoría end-to-end pasada (ver "Auditoría — ¿pueden las 3 campañas generar leads?" en chat):
- Tracking GA4→Ads import OK (lead_form_submit primary, 6 conv en 30d desde PMax = pipeline live)
- 3 RSAs APPROVED, 47 keywords APPROVED, no broad
- 13 extensions × 3 campañas (incluido Call ya destrabado)
- LP form `LpHeroForm.tsx` validado en producción por Fede (Jacksonville E2E test passed)
- Search-only network, PRESENCE geo, EN+ES, MAX_CONV bidding

**Riesgos conocidos asumidos:**
- MAX_CONV con solo 6 conversiones de baseline = learning phase 14-21 días con CPA alta inicial
- Budget $50/d marginal para 3 campañas paralelas — proyección steady-state ~25-35 leads/mes
- Conversion value mismatch: lead_form_submit default $1, pero Request quote $50. Fix futuro.

**Plan semana 1 (lead gen multicanal):** ver `EXEC-2026-04-29-week1-leadgen-plan.md`. Estrategia: NO depender solo de Google Ads paid en semana 1 (learning phase). Paralelizar con LSA application + Meta Lead Ads + GBP + referidos.

### Acciones ejecutadas 2026-04-29 PM tarde

1. Jacksonville budget bumpeada: $20/d → $30/d (más volumen donde más volume hay).
2. Las 3 campañas: status PAUSED → ENABLED.
3. Server `gads_update_campaign_budget` agregado para futuras edits.

### Acciones ejecutadas 2026-04-30 — fix MAX_CONV cold-start (intento 1)

Diagnóstico post-48h enabled: 11 impresiones totales en 3 campañas, $0 spend, 0 clicks.
- `search_budget_lost_impression_share`: 0% (NO es budget)
- `search_rank_lost_impression_share`: 75-90% (RANK = bid muy bajo)
- 16 de 47 keywords en RARELY_SERVED

**Root cause:** MAX_CONV cold-start trap. Solo 6 conversiones históricas (PMax) — Google considera insuficientes para predecir bids correctamente, bidea ultra-conservador, no gana subastas, no acumula data, loop infinito.

**Fix intentada (NO funcionó):** las 3 campañas → **TARGET_IMPRESSION_SHARE** (TOP_OF_PAGE 60%, $4 max CPC ceiling).

**Server tool agregado:** `gads_update_bid_strategy(campaign_id, strategy, ...)` para switcheable entre MANUAL_CPC, TARGET_IMPRESSION_SHARE, MAXIMIZE_CONVERSIONS, TARGET_CPA, MAXIMIZE_CONVERSION_VALUE.

### Acciones ejecutadas 2026-05-01 PM — fix definitiva

Re-diagnóstico tras otras 24h con TARGET_IMPRESSION_SHARE: las campañas SEGUÍAN sin entregar (~9-10 impresiones más en 24h adicionales). `search_rank_lost_impression_share` sigue en 75-90%.

**Smoking gun:** el `effective_cpc_bid_micros` (lo que Google realmente bidea en la subasta) era **$0.01 (10,000 micros)** en cada keyword, a pesar del ceiling de $4. **TARGET_IMPRESSION_SHARE tenía el MISMO cold-start trap que MAX_CONV.** Sin data histórica, Google bidea ultraconservador aunque el ceiling sea $4.

**Fix aplicada hoy (verificada via API):**
- Las 3 campañas: `bidding_strategy_type` → **MANUAL_CPC** (vía field mask `manual_cpc.enhanced_cpc_enabled` con valor `False` — el path correcto que Google acepta tras la deprecation de eCPC en Oct 2024).
- Las 3 ad groups: `cpc_bid_micros` → **$4.00/click** explícito.
- `effective_cpc_bid_micros` confirmado en $4M en TODAS las keywords post-fix.

**Por qué funciona:** MANUAL_CPC bypasea todos los algoritmos de Google. Vos le decís "bidea exactamente $4", lo hace. Cero learning phase.

**Persistencia:**
- `~/.claude/mcp/google-ads/server.py` — `gads_update_bid_strategy` actualizado con la fix correcta del MANUAL_CPC switch.
- Memoria global con el patrón completo del cold-start trap (también aplica a TARGET_IMPRESSION_SHARE).

**Issues conocidos pendientes (no críticos):**
1. **Ad Strength: POOR** en las 3 RSAs. No bloquea serving pero suprime Quality Score y aumenta CPC. Solucionable agregando 5-10 headlines más / mejorando descriptions. Abordar si delivery sigue lento o CPC alto.
2. **Quality Score: 3/10** en al menos una keyword. Mejora automáticamente con impresiones + clicks reales.

**Esperado próximas horas:** delivery debería subir a 100-300 impresiones/día por campaña una vez Google reciba las nuevas pujas. Primer click en ~2-4 horas. Decisión de seguir / cambiar tras 24h con data real.

### Acciones ejecutadas 2026-05-05 PM — Opción B (cleanup + concentrar Jacksonville)

**Diagnóstico tras 7 días con MANUAL_CPC + $4 bid (4 días después de la fix definitiva):**
- Total: 34 impresiones, **2 clicks**, **$7.90 spend**, 0 conversiones — para las 3 campañas combinadas con $60/d budget combinado.
- Jacksonville: 17 impr / 2 clicks / $7.90 / CTR 11.8% — único signal de delivery real, único click pagado.
- Daytona: 12 impr / 0 clicks / $0.
- St. Augustine: 5 impr / 0 clicks / $0.
- `search_rank_lost_impression_share` sigue en 74-88% en las 3 — **bid OK pero Ad Rank bajo por Quality Score insuficiente** (Ad Strength POOR + 22 de 47 keywords RARELY_SERVED + cuenta sin historia).

**Acciones aplicadas (script `/tmp/option_b_cleanup.py`):**
1. **Daytona campaign 23805497228 → PAUSED.** 0 clicks en 7d, sin valor.
2. **St. Augustine campaign 23809955914 → PAUSED.** Misma situación.
3. **Jacksonville budget $30/d → $15/d.** Cap de pérdida ahora $105/sem (vs $210 antes).
4. **3 keywords RARELY_SERVED en Jacksonville pausadas:** "fence installation atlantic beach", "free fence estimate jacksonville", "vinyl fence jax". Eran drag al QS del ad group.
5. **4 negativas competidoras agregadas** a Master Negatives shared list (12067614968 → 72 keywords): "aaa fence", "aaa fence daytona", "fence depot", "depot fence" (vistas en search terms reports).
6. **Segunda RSA creada en Jacksonville** (id 807947403260): 15 headlines hiper-locales (Mandarin, San Marco, Riverside, Avondale, Beaches) + 4 descriptions con value props locales. H1 + H2 pinned. Goal: Ad Strength Good/Excellent → QS arriba → más subastas ganadas. Status: REVIEW_IN_PROGRESS al momento del commit (Google aprueba en 1-24h).

**Estado final post-cleanup:**
- Solo Jacksonville activa, $15/d cap, 2 RSAs serving (la vieja con Strength POOR aprobada + la nueva en review apuntando a Strength Good).
- Compromiso semanal real ahora: ~$30-100/sem (probable spend real con QS mejor) + budget headroom de $105/sem.

### Decision day — 2026-05-12 (7 días desde cleanup)

**Targets para mantener Jacksonville:**
- ≥10 clicks acumulados
- ≥1 conversión (lead form, phone call, o cualquier signal del nuevo `lib/track.ts`)
- search_rank_lost_impression_share <60% (vs 88% actual)
- Ad Strength de la nueva RSA: Good o Excellent

**Branches de decisión:**
- **GO:** si los 4 targets se cumplen → mantener Jacksonville, considerar duplicar el cleanup pattern a Daytona y St. Augustine y re-enablar.
- **NO-GO:** si <10 clicks O 0 conversiones → pausar Jacksonville también. Concentrarse 100% en **Meta Lead Ads** (Opción C — MCP en construcción) + **LSA** (pendiente application Fede) + **GBP optimization**.
- **Re-attempt Search:** en 3-6 meses cuando la cuenta tenga authority signal de los otros canales.

### Próxima sesión — qué revisar

```python
gads_get_campaign_metrics(days=7, campaign_ids=[23805497162])
```

Plus checkear Ad Strength de la RSA 807947403260 (debería estar aprobada con Strength Good o Excellent).

### Próximo paso — REVISIÓN MANUAL EN UI antes de enable (HISTÓRICO — ya enabled)

Ir a https://ads.google.com/aw/campaigns y verificar:

1. **Las 3 campañas Search aparecen como PAUSED** (no ENABLED).
2. **Conversion goal** — abrir cada campaña → Settings → Goals. Debería estar heredado del account default ("Submit lead form" como Primary). Si no lo heredó, click "Use account-default goals".
3. **Geo targeting** — Settings → Locations. Verificar que muestre las ciudades correctas (especialmente que Jacksonville sea el DMA y St. Johns sea County).
4. **Budget** — Settings → Budget. $20 / $15 / $15 según campaña.
5. **Languages** — English + Spanish.
6. **Network** — Search only (no Search Partners, no Display).
7. **RSA Strength** — Ad Strength panel del ad. Probablemente "Average" (15 headlines + 4 descriptions completas + paths). Si es "Poor", ver qué falta.
8. **RSA review status** — al lado del ad debería decir "Eligible" o "Under review". En 1-3 horas (a veces hasta 24h) Google aprueba o pide cambios.
9. **Negative keywords** — Keywords → Negative keywords. Debería mostrar el shared set "Master Negatives - Fence" (68 negativas) atado.
10. **Sin extensions todavía** (sitelinks, callouts, call, structured snippets) — agregarlas en la UI o pedirme que extienda el server con tools de extensions.

### Para enable

Cuando estés conforme con el setup:
- Vía MCP: pedirme `gads_enable_campaign(campaign_id=23805497162)` y igual para los otros 2 IDs.
- Vía UI: toggle de cada campaña a Enabled.

Una vez enabled empieza el gasto. Daily budget combinado = **$50/d**, proyectado **$1,500/mes**.

