// Client-facing showcase of websites and products Kartik built, shown on /hire/.
// Owned by the showcase research: every entry is verified (live check + ownership from git or Kartik).
// Screenshots live in public/hire/shots/. Never invent clients, numbers or outcomes.

export type ShowcaseCategory = 'business' | 'ecommerce' | 'events' | 'education' | 'platform';

export interface ShowcaseItem {
  slug: string;
  name: string;
  /** Live URL. For a replaced or dead site, keep the original URL and set `archived`. */
  url: string;
  status: 'live' | 'archived';
  /** web.archive.org snapshot to link when the site is no longer live in Kartik's version. */
  archived?: string;
  category: ShowcaseCategory;
  /** Public-safe descriptor of who it's for, e.g. "Footwear brand", "MPSTME's tech fest". */
  client: string;
  /** One plain-language line a business owner understands: what it is and what it does for them. */
  summary: string;
  /** What Kartik delivered, from: Design, Development, E-commerce, CMS, Hosting, Domain & email, SEO, Maintenance, Security, App. */
  did: string[];
  stack: string[];
  /** '2025' or '2025–26'. */
  year: string;
  /** Solo = built alone · Lead = main builder · Led team = headed the team that built it. */
  role: 'Solo' | 'Lead' | 'Led team';
  /**
   * Optional (added by the showcase research): a more exact ownership line for cases where the
   * standard `role` label alone would overstate or understate it, e.g. "Took over · maintains solo".
   * When present, show this text instead of the `role` label.
   */
  roleNote?: string;
  /** Optional verified outcome or number (must exist in resume/CAREER.md or be confirmed by Kartik). */
  highlight?: string;
  /** Internal case-study link, e.g. '/projects/sports-live/'. */
  caseStudy?: string;
  featured?: boolean;
  /** Lower comes first. */
  order: number;
  images: {
    /** e.g. '/hire/shots/khoy-desktop.webp' (1440×900 capture, scaled to ~1200 wide). */
    desktop: string;
    /** e.g. '/hire/shots/khoy-mobile.webp' (390×844 capture at 2×). */
    mobile?: string;
    alt: string;
  };
}

const shots = (slug: string) => ({
  desktop: `/hire/shots/${slug}-desktop.webp`,
  mobile: `/hire/shots/${slug}-mobile.webp`,
});

export const showcase: ShowcaseItem[] = [
  {
    slug: 'khoy',
    name: 'KHOY',
    url: 'https://khoy.in',
    status: 'live',
    category: 'ecommerce',
    client: 'Premium shirt label',
    summary:
      'Launch store for an Indian house of ultra-premium shirts, on a custom-built Shopify theme that presents its first collection like an editorial lookbook.',
    did: ['Design', 'Development', 'E-commerce'],
    stack: ['Shopify', 'Liquid', 'Custom theme'],
    year: '2026',
    role: 'Solo',
    featured: true,
    order: 10,
    images: { ...shots('khoy'), alt: 'KHOY home page with two models wearing panelled shirts from its first collection' },
  },
  {
    slug: 'schon-zapato',
    name: 'Schon Zapato',
    url: 'https://schonzapato.com',
    status: 'live',
    category: 'ecommerce',
    client: 'Vegan footwear brand',
    summary:
      'Online store for a women’s vegan-leather footwear label: a revamped Shopify storefront where shoppers browse heels, flats and sandals and check out.',
    did: ['Design', 'E-commerce'],
    stack: ['Shopify', 'Liquid', 'Minimog theme'],
    year: '2026',
    role: 'Lead',
    roleNote: 'Store revamp',
    featured: true,
    order: 20,
    images: { ...shots('schon-zapato'), alt: 'Schon Zapato storefront with a denim heel campaign banner and new arrivals' },
  },
  {
    slug: 'elev8',
    name: 'ELEV8',
    url: 'https://sports-live.in',
    status: 'live',
    category: 'platform',
    client: 'Pickleball tournament organiser',
    summary:
      'Runs a whole tournament in one place: player registration and checks, a live player auction shown on a projector, fixtures, live scores and standings on players’ phones.',
    did: ['Design', 'Development', 'Hosting'],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL'],
    year: '2026',
    role: 'Solo',
    highlight: '~200 players, 8 teams',
    caseStudy: '/projects/sports-live/',
    featured: true,
    order: 30,
    images: { ...shots('elev8'), alt: 'ELEV8 tournament standings with pool tables and a live knockout bracket' },
  },
  {
    slug: 'eguru',
    name: 'eGuru',
    url: 'https://eguru.app',
    status: 'live',
    category: 'education',
    client: 'Edtech brand of VisionRise Technosoft',
    summary:
      'A learning app for institutes, with video lessons, notes, quizzes, live classes and certificates, plus the website that presents it. The same platform also ships as the Rise Academy app.',
    did: ['Design', 'Development', 'App', 'Hosting'],
    stack: ['Next.js', 'React Native', 'Expo', 'Node.js', 'PostgreSQL'],
    year: '2026',
    role: 'Lead',
    roleNote: 'Lead, during internship',
    highlight: 'Two branded apps on Google Play from one codebase',
    caseStudy: '/projects/white-label-lms/',
    featured: true,
    order: 40,
    images: { ...shots('eguru'), alt: 'eGuru website hero with two phone screens of the learning app' },
  },
  {
    slug: 'marketing-machines',
    name: 'Marketing Machines',
    url: 'https://www.marketingmachines.io',
    status: 'live',
    category: 'business',
    client: 'Executive coach & fractional CMO',
    summary:
      'Site for a SaaS growth coach: a page for each service, success stories, a blog and a contact form that emails enquiries.',
    did: ['Development', 'Hosting', 'Maintenance'],
    stack: ['Next.js', 'Tailwind CSS', 'Nodemailer', 'Vercel'],
    year: '2025',
    role: 'Led team',
    roleNote: 'Co-built with a teammate',
    order: 50,
    images: { ...shots('marketing-machines'), alt: 'Marketing Machines about section with a founder portrait beside an orange panel' },
  },
  {
    slug: 'visionrise',
    name: 'VisionRise Technosoft',
    url: 'https://www.risetechnosoft.com',
    status: 'live',
    category: 'business',
    client: 'IT services company',
    summary:
      'Company website for an IT services firm: its capabilities, past work and process, a route for enterprise enquiries, and the privacy and account-deletion pages its Play Store app needs.',
    did: ['Development', 'Hosting'],
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS'],
    year: '2026',
    role: 'Lead',
    roleNote: 'Lead, during internship',
    order: 60,
    images: { ...shots('visionrise'), alt: 'VisionRise Technosoft company website hero on a dark blue network background' },
  },
  {
    slug: 'ai4hce',
    name: 'AI4HCE Symposium',
    url: 'https://ai4hce-mpstme.nmims.edu',
    status: 'live',
    category: 'events',
    client: 'NMIMS University symposium',
    summary:
      'Official site for a two-day international symposium on AI in healthcare, cybersecurity and education: speakers, schedule, advisory board, call for papers and volunteers.',
    did: ['Design', 'Development', 'Hosting'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    year: '2025',
    role: 'Lead',
    order: 70,
    images: { ...shots('ai4hce'), alt: 'AI4HCE international symposium website hero with dates and a call for papers' },
  },
  {
    slug: 'railway-concession',
    name: 'Railway Concession',
    url: 'https://concession.mpst.me',
    status: 'live',
    category: 'platform',
    client: 'MPSTME college office',
    summary:
      'The college’s official railway-pass system: students apply online and book a collection slot, and the office gets search, exports and a daily report by email.',
    did: ['Development', 'Hosting', 'Maintenance', 'Security', 'SEO'],
    stack: ['Next.js', 'PostgreSQL', 'Drizzle', 'Nodemailer'],
    year: '2026',
    role: 'Lead',
    roleNote: 'Took over · maintains solo',
    highlight: 'Used by ~4,000 students',
    caseStudy: '/projects/railway-concession/',
    order: 80,
    images: { ...shots('railway-concession'), alt: 'MPSTME railway concession application form' },
  },
  {
    slug: 'ghostshare',
    name: 'GhostShare',
    url: 'https://share.jkartik.in',
    status: 'live',
    category: 'platform',
    client: 'Own product',
    summary:
      'Share files and notes in a private room that deletes itself: everything is encrypted in the browser before upload, and no account is needed.',
    did: ['Design', 'Development', 'Hosting', 'Security'],
    stack: ['Next.js', 'Fastify', 'PostgreSQL', 'Redis', 'Cloudflare R2'],
    year: '2026',
    role: 'Solo',
    caseStudy: '/projects/ghostshare/',
    order: 90,
    images: { ...shots('ghostshare'), alt: 'GhostShare start screen with a room password form' },
  },
  {
    slug: 'acm-mpstme',
    name: 'ACM MPSTME',
    url: 'https://mpstmeacm.com',
    status: 'live',
    category: 'events',
    client: 'University tech chapter',
    summary:
      'Website of a ~250-member university tech chapter, kept running on self-hosted servers that also carry every member’s email.',
    did: ['Hosting', 'Domain & email', 'Maintenance', 'Security'],
    stack: ['Next.js', 'Sanity', 'Docker', 'Coolify'],
    year: '2025–26',
    role: 'Led team',
    roleNote: 'Webmaster, now Chairperson',
    highlight: '~250 members, each with an @mpstmeacm.com mailbox',
    caseStudy: '/projects/acm-infrastructure/',
    order: 100,
    images: { ...shots('acm-mpstme'), alt: 'ACM MPSTME website hero with the chapter name in large type' },
  },
  {
    slug: 'social-conclave',
    name: 'Social Conclave 2026',
    url: 'https://conclave26.vercel.app',
    status: 'live',
    category: 'events',
    client: 'NMIMS MPSTME student conference',
    summary:
      'Site for a student conference on India’s socio-economic challenges: agendas and guides, panelists, judges, sponsors and delegate registration.',
    did: ['Development', 'Domain & email'],
    stack: ['Next.js', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
    year: '2025–26',
    role: 'Led team',
    highlight: 'QR check-in for 500+ delegates, built solo',
    caseStudy: '/projects/conc-qr/',
    order: 110,
    images: { ...shots('social-conclave'), alt: 'Social Conclave 2026 site hero with event dates over a Mumbai skyline' },
  },
  {
    slug: 'sattva',
    name: 'Sattva 2026',
    url: 'https://sattva-26.vercel.app',
    status: 'live',
    category: 'events',
    client: 'MPSTME’s cultural fest',
    summary:
      'Site for a college cultural fest, with registration forms and a new look for its 2026 edition.',
    did: ['Development', 'Domain & email'],
    stack: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    year: '2025–26',
    role: 'Led team',
    order: 120,
    images: { ...shots('sattva'), alt: 'Sattva 2026 cultural fest site with the fest name in large type over a crowd' },
  },
  {
    slug: 'mumbai-mun',
    name: 'Mumbai MUN 2025',
    url: 'https://mumbaimun.com',
    status: 'archived',
    archived: 'https://web.archive.org/web/20251018200103/https://mumbaimun.com/',
    category: 'events',
    client: 'Model UN conference',
    summary:
      'Site for the 12th edition of a Model UN conference: committees, secretariat, schedule and delegate registration.',
    did: ['Development', 'Maintenance'],
    stack: ['React'],
    year: '2025',
    role: 'Led team',
    highlight: 'Backend for its delegate app served 600+ delegates',
    caseStudy: '/projects/delego-mun/',
    order: 130,
    images: { ...shots('mumbai-mun'), alt: 'Mumbai MUN 2025 site with a banner and event countdown (archived version)' },
  },
];
