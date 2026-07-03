// ─────────────────────────────────────────────────────────────
//  EDIT ME — company details. This is the one file to change for
//  contact email, socials, and top-line copy.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Digital Footprints',
  domain: 'digitalftprints.com',

  // TODO: replace with your real inbox — used by the contact form (mailto) + footer.
  email: 'hello@digitalftprints.com',

  tagline: 'We leave footprints that convert.',
  blurb:
    'A young, dynamic growth studio building performance-driven marketing, websites, and apps for brands that want to move fast.',

  // TODO: replace with your real profiles. Leave a value empty ('') to hide a link.
  socials: {
    instagram: '',
    linkedin: '',
    x: '',
    whatsapp: '',
  },
}

export type Service = {
  id: string
  title: string
  blurb: string
  points: string[]
}

export const services: Service[] = [
  {
    id: 'performance-marketing',
    title: 'Performance Marketing',
    blurb: 'Paid campaigns engineered around one thing: profitable growth.',
    points: ['Meta & Google ads', 'Funnel & creative testing', 'ROAS optimization'],
  },
  {
    id: 'web-app-development',
    title: 'Website & App Development',
    blurb: 'Fast, beautiful web and mobile products that ship and scale.',
    points: ['Landing pages & sites', 'Web & mobile apps', 'Performance-first builds'],
  },
  {
    id: 'seo',
    title: 'SEO',
    blurb: 'Compounding organic traffic from search intent that actually buys.',
    points: ['Technical SEO', 'Content & keywords', 'Authority building'],
  },
  {
    id: 'consultation',
    title: 'Business Consultation',
    blurb: 'Strategy for revenue and growth — from positioning to pricing.',
    points: ['Growth strategy', 'Revenue systems', 'Go-to-market'],
  },
]

// Homepage impact counters. Edit the numbers to your real ones.
export const stats: { value: number; suffix: string; label: string }[] = [
  { value: 25, suffix: '+', label: 'Projects delivered' },
  { value: 240, suffix: '%', label: 'Avg. traffic lift' },
  { value: 4.8, suffix: 'x', label: 'Avg. return on ad spend' },
  { value: 12, suffix: '+', label: 'Happy brands' },
]
