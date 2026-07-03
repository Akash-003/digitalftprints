// ─────────────────────────────────────────────────────────────
//  EDIT ME — your work showcase. Swap these placeholders for real
//  projects. Keep 3–4 for the best layout. `result` is the big
//  highlighted metric; `tags` render as small chips.
// ─────────────────────────────────────────────────────────────

export type Project = {
  id: string
  title: string
  category: string
  blurb: string
  result: string
  tags: string[]
  // Optional external link (case study / live site). Leave '' to disable.
  link: string
}

export const projects: Project[] = [
  {
    id: 'ecomm-scale',
    title: 'D2C Skincare Brand',
    category: 'Performance Marketing',
    blurb:
      'Rebuilt the paid funnel and creative engine, cutting wasted spend and scaling profitable acquisition.',
    result: '+240% ROAS',
    tags: ['Meta Ads', 'Creative', 'CRO'],
    link: '',
  },
  {
    id: 'saas-site',
    title: 'B2B SaaS Platform',
    category: 'Web & App Development',
    blurb:
      'Designed and shipped a lightning-fast marketing site and onboarding flow that lifted trial signups.',
    result: '2.1s → 0.6s load',
    tags: ['React', 'Design', 'Speed'],
    link: '',
  },
  {
    id: 'local-seo',
    title: 'Regional Services Group',
    category: 'SEO',
    blurb:
      'Technical cleanup plus an intent-driven content plan grew organic traffic and inbound leads.',
    result: '+180% organic leads',
    tags: ['Technical SEO', 'Content'],
    link: '',
  },
  {
    id: 'growth-advisory',
    title: 'Early-stage Startup',
    category: 'Business Consultation',
    blurb:
      'Repositioned the offer and rebuilt pricing and GTM, unlocking a new, higher-value customer segment.',
    result: '3.4x revenue in 6mo',
    tags: ['Strategy', 'Pricing', 'GTM'],
    link: '',
  },
]
