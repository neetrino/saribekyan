import type { ActivityItem, OrgNode, StructureUnit } from "./types";

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
      "Ֆինանսական հաշվետվություններ և փաստաթղթեր ըստ տարիների։",
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

export const accountingIntro = {
  badge: "Հաշվապահություն",
  title: "Հաշվապահության բաժին",
  highlight: "և ֆինանսներ",
  description:
    "Ֆինանսական փաստաթղթեր, տարեկան հաշվետվություններ և պաշտոնական հաշվետվություններ ըստ տարիների։",
} as const;

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
