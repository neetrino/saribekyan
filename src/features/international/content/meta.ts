export const internationalSectionIds = [
  "office",
  "cooperation",
  "partners",
  "memoranda",
  "exchange",
] as const;

export type InternationalSectionId = (typeof internationalSectionIds)[number];

export const officeParagraphIds = ["p1", "p2", "p3"] as const;

export const officeFunctionIds = [
  "represent",
  "contacts",
  "training",
  "lecturers",
  "foreign",
  "conferences",
] as const;

export const cooperationParagraphIds = ["p1", "p2", "p3", "p4"] as const;

export const localCooperationParagraphIds = ["p1", "p2", "p3"] as const;

export const partnerIds = ["studyMedicineEurope", "campusInternational"] as const;

export const partnerOrganizationIds = [
  "gmc",
  "amc",
  "mcc",
  "ecfmg",
  "dpsa",
  "ifmsa",
] as const;

export const memorandumIds = [
  "grigoris",
  "gavar",
  "levonSargsyan",
  "grigorLusavorich",
  "vardenis",
  "foldink",
  "ilia",
  "unilevel",
  "shaan",
  "aastmt",
  "portSaid",
  "grodno",
] as const;
