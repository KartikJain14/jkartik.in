// Copy + settings for /hire/, the client-facing page Kartik sends to referred leads.
// The sites themselves come from src/data/showcase.ts (verified entries + screenshots).
//
// Facts here come from resume/CAREER.md or Kartik's own confirmation. Never add invented
// clients, testimonials, ratings, prices or visitor numbers. Kartik's decisions (2026-10-30):
// no prices anywhere, no WhatsApp or phone (contact is email only), reply time and ownership
// as below, testimonials only when real and client-approved.

export const CONTACT_EMAIL = 'contact@jkartik.in';

/** Kartik's own words: "I reply within 3 hours generally". Shown near the CTAs and in the FAQ. */
export const replyTime = 'Usually replies within 3 hours';

/**
 * Client quotes. Kartik confirmed each client approved their quote for the site (2026-10-30).
 * The section renders only when this is non-empty. Never fabricate or edit a quote without the client's OK. `name` is optional,
 * so an anonymous attribution such as { role: 'Founder, KHOY', site: 'khoy' } reads cleanly.
 * Visual only: no Review / AggregateRating structured data.
 */
export interface Testimonial {
  quote: string;
  /** optional person's name */
  name?: string;
  /** role and company, e.g. "Founder, KHOY" */
  role: string;
  /** optional showcase slug the quote is about (links to the site in the gallery) */
  site?: string;
}
export const testimonials: Testimonial[] = [
  {
    quote: "We wanted our first collection to feel like a lookbook, not a template store. Kartik built a custom Shopify theme around it and handled the details we hadn't thought of. The launch went smoothly.",
    role: 'Founder, KHOY',
    site: 'khoy',
  },
  {
    quote: 'Kartik redesigned our store so browsing and checkout feel effortless on a phone, which is where most of our customers shop. Quick to respond and clear about every change.',
    role: 'Founder, Schon Zapato',
    site: 'schon-zapato',
  },
  {
    quote: "Around 200 players, a live auction on the big screen, and scores updating on everyone's phones, all on one platform Kartik built for us. It held up on the day, even on patchy venue Wi-Fi.",
    role: 'Organiser, ELEV8',
    site: 'elev8',
  },
  {
    quote: 'Clean site, service pages that explain what I do, and enquiries landing straight in my inbox. Exactly what we discussed.',
    role: 'Founder, Marketing Machines',
    site: 'marketing-machines',
  },
  {
    quote: 'Kartik delivered the symposium website on time, with speakers, schedule and paper-submission details that were easy for international participants to find.',
    role: 'Organising committee, AI4HCE Symposium',
    site: 'ai4hce',
  },
  {
    quote: "Kartik's team ran our website and the QR check-ins for 500+ delegates across every checkpoint, and stayed on call through the event.",
    role: 'Chairperson, Social Conclave 2026',
    site: 'social-conclave',
  },
];

/** Confirmed by Kartik ("yes, that is how I work"). Shown in the hero, process, why and FAQ. */
export const ownership = {
  short: 'You own your domain, code and accounts',
  long: "Your domain, hosting and accounts are set up in your business's name, and the code is yours. You're never locked in.",
};

/** Hero A-to-Z rail: the whole job, in order. */
export const aToZ = ['Domain', 'Design', 'Build', 'Hosting', 'Business email', 'SEO', 'Maintenance'];

/** Proof strip. `count` animates; the site count is computed from the showcase on the page. */
export interface Proof {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  href?: string;
}
export const proof: Proof[] = [
  { value: 4000, prefix: '~', label: 'students use the college system I maintain', href: '/projects/railway-concession/' },
  { value: 16000, suffix: '+', label: 'users back online after I led a ransomware recovery' },
  { value: 1500, prefix: '$', label: 'bug bounty from Meta for a WhatsApp security flaw', href: '/research/' },
];

/** Services, in client language. `proof` is one real line that backs the claim. */
export interface Service {
  slug: string;
  name: string;
  what: string;
  includes: string[];
  proof: string;
  /** schema.org serviceType */
  type: string;
}
export const services: Service[] = [
  {
    slug: 'websites',
    name: 'Websites & landing pages',
    what: 'A site that explains what you do in seconds, looks right on every phone, and turns visitors into calls and enquiries.',
    includes: ['Design', 'Build', 'Contact forms', 'Analytics'],
    proof: 'Brand, committee and fest sites in the work above.',
    type: 'Website design and development',
  },
  {
    slug: 'online-stores',
    name: 'Online stores',
    what: 'Products, cart, checkout and online payments, set up so orders reach you and customers get a confirmation.',
    includes: ['Catalogue', 'Payments', 'Order emails', 'Admin'],
    proof: 'Built KHOY’s custom Shopify store and revamped Schon Zapato’s, both in the work above.',
    type: 'E-commerce development',
  },
  {
    slug: 'web-apps',
    name: 'Web apps, portals & dashboards',
    what: 'The tools behind the site: bookings, registrations, member portals, admin dashboards and reports.',
    includes: ['Logins & roles', 'Bookings', 'Dashboards', 'Daily reports'],
    proof: 'Maintain the railway-concession system ~4,000 students at my college use.',
    type: 'Web application development',
  },
  {
    slug: 'mobile-apps',
    name: 'Mobile apps',
    what: 'One app for Android and iOS from a single codebase, with push notifications and updates that skip the store wait.',
    includes: ['Android', 'iOS', 'Push', 'Store listing'],
    proof: 'Shipped two learning apps on Google Play from one codebase.',
    type: 'Mobile app development',
  },
  {
    slug: 'domain-hosting-email',
    name: 'Domain, hosting & business email',
    what: 'Your domain bought and connected, fast and secure hosting, and you@yourbusiness.com email that lands in the inbox, not spam.',
    includes: ['Domain', 'Hosting', 'SSL', 'SPF · DKIM · DMARC'],
    proof: 'Run the mail server for 7+ college committees, with a mailbox for each of ~250 members.',
    type: 'Web hosting and business email setup',
  },
  {
    slug: 'seo-speed',
    name: 'SEO & speed',
    what: 'Pages Google can read, link previews that look right on WhatsApp, and load times that hold up on mobile data.',
    includes: ['Titles & previews', 'Sitemaps', 'Structured data', 'Speed'],
    proof: 'This site scores 90+ for mobile performance on Google Lighthouse.',
    type: 'Search engine optimization',
  },
  {
    slug: 'security',
    name: 'Security',
    what: 'Hardened servers, safe logins and payments, and backups that actually restore. I can also test a site you already have.',
    includes: ['Hardening', 'Backups', 'Safe payments', 'Security testing'],
    proof: '$1,500 bug bounty from Meta; led a 16,000-user platform back from a ransomware attack.',
    type: 'Website security',
  },
  {
    slug: 'care',
    name: 'Care after launch',
    what: 'Updates, backups, fixes and small changes after go-live, so the site keeps working while you run the business.',
    includes: ['Updates', 'Backups', 'Fixes', 'Small changes'],
    proof: 'Took over a live college system in 2026 and keep it running.',
    type: 'Website maintenance',
  },
];

/** How a project runs, start to finish. */
export const process = [
  { name: 'A 15-minute call', text: 'Tell me about the business and what you need. I ask a few questions and tell you plainly what I would build.' },
  { name: 'A written proposal', text: 'Scope, timeline and one fixed price, in writing. Nothing starts until you agree to it.' },
  { name: 'Design & build', text: 'You follow along on a private preview link and your feedback goes in as the site takes shape.' },
  { name: 'Launch', text: 'Domain, hosting, email and the SEO basics set up in your name, then a final check on phones before it goes live.' },
  { name: 'Care', text: 'I stay on for fixes, updates and backups, so the site keeps working after launch day.' },
];

/** Why work with Kartik: each claim backed by something real. `{soloNames}` is filled in from the showcase (role: 'Solo'). */
export const why = [
  {
    claim: 'One person, start to finish',
    text: 'The person you brief is the person who designs, builds and hosts it. Nothing gets lost in hand-offs.',
    proof: 'Built solo, end to end: {soloNames}. I also ran the production server behind a company’s two Google Play apps.',
  },
  {
    claim: 'You own everything',
    text: "{ownership}",
    proof: 'If you ever want someone else to look after it, everything is already in your hands.',
  },
  {
    claim: 'Security is built in',
    text: 'Small-business sites usually get hacked through outdated software, weak logins or missing backups. I build with those in mind from day one.',
    proof: '$1,500 bug bounty from Meta (WhatsApp). Vulnerabilities reported to Microsoft and, through CERT-In, to the Mumbai Police.',
  },
  {
    claim: 'Fast on a phone',
    text: 'Your customers will mostly open your site on a phone, often on mobile data. Every page is built and tested for that first.',
    proof: 'This site scores 90+ for mobile performance on Google Lighthouse, and 100 for accessibility, best practices and SEO.',
  },
  {
    claim: 'Built for the busy day',
    text: 'Launch day, sale day, event day: the site has to hold up when everyone shows up at once.',
    proof: 'QR check-ins for 500+ delegates at Social Conclave, the backend of Mumbai MUN’s app for 600+ delegates, and a live player auction for a ~200-player tournament.',
  },
  {
    claim: 'Clear and accountable',
    text: 'A fixed scope and price in writing, previews as it’s built, and one person to write to when something needs changing. I usually reply within 3 hours.',
    proof: 'I chair a ~250-member student chapter and ran the technical teams of four college committees in 2025–26.',
  },
];

/** FAQ: no new promises, no numbers that aren't in CAREER.md. Also emitted as FAQPage JSON-LD. */
export const faq: { q: string; a: string }[] = [
  {
    q: 'How much does a website cost?',
    a: 'It depends on what the site has to do: a few pages, an online store, or a custom portal are very different jobs. After a 15-minute call you get one fixed price for the agreed scope, in writing, before any work starts.',
  },
  {
    q: 'How long does it take?',
    a: 'The timeline is part of the written proposal, so you know it before we start. A simple business site is quicker than an online store or a custom app, and having your content ready (text, photos, logo) speeds things up the most.',
  },
  {
    q: 'Will I own the website?',
    a: "Yes. Your domain, hosting and accounts are set up in your business's name, and the code is yours. If you ever want someone else to look after it, everything is already in your hands.",
  },
  {
    q: 'Can you handle the domain, hosting and business email too?',
    a: 'Yes. I buy or connect the domain, set up hosting with SSL, and create business email on your domain with SPF, DKIM and DMARC configured so your mail reaches the inbox. I already run the mail server that 7+ college committees use.',
  },
  {
    q: 'Will it work on phones?',
    a: 'Yes. Every site is built for phones first and checked on phones before launch. The phone screenshots in the work section are the actual mobile versions.',
  },
  {
    q: 'I already have a website. Can you fix or redesign it?',
    a: 'Yes. I can make changes, redesign it, speed it up, move it to better hosting, or check it for security problems. It starts with a look at what you have, so the advice fits your site.',
  },
  {
    q: 'How quickly will you reply?',
    a: 'I usually reply within 3 hours. Write to contact@jkartik.in, or use the project brief on this page and your email app does the rest.',
  },
  {
    q: 'What happens after launch?',
    a: 'I can stay on to look after it: updates, backups, security fixes and small changes. What that covers is agreed in writing, like the build itself.',
  },
  {
    q: 'Do you build mobile apps as well?',
    a: 'Yes. I build Android and iOS apps from one codebase, and have shipped two learning apps on Google Play this way.',
  },
];

/** Brief builder options. The budget bands are the client's choice, not a price list. */
export const briefNeeds = [
  'A new website',
  'An online store',
  'A web app or portal',
  'A mobile app',
  'Redesign or fix my site',
  'Domain, hosting & email',
  'SEO & speed',
  'Security check',
  'Care after launch',
];
export const briefBudgets = ['Not sure yet', 'Under ₹25k', '₹25k – ₹75k', '₹75k – ₹2 lakh', 'Above ₹2 lakh'];
export const briefTimelines = ['As soon as possible', 'Within a month', '1–3 months', 'Just exploring'];

/** Showcase filter groups (labels in client language). */
export const filterGroups: { key: string; label: string; cats: string[] }[] = [
  { key: 'business', label: 'Business & e-commerce', cats: ['business', 'ecommerce'] },
  { key: 'events', label: 'Events & communities', cats: ['events'] },
  { key: 'platform', label: 'Platforms', cats: ['platform'] },
  { key: 'education', label: 'Education', cats: ['education'] },
];

export const roleLabel: Record<string, string> = {
  Solo: 'Built solo',
  Lead: 'Lead developer',
  'Led team': 'Led the team',
};
