export const contactDepartmentIds = ["admissions", "international"] as const;

export type ContactDepartmentId = (typeof contactDepartmentIds)[number];

export const contactHourIds = ["weekdays", "saturday", "sunday"] as const;

export type ContactHourId = (typeof contactHourIds)[number];

export const contactFormDepartments = [
  "general",
  "admissions",
  "international",
] as const;

export type ContactFormDepartment = (typeof contactFormDepartments)[number];

export const contactSocialLinks = [
  { id: "facebook", icon: "/icons/facebook.svg" },
  { id: "instagram", icon: "/icons/instagram.svg" },
  { id: "telegram", icon: "/icons/telegram.svg" },
  { id: "youtube", icon: "/icons/youtube.svg" },
] as const;

export type ContactSocialId = (typeof contactSocialLinks)[number]["id"];
