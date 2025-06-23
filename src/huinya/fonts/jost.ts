// Используем таепскрипт чтобы next fonts отъебался

import { Jost } from "next/font/google";

export const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-jost",
});
