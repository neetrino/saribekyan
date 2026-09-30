type SeedText = { name: string; position: string; bio?: string };

export type SeedTeamMember = {
  hy: SeedText;
  en: SeedText;
  email?: string;
  phone?: string;
  placements: Array<{ page: string; section: string; order: number }>;
};

const placeholder = { hy: "Անուն Ազգանուն", en: "Name Surname" };

function simple(
  hyPosition: string,
  enPosition: string,
  page: string,
  section: string,
  order: number,
  contacts: { email?: string; phone?: string } = {},
): SeedTeamMember {
  return {
    hy: { name: placeholder.hy, position: hyPosition },
    en: { name: placeholder.en, position: enPosition },
    ...contacts,
    placements: [{ page, section, order }],
  };
}

const aboutMembers: SeedTeamMember[] = [
  {
    hy: {
      name: placeholder.hy,
      position: "Կառավարման խորհրդի նախագահ",
      bio: "Կառավարման խորհուրդը սահմանում է համալսարանի ռազմավարական ուղղությունները։",
    },
    en: {
      name: placeholder.en,
      position: "Chair of the Board of Trustees",
      bio: "The Board of Trustees sets the university’s strategic direction.",
    },
    placements: [{ page: "about-who-we-are", section: "governance", order: 1 }],
  },
  simple("Կառավարման խորհրդի անդամ", "Member of the Board of Trustees", "about-who-we-are", "governance", 2),
  simple("Կառավարման խորհրդի անդամ", "Member of the Board of Trustees", "about-who-we-are", "governance", 3),
  simple("Գիտական խորհրդի նախագահ", "Chair of the Academic Council", "about-who-we-are", "academic-council", 1),
  simple("Գիտական խորհրդի անդամ", "Member of the Academic Council", "about-who-we-are", "academic-council", 2),
  simple("Գիտական խորհրդի անդամ", "Member of the Academic Council", "about-who-we-are", "academic-council", 3),
  simple("Ռեկտոր", "Rector", "about-who-we-are", "rectorate", 1, { email: "rector@saribekyan.am" }),
  {
    hy: {
      name: "Արայիկ Գյոզալյան",
      position: "Որակի ապահովման և կրթության բարեփոխումների գծով պրոռեկտոր",
      bio: "Պատասխանատու է որակի ապահովման ռազմավարության, կրթական բարեփոխումների և ինստիտուցիոնալ հավատարմագրման գործընթացների համար։",
    },
    en: {
      name: "Arayik Gyozalyan",
      position: "Vice-Rector for Quality Assurance and Education Reform",
      bio: "Responsible for quality assurance strategy, education reform and institutional accreditation.",
    },
    email: "a.gyozalyan@saribekyan.am",
    placements: [
      { page: "about-who-we-are", section: "rectorate", order: 2 },
      { page: "about-quality", section: "team", order: 1 },
    ],
  },
  simple("Ուսումնական գծով պրոռեկտոր", "Vice-Rector for Academic Affairs", "about-who-we-are", "rectorate", 3),
  simple("Ռեկտորի օգնական", "Assistant to the Rector", "about-who-we-are", "leadership", 1, {
    email: "office@saribekyan.am",
    phone: "+374 00 000000",
  }),
  simple("Ընդհանուր բաժնի պետ", "Head of the General Department", "about-who-we-are", "leadership", 2, {
    email: "admin@saribekyan.am",
    phone: "+374 00 000001",
  }),
  {
    hy: {
      name: "Մանուշակ Հովսեփյան",
      position: "Որակի ապահովման առաջատար մասնագետ",
      bio: "Համակարգում է ինքնավերլուծության հաշվետվությունները, տարեկան պլանները և որակի մոնիտորինգի գործիքները։",
    },
    en: {
      name: "Manushak Hovsepyan",
      position: "Lead Quality Assurance Specialist",
      bio: "Coordinates self-evaluation reports, annual plans and quality monitoring tools.",
    },
    email: "m.hovsepyan@saribekyan.am",
    placements: [{ page: "about-quality", section: "team", order: 2 }],
  },
  simple("Մարդկային ռեսուրսների բաժնի պետ", "Head of Human Resources", "about-hr", "staff", 1, {
    email: "hr@saribekyan.am",
    phone: "+374 00 000010",
  }),
  simple("Կադրային մասնագետ", "HR Specialist", "about-hr", "staff", 2, {
    email: "hr.specialist@saribekyan.am",
  }),
  simple("Ընդհանուր բաժնի մասնագետ", "General Department Specialist", "about-hr", "staff", 3),
];

type Bilingual = [hy: SeedText, en: SeedText];

function fromPairs(page: string, section: string, pairs: Bilingual[]): SeedTeamMember[] {
  return pairs.map(([hy, en], index) => ({
    hy,
    en,
    placements: [{ page, section, order: index + 1 }],
  }));
}

const educationMembers: SeedTeamMember[] = [
  ...fromPairs("education-medicine", "leadership", [
    [
      { name: "Դեկան", position: "Բուժական ֆակուլտետի դեկան", bio: "Ֆակուլտետի կրթական և կազմակերպչական գործունեության ընդհանուր ղեկավարում։" },
      { name: "Dean", position: "Dean of the Faculty of Medicine", bio: "Overall academic and organizational leadership of the faculty." },
    ],
    [
      { name: "Փոխդեկան", position: "Ուսումնական աշխատանքների փոխդեկան", bio: "Ուսումնական գործընթացի համակարգում և ուսանողների աջակցություն։" },
      { name: "Vice Dean", position: "Vice Dean for Academic Affairs", bio: "Coordination of the learning process and student support." },
    ],
    [
      { name: "Մեթոդիստ", position: "Ուսումնամեթոդական համակարգող", bio: "Ուսումնական պլանների և մեթոդական աջակցության համակարգում։" },
      { name: "Methodologist", position: "Academic methodology coordinator", bio: "Coordination of curricula and methodological support." },
    ],
  ]),
  ...fromPairs("education-dentistry", "leadership", [
    [
      { name: "Դեկան", position: "Ստոմատոլոգիական ֆակուլտետի դեկան", bio: "Ֆակուլտետի կրթական ծրագրերի և կլինիկական պրակտիկայի ընդհանուր ղեկավարում։" },
      { name: "Dean", position: "Dean of the Faculty of Dentistry", bio: "Overall leadership of academic programs and clinical practice." },
    ],
    [
      { name: "Փոխդեկան", position: "Կլինիկական աշխատանքների փոխդեկան", bio: "Կլինիկական պրակտիկայի և մասնագիտական պատրաստության համակարգում։" },
      { name: "Vice Dean", position: "Vice Dean for Clinical Affairs", bio: "Coordination of clinical practice and professional training." },
    ],
  ]),
];

const scienceMembers: SeedTeamMember[] = [
  {
    hy: {
      name: "Նարինե Ավետիսյան",
      position: "Գիտության գծով պրոռեկտոր",
      bio: "Համակարգում է համալսարանի գիտական ռազմավարությունը, ծրագրերը և արտաքին համագործակցությունը։",
    },
    en: {
      name: "Narine Avetisyan",
      position: "Vice-Rector for Science",
      bio: "Coordinates the university’s science strategy, projects, and external collaboration.",
    },
    email: "n.avetisyan@saribekyan.am",
    phone: "+374 10 000 201",
    placements: [
      { page: "about-who-we-are", section: "rectorate", order: 4 },
      { page: "science", section: "contacts", order: 1 },
    ],
  },
  {
    hy: {
      name: "Հայկ Մարտիրոսյան",
      position: "Գիտական մասի ղեկավար",
      bio: "Կազմակերպում է հետազոտական ծրագրերի մոնիտորինգը, հրապարակումները և հաշվետվությունները։",
    },
    en: {
      name: "Hayk Martirosyan",
      position: "Head of the Science Unit",
      bio: "Organizes monitoring of research projects, publications, and reporting.",
    },
    email: "h.martirosyan@saribekyan.am",
    phone: "+374 10 000 202",
    placements: [{ page: "science", section: "contacts", order: 2 }],
  },
  {
    hy: {
      name: "Լիլիթ Սարգսյան",
      position: "ՈՒԳԸ համակարգող",
      bio: "Աջակցում է ուսանողական գիտական նախագծերին, միջոցառումներին և մենթորական ծրագրերին։",
    },
    en: {
      name: "Lilit Sargsyan",
      position: "SSS Coordinator",
      bio: "Supports student research projects, events, and mentoring programs.",
    },
    email: "l.sargsyan@saribekyan.am",
    phone: "+374 10 000 203",
    placements: [{ page: "science", section: "contacts", order: 3 }],
  },
];

export { aboutMembers, educationMembers, scienceMembers, fromPairs };
