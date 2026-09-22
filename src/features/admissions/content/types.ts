export type HubCard = {
  id: string;
  number: string;
  title: string;
  description: string;
  href: string;
};

export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type InfoCard = {
  id: string;
  title: string;
  description: string;
};

export type DownloadItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  meta?: string;
};
