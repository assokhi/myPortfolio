import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import { profile } from "@/content/profile";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import "./globals.css";

// The one typeface for the whole site — see .claude/rules/design-system.md.
// The hero h1 is the LCP element and is set in this face, so it is preloaded
// (next/font's default) rather than deferred.
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
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

/** theme-color paints the browser chrome around the page — the address bar on
 *  Android, the title bar on desktop Safari. Two entries with prefers-color-scheme
 *  media queries rather than one fixed colour, so it follows the visitor's theme
 *  instead of contradicting it. Each value is the matching --color-bg. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfdfd" },
    { media: "(prefers-color-scheme: dark)", color: "#101219" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        {/* First thing in the body so the attribute is set before anything
            below it paints. It cannot live in a component: a React effect runs
            after the first paint, which is exactly the flash this avoids.
            The OS preference now resolves entirely in CSS (globals.css), so
            this script only has a job when a visitor has explicitly overridden
            it via the toggle — nothing to do, and no matchMedia call, on a
            first visit or with JS off. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}',
          }}
        />
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
