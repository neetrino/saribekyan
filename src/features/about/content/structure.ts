import type {
  AboutDocument,
  AboutPerson,
  ActivityItem,
  OrgNode,
  StructureUnit,
} from "./types";

export const structureIntro = {
  badge: "Կառուցվածք",
  title: "Կազմակերպչական կառուցվածք",
  highlight: "և ստորաբաժանումներ",
  description:
    "Համալսարանի կառավարման մարմինները, վարչական ստորաբաժանումները և օժանդակ ծառայությունները։",
} as const;

export const orgChart: OrgNode = {
  id: "university",
  label: "ՍՄԲՀ",
  children: [
    {
      id: "board",
      label: "Կառավարման խորհուրդ",
      href: "/about/who-we-are#governance",
    },
    {
      id: "academic",
      label: "Գիտական խորհուրդ",
      href: "/about/who-we-are#academic-council",
    },
    {
      id: "rectorate",
      label: "Ռեկտորատ",
      href: "/about/who-we-are#rectorate",
      children: [
        {
          id: "hr",
          label: "Մարդկային ռեսուրսներ",
          href: "/about/structure/hr",
        },
        {
          id: "accounting",
          label: "Հաշվապահություն",
          href: "/about/structure/accounting",
        },
        {
          id: "facilities",
          label: "Տնտեսական մաս",
          href: "/about/structure/facilities",
        },
      ],
    },
  ],
};

export const structureUnits: StructureUnit[] = [
  {
    id: "hr",
    slug: "hr",
    title: "Մարդկային ռեսուրսների կառավարման և ընդհանուր բաժին",
    description:
      "Աշխատակազմ, կանոնակարգեր և տարեկան հաշվետվություններ։",
    href: "/about/structure/hr",
  },
  {
    id: "accounting",
    slug: "accounting",
    title: "Հաշվապահություն",
    description:
      "2025–2026 թվականների փաստաթղթեր և ֆինանսական հաշվետվություններ։",
    href: "/about/structure/accounting",
  },
  {
    id: "facilities",
    slug: "facilities",
    title: "Տնտեսական մաս",
    description:
      "Շենքային ռեսուրսներ, արդիականացումներ, վերանորոգումներ և սարքավորումներ։",
    href: "/about/structure/facilities",
  },
];

export const hrIntro = {
  badge: "Մարդկային ռեսուրսներ",
  title: "Մարդկային ռեսուրսների կառավարման",
  highlight: "և ընդհանուր բաժին",
  description:
    "Բաժինը ապահովում է աշխատակազմի կառավարումը, կանոնակարգերի կիրառումը և տարեկան հաշվետվությունը։",
} as const;

export const hrStaff: AboutPerson[] = [
  {
    id: "hr-1",
    name: "Անուն Ազգանուն",
    role: "Մարդկային ռեսուրսների բաժնի պետ",
    email: "hr@saribekyan.am",
    phone: "+374 00 000010",
  },
  {
    id: "hr-2",
    name: "Անուն Ազգանուն",
    role: "Կադրային մասնագետ",
    email: "hr.specialist@saribekyan.am",
  },
  {
    id: "hr-3",
    name: "Անուն Ազգանուն",
    role: "Ընդհանուր բաժնի մասնագետ",
  },
];

export const hrDocuments: AboutDocument[] = [
  {
    id: "hr-doc-1",
    title: "Մարդկային ռեսուրսների կառավարման կանոնակարգ",
    year: 2024,
    type: "Կանոնակարգ",
    href: "#",
  },
  {
    id: "hr-doc-2",
    title: "Աշխատակազմի տարեկան հաշվետվություն",
    year: 2024,
    type: "Տարեկան հաշվետվություն",
    href: "#",
  },
  {
    id: "hr-doc-3",
    title: "Աշխատակազմի տարեկան հաշվետվություն",
    year: 2025,
    type: "Տարեկան հաշվետվություն",
    href: "#",
  },
];

export const accountingIntro = {
  badge: "Հաշվապահություն",
  title: "Հաշվապահության բաժին",
  highlight: "և ֆինանսներ",
  description:
    "Ֆինանսական փաստաթղթեր, տարեկան հաշվետվություններ և պաշտոնական հաշվետվություններ ըստ տարիների։",
} as const;

export const accountingDocuments: AboutDocument[] = [
  {
    id: "acc-2025-1",
    title: "Ֆինանսական հաշվետվություն",
    year: 2025,
    type: "Ֆինանսական հաշվետվություն",
    href: "#",
  },
  {
    id: "acc-2025-2",
    title: "Բյուջեի կատարման հաշվետվություն",
    year: 2025,
    type: "Հաշվետվություն",
    href: "#",
  },
  {
    id: "acc-2025-3",
    title: "Հաշվապահական քաղաքականություն",
    year: 2025,
    type: "Փաստաթուղթ",
    href: "#",
  },
  {
    id: "acc-2026-1",
    title: "Ֆինանսական հաշվետվություն",
    year: 2026,
    type: "Ֆինանսական հաշվետվություն",
    href: "#",
  },
  {
    id: "acc-2026-2",
    title: "Բյուջեի նախագիծ",
    year: 2026,
    type: "Փաստաթուղթ",
    href: "#",
  },
  {
    id: "acc-2026-3",
    title: "Եռամսյակային ֆինանսական ամփոփագիր",
    year: 2026,
    type: "Հաշվետվություն",
    href: "#",
  },
];

export const facilitiesIntro = {
  badge: "Տնտեսական մաս",
  title: "Շենքային և նյութատեխնիկական",
  highlight: "ռեսուրսներ",
  description:
    "Համալսարանի ենթակառուցվածքները, արդիականացումները, վերանորոգման աշխատանքները և ձեռք բերված սարքավորումները։",
} as const;

export const facilitiesResources: ActivityItem[] = [
  {
    id: "fac-1",
    title: "Շենքային ռեսուրսներ",
    description:
      "Ուսումնական մասնաշենքեր, լաբորատորիաներ, գրադարան և վարչական տարածքներ։",
  },
  {
    id: "fac-2",
    title: "Իրականացված արդիականացումներ",
    description:
      "Լսարանների և լաբորատորիաների տեխնիկական արդիականացում՝ ժամանակակից ուսումնական միջավայրի համար։",
  },
  {
    id: "fac-3",
    title: "Վերանորոգման աշխատանքներ",
    description:
      "Պլանային և արտահերթ վերանորոգումներ՝ անվտանգ և հարմարավետ միջավայր ապահովելու համար։",
  },
  {
    id: "fac-4",
    title: "Ձեռք բերված սարքավորումներ",
    description:
      "Ուսումնական և կլինիկական սարքավորումներ, որոնք աջակցում են պրակտիկ կրթությանը։",
  },
];
