export const siteConfig = {
  phone: "+374 10 000000",
  email: "info@saribekyan.am",
  address: "Երևան, Հայաստան",
  phones: [
    { id: "main", value: "+374 10 000000" },
    { id: "reception", value: "+374 10 000001" },
  ],
  emails: [
    { id: "info", value: "info@saribekyan.am" },
    { id: "office", value: "office@saribekyan.am" },
  ],
  departments: {
    admissions: {
      phone: "+374 10 000010",
      email: "admissions@saribekyan.am",
    },
    international: {
      phone: "+374 10 000020",
      email: "international@saribekyan.am",
    },
  },
  map: {
    embedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=44.490%2C40.165%2C44.535%2C40.195&layer=mapnik&marker=40.1776%2C44.5126",
    externalUrl: "https://www.openstreetmap.org/?mlat=40.1776&mlon=44.5126#map=15/40.1776/44.5126",
  },
  social: {
    facebook: "#",
    instagram: "#",
    telegram: "#",
    youtube: "#",
    whatsapp: "#",
    viber: "#",
  },
} as const;

export type NavKey =
  | "home"
  | "about"
  | "education"
  | "admissions"
  | "clinics"
  | "science"
  | "contact"
  | "international";

export type NavItem = {
  key: NavKey;
  href: string;
};

export const mainNav: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "education", href: "/education" },
  { key: "admissions", href: "/admissions" },
  { key: "clinics", href: "/clinics" },
  { key: "science", href: "/science" },
  { key: "contact", href: "/contact" },
  { key: "international", href: "/international" },
];

export type FooterColumnKey =
  | "university"
  | "applicants"
  | "quickLinks"
  | "legal";

export type FooterLinkKey =
  | "about"
  | "governance"
  | "quality"
  | "structure"
  | "faculties"
  | "documents"
  | "admissions"
  | "programs"
  | "tuition"
  | "internationalApplicants"
  | "news"
  | "library"
  | "students"
  | "contact"
  | "privacy"
  | "terms"
  | "sitemap";

export type FooterColumn = {
  titleKey: FooterColumnKey;
  links: Array<{ labelKey: FooterLinkKey; href: string }>;
};

export const footerColumns: FooterColumn[] = [
  {
    titleKey: "university",
    links: [
      { labelKey: "about", href: "/about" },
      { labelKey: "governance", href: "/about/who-we-are#governance" },
      { labelKey: "faculties", href: "/education" },
      { labelKey: "documents", href: "/documents" },
    ],
  },
  {
    titleKey: "applicants",
    links: [
      { labelKey: "admissions", href: "/admissions" },
      { labelKey: "programs", href: "/education" },
      { labelKey: "tuition", href: "/admissions/tuition" },
      {
        labelKey: "internationalApplicants",
        href: "/admissions/international",
      },
    ],
  },
  {
    titleKey: "quickLinks",
    links: [
      { labelKey: "news", href: "/news" },
      { labelKey: "library", href: "/library" },
      { labelKey: "students", href: "/students" },
      { labelKey: "contact", href: "/contact" },
    ],
  },
  {
    titleKey: "legal",
    links: [
      { labelKey: "privacy", href: "/legal/privacy" },
      { labelKey: "terms", href: "/legal/terms" },
      { labelKey: "sitemap", href: "/sitemap" },
    ],
  },
];
