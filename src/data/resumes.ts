// Résumés listed on /resume/. Plain TS array (like disclosures.ts), not a content collection.
//
// - `file` is the public URL of the PDF. The page checks public/<file> at build time and
//   silently skips any entry whose PDF doesn't exist yet, so a card never links to a 404.
// - The general résumé lives at /Kartik_Resume.pdf. That URL is linked from everywhere and
//   must never change.
// - Role résumés are compiled from resume/roles/<Name>.tex into public/resume/<Name>.pdf
//   (`npm run resume -- <Name>`). The portfolio comes from resume/portfolio/.
// - "Last updated" is the git commit date of the PDF (falls back to the build date).
//
// Every highlight must be backed by resume/CAREER.md. Keep them short: they're scan lines.

export type ResumeKind = 'general' | 'role' | 'portfolio';

export interface ResumeEntry {
  slug: string;
  /** Card heading */
  title: string;
  /** Small mono tag above the heading */
  tag: string;
  kind: ResumeKind;
  /** Who should pick this one */
  forWhom: string;
  /** 2–3 scan lines, each backed by CAREER.md */
  highlights: string[];
  /** Public URL of the PDF (path under public/) */
  file: string;
  /** Suggested file name for the Download button */
  downloadName?: string;
  /** "1 page", "Long form", ... */
  length: string;
  featured?: boolean;
}

export const resumes: ResumeEntry[] = [
  {
    slug: 'general',
    title: 'General résumé',
    tag: 'Recommended · Backend + security',
    kind: 'general',
    forWhom:
      'Start here. For software, backend and security internships, and for any role that spans more than one of them.',
    highlights: [
      'Software Engineer Intern at VisionRise: a white-label LMS shipped as two Google Play apps',
      'Security Engineer Intern at R.U.D.R.A: VAPT, custom Semgrep and Nuclei tooling',
      '$1,500 Meta bug bounty; vulnerabilities reported to MSRC and CERT-In',
    ],
    file: '/Kartik_Resume.pdf',
    downloadName: 'Kartik_Jain_Resume.pdf',
    length: '1 page',
    featured: true,
  },
  {
    slug: 'appsec',
    title: 'Application Security Engineer',
    tag: 'Security · AppSec / product security',
    kind: 'role',
    forWhom: 'Application security, product security and security-engineering roles at product companies.',
    highlights: [
      'Built a custom Semgrep (SAST) module and Nuclei templates during a security internship',
      'Found 2 high-severity flaws (LFI, broken access control) in a banking portal by code review',
      'Builds the secure side too: encrypted HLS, HMAC-verified webhooks, RBAC and audit logs',
    ],
    file: '/resume/Kartik_Jain_AppSec_Engineer.pdf',
    length: '1 page',
  },
  {
    slug: 'pentest',
    title: 'Penetration Tester (VAPT)',
    tag: 'Security · Offensive',
    kind: 'role',
    forWhom: 'VAPT, penetration-testing and bug-bounty triage roles at security firms and consultancies.',
    highlights: [
      'Web application VAPT internship at a Mumbai offensive-security firm',
      '$1,500 Meta (WhatsApp) bounty; disclosures to Microsoft (MSRC) and CERT-In',
      'Burp Suite, Nmap, Nuclei, BBOT recon automation, Sliver C2 purple-team exercises',
    ],
    file: '/resume/Kartik_Jain_Penetration_Tester.pdf',
    length: '1 page',
  },
  {
    slug: 'backend',
    title: 'Backend Engineer',
    tag: 'Engineering · Backend / SDE',
    kind: 'role',
    forWhom: 'Backend, SDE and API-developer roles.',
    highlights: [
      '276-route TypeScript API on PostgreSQL behind two Google Play apps',
      "Maintains the college's railway-concession system for ~4,000 students",
      'Payment, ticketing and check-in backends for events with 500+ delegates',
    ],
    file: '/resume/Kartik_Jain_Backend_Engineer.pdf',
    length: '1 page',
  },
  {
    slug: 'devops',
    title: 'DevOps Engineer',
    tag: 'Engineering · DevOps / DevSecOps',
    kind: 'role',
    forWhom: 'DevOps, SRE, platform and DevSecOps roles.',
    highlights: [
      'Hardened and ran a production Ubuntu server: Coolify CI/CD, PostgreSQL, GCS backups',
      'Self-hosted mail for ~250 ACM members on Mailcow with SPF, DKIM and DMARC',
      'Led ransomware incident response and recovery for a 16,000+ user platform',
    ],
    file: '/resume/Kartik_Jain_DevOps_Engineer.pdf',
    length: '1 page',
  },
  {
    slug: 'fullstack',
    title: 'Full-Stack Engineer',
    tag: 'Engineering · Full-stack / SWE',
    kind: 'role',
    forWhom: 'SDE, full-stack and product-engineering roles, including campus placement drives.',
    highlights: [
      'One React Native/Expo codebase shipped as two branded Google Play apps',
      'Live-auction and scoring platform used at a ~200-player pickleball tournament',
      'A database storage engine written from scratch in Java, with its own B-Tree index',
    ],
    file: '/resume/Kartik_Jain_Full_Stack_Engineer.pdf',
    length: '1 page',
  },
  {
    slug: 'portfolio',
    title: 'Portfolio',
    tag: 'Full work record',
    kind: 'portfolio',
    forWhom:
      'The long version: roles, projects and security research in more depth, for interviews and anyone who wants the detail.',
    highlights: [
      'Experience and selected projects with their stack, ownership and how they work',
      'Security research, leadership, and every skill listed with the evidence behind it',
    ],
    file: '/resume/Kartik_Jain_Portfolio.pdf',
    length: 'Long form',
  },
];
