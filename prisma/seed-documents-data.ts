export type SeedDocument = {
  titleHy: string;
  titleEn: string;
  descriptionHy?: string;
  descriptionEn?: string;
  year: number;
  /** Static file under `public/`. */
  file: string;
  placements: Array<{ page: string; section: string; order: number }>;
};

const SAMPLE_PDF = "/documents/sample-document.pdf";

const qualityDocuments: SeedDocument[] = [
  {
    titleHy: "Ինքնավերլուծության հաշվետվություն",
    titleEn: "Self-assessment report",
    descriptionHy: "Ինքնավերլուծություն",
    descriptionEn: "Self-assessment",
    year: 2024,
    file: SAMPLE_PDF,
    placements: [{ page: "about-quality", section: "reports", order: 1 }],
  },
  {
    titleHy: "Որակի ապահովման տարեկան հաշվետվություն",
    titleEn: "Quality assurance annual report",
    descriptionHy: "Տարեկան հաշվետվություն",
    descriptionEn: "Annual report",
    year: 2024,
    file: SAMPLE_PDF,
    placements: [{ page: "about-quality", section: "reports", order: 2 }],
  },
  {
    titleHy: "Որակի ապահովման աշխատանքային պլան",
    titleEn: "Quality assurance work plan",
    descriptionHy: "Աշխատանքային պլան",
    descriptionEn: "Work plan",
    year: 2024,
    file: SAMPLE_PDF,
    placements: [{ page: "about-quality", section: "reports", order: 3 }],
  },
  {
    titleHy: "Որակի ապահովման տարեկան հաշվետվություն",
    titleEn: "Quality assurance annual report",
    descriptionHy: "Տարեկան հաշվետվություն",
    descriptionEn: "Annual report",
    year: 2025,
    file: SAMPLE_PDF,
    placements: [{ page: "about-quality", section: "reports", order: 1 }],
  },
  {
    titleHy: "Որակի ապահովման աշխատանքային պլան",
    titleEn: "Quality assurance work plan",
    descriptionHy: "Աշխատանքային պլան",
    descriptionEn: "Work plan",
    year: 2025,
    file: SAMPLE_PDF,
    placements: [{ page: "about-quality", section: "reports", order: 2 }],
  },
  {
    titleHy: "Որակի ապահովման աշխատանքային պլան",
    titleEn: "Quality assurance work plan",
    descriptionHy: "Աշխատանքային պլան",
    descriptionEn: "Work plan",
    year: 2026,
    file: SAMPLE_PDF,
    placements: [{ page: "about-quality", section: "reports", order: 1 }],
  },
];

const hrDocuments: SeedDocument[] = [
  {
    titleHy: "Մարդկային ռեսուրսների կառավարման կանոնակարգ",
    titleEn: "Human resources management regulation",
    descriptionHy: "Կանոնակարգ",
    descriptionEn: "Regulation",
    year: 2024,
    file: SAMPLE_PDF,
    placements: [{ page: "about-hr", section: "documents", order: 1 }],
  },
  {
    titleHy: "Աշխատակազմի տարեկան հաշվետվություն",
    titleEn: "Annual staff report",
    descriptionHy: "Տարեկան հաշվետվություն",
    descriptionEn: "Annual report",
    year: 2024,
    file: SAMPLE_PDF,
    placements: [{ page: "about-hr", section: "documents", order: 2 }],
  },
  {
    titleHy: "Աշխատակազմի տարեկան հաշվետվություն",
    titleEn: "Annual staff report",
    descriptionHy: "Տարեկան հաշվետվություն",
    descriptionEn: "Annual report",
    year: 2025,
    file: SAMPLE_PDF,
    placements: [{ page: "about-hr", section: "documents", order: 3 }],
  },
];

const accountingDocument = (
  year: number,
  order: number,
  hy: [string, string],
  en: [string, string],
): SeedDocument => ({
  titleHy: hy[0],
  descriptionHy: hy[1],
  titleEn: en[0],
  descriptionEn: en[1],
  year,
  file: SAMPLE_PDF,
  placements: [{ page: "about-accounting", section: "financial", order }],
});

const accountingDocuments: SeedDocument[] = [
  accountingDocument(2025, 1, ["Ֆինանսական հաշվետվություն", "Ֆինանսական հաշվետվություն"], ["Financial statement", "Financial report"]),
  accountingDocument(2025, 2, ["Բյուջեի կատարման հաշվետվություն", "Հաշվետվություն"], ["Budget execution report", "Report"]),
  accountingDocument(2025, 3, ["Հաշվապահական քաղաքականություն", "Փաստաթուղթ"], ["Accounting policy", "Document"]),
  accountingDocument(2026, 1, ["Ֆինանսական հաշվետվություն", "Ֆինանսական հաշվետվություն"], ["Financial statement", "Financial report"]),
  accountingDocument(2026, 2, ["Բյուջեի նախագիծ", "Փաստաթուղթ"], ["Draft budget", "Document"]),
  accountingDocument(2026, 3, ["Եռամսյակային ֆինանսական ամփոփագիր", "Հաշվետվություն"], ["Quarterly financial summary", "Report"]),
];

const admissionsDocuments: SeedDocument[] = [
  {
    titleHy: "Ընդունելության կարգ",
    titleEn: "Admissions procedure",
    descriptionHy: "Դիմումների ընդունման, գնահատման և գրանցման կանոնները։",
    descriptionEn: "Rules for receiving, assessing, and enrolling applicants.",
    year: 2026,
    file: "/documents/admissions/admissions-regulation.pdf",
    placements: [{ page: "admissions-how-to-apply", section: "regulations", order: 1 }],
  },
  {
    titleHy: "Ուսման վարձի վճարման կարգ",
    titleEn: "Tuition payment rules",
    descriptionHy: "Տարեկան վճարների, ժամանակացույցի և ուշացման պայմանները։",
    descriptionEn: "Annual fees, payment schedule, and late-payment terms.",
    year: 2026,
    file: "/documents/admissions/tuition-payment-rules.pdf",
    placements: [{ page: "admissions-how-to-apply", section: "regulations", order: 2 }],
  },
  {
    titleHy: "Ներքին ակադեմիական կանոններ",
    titleEn: "Internal academic rules",
    descriptionHy: "Ուսումնառության, կարգապահության և ուսանողի կարգավիճակի հիմնական դրույթները։",
    descriptionEn: "Core provisions on studies, conduct, and student status.",
    year: 2026,
    file: "/documents/admissions/internal-academic-rules.pdf",
    placements: [{ page: "admissions-how-to-apply", section: "regulations", order: 3 }],
  },
  {
    titleHy: "Բակալավրիատ / բժշկական ծրագրեր",
    titleEn: "Undergraduate / medical programs",
    descriptionHy: "Ընդհանուր բժշկության և ստոմատոլոգիայի դիմորդների համար։",
    descriptionEn: "For applicants to general medicine and dentistry.",
    year: 2026,
    file: "/documents/admissions/undergraduate-application.pdf",
    placements: [{ page: "admissions-apply", section: "forms", order: 1 }],
  },
  {
    titleHy: "Միջազգային դիմորդ",
    titleEn: "International applicant",
    descriptionHy: "Օտարերկրյա քաղաքացիների դիմումի ձև՝ լրացուցիչ տվյալների դաշտերով։",
    descriptionEn: "Application form for foreign citizens, with additional fields.",
    year: 2026,
    file: "/documents/admissions/international-application.pdf",
    placements: [{ page: "admissions-apply", section: "forms", order: 2 }],
  },
  {
    titleHy: "Մասնագիտական զարգացում",
    titleEn: "Professional development",
    descriptionHy: "Շարունակական բժշկական կրթության դասընթացների դիմում։",
    descriptionEn: "Application for continuing medical education courses.",
    year: 2026,
    file: "/documents/admissions/cpd-application.pdf",
    placements: [{ page: "admissions-apply", section: "forms", order: 3 }],
  },
];

const scienceDocument = (
  section: "publications" | "reports",
  year: number,
  order: number,
  hy: [string, string],
  en: [string, string],
): SeedDocument => ({
  titleHy: hy[0],
  descriptionHy: hy[1],
  titleEn: en[0],
  descriptionEn: en[1],
  year,
  file: SAMPLE_PDF,
  placements: [{ page: "science", section, order }],
});

const scienceDocuments: SeedDocument[] = [
  scienceDocument("publications", 2026, 1, ["Կլինիկական հետազոտությունների մեթոդաբանական ուղեցույց", "Ուղեցույց"], ["Methodological guide to clinical research", "Guide"]),
  scienceDocument("publications", 2025, 1, ["Բժշկական կրթության որակի ցուցանիշներ", "Հոդված"], ["Quality indicators in medical education", "Article"]),
  scienceDocument("publications", 2025, 2, ["Հանրային առողջության միջամտությունների գնահատում", "Հոդված"], ["Evaluating public health interventions", "Article"]),
  scienceDocument("publications", 2024, 1, ["Սիմուլյացիոն ուսուցման արդյունքների վերլուծություն", "Զեկույց"], ["Analysis of simulation training outcomes", "Report"]),
  scienceDocument("reports", 2026, 1, ["Գիտական գործունեության աշխատանքային պլան", "Աշխատանքային պլան"], ["Scientific activity work plan", "Work plan"]),
  scienceDocument("reports", 2025, 1, ["Գիտական գործունեության տարեկան հաշվետվություն", "Տարեկան հաշվետվություն"], ["Annual scientific activity report", "Annual report"]),
  scienceDocument("reports", 2024, 1, ["Գիտական գործունեության տարեկան հաշվետվություն", "Տարեկան հաշվետվություն"], ["Annual scientific activity report", "Annual report"]),
];

export const seedDocuments: SeedDocument[] = [
  ...qualityDocuments,
  ...hrDocuments,
  ...accountingDocuments,
  ...admissionsDocuments,
  ...scienceDocuments,
];
