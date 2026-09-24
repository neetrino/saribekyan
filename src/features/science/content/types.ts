export type SciencePerson = {
  id: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  bio?: string;
};

export type ScienceInfoItem = {
  id: string;
  title: string;
  description: string;
};

export type ScienceProject = {
  id: string;
  title: string;
  description: string;
  status: "current" | "completed";
  period: string;
};

export type ScienceDocument = {
  id: string;
  title: string;
  year: number;
  type: string;
  href: string;
};

export type ScienceEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
};

export type ScienceSectionNavItem = {
  id: string;
  label: string;
};
