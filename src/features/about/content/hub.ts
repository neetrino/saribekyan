import {
  qualitySections,
  structureSections,
  whoWeAreSections,
  type AboutSectionNavItem,
} from "./sections";

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

export const aboutPageSections: Record<
  Exclude<AboutNavKey, "overview">,
  AboutSectionNavItem[]
> = {
  whoWeAre: whoWeAreSections,
  quality: qualitySections,
  structure: structureSections,
};

export const aboutHeaderNav = [
  {
    key: "whoWeAre" as const,
    href: "/about/who-we-are",
    sections: whoWeAreSections,
  },
  {
    key: "quality" as const,
    href: "/about/quality",
    sections: qualitySections,
  },
  {
    key: "structure" as const,
    href: "/about/structure",
    sections: structureSections,
  },
];
