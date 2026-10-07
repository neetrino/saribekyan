export type AboutSectionNavItem = {
  id: string;
  label: string;
};

export const whoWeAreSections: AboutSectionNavItem[] = [
  { id: "history", label: "Համալսարանի պատմական ուղին" },
  { id: "mission", label: "Մեր նպատակը և ուղղությունը" },
  { id: "values", label: "Մնայուն արժեքներ" },
  { id: "principles", label: "Հիմնարար սկզբունքներ" },
  { id: "activities", label: "Համալսարանի հիմնական գործունեությունը" },
  { id: "governance", label: "Կառավարման խորհուրդ" },
  { id: "academic-council", label: "Ակադեմիական խորհուրդ" },
  { id: "rectorate", label: "Ռեկտորատ" },
  { id: "leadership", label: "Ղեկավար կազմ" },
];

export const qualitySections: AboutSectionNavItem[] = [
  { id: "team", label: "Որակի ապահովման բաժնի ներկայացում" },
  { id: "directions", label: "Գործունեության ուղղություններ" },
  { id: "anqa", label: "ANQA չափանիշներ" },
  { id: "documents", label: "Հաշվետվություններ և փաստաթղթեր" },
];

export const structureSections: AboutSectionNavItem[] = [
  { id: "org-chart", label: "Համալսարանի կառուցվածքային սխեմա" },
  { id: "units", label: "Վարչական ստորաբաժանումներ" },
];
