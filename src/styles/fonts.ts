import { Geist, Geist_Mono, Jost } from "next/font/google";

export const sansFont = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const monoFont = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const navFont = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const fontVariables = `${sansFont.variable} ${monoFont.variable} ${navFont.variable}`;
