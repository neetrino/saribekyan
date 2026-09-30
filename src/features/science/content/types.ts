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
