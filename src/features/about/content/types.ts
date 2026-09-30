export type TimelineItem = {
  id: string;
  year: string;
  title: string;
  description: string;
};

export type ValueItem = {
  id: string;
  title: string;
  description: string;
};

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
};

export type OrgNode = {
  id: string;
  label: string;
  href?: string;
  children?: OrgNode[];
};

export type StructureUnit = {
  id: string;
  slug: "hr" | "accounting" | "facilities";
  title: string;
  description: string;
  href: string;
};

export type HubCard = {
  id: string;
  number: string;
  title: string;
  description: string;
  href: string;
};
