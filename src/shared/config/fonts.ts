import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
});

/** Font CSS variables for `<body>`. */
export const fontVariables = `${montserrat.variable} ${jakarta.variable}`;
