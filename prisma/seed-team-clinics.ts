import { fromPairs, type SeedTeamMember } from "./seed-team-data";

export const clinicMembers: SeedTeamMember[] = [
  ...fromPairs("clinics-hospitals", "specialists", [
    [
      { name: "Կլինիկական տնօրեն", position: "Բժշկական համալիրի ղեկավար", bio: "Համալիրի կլինիկական և ուսումնական գործունեության ընդհանուր համակարգում։" },
      { name: "Clinical director", position: "Head of the medical complex", bio: "Overall coordination of clinical and teaching activity at the complex." },
    ],
    [
      { name: "Թերապիայի ղեկավար", position: "Թերապևտիկ ծառայություն", bio: "Ներքին հիվանդությունների բուժում և ուսանողների կլինիկական պարապմունքներ։" },
      { name: "Head of internal medicine", position: "Internal medicine service", bio: "Treatment of internal diseases and bedside teaching." },
    ],
    [
      { name: "Վիրաբուժության ղեկավար", position: "Վիրաբուժական ծառայություն", bio: "Վիրաբուժական օգնություն և գործնական ուսուցման կազմակերպում։" },
      { name: "Head of surgery", position: "Surgical service", bio: "Surgical care and organisation of practical training." },
    ],
    [
      { name: "Ախտորոշման ղեկավար", position: "Ախտորոշիչ ծառայություն", bio: "Լաբորատոր և գործիքային հետազոտությունների համակարգում։" },
      { name: "Head of diagnostics", position: "Diagnostic service", bio: "Coordination of laboratory and imaging investigations." },
    ],
    [
      { name: "Ստոմատոլոգիական կենտրոնի ղեկավար", position: "Ստոմատոլոգիական ծառայություն", bio: "Ստոմատոլոգիական բուժում և ուսումնական պրակտիկայի ղեկավարում։" },
      { name: "Head of the dental centre", position: "Dental service", bio: "Dental treatment and supervision of student practice." },
    ],
    [
      { name: "Պրակտիկայի համակարգող", position: "Կլինիկական ուսուցում", bio: "Ուսանողների կլինիկական ռոտացիաների և հսկողության կազմակերպում։" },
      { name: "Practice coordinator", position: "Clinical teaching", bio: "Organisation of student rotations and clinical supervision." },
    ],
  ]),
  ...fromPairs("clinics-complex", "specialists", [
    [
      { name: "Համալիրի տնօրեն", position: "Կլինիկական ղեկավարում", bio: "Համալիրի բուժական և ուսումնական գործունեության համակարգում։" },
      { name: "Director of the complex", position: "Clinical leadership", bio: "Coordination of treatment and teaching at the complex." },
    ],
    [
      { name: "Թերապևտ", position: "Թերապևտիկ ծառայություն", bio: "Ներքին հիվանդությունների բուժում և ուսանողների ուսուցում։" },
      { name: "Internist", position: "Internal medicine service", bio: "Treatment of internal diseases and student teaching." },
    ],
    [
      { name: "Վիրաբույժ", position: "Վիրաբուժական ծառայություն", bio: "Վիրաբուժական օգնություն և գործնական պարապմունքներ։" },
      { name: "Surgeon", position: "Surgical service", bio: "Surgical care and practical sessions." },
    ],
    [
      { name: "Ուսումնական համակարգող", position: "Կլինիկական պրակտիկա", bio: "Ուսանողների պրակտիկայի գրաֆիկ և հսկողություն։" },
      { name: "Teaching coordinator", position: "Clinical practice", bio: "Student practice schedules and supervision." },
    ],
  ]),
  ...fromPairs("clinics-dental", "specialists", [
    [
      { name: "Կենտրոնի ղեկավար", position: "Ստոմատոլոգիական ծառայություն", bio: "Կենտրոնի կլինիկական և ուսումնական աշխատանքի ղեկավարում։" },
      { name: "Head of the centre", position: "Dental service", bio: "Leadership of clinical and teaching work at the centre." },
    ],
    [
      { name: "Վիրաբույժ-ստոմատոլոգ", position: "Վիրաբուժական ստոմատոլոգիա", bio: "Ամբուլատոր վիրաբուժություն և ուսանողների գործնական ուսուցում։" },
      { name: "Oral surgeon", position: "Surgical dentistry", bio: "Outpatient surgery and practical teaching." },
    ],
    [
      { name: "Թերապևտ-ստոմատոլոգ", position: "Թերապևտիկ ստոմատոլոգիա", bio: "Թերապևտիկ բուժում և կլինիկական պարապմունքներ։" },
      { name: "Dental therapist", position: "Therapeutic dentistry", bio: "Therapeutic treatment and clinical sessions." },
    ],
    [
      { name: "Հիգիենայի մասնագետ", position: "Կանխարգելում", bio: "Մասնագիտական հիգիենա և պացիենտի կրթություն։" },
      { name: "Hygiene specialist", position: "Prevention", bio: "Professional hygiene and patient education." },
    ],
  ]),
  ...fromPairs("clinics-simulation", "specialists", [
    [
      { name: "Կենտրոնի ղեկավար", position: "Սիմուլյացիոն ուսուցում", bio: "Սիմուլյացիոն ծրագրերի և սցենարների ընդհանուր ղեկավարում։" },
      { name: "Head of the centre", position: "Simulation teaching", bio: "Overall leadership of simulation programmes and scenarios." },
    ],
    [
      { name: "Սիմուլյացիոն հրահանգիչ", position: "Կլինիկական հմտություններ", bio: "Սցենարների վարում և ուսանողների գնահատում։" },
      { name: "Simulation instructor", position: "Clinical skills", bio: "Running scenarios and assessing students." },
    ],
    [
      { name: "Ստոմատոլոգիական հրահանգիչ", position: "Նախակլինիկական սրահներ", bio: "Ֆանտոմային աշխատանքի ուսուցում և հսկողություն։" },
      { name: "Dental instructor", position: "Preclinical rooms", bio: "Teaching and supervising phantom work." },
    ],
    [
      { name: "Սիմուլյացիոն տեխնիկ", position: "Սարքավորումներ", bio: "Սիմուլյատորների պատրաստում և տեխնիկական աջակցություն։" },
      { name: "Simulation technician", position: "Equipment", bio: "Preparing simulators and providing technical support." },
    ],
  ]),
];
