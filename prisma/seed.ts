import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.newsPost.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.statSnapshot.deleteMany();
  await prisma.program.deleteMany();
  await prisma.clinic.deleteMany();
  await prisma.admissionStep.deleteMany();

  await prisma.statSnapshot.createMany({
    data: [
      { year: 2024, value: 10000, label: "Ուսանող", sortOrder: 1 },
      { year: 2025, value: 11400, label: "Ուսանող", sortOrder: 2 },
      { year: 2026, value: 12000, label: "Ուսանող", sortOrder: 3 },
    ],
  });

  await prisma.program.createMany({
    data: [
      {
        slug: "cpd",
        number: "01",
        title: "Մասնագիտական զարգացում",
        description:
          "Շարունակական բժշկական կրթության ծրագրեր, վերապատրաստումներ և որակավորման բարձրացման դասընթացներ գործող մասնագետների համար:",
        imageUrl: "/images/home/program-cpd.png",
        href: "/education/cpd",
        sortOrder: 1,
      },
      {
        slug: "general-medicine",
        number: "02",
        title: "Ընդհանուր բժշկություն",
        description:
          "Հիմնարար և կլինիկական գիտելիքների խորը ուսումնասիրություն՝ ապագա բժիշկների համար: Ծրագիրը ներառում է տեսական գիտելիքներ և գործնական հմտություններ ժամանակակից կլինիկաներում:",
        imageUrl: "/images/home/program-medicine.png",
        href: "/education/medicine",
        sortOrder: 2,
      },
      {
        slug: "dentistry",
        number: "03",
        title: "Ստոմատոլոգիա",
        description:
          "Ժամանակակից սարքավորումներով և մեթոդներով ստոմատոլոգիական կրթություն: Ուսանողները ձեռք են բերում փորձ մասնագիտացված սիմուլյացիոն սրահներում և կլինիկաներում:",
        imageUrl: "/images/home/program-dentistry.png",
        href: "/education/dentistry",
        sortOrder: 3,
      },
    ],
  });

  await prisma.admissionStep.createMany({
    data: [
      {
        number: "01",
        title: "Ծանոթացում",
        description: "Ուսումնասիրեք առաջարկվող կրթական ծրագրերը և պահանջները:",
        sortOrder: 1,
      },
      {
        number: "02",
        title: "Փաստաթղթեր",
        description:
          "Հավաքեք և ներկայացրեք անհրաժեշտ փաստաթղթերի փաթեթը առցանց կամ անձամբ:",
        sortOrder: 2,
      },
      {
        number: "03",
        title: "Քննություններ",
        description: "Հանձնեք սահմանված ընդունելության քննությունները և հարցազրույցները:",
        sortOrder: 3,
      },
      {
        number: "04",
        title: "Ընդունելություն",
        description: "Անցեք մրցույթը և կնքեք ուսումնառության պայմանագիրը:",
        sortOrder: 4,
      },
    ],
  });

  await prisma.clinic.createMany({
    data: [
      {
        slug: "university-complex",
        title: "Համալսարանական բժշկական համալիր",
        description: "Կլինիկական պրակտիկա և բուժօգնություն ժամանակակից համալիրում:",
        imageUrl: "/images/home/program-medicine.png",
        href: "/clinics/complex",
        sortOrder: 1,
      },
      {
        slug: "dental-center",
        title: "Ստոմատոլոգիական կենտրոն",
        description: "Ստոմատոլոգիական կլինիկա և ուսումնական պրակտիկա:",
        imageUrl: "/images/home/program-dentistry.png",
        href: "/clinics/dental",
        sortOrder: 2,
      },
      {
        slug: "simulation",
        title: "Բժշկական սիմուլյացիոն կենտրոն",
        description: "Սիմուլյացիոն սրահներ՝ գործնական հմտությունների զարգացման համար:",
        imageUrl: "/images/home/program-cpd.png",
        href: "/clinics/simulation",
        sortOrder: 3,
      },
    ],
  });

  await prisma.partner.createMany({
    data: [
      { name: "Doctor+", logoUrl: "/logos/partner-1.svg", sortOrder: 1 },
      { name: "Invert", logoUrl: "/logos/partner-2.svg", sortOrder: 2 },
      { name: "Orbitc", logoUrl: "/logos/partner-3.svg", sortOrder: 3 },
      { name: "Leafe", logoUrl: "/logos/partner-4.svg", sortOrder: 4 },
      { name: "Vision", logoUrl: "/logos/partner-5.svg", sortOrder: 5 },
    ],
  });

  const newsDate = new Date("2026-03-15T10:00:00.000Z");

  await prisma.newsPost.createMany({
    data: [
      {
        slug: "featured-tech",
        title: "Տեխնոլոգիաներ",
        excerpt:
          "Բարդ առևտրային պայմանագրերի կազմում, ստուգում և բանակցություն՝ ճշգրտությամբ և հեռատեսությամբ։",
        category: "Տեխնոլոգիաներ",
        coverImage: "/images/home/news-featured.png",
        publishedAt: newsDate,
        featured: true,
      },
      {
        slug: "news-1",
        title: "Տեխնոլոգիաներ",
        excerpt:
          "Բարդ առևտրային պայմանագրերի կազմում, ստուգում և բանակցություն՝ ճշգրտությամբ և հեռատեսությամբ։",
        category: "Տեխնոլոգիաներ",
        coverImage: "/images/home/news-card.png",
        publishedAt: newsDate,
        featured: false,
      },
      {
        slug: "news-2",
        title: "Տեխնոլոգիաներ",
        excerpt:
          "Բարդ առևտրային պայմանագրերի կազմում, ստուգում և բանակցություն՝ ճշգրտությամբ և հեռատեսությամբ։",
        category: "Տեխնոլոգիաներ",
        coverImage: "/images/home/news-card.png",
        publishedAt: newsDate,
        featured: false,
      },
      {
        slug: "news-3",
        title: "Տեխնոլոգիաներ",
        excerpt:
          "Բարդ առևտրային պայմանագրերի կազմում, ստուգում և բանակցություն՝ ճշգրտությամբ և հեռատեսությամբ։",
        category: "Տեխնոլոգիաներ",
        coverImage: "/images/home/news-card.png",
        publishedAt: newsDate,
        featured: false,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
