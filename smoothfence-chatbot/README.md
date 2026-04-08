# Smooth Fence Chatbot — Fency

Chatbot bilingüe (ES/EN) con IA real para Smooth Fence USA. Su objetivo principal es guiar visitantes hacia un estimado de cerca, capturar leads y dar handoff a humano. Es **un proyecto independiente** que se integra a la web con **una sola línea de código**.

## Stack

- **Next.js 14** (App Router) + **Tailwind CSS**
- **Anthropic Claude Haiku 4.5** (~$0.001 por conversación típica)
- **Supabase** (Postgres + Auth)
- TypeScript

## Estructura

```
app/
├── api/
│   ├── chat/route.ts          → endpoint principal del chat
│   └── history/route.ts       → historial por sesión
├── admin/                     → panel admin protegido
│   ├── page.tsx               → login + dashboard
│   ├── chats/page.tsx         → conversaciones
│   ├── leads/page.tsx         → leads capturados
│   └── knowledge/page.tsx     → editor de KB
├── embed/                     → widget standalone para iframe
├── widget.js/route.ts         → snippet embebible
└── page.tsx                   → demo local

components/
└── ChatWidget.tsx             → burbuja flotante (auto-abre 5s)

lib/chatbot/
├── core/
│   ├── engine.ts              → motor de chat con tool use loop
│   └── language.ts            → detección ES/EN
├── modules/
│   ├── lead.ts                → captura lead (tool use)
│   └── handoff.ts             → WhatsApp + teléfono
├── knowledge/
│   ├── types.ts               → tipos de la KB
│   └── loader.ts              → cargar/guardar KB
├── prompts/
│   └── system.ts              → system prompts bilingües
└── db/
    ├── server.ts              → cliente Supabase server
    ├── browser.ts             → cliente Supabase navegador
    └── schema.sql             → schema completo (correr en Supabase)
```

---

## Setup paso a paso

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear cuenta en Anthropic y obtener API key

1. Andá a https://console.anthropic.com y registrate.
2. Settings → Billing → cargá $5 (alcanza para miles de conversaciones).
3. Settings → API keys → "Create key" → copiala (`sk-ant-...`).

### 3. Crear cuenta y proyecto en Supabase

1. Andá a https://supabase.com y creá una cuenta (free).
2. "New project":
   - Name: `smoothfence-chatbot`
   - Database password: generá uno fuerte y guardalo
   - Region: la más cercana a tus usuarios (US East para Florida)
3. Esperá ~2 minutos a que se aprovisione.
4. Una vez listo, andá a **SQL Editor → New query**, pegá todo el contenido de
   `lib/chatbot/db/schema.sql` y dale **Run**. Esto crea las tablas y políticas.
5. Andá a **Authentication → Users → Add user → Create new user**:
   - Email: tu email de admin
   - Password: el que vayas a usar para entrar al panel
   - **Auto Confirm User**: ON
6. Andá a **Settings → API** y copiá:
   - `Project URL` → va en `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → va en `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` (¡secreta!) → va en `SUPABASE_SERVICE_ROLE_KEY`

### 4. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Editá `.env.local` con todos los valores reales. **Nunca lo commitees** (ya está en `.gitignore`).

### 5. Correr en local

```bash
npm run dev
```

- http://localhost:3000 → demo del widget (Fency aparece a los 5s)
- http://localhost:3000/admin → login del panel

---

## Cómo funciona

### El motor del chat (`lib/chatbot/core/engine.ts`)

Cada mensaje del usuario:

1. Crea/actualiza la sesión en `chat_sessions`
2. Persiste el mensaje en `chat_messages`
3. Carga el historial reciente (últimos 30) y la knowledge base
4. Construye el system prompt bilingüe
5. Llama a Claude Haiku 4.5 con la herramienta `save_lead` disponible
6. Si Claude decide capturar el lead, ejecuta el tool y vuelve a llamar
7. Persiste la respuesta y la devuelve al cliente

### Captura de lead

Fency está instruido para conseguir **nombre, teléfono, email y zip** durante la conversación, **sin pedirlos como un formulario**. Cuando los tiene, llama a la herramienta `save_lead` (definida en `lib/chatbot/modules/lead.ts`) que los guarda en la tabla `leads`.

### Knowledge base editable

Hay una sola fila `knowledge_base.id = 'main'` con un JSONB. La editás desde
`/admin/knowledge` sin tocar código. Fency la lee en cada turno (podés agregar
caché después si querés ahorrar latencia).

### Persistencia de sesión

El widget guarda un `session_id` (uuid) en `localStorage`. Si el usuario vuelve, retoma la conversación exactamente donde la dejó.

---

## Integración con la web Smooth Fence USA

Cuando esté listo, deployás este proyecto (Vercel es lo más fácil) y luego en
la web original agregás **una sola línea** al final del `<body>`:

```html
<script src="https://TU-DEPLOY.vercel.app/widget.js" defer></script>
```

Eso es todo. El script inyecta un iframe transparente con el widget. No toca
estilos ni JS de la web.

### Pre-llenar el estimador

Cuando Fency captura el lead, el siguiente paso natural es ofrecer un link al
estimador real de Smooth Fence USA (variable `NEXT_PUBLIC_ESTIMATOR_URL`). Si
querés pre-llenar el formulario, podés pasar query params con los datos:

```
https://smoothfenceusa.com/estimator?name=...&phone=...&email=...&zip=...
```

Eso depende de cómo esté hecho el estimador en la otra app — lo ajustamos
cuando integremos.

---

## Costos estimados

- **Claude Haiku 4.5**: ~$1 por 1.000 conversaciones promedio (10 turnos cada una)
- **Supabase free tier**: 500MB DB, 50.000 MAU auth → más que suficiente para empezar
- **Vercel free / Hobby**: gratis para sitios pequeños

Total para empezar: **$5 de crédito Anthropic + $0 todo lo demás**.

---

## Próximos pasos sugeridos (cuando crezca)

- Agregar caché de KB en memoria (1 minuto) para ahorrar reads
- Streaming de respuestas (SSE) en lugar de espera completa
- Notificaciones por email cuando entra un lead nuevo (Resend / SendGrid)
- Métricas: nº de conversaciones, tasa de captura, tiempo promedio
- Integración con CRM (HubSpot / GoHighLevel)
- Editor visual de KB en vez de JSON

---

## Comandos útiles

```bash
npm run dev      # desarrollo local
npm run build    # build producción
npm run start    # correr build
npm run lint     # linter
```
