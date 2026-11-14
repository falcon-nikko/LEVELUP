import { LocalizedText } from '@/lib/i18n/dictionaries';
import { TrackSlug } from '@/lib/curriculum/affiliates';

export interface VaultPlaybook {
  id: string;
  trackSlug: TrackSlug;
  title: LocalizedText;
  category: LocalizedText;
  template: LocalizedText;
}

export const VAULT_PLAYBOOKS: VaultPlaybook[] = [
  {
    id: 'pb-ai-json-classifier',
    trackSlug: 'ai-automation',
    title: {
      es: 'Prompt Maestro: Clasificador & Enrutador B2B en JSON',
      en: 'Master System Prompt: Deterministic JSON Lead Router',
    },
    category: { es: 'Producción Make / n8n', en: 'Make / n8n Production' },
    template: {
      es: `ROL: Eres un ingeniero senior de operaciones de ingresos B2B.
CONTEXTO: Recibirás consultas entrantes de formularios web.
TAREA: Analiza intención de compra, urgencia y redacta respuesta inicial de máx. 45 palabras.
REGLA ANTI-ALUCINACIÓN: No inventes precios ni garantías fuera del contexto.
FORMATO: Devuelve ÚNICAMENTE JSON válido sin bloques markdown:
{
  "intent": "high_ticket" | "support" | "spam",
  "urgency_score": 1-10,
  "personalized_opening": "string",
  "route_to_vip_slack": boolean
}`,
      en: `ROLE: You are a senior B2B Revenue Operations router.
CONTEXT: You will receive raw inbound web-form submissions.
TASK: Evaluate buying intent, urgency, and draft a <45-word human opening line.
GROUNDING RULE: Never invent pricing or policies outside provided docs.
FORMAT: Return ONLY valid JSON with zero markdown wrappers:
{
  "intent": "high_ticket" | "support" | "spam",
  "urgency_score": 1-10,
  "personalized_opening": "string",
  "route_to_vip_slack": boolean
}`,
    },
  },
  {
    id: 'pb-code-rls-template',
    trackSlug: 'modern-coding',
    title: {
      es: 'Boilerplate SQL: Tabla SaaS Multi-Usuario con RLS Estricto',
      en: 'SQL Boilerplate: Multi-Tenant SaaS Table with Strict RLS',
    },
    category: { es: 'Supabase / PostgreSQL', en: 'Supabase / PostgreSQL' },
    template: {
      es: `CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL CHECK (char_length(name) >= 2),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own projects"
  ON public.projects
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);`,
      en: `CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL CHECK (char_length(name) >= 2),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own projects"
  ON public.projects
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);`,
    },
  },
  {
    id: 'pb-drop-ugc-script',
    trackSlug: 'smart-dropshipping',
    title: {
      es: 'Guion UGC de 22 Segundos (Ratio de Retención >35%)',
      en: '22-Second High-Converting UGC Ad Script (>35% Thumbstop)',
    },
    category: { es: 'TikTok & Meta Ads', en: 'TikTok & Meta Ads' },
    template: {
      es: `[0-3s HOOK VISUAL + DOLOR]: "Dejé de gastar $120 en fisio cada mes cuando cambié mi silla por esto..."
[3-8s AGITACIÓN]: Muestra el problema real en 1 plano cotidiano sin cortes falsos.
[8-15s DEMO + MECANISMO ÚNICO]: Demostración física clara del antes/después en menos de 7 segundos.
[15-19s PRUEBA SOCIAL]: "+4,200 personas teletrabajando ya lo usan a diario."
[19-22s CTA + REDUCCIÓN DE RIESGO]: "Pruébalo 30 días sin riesgo — pack ahorro activo hoy debajo."`,
      en: `[0-3s VISUAL HOOK + PAIN]: "I stopped spending $120/mo on chiropractors the week I clipped this onto my desk chair..."
[3-8s AGITATE]: Show the raw everyday frustration in one authentic handheld shot.
[8-15s DEMO + MECHANISM]: Clear visual before/after proof in under 7 seconds.
[15-19s SOCIAL PROOF]: "Over 4,200 remote workers switched this quarter."
[19-22s CTA + RISK REVERSAL]: "Try it 30 days risk-free — 2-pack bundle live at the link below."`,
    },
  },
  {
    id: 'pb-agency-discovery-script',
    trackSlug: 'digital-agency',
    title: {
      es: 'Estructura de Llamada Consultiva B2B de 20 Minutos',
      en: '20-Minute Consultative B2B Closing Framework',
    },
    category: { es: 'Ventas High-Ticket', en: 'High-Ticket B2B Sales' },
    template: {
      es: `1. MARCO (1 min): "Hoy veremos cómo captáis clientes ahora, dónde se escapan citas y, solo si tiene sentido matemático, te enseño cómo lo resolvemos."
2. DIAGNÓSTICO ACTUAL (6 min): "¿Cuántos leads entran al mes? ¿Cuánto tardáis en responder? ¿Cuánto vale 1 cliente cerrado?"
3. COSTE DE INACCIÓN (4 min): "Si se escapan 8 citas al mes a $600 de ticket, son $4,800/mes que ya estáis pagando en anuncios y no entran."
4. MECANISMO EN 3 PILARES (5 min): Explica resultado y plazos, NO detalles técnicos.
5. INVERSIÓN + SILENCIO (4 min): Presenta precio y guarda silencio hasta que el cliente hable.`,
      en: `1. FRAME (1 min): "Let's map your current lead flow, spot any conversion leaks, and only if the math makes clear sense, walk through how we plug them."
2. DIAGNOSIS (6 min): "How many leads come in monthly? Average response time? Average LTV of 1 closed client?"
3. COST OF INACTION (4 min): "Losing 8 consultations/mo at $600 LTV means $4,800/mo in already-paid ad spend slipping away."
4. 3-PILLAR MECHANISM (5 min): Present outcomes and timeline, zero technical jargon.
5. INVESTMENT + SILENCE (4 min): State the retainer clearly, then stay silent and let them speak first.`,
    },
  },
];
