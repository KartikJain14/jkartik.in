// Single source for Kartik's entity data (name, descriptor, JSON-LD). Base.astro, the
// homepage, /hire/ and the listing pages all build their structured data from here, so the
// name + descriptor stay identical everywhere — that consistency is what lets search engines
// and AI assistants tie jkartik.in, GitHub, LinkedIn, X and Instagram to the same "Kartik Jain".
//
// Facts come from resume/CAREER.md only. Never add ratings, reviews, prices or client names.

export const SITE = 'https://jkartik.in';
export const PERSON_ID = `${SITE}/#kartik`;
export const WEBSITE_ID = `${SITE}/#website`;

export const NAME = 'Kartik Jain';
/** The one descriptor used in titles, meta, OG, JSON-LD and llms.txt. */
export const DESCRIPTOR = 'Security engineer and backend developer';
export const LOCATION = 'Mumbai, India';

/** Quotable one-paragraph summary (third person) — also the Person.description. */
export const SUMMARY =
  'Kartik Jain is a security engineer and backend developer in Mumbai, India. ' +
  'He was awarded a $1,500 bug bounty by Meta (WhatsApp), has reported vulnerabilities to ' +
  'Microsoft (MSRC) and the Mumbai Police (via CERT-In), and builds production backends with ' +
  'Node.js, TypeScript, Python and PostgreSQL. He is open to internships and to freelance ' +
  'web-application security testing and backend development.';

/** Default share image: a 1200×630 card (name, descriptor, photo). */
export const DEFAULT_OG = {
  src: '/og/kartik-jain.jpg',
  width: 1200,
  height: 630,
  alt: 'Kartik Jain, security engineer and backend developer in Mumbai',
};

export const SAME_AS = [
  'https://github.com/KartikJain14',
  'https://www.linkedin.com/in/kartikjain1410/',
  'https://x.com/kartikjain1410',
  'https://www.instagram.com/kartikjain1410/',
];

export const SERVICES = [
  {
    slug: 'web-app-security-testing',
    name: 'Web application security testing (VAPT)',
    serviceType: 'Web application penetration testing',
    description:
      'Manual testing of web apps and APIs for OWASP Top 10 issues such as broken access control, injection, file inclusion, authentication flaws and information disclosure, using Burp Suite, Nuclei and code review.',
  },
  {
    slug: 'backend-api-development',
    name: 'Secure backend and API development',
    serviceType: 'Backend development',
    description:
      'REST APIs and backends in Node.js/TypeScript or Python (FastAPI, Flask) on PostgreSQL and Redis, with authentication, role-based access, payment webhooks and file/media handling built in.',
  },
  {
    slug: 'devops-server-hardening',
    name: 'DevOps and server hardening',
    serviceType: 'DevOps',
    description:
      'Docker, CI/CD (GitHub Actions, Coolify), Ubuntu server setup and hardening, Nginx and TLS, automated backups and recovery, and email deliverability (SPF, DKIM, DMARC).',
  },
] as const;

const serviceNode = (s: (typeof SERVICES)[number]) => ({
  '@type': 'Service',
  '@id': `${SITE}/hire/#${s.slug}`,
  name: s.name,
  serviceType: s.serviceType,
  description: s.description,
  url: `${SITE}/hire/`,
  provider: { '@id': PERSON_ID },
});

export const serviceNodes = () => SERVICES.map(serviceNode);

/** Compact Person — emitted on every page so author/@id references always resolve. */
export const personCompact = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: NAME,
  url: `${SITE}/`,
  jobTitle: 'Security Engineer and Backend Developer',
  image: `${SITE}/kartik.png`,
  sameAs: SAME_AS,
};

/** Reference used for author/publisher/creator (name + url so it stands alone too). */
export const personRef = { '@type': 'Person', '@id': PERSON_ID, name: NAME, url: `${SITE}/` };

const mpstme = {
  '@type': 'CollegeOrUniversity',
  name: "SVKM's NMIMS Mukesh Patel School of Technology Management & Engineering",
  alternateName: ['NMIMS MPSTME', 'MPSTME'],
  url: 'https://engineering.nmims.edu/',
  sameAs: 'https://www.wikidata.org/wiki/Q18128270',
  address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
  parentOrganization: {
    '@type': 'CollegeOrUniversity',
    name: 'Narsee Monjee Institute of Management Studies (NMIMS)',
    url: 'https://www.nmims.edu/',
    sameAs: 'https://www.wikidata.org/wiki/Q16935354',
  },
};

/** Full Person — the canonical entity, emitted on the homepage (the profile page). */
export const personFull = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: NAME,
  givenName: 'Kartik',
  familyName: 'Jain',
  alternateName: ['jkartik', 'KartikJain14', 'kartikjain1410'],
  jobTitle: 'Security Engineer and Backend Developer',
  description: SUMMARY,
  url: `${SITE}/`,
  mainEntityOfPage: `${SITE}/`,
  image: {
    '@type': 'ImageObject',
    '@id': `${SITE}/#portrait`,
    url: `${SITE}/kartik.png`,
    contentUrl: `${SITE}/kartik.png`,
    width: 488,
    height: 488,
    caption: 'Kartik Jain',
  },
  email: 'mailto:contact@jkartik.in',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  homeLocation: { '@type': 'City', name: 'Mumbai', sameAs: 'https://www.wikidata.org/wiki/Q1156' },
  knowsLanguage: ['English', 'Hindi', 'Marwari'],
  alumniOf: mpstme,
  affiliation: [
    {
      '@type': 'OrganizationRole',
      roleName: 'Chairperson',
      startDate: '2026-06',
      affiliation: {
        '@type': 'Organization',
        name: 'ACM MPSTME',
        alternateName: 'ACM Student Chapter, NMIMS MPSTME',
        url: 'https://mpstmeacm.com/',
      },
    },
    {
      '@type': 'OrganizationRole',
      roleName: 'B.Tech Information Technology student',
      startDate: '2024-07',
      endDate: '2028-04',
      affiliation: mpstme,
    },
  ],
  worksFor: [
    {
      '@type': 'EmployeeRole',
      roleName: 'Software Engineer Intern',
      startDate: '2026-04',
      endDate: '2026-10',
      worksFor: {
        '@type': 'Organization',
        name: 'VisionRise Technosoft',
        url: 'https://www.risetechnosoft.com/',
      },
    },
    {
      '@type': 'EmployeeRole',
      roleName: 'Security Engineer Intern',
      startDate: '2025-05',
      endDate: '2025-07',
      worksFor: { '@type': 'Organization', name: 'R.U.D.R.A Cybersecurity' },
    },
  ],
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Security Engineer',
      occupationalCategory: '15-1212.00 Information Security Analysts',
      occupationLocation: { '@type': 'City', name: 'Mumbai' },
      skills:
        'Web application penetration testing, VAPT, OWASP Top 10, Burp Suite, Nuclei, Semgrep, BBOT, manual code review, responsible disclosure, incident response',
    },
    {
      '@type': 'Occupation',
      name: 'Backend Developer',
      occupationalCategory: '15-1252.00 Software Developers',
      occupationLocation: { '@type': 'City', name: 'Mumbai' },
      skills:
        'Node.js, TypeScript, Express, Python, FastAPI, PostgreSQL, Redis, REST API design, authentication and access control, Docker, CI/CD, Linux server administration',
    },
  ],
  knowsAbout: [
    'Web application security testing',
    'Penetration testing',
    'Vulnerability assessment and penetration testing (VAPT)',
    'OWASP Top 10',
    'Responsible disclosure',
    'Burp Suite',
    'Semgrep',
    'Nuclei',
    'Attack surface management',
    'Incident response',
    'Server hardening',
    'Applied cryptography',
    'LLM red teaming',
    'Prompt injection',
    'Backend development',
    'REST API design',
    'Authentication and access control',
    'Node.js',
    'TypeScript',
    'Python',
    'FastAPI',
    'Express',
    'Next.js',
    'PostgreSQL',
    'Redis',
    'Docker',
    'CI/CD',
    'Linux server administration',
    'React Native',
  ],
  award: [
    '$1,500 bug bounty from Meta for a privilege-escalation vulnerability in WhatsApp (2022)',
    '1st place on the global leaderboard, chat.win AI Jailbreakathon',
  ],
  sameAs: SAME_AS,
  makesOffer: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: serviceNode(s) })),
};

export const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE}/`,
  name: NAME,
  alternateName: 'jkartik.in',
  description: `${DESCRIPTOR} in ${LOCATION}: security research, projects, writing and résumé.`,
  inLanguage: 'en',
  author: { '@id': PERSON_ID },
  publisher: { '@id': PERSON_ID },
};

/** BreadcrumbList from [name, path] pairs, e.g. [['Home','/'],['Writing','/blog/']]. */
export const breadcrumbs = (items: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: new URL(path, SITE).href,
  })),
});
