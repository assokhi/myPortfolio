import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import { profile } from "@/content/profile";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// The display script: every section and page heading (see `displayHeading` in
// lib/utils.ts) plus the signature under the About blurb. preload: false on
// purpose — the home hero is the LCP element and is set in Geist, so
// preloading this would put a second font request in front of it. Headings
// paint in the size-adjusted fallback next/font generates, then swap.
const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    url: profile.siteUrl,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-medium focus:text-bg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          // Structured data: ATS scrapers and search engines read this directly.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              jobTitle: profile.role,
              email: `mailto:${profile.email}`,
              url: profile.siteUrl,
              sameAs: profile.socials.map((s) => s.href),
            }),
          }}
        />
      </body>
    </html>
  );
}
