import { LocalizedText } from '@/lib/i18n/dictionaries';
import { TrackSlug } from '@/lib/curriculum/affiliates';

export type ExerciseFormat =
  | 'multiple_choice'
  | 'ordering'
  | 'simulation'
  | 'error_identification';

export interface LessonExercise {
  id: string;
  format: ExerciseFormat;
  badge: LocalizedText;
  flashInsight?: LocalizedText;
  contextCodeOrCard?: {
    label: LocalizedText;
    content: LocalizedText;
    mono?: boolean;
  };
  prompt: LocalizedText;
  // For multiple_choice, simulation, error_identification:
  options?: {
    id: string;
    label: LocalizedText;
    sublabel?: LocalizedText;
  }[];
  correctOptionId?: string;
  // For ordering (Prompt / Code / Funnel builder):
  pieces?: {
    id: string;
    text: LocalizedText;
  }[];
  correctOrderIds?: string[];
  explanation: LocalizedText;
  xpReward: number;
}

export interface ActionMission {
  id: string;
  title: LocalizedText;
  objective: LocalizedText;
  steps: LocalizedText[];
  affiliateToolSlug: string;
  xpBonus: number;
}

export interface CurriculumLesson {
  slug: string;
  unitSlug: string;
  trackSlug: TrackSlug;
  orderIndex: number;
  title: LocalizedText;
  subtitle: LocalizedText;
  durationMin: number;
  xpReward: number;
  isProPreview?: boolean;
  exercises: LessonExercise[];
  actionMission: ActionMission;
}

export interface CurriculumUnit {
  slug: string;
  trackSlug: TrackSlug;
  orderIndex: number;
  title: LocalizedText;
  description: LocalizedText;
  lessons: CurriculumLesson[];
}

export interface CareerTrack {
  slug: TrackSlug;
  supabaseWorldSlug: 'ai' | 'programming' | 'business';
  accent: string;
  accentLip: string;
  accentWash: string;
  accentInk: string;
  accentSoft: string;
  badgeCode: string;
  name: LocalizedText;
  shortTag: LocalizedText;
  description: LocalizedText;
  outcomes: LocalizedText[];
  heroChallenge: LessonExercise;
  units: CurriculumUnit[];
}

export const CAREER_TRACKS: CareerTrack[] = [
  // =========================================================================
  // TRACK 1: AI & AUTOMATION
  // =========================================================================
  {
    slug: 'ai-automation',
    supabaseWorldSlug: 'ai',
    accent: '#1CB0F6',
    accentLip: '#1899D6',
    accentWash: '#DDF4FF',
    accentInk: '#FFFFFF',
    accentSoft: 'rgba(28, 176, 246, 0.12)',
    badgeCode: '01 · AI',
    name: { es: 'AI & Automation', en: 'AI & Automation' },
    shortTag: { es: 'Prompts, Flujos & Agentes', en: 'Prompts, Workflows & Agents' },
    description: {
      es: 'Diseña prompts deterministas, orquesta flujos con Make/n8n y construye agentes IA que ahorran decenas de horas o se venden B2B.',
      en: 'Design deterministic prompts, orchestrate Make/n8n workflows, and ship AI agents that save hours or sell to B2B clients.',
    },
    outcomes: [
      { es: 'Framework R-C-T-F de prompting profesional', en: 'R-C-T-F production prompting framework' },
      { es: 'Pipelines con Webhooks + JSON estructurado', en: 'Webhooks + structured JSON AI pipelines' },
      { es: 'Agentes de atención y calificación de leads', en: '24/7 AI lead-qualification & support agents' },
    ],
    heroChallenge: {
      id: 'hero-ai',
      format: 'simulation',
      badge: { es: 'DUELO DE PROMPTS A/B', en: 'A/B PROMPT DUEL' },
      prompt: {
        es: 'Necesitas que un modelo IA clasifique tickets de soporte y los envíe a una base de datos automática sin romperse. ¿Qué prompt usas en producción?',
        en: 'You need an LLM to classify support tickets and insert them into an automated database without breaking. Which prompt goes into production?',
      },
      options: [
        {
          id: 'a',
          label: {
            es: 'Opción A: "Lee este mensaje del cliente y dime si es urgente y de qué trata por favor."',
            en: 'Option A: "Read this customer message and tell me if it is urgent and what it is about please."',
          },
          sublabel: { es: 'Texto libre conversacional', en: 'Conversational free-text' },
        },
        {
          id: 'b',
          label: {
            es: 'Opción B: "Actúa como clasificador. Devuelve SOLO JSON válido con {category: billing|bug|sales, priority: 1-5}."',
            en: 'Option B: "Act as a router. Return ONLY valid JSON matching {category: billing|bug|sales, priority: 1-5}."',
          },
          sublabel: { es: 'Salida determinista estructurada', en: 'Deterministic structured output' },
        },
      ],
      correctOptionId: 'b',
      explanation: {
        es: 'En automatizaciones reales, el texto libre rompe los nodos siguientes. Exigir un esquema JSON cerrado convierte un chat en una pieza de software fiable.',
        en: 'In real automations, conversational prose breaks downstream nodes. Enforcing a strict JSON schema turns a chatbot into reliable software.',
      },
      xpReward: 15,
    },
    units: [
      {
        slug: 'ai-unit-1',
        trackSlug: 'ai-automation',
        orderIndex: 1,
        title: { es: 'Arquitectura de Prompts de Producción', en: 'Production Prompt Architecture' },
        description: {
          es: 'Pasa de "chatear con IA" a diseñar instrucciones precisas y salidas estructuradas.',
          en: 'Move from casual chatting to deterministic instructions and structured outputs.',
        },
        lessons: [
          {
            slug: 'ai-rctf-framework',
            unitSlug: 'ai-unit-1',
            trackSlug: 'ai-automation',
            orderIndex: 1,
            title: { es: 'El Sistema R-C-T-F', en: 'The R-C-T-F System' },
            subtitle: { es: 'Rol, Contexto, Tarea y Formato de salida', en: 'Role, Context, Task & Output Format' },
            durationMin: 4,
            xpReward: 30,
            exercises: [
              {
                id: 'ai-1-1-ex1',
                format: 'multiple_choice',
                badge: { es: 'CONCEPTO CLAVE', en: 'CORE INSIGHT' },
                flashInsight: {
                  es: 'El 90% de respuestas mediocres de la IA ocurren por ambigüedad de contexto y falta de restricciones de formato. El estándar profesional es R-C-T-F: Rol → Contexto → Tarea → Formato.',
                  en: '90% of mediocre AI outputs stem from missing context and format constraints. Production operators use R-C-T-F: Role → Context → Task → Format.',
                },
                prompt: {
                  es: '¿Por qué definir el "Formato" (ej. tabla Markdown o JSON con límites exactos) es crítico al usar IA en negocios?',
                  en: 'Why is defining the exact "Format" (e.g., strict JSON or word-capped Markdown) critical in business workflows?',
                },
                options: [
                  {
                    id: 'opt1',
                    label: {
                      es: 'Hace que el resultado sea predecible, accionable y conectable con otras herramientas.',
                      en: 'It makes outputs predictable, actionable, and ready to pipe into other tools.',
                    },
                  },
                  {
                    id: 'opt2',
                    label: {
                      es: 'Solo sirve para que el modelo responda más despacio.',
                      en: 'It only forces the model to respond slower.',
                    },
                  },
                  {
                    id: 'opt3',
                    label: {
                      es: 'Evita tener que explicar cuál es la tarea.',
                      en: 'It removes the need to specify the task.',
                    },
                  },
                ],
                correctOptionId: 'opt1',
                explanation: {
                  es: 'Sin formato explícito, el modelo improvisa introducciones largas ("¡Claro! Aquí tienes..."). Definir formato ahorra edición humana y permite automatizar.',
                  en: 'Without explicit formatting, models add filler intros ("Sure! Here is..."). Strict formats eliminate manual editing and enable automation.',
                },
                xpReward: 10,
              },
              {
                id: 'ai-1-1-ex2',
                format: 'ordering',
                badge: { es: 'PROMPT BUILDER', en: 'PROMPT BUILDER' },
                prompt: {
                  es: 'Construye un prompt profesional siguiendo el orden exacto R → C → T → F:',
                  en: 'Assemble this production prompt following the exact R → C → T → F sequence:',
                },
                pieces: [
                  {
                    id: 'p-role',
                    text: { es: '[ROL] Actúa como Copywriter B2B SaaS senior.', en: '[ROLE] Act as a senior B2B SaaS copywriter.' },
                  },
                  {
                    id: 'p-ctx',
                    text: { es: '[CONTEXTO] Vendemos software contable a clínicas dentales.', en: '[CONTEXT] We sell accounting software to dental clinics.' },
                  },
                  {
                    id: 'p-task',
                    text: { es: '[TAREA] Redacta 3 asuntos de email enfocados en ahorro fiscal.', en: '[TASK] Write 3 cold email subject lines focused on tax savings.' },
                  },
                  {
                    id: 'p-fmt',
                    text: { es: '[FORMATO] Devuelve JSON array de strings, máx 45 caracteres cada uno.', en: '[FORMAT] Return a JSON string array, max 45 chars each.' },
                  },
                ],
                correctOrderIds: ['p-role', 'p-ctx', 'p-task', 'p-fmt'],
                explanation: {
                  es: 'Primero anclas la perspectiva experta (Rol), acotas la realidad del negocio (Contexto), ordenas la acción (Tarea) y blindas la entrega (Formato).',
                  en: 'Anchor expertise first (Role), narrow business reality (Context), command the action (Task), and lock the output structure (Format).',
                },
                xpReward: 10,
              },
              {
                id: 'ai-1-1-ex3',
                format: 'error_identification',
                badge: { es: 'AUDITORÍA ANTI-ALUCINACIÓN', en: 'ANTI-HALLUCINATION AUDIT' },
                contextCodeOrCard: {
                  label: { es: 'PROMPT DE AGENTE DE SOPORTE', en: 'SUPPORT AGENT SYSTEM PROMPT' },
                  content: {
                    es: '"Eres el asistente oficial de TiendaNova. Responde SIEMPRE con seguridad todas las dudas sobre precios, envíos y garantías, incluso si no aparecen en el documento adjunto."',
                    en: '"You are NovaStore\'s official assistant. ALWAYS answer every question about pricing, shipping, and refunds confidently, even if not found in the attached docs."',
                  },
                  mono: true,
                },
                prompt: {
                  es: '¿Cuál es el fallo grave que provocará pérdidas económicas en este prompt?',
                  en: 'What is the critical flaw in this system prompt that will cause costly customer disputes?',
                },
                options: [
                  {
                    id: 'e1',
                    label: {
                      es: 'Obliga al modelo a inventar políticas y precios ("alucinar") cuando falta información.',
                      en: 'It forces the model to hallucinate fake policies and prices when data is missing.',
                    },
                  },
                  {
                    id: 'e2',
                    label: {
                      es: 'Menciona el nombre de la empresa al principio.',
                      en: 'It mentions the company name at the start.',
                    },
                  },
                  {
                    id: 'e3',
                    label: {
                      es: 'Es demasiado corto para que un LLM lo lea.',
                      en: 'It is too short for an LLM to parse.',
                    },
                  },
                ],
                correctOptionId: 'e1',
                explanation: {
                  es: 'Regla de oro en RAG/Agentes: instruye siempre una vía de escape ("Si la respuesta no está en el contexto proporcionado, responde que escalarás a un humano").',
                  en: 'Golden rule in production AI: always provide an escape hatch ("If the answer is not in the provided context, state that you will escalate to a human").',
                },
                xpReward: 10,
              },
            ],
            actionMission: {
              id: 'mission-ai-1-1',
              title: { es: 'Crea tu Plantilla Maestra R-C-T-F', en: 'Ship Your Master R-C-T-F Prompt' },
              objective: {
                es: 'Transforma una tarea repetitiva de tu día en un prompt estructurado con salida JSON lista para automatizar.',
                en: 'Turn one repetitive task from your week into a structured R-C-T-F prompt with JSON output.',
              },
              steps: [
                { es: 'Elige un proceso repetitivo (clasificar leads, resumir reuniones o crear guiones).', en: 'Pick one repetitive workflow (lead triage, meeting summaries, or ad scripts).' },
                { es: 'Escribe las 4 capas (Rol, Contexto, Tarea, Formato JSON) y pruébalo en un flujo visual.', en: 'Write all 4 layers (Role, Context, Task, JSON Format) and test it inside a workflow builder.' },
              ],
              affiliateToolSlug: 'make-automation',
              xpBonus: 25,
            },
          },
          {
            slug: 'ai-automation-pipelines',
            unitSlug: 'ai-unit-1',
            trackSlug: 'ai-automation',
            orderIndex: 2,
            title: { es: 'Flujos Automáticos & Webhooks', en: 'Automated Pipelines & Webhooks' },
            subtitle: { es: 'Conecta formularios, IA y CRM sin tocar servidores', en: 'Connect forms, LLMs & CRMs serverlessly' },
            durationMin: 5,
            xpReward: 35,
            exercises: [
              {
                id: 'ai-1-2-ex1',
                format: 'multiple_choice',
                badge: { es: 'ARQUITECTURA DE FLUJOS', en: 'WORKFLOW ARCHITECTURE' },
                flashInsight: {
                  es: 'Toda automatización rentable tiene 3 piezas: Trigger (Disparador instantáneo como un Webhook) → Procesamiento IA (transformar/decidir) → Acción (CRM, Email, Slack).',
                  en: 'Every profitable automation has 3 blocks: Trigger (instant event like a Webhook) → AI Step (classify/draft) → Action (CRM, Email, Slack).',
                },
                prompt: {
                  es: '¿Qué ventaja tiene un Webhook frente a revisar una hoja de cálculo cada 15 minutos ("Polling")?',
                  en: 'Why use an instant Webhook trigger instead of checking a spreadsheet every 15 minutes ("Polling")?',
                },
                options: [
                  {
                    id: 'w1',
                    label: {
                      es: 'Se ejecuta en <2 segundos solo cuando ocurre un evento real y no gasta operaciones vacías.',
                      en: 'It fires in <2 seconds only when an event happens and wastes zero empty operations.',
                    },
                  },
                  {
                    id: 'w2',
                    label: {
                      es: 'No requiere conexión a internet.',
                      en: 'It works without an internet connection.',
                    },
                  },
                  {
                    id: 'w3',
                    label: {
                      es: 'Escribe los textos automáticamente sin usar IA.',
                      en: 'It writes copy automatically without an LLM.',
                    },
                  },
                ],
                correctOptionId: 'w1',
                explanation: {
                  es: 'En ventas B2B, responder a un lead en menos de 60 segundos multiplica por 3.9x la conversión. Un Webhook dispara tu flujo al instante y ahorra cuota en Make/n8n.',
                  en: 'In B2B sales, responding to a lead under 60 seconds boosts conversion 3.9x. Webhooks fire instantly while saving operations quota.',
                },
                xpReward: 12,
              },
              {
                id: 'ai-1-2-ex2',
                format: 'ordering',
                badge: { es: 'PIPELINE BUILDER', en: 'PIPELINE BUILDER' },
                prompt: {
                  es: 'Ordena los nodos para construir un calificador automático de leads entrantes:',
                  en: 'Order the nodes to build an automated inbound lead qualifier:',
                },
                pieces: [
                  { id: 'n1', text: { es: '1. Webhook: recibe datos del formulario web', en: '1. Webhook: receives web form payload' } },
                  { id: 'n2', text: { es: '2.Nodo LLM: puntúa presupuesto (1-10) y redacta borrador en JSON', en: '2. LLM Node: scores budget (1-10) & drafts reply as JSON' } },
                  { id: 'n3', text: { es: '3. Router / Filtro: ¿Puntuación >= 7?', en: '3. Router / Filter: Is score >= 7?' } },
                  { id: 'n4', text: { es: '4. Slack VIP + Envío de link de agenda inmediata', en: '4. Alert VIP Slack + Send instant booking link' } },
                ],
                correctOrderIds: ['n1', 'n2', 'n3', 'n4'],
                explanation: {
                  es: 'Capturas el evento (Webhook), enriqueces/evalúas con IA, bifurcas según valor de negocio (Router) y ejecutas acción de alto impacto.',
                  en: 'Capture event (Webhook), enrich/score with AI, branch by business value (Router), and trigger high-speed action.',
                },
                xpReward: 12,
              },
              {
                id: 'ai-1-2-ex3',
                format: 'simulation',
                badge: { es: 'CASO DE RENTABILIDAD', en: 'ROI SIMULATION' },
                prompt: {
                  es: 'Una inmobiliaria tarda 6 horas en responder leads y pierde 15 citas al mes. ¿Cómo posicionas tu automatización IA para cobrar $1,200 USD?',
                  en: 'A real estate agency takes 6 hours to reply to leads, losing ~15 viewings/month. How do you price and position your AI workflow at $1,200?',
                },
                options: [
                  {
                    id: 's1',
                    label: {
                      es: '"Les instalo 4 nodos en n8n con la API de GPT en unas 3 horas."',
                      en: '"I will connect 4 n8n nodes with the GPT API in 3 hours."',
                    },
                    sublabel: { es: 'Vender características técnicas', en: 'Selling technical plumbing' },
                  },
                  {
                    id: 's2',
                    label: {
                      es: '"Instalamos un sistema de respuesta en 30 segundos 24/7 que recupera citas perdidas; con 1 sola venta cerrada se paga 5 veces."',
                      en: '"We install a 30-second 24/7 response engine to recover lost viewings — 1 extra closed deal pays for it 5x."',
                    },
                    sublabel: { es: 'Vender retorno financiero (ROI)', en: 'Selling financial ROI' },
                  },
                ],
                correctOptionId: 's2',
                explanation: {
                  es: 'Nunca vendas "nodos" ni "horas". Las empresas compran velocidad de ingresos, reducción de costes o eliminación de cuellos de botella.',
                  en: 'Never sell "nodes" or "hours". Businesses buy revenue speed, cost reduction, or bottleneck elimination.',
                },
                xpReward: 11,
              },
            ],
            actionMission: {
              id: 'mission-ai-1-2',
              title: { es: 'Despliega tu Primer Agente en n8n / Make', en: 'Deploy Your First Webhook AI Agent' },
              objective: {
                es: 'Conecta un Webhook de prueba con un nodo de IA que devuelva clasificación + respuesta personalizada.',
                en: 'Wire a test Webhook into an AI node that outputs lead score + personalized reply.',
              },
              steps: [
                { es: 'Crea un escenario nuevo con un nodo Webhook de entrada.', en: 'Create a new workflow starting with a Webhook trigger.' },
                { es: 'Añade un nodo OpenAI/Anthropic en modo JSON y filtra los casos prioritarios.', en: 'Add an LLM node in JSON mode and route high-priority leads.' },
              ],
              affiliateToolSlug: 'n8n-cloud',
              xpBonus: 25,
            },
          },
        ],
      },
      {
        slug: 'ai-unit-2',
        trackSlug: 'ai-automation',
        orderIndex: 2,
        title: { es: 'Agentes Autónomos con Herramientas', en: 'Tool-Using Autonomous Agents' },
        description: {
          es: 'Agentes capaces de consultar bases de datos, verificar disponibilidad y agendar reuniones.',
          en: 'Agents that query knowledge bases, check calendar slots, and book meetings.',
        },
        lessons: [
          {
            slug: 'ai-agents-tools',
            unitSlug: 'ai-unit-2',
            trackSlug: 'ai-automation',
            orderIndex: 3,
            title: { es: 'Agentes con Memoria y Tools', en: 'Agents with Memory & Tool-Calling' },
            subtitle: { es: 'Diferencia entre flujo lineal y agente con herramientas', en: 'Workflows vs. autonomous tool-calling agents' },
            durationMin: 5,
            xpReward: 40,
            isProPreview: true,
            exercises: [
              {
                id: 'ai-2-1-ex1',
                format: 'multiple_choice',
                badge: { es: 'ARQUITECTURA DE AGENTES', en: 'AGENT ARCHITECTURE' },
                flashInsight: {
                  es: 'Un flujo lineal sigue pasos fijos (A → B → C). Un Agente IA recibe un objetivo y decide dinámicamente qué herramienta (Tool) invocar: consultar stock, leer calendario o escalar.',
                  en: 'A workflow follows fixed rails (A → B → C). An AI Agent receives a goal and dynamically decides which Tool to call: check inventory, read calendar, or escalate.',
                },
                prompt: {
                  es: '¿Cuándo es MEJOR usar un flujo determinista simple en lugar de un agente totalmente autónomo?',
                  en: 'When is a deterministic workflow BETTER than a fully autonomous agent?',
                },
                options: [
                  {
                    id: 'ag1',
                    label: {
                      es: 'Cuando los pasos son siempre idénticos y necesitas coste mínimo y 99.9% de previsibilidad (ej. emitir facturas).',
                      en: 'When steps never vary and you need minimal cost and 99.9% predictability (e.g., invoicing).',
                    },
                  },
                  {
                    id: 'ag2',
                    label: {
                      es: 'Nunca; siempre hay que meter agentes complejos en todo.',
                      en: 'Never; complex agents should be used everywhere.',
                    },
                  },
                ],
                correctOptionId: 'ag1',
                explanation: {
                  es: 'Principio de ingeniería senior: usa el sistema más simple que resuelva el problema con fiabilidad. Reserva agentes autónomos para conversaciones abiertas.',
                  en: 'Senior engineering rule: use the simplest architecture that reliably solves the problem. Reserve autonomous agents for open-ended interactions.',
                },
                xpReward: 15,
              },
              {
                id: 'ai-2-1-ex2',
                format: 'error_identification',
                badge: { es: 'SEGURIDAD DE AGENTES', en: 'AGENT GUARDRAILS' },
                contextCodeOrCard: {
                  label: { es: 'PERMISOS DE TOOLS DEL AGENTE PÚBLICO', en: 'PUBLIC CHATBOT TOOL PERMISSIONS' },
                  content: {
                    es: 'Tools habilitadas en el widget público sin autenticación:\n- get_product_catalog()\n- check_shipping_status(order_id)\n- execute_raw_sql_delete(query)',
                    en: 'Enabled tools on unauthenticated website widget:\n- get_product_catalog()\n- check_shipping_status(order_id)\n- execute_raw_sql_delete(query)',
                  },
                  mono: true,
                },
                prompt: {
                  es: '¿Qué vulnerabilidad crítica (Prompt Injection) tiene este agente?',
                  en: 'What critical Prompt Injection vulnerability exists in this agent setup?',
                },
                options: [
                  {
                    id: 'sec1',
                    label: {
                      es: 'Un usuario malicioso puede engañar al chat para ejecutar `execute_raw_sql_delete` y borrar datos reales.',
                      en: 'A malicious visitor can prompt-inject the bot into calling `execute_raw_sql_delete` and wiping production data.',
                    },
                  },
                  {
                    id: 'sec2',
                    label: {
                      es: 'Permitir consultar el catálogo público de productos.',
                      en: 'Allowing users to read the public product catalog.',
                    },
                  },
                ],
                correctOptionId: 'sec1',
                explanation: {
                  es: 'Principio de mínimo privilegio: jamás des herramientas destructivas o sin alcance por usuario (`user_id` verificado en backend) a un LLM expuesto al público.',
                  en: 'Principle of least privilege: never expose destructive or unscoped database tools to a public-facing LLM.',
                },
                xpReward: 25,
              },
            ],
            actionMission: {
              id: 'mission-ai-2-1',
              title: { es: 'Diseña un Agente con 2 Tools Seguras', en: 'Architect a Safe 2-Tool Agent' },
              objective: {
                es: 'Configura un agente de consulta de catálogo + agendamiento con permisos de solo lectura/creación acotada.',
                en: 'Configure a catalog + booking agent with strictly scoped tool permissions.',
              },
              steps: [
                { es: 'Define el System Prompt con reglas de no-invención y límite de alcance.', en: 'Draft the System Prompt with strict grounding and scope rules.' },
                { es: 'Conecta una base de conocimiento limpia y prueba un intento de prompt injection.', en: 'Attach a clean knowledge base and red-team it against prompt injection.' },
              ],
              affiliateToolSlug: 'make-automation',
              xpBonus: 25,
            },
          },
        ],
      },
    ],
  },

  // =========================================================================
  // TRACK 2: MODERN CODING
  // =========================================================================
  {
    slug: 'modern-coding',
    supabaseWorldSlug: 'programming',
    accent: '#58CC02',
    accentLip: '#58A700',
    accentWash: '#D7FFB8',
    accentInk: '#FFFFFF',
    accentSoft: 'rgba(88, 204, 2, 0.12)',
    badgeCode: '02 · CODE',
    name: { es: 'Modern Coding', en: 'Modern Coding' },
    shortTag: { es: 'JS, APIs, SQL & Micro-SaaS', en: 'JS, APIs, SQL & Micro-SaaS' },
    description: {
      es: 'Aprende a leer, depurar y construir aplicaciones web reales con JavaScript/TypeScript, APIs, PostgreSQL y desarrollo asistido por IA.',
      en: 'Learn to read, debug, and ship real web applications with JavaScript/TypeScript, APIs, PostgreSQL, and AI-assisted coding.',
    },
    outcomes: [
      { es: 'Lógica limpia en JS/TS y estructuras de datos', en: 'Clean JS/TS logic & data structures' },
      { es: 'Consumo de APIs asíncronas y manejo de errores', en: 'Async REST APIs & resilient error handling' },
      { es: 'Arquitectura Full-Stack con Supabase + Vercel', en: 'Full-Stack SaaS shipping with Supabase + Vercel' },
    ],
    heroChallenge: {
      id: 'hero-code',
      format: 'error_identification',
      badge: { es: 'CAZA EL BUG · JAVASCRIPT', en: 'SPOT THE BUG · JAVASCRIPT' },
      contextCodeOrCard: {
        label: { es: 'checkout.ts', en: 'checkout.ts' },
        content: {
          es: 'async function applyDiscount(price) {\n  const discount = fetchDiscountFromAPI(); // tarda 300ms\n  return price - discount;\n}',
          en: 'async function applyDiscount(price) {\n  const discount = fetchDiscountFromAPI(); // takes 300ms\n  return price - discount;\n}',
        },
        mono: true,
      },
      prompt: {
        es: 'Esta función devuelve `NaN` en el carrito de compras. ¿Qué falta en la línea 2?',
        en: 'This checkout function returns `NaN` in production. What is missing on line 2?',
      },
      options: [
        {
          id: 'c1',
          label: { es: 'Falta `await` antes de `fetchDiscountFromAPI()` porque devuelve una Promesa.', en: 'Missing `await` before `fetchDiscountFromAPI()` because it returns a Promise.' },
        },
        {
          id: 'c2',
          label: { es: 'En JavaScript no se puede restar con el signo `-`.', en: 'JavaScript cannot subtract numbers using `-`.' },
        },
      ],
      correctOptionId: 'c1',
      explanation: {
        es: 'Sin `await`, `discount` es un objeto `Promise` pendiente, no un número. Restar `100 - Promise` produce `NaN`. Dominar la asincronía te evita el 50% de bugs web.',
        en: 'Without `await`, `discount` is a pending `Promise` object rather than a number. Subtracting `100 - Promise` yields `NaN`.',
      },
      xpReward: 15,
    },
    units: [
      {
        slug: 'code-unit-1',
        trackSlug: 'modern-coding',
        orderIndex: 1,
        title: { es: 'Lógica Moderna & APIs Asíncronas', en: 'Modern Logic & Async APIs' },
        description: {
          es: 'Entiende cómo fluyen los datos reales entre el navegador, las APIs y tu base de datos.',
          en: 'Understand how real data flows between browser UI, APIs, and your database.',
        },
        lessons: [
          {
            slug: 'code-clean-functions',
            unitSlug: 'code-unit-1',
            trackSlug: 'modern-coding',
            orderIndex: 1,
            title: { es: 'Funciones Puras y Estado Inmutable', en: 'Pure Functions & Data Transformations' },
            subtitle: { es: 'La base de React, TypeScript y backends limpios', en: 'The backbone of React, TypeScript & clean backends' },
            durationMin: 4,
            xpReward: 30,
            exercises: [
              {
                id: 'code-1-1-ex1',
                format: 'multiple_choice',
                badge: { es: 'FUNDAMENTO DEV', en: 'DEV FUNDAMENTAL' },
                flashInsight: {
                  es: 'En apps modernas transformamos listas de datos (usuarios, pedidos, lecciones) usando `.filter()` para seleccionar y `.map()` para transformar sin mutar el original.',
                  en: 'Modern apps transform arrays (users, orders, lessons) using `.filter()` to select items and `.map()` to transform them without mutating the source.',
                },
                contextCodeOrCard: {
                  label: { es: 'analytics.ts', en: 'analytics.ts' },
                  content: {
                    es: 'const orders = [{ total: 40, paid: true }, { total: 90, paid: false }, { total: 60, paid: true }];\nconst paidTotals = orders.filter(o => o.paid).map(o => o.total);',
                    en: 'const orders = [{ total: 40, paid: true }, { total: 90, paid: false }, { total: 60, paid: true }];\nconst paidTotals = orders.filter(o => o.paid).map(o => o.total);',
                  },
                  mono: true,
                },
                prompt: {
                  es: '¿Qué valor exacto contiene `paidTotals` tras ejecutarse ese código?',
                  en: 'What exact value does `paidTotals` hold after running?',
                },
                options: [
                  { id: 'm1', label: { es: '[40, 60]', en: '[40, 60]' } },
                  { id: 'm2', label: { es: '[40, 90, 60]', en: '[40, 90, 60]' } },
                  { id: 'm3', label: { es: '100', en: '100' } },
                ],
                correctOptionId: 'm1',
                explanation: {
                  es: '`.filter(o => o.paid)` conserva solo los 2 pedidos pagados, y `.map(o => o.total)` extrae sus importes en un nuevo array `[40, 60]`.',
                  en: '`.filter(o => o.paid)` keeps the 2 paid orders, and `.map(o => o.total)` extracts their amounts into `[40, 60]`.',
                },
                xpReward: 10,
              },
              {
                id: 'code-1-1-ex2',
                format: 'ordering',
                badge: { es: 'CODE BUILDER', en: 'CODE BUILDER' },
                prompt: {
                  es: 'Ordena las líneas para crear un endpoint seguro que valide el email antes de guardar:',
                  en: 'Order the lines to build a safe handler that validates email before saving:',
                },
                pieces: [
                  { id: 'cb1', text: { es: 'export async function registerLead(email: string) {', en: 'export async function registerLead(email: string) {' } },
                  { id: 'cb2', text: { es: '  if (!email.includes("@")) throw new Error("Invalid email");', en: '  if (!email.includes("@")) throw new Error("Invalid email");' } },
                  { id: 'cb3', text: { es: '  const saved = await db.leads.insert({ email });', en: '  const saved = await db.leads.insert({ email });' } },
                  { id: 'cb4', text: { es: '  return { ok: true, id: saved.id };\n}', en: '  return { ok: true, id: saved.id };\n}' } },
                ],
                correctOrderIds: ['cb1', 'cb2', 'cb3', 'cb4'],
                explanation: {
                  es: 'Patrón "Guard Clause": valida siempre las entradas al inicio de la función antes de tocar la base de datos.',
                  en: 'Guard Clause pattern: validate inputs right at the top before making expensive database calls.',
                },
                xpReward: 10,
              },
              {
                id: 'code-1-1-ex3',
                format: 'error_identification',
                badge: { es: 'SEGURIDAD FULL-STACK', en: 'FULL-STACK SECURITY' },
                contextCodeOrCard: {
                  label: { es: '.env / Client Component', en: '.env / Client Component' },
                  content: {
                    es: '// En un componente del navegador:\nconst supabaseAdmin = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!);',
                    en: '// Inside a browser component:\nconst supabaseAdmin = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!);',
                  },
                  mono: true,
                },
                prompt: {
                  es: '¿Por qué jamás debes poner `NEXT_PUBLIC_` a una clave `SERVICE_ROLE` o `OPENAI_API_KEY`?',
                  en: 'Why must you NEVER prefix a `SERVICE_ROLE` or `OPENAI_API_KEY` secret with `NEXT_PUBLIC_`?',
                },
                options: [
                  {
                    id: 'sec-a',
                    label: {
                      es: 'Porque Next.js la empaqueta en el JavaScript público del navegador y cualquiera puede robar tu base de datos entera.',
                      en: 'Because Next.js bundles it into public browser JS, letting anyone bypass RLS and dump your entire database.',
                    },
                  },
                  {
                    id: 'sec-b',
                    label: {
                      es: 'Porque hace que CSS cargue más lento.',
                      en: 'Because it slows down CSS rendering.',
                    },
                  },
                ],
                correctOptionId: 'sec-a',
                explanation: {
                  es: 'En el navegador solo va la clave `ANON / PUBLISHABLE` protegida con Row Level Security (RLS). Las claves secretas viven exclusivamente en el servidor.',
                  en: 'Only the `ANON / PUBLISHABLE` key paired with Row Level Security (RLS) belongs in the browser. Secret keys stay strictly server-side.',
                },
                xpReward: 10,
              },
            ],
            actionMission: {
              id: 'mission-code-1-1',
              title: { es: 'Crea tu Primera Tabla con RLS en Supabase', en: 'Create Your First RLS-Protected Table' },
              objective: {
                es: 'Levanta un proyecto Postgres real con autenticación y políticas de seguridad por fila.',
                en: 'Spin up a real Postgres backend with Auth and Row Level Security enabled.',
              },
              steps: [
                { es: 'Crea un proyecto gratuito en Supabase y abre el SQL Editor.', en: 'Create a free Supabase project and open the SQL Editor.' },
                { es: 'Crea una tabla `waitlist` y activa `ENABLE ROW LEVEL SECURITY`.', en: 'Create a `waitlist` table and enable `ROW LEVEL SECURITY`.' },
              ],
              affiliateToolSlug: 'supabase-cloud',
              xpBonus: 25,
            },
          },
          {
            slug: 'code-apis-and-deploy',
            unitSlug: 'code-unit-1',
            trackSlug: 'modern-coding',
            orderIndex: 2,
            title: { es: 'APIs REST, Códigos HTTP y Deploy', en: 'REST APIs, HTTP Status & Cloud Deploy' },
            subtitle: { es: 'Conecta frontend y backend como un ingeniero de producto', en: 'Wire frontend to backend like a product engineer' },
            durationMin: 5,
            xpReward: 35,
            exercises: [
              {
                id: 'code-1-2-ex1',
                format: 'multiple_choice',
                badge: { es: 'PROTOCOLO HTTP', en: 'HTTP PROTOCOL' },
                prompt: {
                  es: 'Tu frontend llama a `POST /api/checkout` y recibe un código `401 Unauthorized`. ¿Dónde está el problema?',
                  en: 'Your frontend calls `POST /api/checkout` and receives `401 Unauthorized`. What does it mean?',
                },
                options: [
                  { id: 'h1', label: { es: 'El usuario no ha enviado una sesión/token válido de autenticación.', en: 'The request is missing a valid user authentication token/session.' } },
                  { id: 'h2', label: { es: 'El servidor de la base de datos se ha caído por completo (500).', en: 'The database server crashed unexpectedly (500).' } },
                  { id: 'h3', label: { es: 'Todo salió perfecto (200).', en: 'Everything succeeded (200).' } },
                ],
                correctOptionId: 'h1',
                explanation: {
                  es: '`2xx` = éxito, `400` = datos mal enviados, `401` = falta login, `403` = sin permisos, `404` = no existe, `500` = fallo interno del servidor.',
                  en: '`2xx` = success, `400` = bad input, `401` = unauthenticated, `403` = forbidden, `404` = not found, `500` = server crash.',
                },
                xpReward: 15,
              },
              {
                id: 'code-1-2-ex2',
                format: 'simulation',
                badge: { es: 'ARQUITECTURA MVP', en: 'MVP ARCHITECTURE' },
                prompt: {
                  es: 'Quieres validar un Micro-SaaS B2B este fin de semana con $0 de presupuesto inicial. ¿Qué stack eliges?',
                  en: 'You want to validate a B2B Micro-SaaS this weekend on a $0 infrastructure budget. Which stack wins?',
                },
                options: [
                  {
                    id: 'st1',
                    label: {
                      es: 'Configurar un clúster de Kubernetes desde cero en AWS con microservicios separados.',
                      en: 'Configure a custom Kubernetes cluster on AWS with 6 separate microservices.',
                    },
                    sublabel: { es: '3 semanas antes de tener login', en: '3 weeks before shipping login' },
                  },
                  {
                    id: 'st2',
                    label: {
                      es: 'Monolito modular en Next.js + Supabase (Auth + DB) + despliegue continuo en Vercel.',
                      en: 'Modular Next.js app + Supabase (Auth + Postgres) + instant deploy on Vercel.',
                    },
                    sublabel: { es: 'En producción hoy mismo con usuarios reales', en: 'Live today with real paying users' },
                  },
                ],
                correctOptionId: 'st2',
                explanation: {
                  es: 'La velocidad de iteración mata a la sobre-ingeniería temprana. Escala la infraestructura solo cuando tengas tracción real.',
                  en: 'Iteration speed beats premature over-engineering. Scale complex infrastructure only after validating paying demand.',
                },
                xpReward: 20,
              },
            ],
            actionMission: {
              id: 'mission-code-1-2',
              title: { es: 'Despliega una URL Pública en Producción', en: 'Ship a Public Production URL' },
              objective: {
                es: 'Conecta un repositorio Git a Vercel para que cada commit genere una URL HTTPS pública automática.',
                en: 'Connect a GitHub repository to Vercel for automatic HTTPS deployments on every push.',
              },
              steps: [
                { es: 'Vincula tu cuenta de GitHub en Vercel y selecciona tu repositorio.', en: 'Link your GitHub account on Vercel and import your repository.' },
                { es: 'Añade tus variables `NEXT_PUBLIC_SUPABASE_URL` y despliega a producción.', en: 'Add your `NEXT_PUBLIC_SUPABASE_URL` env vars and deploy live.' },
              ],
              affiliateToolSlug: 'vercel-platform',
              xpBonus: 25,
            },
          },
        ],
      },
      {
        slug: 'code-unit-2',
        trackSlug: 'modern-coding',
        orderIndex: 2,
        title: { es: 'Vibe Coding con Criterio de Ingeniero', en: 'AI-Assisted Engineering (Vibe Coding)' },
        description: {
          es: 'Multiplica x5 tu velocidad programando con IA sin crear código espagueti irrompible.',
          en: 'Ship 5x faster with AI coding agents without creating unmaintainable spaghetti.',
        },
        lessons: [
          {
            slug: 'code-vibe-engineering',
            unitSlug: 'code-unit-2',
            trackSlug: 'modern-coding',
            orderIndex: 3,
            title: { es: 'Reglas para Construir Apps Sólidas con IA', en: 'Shipping Production Apps with AI Agents' },
            subtitle: { es: 'Tipos estrictos, pasos pequeños y verificación', en: 'Strict types, atomic diffs & build verification' },
            durationMin: 4,
            xpReward: 40,
            exercises: [
              {
                id: 'code-2-1-ex1',
                format: 'multiple_choice',
                badge: { es: 'FLUJO MODERNO', en: 'MODERN WORKFLOW' },
                prompt: {
                  es: '¿Cuál es el hábito nº1 que separa a quien construye productos reales con IA de quien rompe toda su app al tercer cambio?',
                  en: 'What #1 habit separates builders who ship real SaaS with AI from those whose app breaks on prompt #3?',
                },
                options: [
                  {
                    id: 'vc1',
                    label: {
                      es: 'Definir primero el esquema de datos/tipos TypeScript y pedir cambios incrementales verificando cada fase.',
                      en: 'Define database schema & TypeScript types first, then build in small verified increments.',
                    },
                  },
                  {
                    id: 'vc2',
                    label: {
                      es: 'Pedir "hazme un clon de Uber entero" en una sola frase sin revisar nada.',
                      en: 'Prompt "build me all of Uber" in one sentence without reviewing types or schema.',
                    },
                  },
                ],
                correctOptionId: 'vc1',
                explanation: {
                  es: 'TypeScript actúa como red de seguridad automática: si la IA comete un error de tipos, el compilador lo detecta antes de llegar al usuario.',
                  en: 'TypeScript acts as automated guardrails: when AI makes a contract mistake, the compiler catches it before users ever see it.',
                },
                xpReward: 40,
              },
            ],
            actionMission: {
              id: 'mission-code-2-1',
              title: { es: 'Publica tu Propio Micro-Herramienta Web', en: 'Ship Your Own Micro-Tool Live' },
              objective: {
                es: 'Diseña el esquema en Supabase, construye 1 funcionalidad core y compártela con 3 usuarios reales.',
                en: 'Design one clean schema in Supabase, build 1 core workflow, and test it with 3 real users.',
              },
              steps: [
                { es: 'Define 1 problema puntual (calculadora nicho, directorio o tracker) en menos de 3 tablas.', en: 'Scope 1 sharp problem (niche calculator, directory, or tracker) in under 3 tables.' },
                { es: 'Verifica `npm run build` sin errores y publica en Vercel.', en: 'Verify a clean `npm run build` and deploy to Vercel.' },
              ],
              affiliateToolSlug: 'supabase-cloud',
              xpBonus: 25,
            },
          },
        ],
      },
    ],
  },

  // =========================================================================
  // TRACK 3: SMART DROPSHIPPING
  // =========================================================================
  {
    slug: 'smart-dropshipping',
    supabaseWorldSlug: 'business',
    accent: '#FF9600',
    accentLip: '#D97B00',
    accentWash: '#FFE8CC',
    accentInk: '#FFFFFF',
    accentSoft: 'rgba(255, 150, 0, 0.14)',
    badgeCode: '03 · ECOM',
    name: { es: 'Smart Dropshipping', en: 'Smart Dropshipping' },
    shortTag: { es: 'Validación, ROAS & Branded E-Com', en: 'Validation, ROAS & Branded E-Com' },
    description: {
      es: 'Olvida vender baratijas lentas sin margen. Aprende e-commerce moderno basado en datos, unit economics reales y creativos UGC virales.',
      en: 'Forget low-margin junk with 30-day shipping. Master modern data-backed e-commerce, unit economics, and high-converting UGC.',
    },
    outcomes: [
      { es: 'Cálculo exacto de CPA máximo y ROAS Breakeven', en: 'Exact Max CPA & Breakeven ROAS math' },
      { es: 'Validación de demanda con bibliotecas de anuncios', en: 'Demand validation via live ad libraries' },
      { es: 'Tiendas de marca y hooks UGC de 3 segundos', en: 'Branded product pages & 3-second UGC hooks' },
    ],
    heroChallenge: {
      id: 'hero-drop',
      format: 'multiple_choice',
      badge: { es: 'SIMULADOR DE MARGEN REAL', en: 'REAL MARGIN SIMULATOR' },
      contextCodeOrCard: {
        label: { es: 'UNIT ECONOMICS · PRODUCTO', en: 'UNIT ECONOMICS · PRODUCT' },
        content: {
          es: 'Precio de Venta (PVP): $50\nCoste Producto + Envío 6 días + Pasarela: $20\nGasto en Ads por compra (CPA): $32',
          en: 'Selling Price (AOV): $50\nCOGS + 6-day Shipping + Payment Fees: $20\nAd Cost per Purchase (CPA): $32',
        },
        mono: true,
      },
      prompt: {
        es: 'Tu panel de Shopify muestra $5,000 en ventas hoy (100 pedidos). ¿Cuánto dinero NETO has ganado o perdido realmente?',
        en: 'Your Shopify dashboard shows $5,000 in sales today (100 orders). How much NET profit or loss did you actually make?',
      },
      options: [
        { id: 'd1', label: { es: 'Perdiste -$200 netos (-$2 por cada pedido vendido).', en: 'You LOST -$200 net (-$2 on every single order).' } },
        { id: 'd2', label: { es: 'Ganaste +$3,000 limpios.', en: 'You made +$3,000 pure profit.' } },
        { id: 'd3', label: { es: 'Quedaste exactamente en $0 (Breakeven).', en: 'You broke even at $0.' } },
      ],
      correctOptionId: 'd1',
      explanation: {
        es: 'Facturación ≠ Beneficio. Tu margen bruto antes de anuncios es $30 ($50 - $20). Si pagas $32 de CPA por cliente, pierdes $2 en cada venta. Conocer tu CPA Breakeven ($30) salva tu capital.',
        en: 'Revenue ≠ Profit. Your gross margin before ads is $30 ($50 - $20). Paying a $32 CPA loses $2 per order. Knowing your Breakeven CPA ($30) protects your cashflow.',
      },
      xpReward: 15,
    },
    units: [
      {
        slug: 'drop-unit-1',
        trackSlug: 'smart-dropshipping',
        orderIndex: 1,
        title: { es: 'Validación con Datos & Unit Economics', en: 'Data Validation & Unit Economics' },
        description: {
          es: 'Aprende a elegir productos con margen sano y calcular tu rentabilidad antes de lanzar anuncios.',
          en: 'Select high-margin problem-solvers and calculate exact profitability before spending on ads.',
        },
        lessons: [
          {
            slug: 'drop-product-validation',
            unitSlug: 'drop-unit-1',
            trackSlug: 'smart-dropshipping',
            orderIndex: 1,
            title: { es: 'Filtro de Producto Ganador 4X', en: 'The 4X Winning Product Filter' },
            subtitle: { es: 'Dolor real, efecto demostrable y margen mínimo 3x–4x', en: 'Real pain point, visual wow-factor & 3x–4x markup' },
            durationMin: 4,
            xpReward: 30,
            exercises: [
              {
                id: 'drop-1-1-ex1',
                format: 'simulation',
                badge: { es: 'DUELO DE PRODUCTOS A/B', en: 'A/B PRODUCT SELECTION' },
                prompt: {
                  es: 'Tienes $300 para testear tu primera tienda monoproducto/nicho. ¿Cuál de estos dos productos tiene fundamentos reales para escalar?',
                  en: 'You have $300 to test your first branded niche store. Which product has real fundamentals to scale profitably?',
                },
                options: [
                  {
                    id: 'p-a',
                    label: {
                      es: 'Producto A: Funda básica de silicona para iPhone ($4 coste → $12 venta). Se encuentra en cualquier bazar o Amazon en 24h.',
                      en: 'Product A: Plain silicone phone case ($4 landed cost → $12 retail). Available on Amazon Prime for $8.',
                    },
                    sublabel: { es: 'Margen bruto: $8 · Sin diferenciación', en: '$8 gross margin · Commodity' },
                  },
                  {
                    id: 'p-b',
                    label: {
                      es: 'Producto B: Corrector ergonómico lumbar para teletrabajo ($11 coste con envío rápido → $49 venta + pack x2 a $79).',
                      en: 'Product B: Ergonomic lumbar posture support for remote workers ($11 landed cost → $49 retail + 2-pack bundle at $79).',
                    },
                    sublabel: { es: 'Margen bruto: $38+ · Resuelve dolor diario demostrable en vídeo', en: '$38+ gross margin · Solves daily pain visually' },
                  },
                ],
                correctOptionId: 'p-b',
                explanation: {
                  es: 'Con $8 de margen es imposible pagar anuncios en Meta/TikTok. Necesitas al menos $30–$40 de margen bruto, un dolor claro y potencial de bundles para subir el ticket medio (AOV).',
                  en: 'An $8 margin cannot survive paid acquisition costs. Aim for $30–$40+ gross margin, a clear pain point, and bundle potential to boost AOV.',
                },
                xpReward: 15,
              },
              {
                id: 'drop-1-1-ex2',
                format: 'error_identification',
                badge: { es: 'AUDITORÍA DE TIENDA', en: 'STORE CONVERSION AUDIT' },
                contextCodeOrCard: {
                  label: { es: 'FICHA DE PRODUCTO CON 0.3% CONVERSIÓN', en: 'PRODUCT PAGE AT 0.3% CONVERSION' },
                  content: {
                    es: '- 5 pop-ups de ruleta y contadores falsos parpadeando\n- Tiempo de envío oculto hasta el último paso ("15 a 35 días")\n- Descripción copiada de AliExpress llena de especificaciones técnicas sin beneficios',
                    en: '- 5 spinning wheel popups & fake flashing countdown timers\n- Shipping time hidden until checkout ("15 to 35 days")\n- Raw manufacturer specs instead of clear benefit-driven copy',
                  },
                },
                prompt: {
                  es: '¿Por qué los compradores abandonan esta tienda aunque el anuncio tenga muchos clics?',
                  en: 'Why do shoppers bounce immediately even when the ad gets strong click-through rates?',
                },
                options: [
                  {
                    id: 'aud1',
                    label: {
                      es: 'Destruye la confianza con urgencia falsa y oculta tiempos de envío inaceptables hoy en día.',
                      en: 'Fake urgency destroys trust, and hiding slow shipping kills checkout conversion.',
                    },
                  },
                  {
                    id: 'aud2',
                    label: {
                      es: 'Le faltan todavía más pop-ups de colores.',
                      en: 'It needs even more flashing popups.',
                    },
                  },
                ],
                correctOptionId: 'aud1',
                explanation: {
                  es: 'El comprador moderno detecta tiendas "spam" en 1.5 segundos. Diseño limpio (Clean Branded Store), prueba social creíble, garantía clara y agentes de envío de 5–8 días son obligatorios.',
                  en: 'Modern buyers spot spammy stores in 1.5 seconds. Clean branded UI, transparent 5–8 day fulfillment, and benefit-led visuals win.',
                },
                xpReward: 15,
              },
            ],
            actionMission: {
              id: 'mission-drop-1-1',
              title: { es: 'Valida 3 Productos con Demanda Activa', en: 'Validate 3 Active Winning Products' },
              objective: {
                es: 'Encuentra 3 productos que lleven +14 días escalando anuncios reales y cumplan margen bruto >$30.',
                en: 'Shortlist 3 products actively scaling ads for 14+ days with >$30 gross margin.',
              },
              steps: [
                { es: 'Filtra anuncios recientes de e-commerce con engagement real creciente.', en: 'Filter live e-commerce ads showing sustained spend and engagement.' },
                { es: 'Descarta cualquier producto sin dolor claro o con margen bruto menor a $30.', en: 'Eliminate anything without a clear pain point or <$30 gross margin.' },
              ],
              affiliateToolSlug: 'minea-research',
              xpBonus: 25,
            },
          },
          {
            slug: 'drop-roas-and-store',
            unitSlug: 'drop-unit-1',
            trackSlug: 'smart-dropshipping',
            orderIndex: 2,
            title: { es: 'ROAS Breakeven y Ofertas de Alto AOV', en: 'Breakeven ROAS & High-AOV Bundles' },
            subtitle: { es: 'La fórmula matemática que protege tu caja', en: 'The exact formula that protects your cashflow' },
            durationMin: 5,
            xpReward: 35,
            exercises: [
              {
                id: 'drop-1-2-ex1',
                format: 'multiple_choice',
                badge: { es: 'FÓRMULA ESENCIAL', en: 'CORE FORMULA' },
                flashInsight: {
                  es: 'Fórmula de ROAS Breakeven = Precio de Venta / Margen Bruto ($). Ejemplo: si vendes a $60 y tu margen antes de anuncios es $30 (50%), tu ROAS Breakeven es 60 / 30 = 2.0x.',
                  en: 'Breakeven ROAS = Selling Price / Gross Margin ($). Example: selling at $60 with $30 gross margin (50%) means Breakeven ROAS = 60 / 30 = 2.0x.',
                },
                prompt: {
                  es: 'Si vendes un pack en $80 y tras pagar producto + envío + pasarela te quedan $40 de margen bruto, ¿cuál es tu ROAS Breakeven?',
                  en: 'If you sell a bundle for $80 and keep $40 gross margin after COGS + shipping + fees, what is your Breakeven ROAS?',
                },
                options: [
                  { id: 'r1', label: { es: '2.0x (por encima de 2.0x ganas dinero neto)', en: '2.0x (anything above 2.0x is net profit)' } },
                  { id: 'r2', label: { es: '5.0x', en: '5.0x' } },
                  { id: 'r3', label: { es: '0.5x', en: '0.5x' } },
                ],
                correctOptionId: 'r1',
                explanation: {
                  es: '$80 / $40 = 2.0x. Si inviertes $40 en anuncios y generas 1 venta de $80 (ROAS 2.0), quedas a cero. Con ROAS 2.8x o 3.2x estás imprimiendo beneficio neto.',
                  en: '$80 / $40 = 2.0x. Spending $40 on ads for one $80 sale breaks even. Hitting 2.8x–3.2x ROAS generates healthy net profit.',
                },
                xpReward: 18,
              },
              {
                id: 'drop-1-2-ex2',
                format: 'ordering',
                badge: { es: 'ESTRUCTURA DE CONVERSIÓN', en: 'HIGH-CONVERTING PDP' },
                prompt: {
                  es: 'Ordena de arriba a abajo las secciones de una ficha de producto (PDP) que convierte al 3.5%+:',
                  en: 'Order the sections of a 3.5%+ converting Product Detail Page from top to bottom:',
                },
                pieces: [
                  { id: 'pdp1', text: { es: '1. Galería limpia + Titular de beneficio + Estrellas reales', en: '1. Clean visuals + Benefit headline + Verified reviews' } },
                  { id: 'pdp2', text: { es: '2. Selector de Oferta por Volumen (1 ud / Pack Ahorro 2 uds) + CTA', en: '2. Volume Bundle Selector (1x / Most Popular 2x) + Clear CTA' } },
                  { id: 'pdp3', text: { es: '3. Demostración visual (GIF antes/después) + Garantía 30 días', en: '3. Visual GIF demo (before/after) + 30-day risk reversal' } },
                  { id: 'pdp4', text: { es: '4. Preguntas frecuentes (envío, devoluciones) que eliminan dudas', en: '4. Objection-killing FAQs (shipping times, returns)' } },
                ],
                correctOrderIds: ['pdp1', 'pdp2', 'pdp3', 'pdp4'],
                explanation: {
                  es: 'En móvil, el botón de compra y la oferta de bundle deben verse rápido ("Above the fold"), seguidos de demostración visual y eliminación de objeciones.',
                  en: 'On mobile, clear value + bundle offer + CTA must appear high up, backed immediately by visual proof and objection handling.',
                },
                xpReward: 17,
              },
            ],
            actionMission: {
              id: 'mission-drop-1-2',
              title: { es: 'Monta tu Tienda Base Limpia en Shopify', en: 'Launch Your Clean Branded Storefront' },
              objective: {
                es: 'Configura la estructura minimalista de una ficha de producto con oferta de pack x2 para subir tu AOV.',
                en: 'Set up a clean single-product/niche page with a 2x bundle offer to maximize AOV.',
              },
              steps: [
                { es: 'Abre tu tienda con el tema limpio Dawn y elimina cualquier pop-up intrusivo.', en: 'Start your store using the fast Dawn theme and strip out spammy popups.' },
                { es: 'Calcula tu ROAS Breakeven exacto en el Vault antes de lanzar tráfico.', en: 'Calculate your exact Breakeven ROAS before driving traffic.' },
              ],
              affiliateToolSlug: 'shopify-starter',
              xpBonus: 25,
            },
          },
        ],
      },
      {
        slug: 'drop-unit-2',
        trackSlug: 'smart-dropshipping',
        orderIndex: 2,
        title: { es: 'Creativos UGC & Tráfico Orgánico/Pagado', en: 'Viral UGC Creatives & Paid Acquisition' },
        description: {
          es: 'Hoy el creativo ES la segmentación: domina los primeros 3 segundos en TikTok y Meta.',
          en: 'Today, creative IS targeting: master the first 3 seconds on TikTok and Meta.',
        },
        lessons: [
          {
            slug: 'drop-ugc-hooks',
            unitSlug: 'drop-unit-2',
            trackSlug: 'smart-dropshipping',
            orderIndex: 3,
            title: { es: 'La Fórmula Hook → Problema → Demo → CTA', en: 'The Hook → Pain → Demo → CTA Script' },
            subtitle: { es: 'Cómo detener el scroll en menos de 3 segundos', en: 'Stopping the scroll in under 3 seconds' },
            durationMin: 4,
            xpReward: 40,
            exercises: [
              {
                id: 'drop-2-1-ex1',
                format: 'simulation',
                badge: { es: 'DUELO DE HOOKS 3s', en: '3-SECOND HOOK DUEL' },
                prompt: {
                  es: 'Vendes una lámpara portátil de lectura nocturna que no molesta a tu pareja. ¿Qué primeros 3 segundos tendrán mayor Thumbstop Ratio (>35%)?',
                  en: 'You are selling a clip-on amber reading light that does not wake your partner. Which 3-second opening wins >35% Thumbstop Ratio?',
                },
                options: [
                  {
                    id: 'hk1',
                    label: { es: 'Logo animado de la marca durante 4 segundos con música épica.', en: '4-second animated brand logo intro with corporate music.' },
                  },
                  {
                    id: 'hk2',
                    label: {
                      es: 'Plano real a oscuras: "Mi pareja me odiaba cada vez que leía a las 11 PM hasta que probé esto..." encendiendo la luz cálida.',
                      en: 'Dark bedroom shot: "My partner hated me reading at 11 PM until I clipped this onto my book..." clicking the amber light on.',
                    },
                  },
                ],
                correctOptionId: 'hk2',
                explanation: {
                  es: 'Nadie entra a TikTok o Reels a ver logos. Un buen hook combina choque visual inmediato + situación cotidiana con la que tu cliente ideal se identifica al segundo.',
                  en: 'Nobody opens TikTok or Reels to watch logos. Winning hooks pair instant visual contrast with a relatable micro-story.',
                },
                xpReward: 40,
              },
            ],
            actionMission: {
              id: 'mission-drop-2-1',
              title: { es: 'Escribe 3 Variaciones de Hook para 1 Cuerpo de Vídeo', en: 'Write 3 Hook Variations for 1 Video Body' },
              objective: {
                es: 'Multiplica tus probabilidades de éxito grabando 3 inicios distintos de 3 segundos para el mismo vídeo de 20s.',
                en: '3x your creative testing output by scripting 3 distinct 3-second hooks over the same core demo.',
              },
              steps: [
                { es: 'Escribe 1 hook de problema directo, 1 de curiosidad y 1 de respuesta a comentario.', en: 'Draft 1 pain-point hook, 1 curiosity hook, and 1 comment-reply hook.' },
                { es: 'Vincúlalos a tu ficha limpia de Shopify.', en: 'Point them to your clean Shopify product page.' },
              ],
              affiliateToolSlug: 'shopify-starter',
              xpBonus: 25,
            },
          },
        ],
      },
    ],
  },

  // =========================================================================
  // TRACK 4: DIGITAL AGENCY (AAA / SMMA)
  // =========================================================================
  {
    slug: 'digital-agency',
    supabaseWorldSlug: 'business',
    accent: '#FFC800',
    accentLip: '#E5A800',
    accentWash: '#FFF4CC',
    accentInk: '#042C60',
    accentSoft: 'rgba(255, 200, 0, 0.18)',
    badgeCode: '04 · B2B',
    name: { es: 'Digital Agency (AAA/SMMA)', en: 'Digital Agency (AAA/SMMA)' },
    shortTag: { es: 'Oferta B2B, Cold Outreach & Ventas', en: 'B2B Offers, Cold Outreach & Sales' },
    description: {
      es: 'Construye una agencia de servicios de alto margen (IA, automatización, crecimiento o dev) cerrando clientes de $1,000–$3,000/mes.',
      en: 'Build a high-margin B2B service agency (AI automation, growth, or dev) closing $1,000–$3,000/mo retainers.',
    },
    outcomes: [
      { es: 'Diseño de Ofertas B2B basadas en resultados', en: 'Outcome-driven B2B Offer Engineering' },
      { es: 'Sistemas de Cold Email y DM sin sonar a spam', en: 'Non-spammy Cold Email & LinkedIn outreach' },
      { es: 'Estructura de llamada de descubrimiento y cierre', en: 'Consultative discovery & objection handling' },
    ],
    heroChallenge: {
      id: 'hero-agency',
      format: 'simulation',
      badge: { es: 'DUELO DE COLD EMAIL B2B', en: 'B2B COLD EMAIL DUEL' },
      prompt: {
        es: 'Escribes al fundador de una clínica estética para venderle un sistema de seguimiento de leads. ¿Qué mensaje consigue respuesta?',
        en: 'You are emailing a med-spa founder to pitch an automated lead follow-up system. Which email gets a reply?',
      },
      options: [
        {
          id: 'ag-a',
          label: {
            es: '"Estimado Sr., somos una agencia integral innovadora de marketing 360, IA, redes y diseño web. ¿Podemos agendar 45 min?"',
            en: '"Dear Sir, we are a full-service 360 digital agency doing web, SEO, AI, and social media. Can we hop on a 45-min call?"',
          },
          sublabel: { es: 'Genérico · Centrado en ti · Pide demasiado tiempo', en: 'Generic · Self-centered · High friction' },
        },
        {
          id: 'ag-b',
          label: {
            es: '"Hola Laura, vi tu anuncio activo de Hydrafacial en Instagram pero el formulario tardó 5h en responderme. Montamos un flujo que agenda por WhatsApp en 30s. ¿Te grabo un vídeo de 90s mostrándolo?"',
            en: '"Hi Laura — saw your live Hydrafacial IG ad, filled out the form, and noticed it took 5h to hear back. Built a 30s WhatsApp booking flow for clinics. Mind if I send a 90s Loom?"',
          },
          sublabel: { es: 'Específico · Evidencia real · CTA sin fricción', en: 'Personalized · Proof of gap · Low-friction CTA' },
        },
      ],
      correctOptionId: 'ag-b',
      explanation: {
        es: 'El mejor prospección B2B tiene 3 sellos: observación real imposible de fingir, problema cuantificable y un Call-To-Action de bajísima fricción ("¿Te envío un vídeo de 90s?").',
        en: 'Elite B2B outreach combines an undeniable observation, a specific revenue leak, and a zero-friction micro-CTA ("Mind if I send a 90s video?").',
      },
      xpReward: 15,
    },
    units: [
      {
        slug: 'agency-unit-1',
        trackSlug: 'digital-agency',
        orderIndex: 1,
        title: { es: 'Oferta Irresistible & Prospección B2B', en: 'Irresistible B2B Offer & Outreach' },
        description: {
          es: 'Deja de competir por precio como freelancer genérico y posiciónate como socio de crecimiento.',
          en: 'Stop competing on hourly rates and position your service around measurable ROI.',
        },
        lessons: [
          {
            slug: 'agency-grand-slam-offer',
            unitSlug: 'agency-unit-1',
            trackSlug: 'digital-agency',
            orderIndex: 1,
            title: { es: 'Ingeniería de Oferta B2B de Alto Ticket', en: 'High-Ticket B2B Offer Engineering' },
            subtitle: { es: 'Nicho específico + Resultado medible + Reducción de riesgo', en: 'Specific niche + Measurable outcome + Risk reversal' },
            durationMin: 4,
            xpReward: 30,
            exercises: [
              {
                id: 'ag-1-1-ex1',
                format: 'multiple_choice',
                badge: { es: 'ECUACIÓN DE VALOR', en: 'THE VALUE EQUATION' },
                flashInsight: {
                  es: 'Ecuación del Valor: (Resultado Deseado × Probabilidad Percibida) / (Tiempo de Espera × Esfuerzo del Cliente). Subes tu precio cuando reduces el tiempo y el esfuerzo que tiene que poner tu cliente.',
                  en: 'Value Equation: (Dream Outcome × Perceived Likelihood) / (Time Delay × Client Effort). You command higher retainers by shrinking client effort and time-to-value.',
                },
                prompt: {
                  es: '¿Por qué "Llevo tus redes sociales por $400/mes" es una mala oferta para escalar una agencia?',
                  en: 'Why is "I will post on your social media for $400/mo" a trap for new agency founders?',
                },
                options: [
                  {
                    id: 'of1',
                    label: {
                      es: 'Es un entregable comoditizado desconectado de la facturación del cliente, atrayendo clientes que exigen mucho y pagan poco.',
                      en: 'It sells a commoditized deliverable disconnected from revenue, attracting price-sensitive micro-managing clients.',
                    },
                  },
                  {
                    id: 'of2',
                    label: {
                      es: 'Porque a las empresas no les gusta conseguir clientes nuevos.',
                      en: 'Because businesses dislike getting new customers.',
                    },
                  },
                ],
                correctOptionId: 'of1',
                explanation: {
                  es: 'Cuando vinculas tu servicio directamente a citas calificadas, ventas recuperadas o horas de personal ahorradas, pasar de $400 a $1,500+/mes es matemático.',
                  en: 'Tying your offer directly to booked appointments, recovered leads, or saved payroll makes $1,500+/mo retainers an easy math decision.',
                },
                xpReward: 15,
              },
              {
                id: 'ag-1-1-ex2',
                format: 'ordering',
                badge: { es: 'CONSTRUCTOR DE OFERTA', en: 'OFFER BUILDER' },
                prompt: {
                  es: 'Construye una promesa comercial clara y creíble en una sola frase:',
                  en: 'Assemble a sharp, credible one-sentence B2B offer statement:',
                },
                pieces: [
                  { id: 'ob1', text: { es: 'Ayudamos a clínicas dentales privadas', en: 'We help private dental clinics' } },
                  { id: 'ob2', text: { es: 'a sumar 15+ primeras visitas de implantes en 30 días', en: 'add 15+ qualified implant consultations in 30 days' } },
                  { id: 'ob3', text: { es: 'con reactivación IA de pacientes antiguos sin que su recepción grabe ni haga llamadas,', en: 'via AI patient-reactivation without extra front-desk work,' } },
                  { id: 'ob4', text: { es: 'o trabajamos gratis hasta lograrlo.', en: 'or we work free until we hit target.' } },
                ],
                correctOrderIds: ['ob1', 'ob2', 'ob3', 'ob4'],
                explanation: {
                  es: 'Nicho exacto + Resultado cuantificable con plazo + Mecanismo sin esfuerzo para el cliente + Inversión del riesgo.',
                  en: 'Exact avatar + Quantified outcome & timeframe + Zero-effort mechanism + Conditional risk reversal.',
                },
                xpReward: 15,
              },
            ],
            actionMission: {
              id: 'mission-ag-1-1',
              title: { es: 'Define tu Nicho y Construye una Lista de 50 Decisores', en: 'Pick 1 Niche & Export 50 Decision-Makers' },
              objective: {
                es: 'Selecciona 1 solo vertical rentable y extrae 50 fundadores/directores reales con email verificado.',
                en: 'Commit to 1 high-LTV vertical and build a clean list of 50 verified founders/owners.',
              },
              steps: [
                { es: 'Elige un nicho donde 1 nuevo cliente para ellos valga >$1,000 (clínicas, solar, reformas, SaaS B2B, legal).', en: 'Pick a niche where 1 customer is worth >$1,000 (clinics, solar, remodeling, B2B SaaS, legal).' },
                { es: 'Filtra cargos CEO/Founder con entre 5 y 50 empleados en Apollo.', en: 'Filter CEOs/Founders with 5–50 employees in Apollo.' },
              ],
              affiliateToolSlug: 'apollo-b2b',
              xpBonus: 25,
            },
          },
          {
            slug: 'agency-cold-outreach-system',
            unitSlug: 'agency-unit-1',
            trackSlug: 'digital-agency',
            orderIndex: 2,
            title: { es: 'Arquitectura de Cold Outreach de 4 Líneas', en: 'The 4-Line Cold Outreach Engine' },
            subtitle: { es: 'Entregabilidad, personalización rápida y seguimiento', en: 'Deliverability, fast personalization & follow-up' },
            durationMin: 5,
            xpReward: 35,
            exercises: [
              {
                id: 'ag-1-2-ex1',
                format: 'error_identification',
                badge: { es: 'AUDITORÍA DE ENTREGABILIDAD', en: 'DELIVERABILITY AUDIT' },
                contextCodeOrCard: {
                  label: { es: 'CAMPAÑA ENVIADA CON 0.2% DE RESPUESTA', en: 'CAMPAIGN AT 0.2% REPLY RATE' },
                  content: {
                    es: '- Enviando 300 correos el día 1 desde el dominio principal de tu empresa\n- Incluye 4 enlaces, 2 imágenes pesadas y palabras "OFERTA GRATIS 100%"\n- Párrafos largos de 350 palabras',
                    en: '- Blasting 300 cold emails on Day 1 from your primary company domain\n- Contains 4 links, 2 banner images, and ALL-CAPS promo words\n- 350-word wall of text',
                  },
                },
                prompt: {
                  es: '¿Qué le ocurrirá a tu dominio principal si lanzas esta campaña?',
                  en: 'What happens to your primary company domain when you run this campaign?',
                },
                options: [
                  {
                    id: 'sp1',
                    label: {
                      es: 'Google/Outlook quemará la reputación de tu dominio principal y hasta las facturas a clientes caerán en Spam.',
                      en: 'Google/Outlook will burn your primary domain reputation, sending even client invoices straight to Spam.',
                    },
                  },
                  {
                    id: 'sp2',
                    label: {
                      es: 'Conseguirás el doble de reuniones gracias a las imágenes.',
                      en: 'Banner images double B2B reply rates.',
                    },
                  },
                ],
                correctOptionId: 'sp1',
                explanation: {
                  es: 'Regla técnica sagrada: usa siempre dominios secundarios dedicados, caliéntalos 14 días (Warmup), envía texto plano limpio (<75 palabras) y 0 enlaces en el primer correo.',
                  en: 'Sacred outreach rule: always use warmed-up secondary domains, send plain-text emails under 75 words, and include zero links in Email #1.',
                },
                xpReward: 35,
              },
            ],
            actionMission: {
              id: 'mission-ag-1-2',
              title: { es: 'Envía tus Primeros 20 Mensajes Personalizados', en: 'Send 20 Hyper-Relevant Outreach Messages' },
              objective: {
                es: 'Redacta tu secuencia de 4 líneas (Observación → Problema → Mecanismo → Micro-CTA) y envíala a 20 decisores.',
                en: 'Draft your 4-line script (Observation → Gap → Mechanism → Micro-CTA) and contact 20 leads.',
              },
              steps: [
                { es: 'Usa el Generador de Cold Email en el Vault o redacta menos de 70 palabras.', en: 'Keep your message under 70 words in plain text.' },
                { es: 'Programa 2 seguimientos educados a los 3 y 7 días (donde llega el 60% de respuestas).', en: 'Schedule 2 polite follow-ups at Day 3 and Day 7 (where 60% of replies happen).' },
              ],
              affiliateToolSlug: 'instantly-outreach',
              xpBonus: 25,
            },
          },
        ],
      },
      {
        slug: 'agency-unit-2',
        trackSlug: 'digital-agency',
        orderIndex: 2,
        title: { es: 'Cierre Consultivo & Manejo de Objeciones', en: 'Consultative Closing & Objections' },
        description: {
          es: 'Lidera llamadas de venta B2B con diagnóstico tranquilo, sin presionar y con alta tasa de cierre.',
          en: 'Lead calm, diagnostic B2B sales calls without pushy tactics.',
        },
        lessons: [
          {
            slug: 'agency-objection-mastery',
            unitSlug: 'agency-unit-2',
            trackSlug: 'digital-agency',
            orderIndex: 3,
            title: { es: 'Cómo Desactivar "Lo Tengo que Pensar"', en: 'Disarming "I Need to Think About It"' },
            subtitle: { es: 'Aísla si la duda es de confianza, tiempo o flujo de caja', en: 'Isolate trust, timing, or cashflow concerns calmly' },
            durationMin: 4,
            xpReward: 40,
            exercises: [
              {
                id: 'ag-2-1-ex1',
                format: 'simulation',
                badge: { es: 'SIMULADOR DE LLAMADA EN VIVO', en: 'LIVE SALES CALL ROLEPLAY' },
                prompt: {
                  es: 'Presentas tu propuesta de $1,500/mes y el fundador te dice: "Suena genial, déjame pensarlo unos días y te aviso". ¿Cómo respondes?',
                  en: 'You present your $1,500/mo setup and the founder says: "Looks great, let me think about it for a few days and get back to you." How do you respond?',
                },
                options: [
                  {
                    id: 'cl1',
                    label: {
                      es: '"¡Perfecto! Te escribo la semana que viene a ver qué decidiste." (Colgar y rezar).',
                      en: '"Sounds good! I will email you next week to check in." (Hang up and hope).',
                    },
                  },
                  {
                    id: 'cl2',
                    label: {
                      es: '"Totalmente lógico, Carlos. Normalmente cuando alguien quiere pensarlo es porque no ve claro que el sistema funcione en su caso o por el encaje financiero ahora mismo. Con total confianza, ¿cuál de las dos te frena más?"',
                      en: '"Totally fair. Usually when founders want to think it over, it comes down to either doubting the system will work for their specific case, or the cashflow investment right now. Candidly, which one is on your mind?"',
                    },
                  },
                ],
                correctOptionId: 'cl2',
                explanation: {
                  es: '"Lo voy a pensar" rara vez es la objeción real; es una salida cortés. Validar con calma y aislar entre Confianza en el Mecanismo vs. Finanzas abre una conversación honesta.',
                  en: '"Let me think about it" is a polite smoke screen. Calmly isolating Mechanism Trust vs. Cashflow surfaces the real concern while you are still on the call.',
                },
                xpReward: 40,
              },
            ],
            actionMission: {
              id: 'mission-ag-2-1',
              title: { es: 'Graba tu Vídeo Loom de Auditoría de 90 Segundos', en: 'Record One 90-Second Audit Video' },
              objective: {
                es: 'Practica enviar 1 auditoría en vídeo mostrando una fuga real de ingresos en la web/anuncio de un prospecto.',
                en: 'Record a crisp 90-second screen audit showing one real conversion leak for a prospect.',
              },
              steps: [
                { es: 'Abre la web o perfil del prospecto y señala 1 mejora concreta en menos de 90 segundos.', en: 'Open a prospect website/ad and point out 1 specific quick win in under 90 seconds.' },
                { es: 'Envíalo tras recibir respuesta positiva a tu mensaje de 4 líneas.', en: 'Send it once they reply yes to your 4-line micro-CTA.' },
              ],
              affiliateToolSlug: 'apollo-b2b',
              xpBonus: 25,
            },
          },
        ],
      },
    ],
  },
];

export function getTrackBySlug(slug: string): CareerTrack {
  return CAREER_TRACKS.find((t) => t.slug === slug) || CAREER_TRACKS[0];
}

export function getAllLessons(): CurriculumLesson[] {
  return CAREER_TRACKS.flatMap((t) => t.units.flatMap((u) => u.lessons));
}

export function getLessonBySlug(slug: string): CurriculumLesson | undefined {
  return getAllLessons().find((l) => l.slug === slug);
}
