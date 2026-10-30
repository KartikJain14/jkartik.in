// Security research — real findings only. Add new ones here; the homepage shows
// the first five, the /research/ page shows them all with more detail.

export interface Disclosure {
  org: string;
  type: string;      // short label, shown on the research page
  summary: string;   // one-liner, shown on the homepage
  detail: string;    // fuller description, shown on the research page
}

export const disclosures: Disclosure[] = [
  {
    org: "WhatsApp (Meta)",
    type: "Privilege escalation",
    summary: "$1,500 bug bounty for a privilege-escalation vulnerability.",
    detail:
      "Awarded a $1,500 bug bounty by Meta for a privilege-escalation vulnerability in WhatsApp, reported through its official disclosure program.",
  },
  {
    org: "Microsoft",
    type: "Access control · via MSRC",
    summary: "Access-control & data-exposure issues, reported to MSRC.",
    detail:
      "Reported multiple access-control and information-disclosure issues in Microsoft Intune and the Exchange Admin Center to Microsoft's MSRC — including organisation member data served before authorization checks (a time-of-check/time-of-use gap spanning Intune, Entra, and Azure), and standard users bypassing 'restricted' policies to modify directory name fields and join closed groups through the Exchange admin portal.",
  },
  {
    org: "Mumbai Police",
    type: "Stored XSS · via CERT-In",
    summary: "Stored XSS on the official website, disclosed via CERT-In.",
    detail:
      "Found a stored cross-site scripting vulnerability on the official Mumbai Police website and disclosed it responsibly in coordination with CERT-In.",
  },
  {
    org: "The Souled Store",
    type: "Infrastructure exposure",
    summary: "Exposed staging infrastructure with potential for full compromise.",
    detail:
      "Reported exposed staging infrastructure with the potential for a full compromise.",
  },
  {
    org: "Belgian Waffle Co.",
    type: "Credential leak",
    summary: "Source code & credential leak enabling potential CRM takeover.",
    detail:
      "Reported a source-code and credential leak that opened the door to a potential CRM takeover.",
  },
  {
    org: "Banking client",
    type: "LFI · High severity · via R.U.D.R.A",
    summary: "Local file inclusion in a banking web portal.",
    detail:
      "Found a high-severity local file inclusion vulnerability in a banking client's web portal through manual code review during a R.U.D.R.A engagement, then automated detection with Nuclei.",
  },
  {
    org: "Banking client",
    type: "Broken access control · High severity",
    summary: "Broken access control in a banking web portal.",
    detail:
      "Identified a high-severity broken-access-control vulnerability in the same banking portal, exposing restricted functionality to unauthorized users.",
  },
];

export const defensive: { title: string; detail: string }[] = [
  {
    title: "Infrastructure hardening",
    detail: "Hardened the server infrastructure of a web platform with 16,000+ users, as freelance work.",
  },
  {
    title: "Ransomware response",
    detail:
      "Led the incident response when that platform was hit by ransomware: contained it and restored service through rapid backup and recovery.",
  },
];
