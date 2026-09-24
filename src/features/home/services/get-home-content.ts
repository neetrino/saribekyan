import type {
  AdmissionStep,
  Clinic,
  NewsPost,
  Partner,
  Program,
  StatSnapshot,
} from "@prisma/client";

import { prisma } from "@/shared/lib/prisma";

export type HomeContent = {
  stats: StatSnapshot[];
  programs: Program[];
  admissionSteps: AdmissionStep[];
  clinics: Clinic[];
  partners: Partner[];
  featuredNews: NewsPost | null;
  news: NewsPost[];
};

const fallbackContent: HomeContent = {
  stats: [
    {
      id: "1",
      year: 2024,
      value: 10000,
      label: "Ուսանող",
      sortOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      year: 2025,
      value: 11400,
      label: "Ուսանող",
      sortOrder: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      year: 2026,
      value: 12000,
      label: "Ուսանող",
      sortOrder: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  programs: [
    {
      id: "1",
      slug: "cpd",
      number: "01",
      title: "Մասնագիտական զարգացում",
      description:
        "Շարունակական բժշկական կրթության ծրագրեր, վերապատրաստումներ և որակավորման բարձրացման դասընթացներ գործող մասնագետների համար:",
      imageUrl: "/images/home/program-cpd.png",
      href: "/education/cpd",
      sortOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      slug: "general-medicine",
      number: "02",
      title: "Ընդհանուր բժշկություն",
      description:
        "Հիմնարար և կլինիկական գիտելիքների խորը ուսումնասիրություն՝ ապագա բժիշկների համար: Ծրագիրը ներառում է տեսական գիտելիքներ և գործնական հմտություններ ժամանակակից կլինիկաներում:",
      imageUrl: "/images/home/program-medicine.png",
      href: "/education/medicine",
      sortOrder: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      slug: "dentistry",
      number: "03",
      title: "Ստոմատոլոգիա",
      description:
        "Ժամանակակից սարքավորումներով և մեթոդներով ստոմատոլոգիական կրթություն: Ուսանողները ձեռք են բերում փորձ մասնագիտացված սիմուլյացիոն սրահներում և կլինիկաներում:",
      imageUrl: "/images/home/program-dentistry.png",
      href: "/education/dentistry",
      sortOrder: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  admissionSteps: [
    {
      id: "1",
      number: "01",
      title: "Ծանոթացում",
      description: "Ուսումնասիրեք առաջարկվող կրթական ծրագրերը և պահանջները:",
      sortOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      number: "02",
      title: "Փաստաթղթեր",
      description:
        "Հավաքեք և ներկայացրեք անհրաժեշտ փաստաթղթերի փաթեթը առցանց կամ անձամբ:",
      sortOrder: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      number: "03",
      title: "Քննություններ",
      description: "Հանձնեք սահմանված ընդունելության քննությունները և հարցազրույցները:",
      sortOrder: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      number: "04",
      title: "Ընդունելություն",
      description: "Անցեք մրցույթը և կնքեք ուսումնառության պայմանագիրը:",
      sortOrder: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  clinics: [
    {
      id: "1",
      slug: "university-complex",
      title: "Համալսարանական բժշկական համալիր",
      description: "Կլինիկական պրակտիկա և բուժօգնություն ժամանակակից համալիրում:",
      imageUrl: "/images/home/program-medicine.png",
      href: "/clinics/complex",
      sortOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      slug: "dental-center",
      title: "Ստոմատոլոգիական կենտրոն",
      description: "Ստոմատոլոգիական կլինիկա և ուսումնական պրակտիկա:",
      imageUrl: "/images/home/program-dentistry.png",
      href: "/clinics/dental",
      sortOrder: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      slug: "simulation",
      title: "Բժշկական սիմուլյացիոն կենտրոն",
      description: "Սիմուլյացիոն սրահներ՝ գործնական հմտությունների զարգացման համար:",
      imageUrl: "/images/home/program-cpd.png",
      href: "/clinics/simulation",
      sortOrder: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  partners: [
    {
      id: "1",
      name: "Doctor+",
      logoUrl: "/logos/partner-1.svg",
      website: null,
      sortOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "Invert",
      logoUrl: "/logos/partner-2.svg",
      website: null,
      sortOrder: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "Orbitc",
      logoUrl: "/logos/partner-3.svg",
      website: null,
      sortOrder: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      name: "Leafe",
      logoUrl: "/logos/partner-4.svg",
      website: null,
      sortOrder: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "5",
      name: "Vision",
      logoUrl: "/logos/partner-5.svg",
      website: null,
      sortOrder: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  featuredNews: {
    id: "f1",
    slug: "featured-tech",
    title: "Տեխնոլոգիաներ",
    excerpt:
      "Բարդ առևտրային պայմանագրերի կազմում, ստուգում և բանակցություն՝ ճշգրտությամբ և հեռատեսությամբ։",
    category: "Տեխնոլոգիաներ",
    coverImage: "/images/home/news-featured.png",
    publishedAt: new Date("2026-03-15"),
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  news: [
    {
      id: "n1",
      slug: "news-1",
      title: "Տեխնոլոգիաներ",
      excerpt:
        "Բարդ առևտրային պայմանագրերի կազմում, ստուգում և բանակցություն՝ ճշգրտությամբ և հեռատեսությամբ։",
      category: "Տեխնոլոգիաներ",
      coverImage: "/images/home/news-card.png",
      publishedAt: new Date("2026-03-15"),
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "n2",
      slug: "news-2",
      title: "Տեխնոլոգիաներ",
      excerpt:
        "Բարդ առևտրային պայմանագրերի կազմում, ստուգում և բանակցություն՝ ճշգրտությամբ և հեռատեսությամբ։",
      category: "Տեխնոլոգիաներ",
      coverImage: "/images/home/news-card.png",
      publishedAt: new Date("2026-03-15"),
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "n3",
      slug: "news-3",
      title: "Տեխնոլոգիաներ",
      excerpt:
        "Բարդ առևտրային պայմանագրերի կազմում, ստուգում և բանակցություն՝ ճշգրտությամբ և հեռատեսությամբ։",
      category: "Տեխնոլոգիաներ",
      coverImage: "/images/home/news-card.png",
      publishedAt: new Date("2026-03-15"),
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

export async function getHomeContent(): Promise<HomeContent> {
  try {
    const [stats, programs, admissionSteps, clinics, partners, featuredNews, news] =
      await Promise.all([
        prisma.statSnapshot.findMany({ orderBy: { sortOrder: "asc" } }),
        prisma.program.findMany({ orderBy: { sortOrder: "asc" } }),
        prisma.admissionStep.findMany({ orderBy: { sortOrder: "asc" } }),
        prisma.clinic.findMany({ orderBy: { sortOrder: "asc" } }),
        prisma.partner.findMany({ orderBy: { sortOrder: "asc" } }),
        prisma.newsPost.findFirst({
          where: { featured: true },
          orderBy: { publishedAt: "desc" },
        }),
        prisma.newsPost.findMany({
          where: { featured: false },
          orderBy: { publishedAt: "desc" },
          take: 3,
        }),
      ]);

    if (programs.length === 0) {
      return fallbackContent;
    }

    return {
      stats,
      programs,
      admissionSteps,
      clinics,
      partners,
      featuredNews,
      news,
    };
  } catch {
    return fallbackContent;
  }
}
