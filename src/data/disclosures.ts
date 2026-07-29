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
    summary: "Privilege-escalation vulnerability.",
    detail:
      "Reported a privilege-escalation vulnerability in Meta's WhatsApp platform through its official disclosure program.",
  },
  {
    org: "Microsoft",
    type: "Access control · via MSRC",
    summary: "Access-control & data-exposure issues, reported to MSRC.",
    detail:
      "Reported multiple access-control and information-disclosure issues in Microsoft Intune and the Exchange Admin Center to Microsoft's MSRC (cases VULN-150984, VULN-152882, VULN-152884) — including organisation member data served before authorization checks (a time-of-check/time-of-use gap spanning Intune, Entra, and Azure), and standard users bypassing 'restricted' policies to modify directory name fields and join closed groups through the Exchange admin portal.",
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
    summary: "Exposed staging infrastructure allowing full system compromise.",
    detail:
      "Reported exposed staging infrastructure that could have allowed a full system compromise.",
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
    detail: "Hardened server infrastructure protecting the data of 16,000+ users.",
  },
  {
    title: "Ransomware response",
    detail:
      "Stopped a ransomware incident under pressure by rapidly deploying a backup-and-recovery setup.",
  },
];
