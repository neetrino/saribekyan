export const internationalSectionIds = [
  "office",
  "europe",
  "cis",
  "partners",
  "memoranda",
  "exchange",
  "projects",
] as const;

export type InternationalSectionId = (typeof internationalSectionIds)[number];

export const officeFocusIds = [
  "agreements",
  "mobility",
  "projects",
  "support",
] as const;

export type OfficeFocusId = (typeof officeFocusIds)[number];

export const europeFocusIds = ["academic", "clinical", "research"] as const;

export type EuropeFocusId = (typeof europeFocusIds)[number];

export const cisFocusIds = ["mobility", "training", "science"] as const;

export type CisFocusId = (typeof cisFocusIds)[number];

export const partnerRegions = ["europe", "cis"] as const;

export type PartnerRegion = (typeof partnerRegions)[number];

export const partners = [
  {
    id: "sofia",
    region: "europe",
    logoUrl: "/logos/partner-1.svg",
    website: "https://mu-sofia.bg",
  },
  {
    id: "charles",
    region: "europe",
    logoUrl: "/logos/partner-2.svg",
    website: "https://cuni.cz",
  },
  {
    id: "lsmu",
    region: "europe",
    logoUrl: "/logos/partner-3.svg",
    website: "https://lsmuni.lt",
  },
  {
    id: "zagreb",
    region: "europe",
    logoUrl: "/logos/partner-4.svg",
    website: "https://mef.unizg.hr",
  },
  {
    id: "bsmu",
    region: "cis",
    logoUrl: "/logos/partner-5.svg",
    website: "https://www.bsmu.by",
  },
  {
    id: "kaznmu",
    region: "cis",
    logoUrl: "/logos/partner-1.svg",
    website: "https://www.kaznmu.kz",
  },
  {
    id: "sechenov",
    region: "cis",
    logoUrl: "/logos/partner-2.svg",
    website: "https://www.sechenov.ru",
  },
  {
    id: "tma",
    region: "cis",
    logoUrl: "/logos/partner-3.svg",
    website: "https://www.tma.uz",
  },
] as const;

export type PartnerId = (typeof partners)[number]["id"];

export type PartnerRecord = (typeof partners)[number];

export function partnersByRegion(region: PartnerRegion): PartnerRecord[] {
  return partners.filter((partner) => partner.region === region);
}

export const memorandumIds = [
  "sofia",
  "lsmu",
  "bsmu",
  "kaznmu",
] as const;

export type MemorandumId = (typeof memorandumIds)[number];

export const exchangeIds = ["semester", "clinical", "staff"] as const;

export type ExchangeId = (typeof exchangeIds)[number];

export const projectIds = ["mobility", "research", "capacity"] as const;

export type ProjectId = (typeof projectIds)[number];
