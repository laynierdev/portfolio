import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import { profile } from "@/data/content";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const sans = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

const description =
  "Full-stack developer building AI-assisted products where the model explains and the code decides. Four live case studies: CodebaseXplorer, Architecter, MobileRoad and Vigil.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  title: `${profile.name} — Full-stack developer, AI & agentic products`,
  description,
  openGraph: {
    type: "website",
    title: `${profile.name} — Full-stack developer`,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${profile.name} — Full-stack developer`, description },
};

export const viewport: Viewport = {
  themeColor: "#07080b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
