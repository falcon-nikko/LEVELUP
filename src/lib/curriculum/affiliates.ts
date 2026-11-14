import { LocalizedText } from '@/lib/i18n/dictionaries';

export type TrackSlug = 'ai-automation' | 'modern-coding' | 'smart-dropshipping' | 'digital-agency';

export interface AffiliateTool {
  slug: string;
  name: string;
  trackSlug: TrackSlug;
  category: LocalizedText;
  tagline: LocalizedText;
  perkBadge: LocalizedText;
  affiliateUrl: string;
  commissionNote: string;
  featured?: boolean;
}

export const AFFILIATE_TOOLS: AffiliateTool[] = [
  {
    slug: 'shopify-starter',
    name: 'Shopify',
    trackSlug: 'smart-dropshipping',
    category: { es: 'Infraestructura E-Commerce', en: 'E-Commerce Infrastructure' },
    tagline: {
      es: 'Lanza tu tienda optimizada para conversión con checkout en 1 clic y analítica real de margen.',
      en: 'Launch a high-converting storefront with 1-click checkout and real unit-economics analytics.',
    },
    perkBadge: { es: 'Prueba desde $1/mes en el primer mes', en: '$1/mo starter trial available' },
    affiliateUrl: 'https://www.shopify.com/?ref=levelup-academy',
    commissionNote: 'CPA Partner Tier',
    featured: true,
  },
  {
    slug: 'make-automation',
    name: 'Make.com',
    trackSlug: 'ai-automation',
    category: { es: 'Orquestación & Agentes IA', en: 'AI Workflow Orchestration' },
    tagline: {
      es: 'Conecta OpenAI/Claude con Gmail, Notion, Slack, CRM y Webhooks de forma visual sin servidor.',
      en: 'Visually connect LLMs with Gmail, Notion, Slack, CRMs, and webhooks without managing servers.',
    },
    perkBadge: { es: '1,000 operaciones/mes gratis', en: '1,000 free ops/month' },
    affiliateUrl: 'https://www.make.com/en?pc=levelup',
    commissionNote: '20% Recurring RevShare',
    featured: true,
  },
  {
    slug: 'n8n-cloud',
    name: 'n8n',
    trackSlug: 'ai-automation',
    category: { es: 'Agentes IA Avanzados', en: 'Autonomous AI Agents' },
    tagline: {
      es: 'Construye agentes con memoria, herramientas y nodos de código listos para vender a empresas B2B.',
      en: 'Build AI agents with memory, tool-calling, and custom code nodes ready to sell to B2B clients.',
    },
    perkBadge: { es: 'Estándar para agencias AAA', en: 'AAA Agency Standard' },
    affiliateUrl: 'https://n8n.io/?utm_source=levelup',
    commissionNote: 'Affiliate Partner',
  },
  {
    slug: 'supabase-cloud',
    name: 'Supabase',
    trackSlug: 'modern-coding',
    category: { es: 'Base de Datos Postgres & Auth', en: 'Postgres Database & Auth' },
    tagline: {
      es: 'Backend completo en minutos: PostgreSQL real, autenticación, RLS y APIs instantáneas para tu SaaS.',
      en: 'Production backend in minutes: real PostgreSQL, Auth, RLS, and instant APIs for your Micro-SaaS.',
    },
    perkBadge: { es: 'Plan gratuito generoso para MVPs', en: 'Generous free tier for MVPs' },
    affiliateUrl: 'https://supabase.com/?utm_source=levelup',
    commissionNote: 'Ecosystem Tool',
    featured: true,
  },
  {
    slug: 'vercel-platform',
    name: 'Vercel',
    trackSlug: 'modern-coding',
    category: { es: 'Despliegue & Cloud Frontend', en: 'Frontend Cloud & Deploy' },
    tagline: {
      es: 'Despliega aplicaciones Next.js y APIs globales en segundos con cada git push.',
      en: 'Deploy Next.js apps and global serverless APIs in seconds on every git push.',
    },
    perkBadge: { es: 'Deploy instantáneo desde GitHub', en: 'Instant GitHub deployments' },
    affiliateUrl: 'https://vercel.com/?utm_source=levelup',
    commissionNote: 'Ecosystem Tool',
  },
  {
    slug: 'apollo-b2b',
    name: 'Apollo.io',
    trackSlug: 'digital-agency',
    category: { es: 'Base de Leads B2B Verificados', en: 'Verified B2B Lead Intelligence' },
    tagline: {
      es: 'Encuentra decisores reales (CEOs, Founders, CMOs) filtrados por facturación, nicho y tecnología.',
      en: 'Find verified decision-makers (CEOs, Founders, CMOs) filtered by revenue, niche, and tech stack.',
    },
    perkBadge: { es: 'Créditos de emails B2B gratis al empezar', en: 'Free B2B email credits included' },
    affiliateUrl: 'https://www.apollo.io/?utm_source=levelup',
    commissionNote: '25% Partner Commission',
    featured: true,
  },
  {
    slug: 'instantly-outreach',
    name: 'Instantly.ai',
    trackSlug: 'digital-agency',
    category: { es: 'Cold Email & Warmup', en: 'Cold Email Scale & Warmup' },
    tagline: {
      es: 'Escala campañas de prospección en frío con calentamiento automático de dominios para evitar spam.',
      en: 'Scale cold outreach campaigns with automated inbox warmup to land in primary inboxes.',
    },
    perkBadge: { es: 'Warmup ilimitado de buzones', en: 'Unlimited inbox warmup' },
    affiliateUrl: 'https://instantly.ai/?via=levelup',
    commissionNote: '30% Recurring Commission',
  },
  {
    slug: 'minea-research',
    name: 'Minea',
    trackSlug: 'smart-dropshipping',
    category: { es: 'Espionaje & Validación de Productos', en: 'Ad Spy & Product Validation' },
    tagline: {
      es: 'Analiza anuncios reales activos en TikTok, Meta y Pinterest para validar demanda antes de gastar $1.',
      en: 'Analyze live winning ads across TikTok, Meta, and Pinterest to validate demand before spending $1.',
    },
    perkBadge: { es: 'Créditos de búsqueda gratuitos', en: 'Free starter spy credits' },
    affiliateUrl: 'https://en.minea.com/?ref=levelup',
    commissionNote: '30% Recurring Partner',
  },
];

export function getAffiliateBySlug(slug: string): AffiliateTool | undefined {
  return AFFILIATE_TOOLS.find((t) => t.slug === slug);
}
