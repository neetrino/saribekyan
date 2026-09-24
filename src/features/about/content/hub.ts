export const aboutHubCardMeta = [
  { id: "who", number: "01", href: "/about/who-we-are" },
  { id: "quality", number: "02", href: "/about/quality" },
  { id: "structure", number: "03", href: "/about/structure" },
] as const;

export type AboutNavKey = "overview" | "whoWeAre" | "quality" | "structure";

export const aboutNavHrefs: Array<{ key: AboutNavKey; href: string }> = [
  { key: "overview", href: "/about" },
  { key: "whoWeAre", href: "/about/who-we-are" },
  { key: "quality", href: "/about/quality" },
  { key: "structure", href: "/about/structure" },
];
