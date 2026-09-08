import type { Metadata } from "next";
import { BookOpen, Clapperboard, Tv } from "lucide-react";
import { vault } from "@/content/vault";
import type { VaultItem } from "@/content/types";
import { cn, cardSurface, displayHeading } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Vault",
  description: "Novels, movies and shows — the non-work half.",
  // Unlisted rather than secret: not in the nav, not in the sitemap, and not
  // indexed. Anyone with the link can still read it, which is fine — there is
  // nothing here worth protecting.
  robots: { index: false, follow: false },
  alternates: { canonical: "/vault" },
};

const SECTIONS: {
  category: VaultItem["category"];
  icon: typeof BookOpen;
}[] = [
  { category: "Novels", icon: BookOpen },
  { category: "Movies", icon: Clapperboard },
  { category: "Shows", icon: Tv },
];

export default function VaultPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-5 pt-10 pb-20">
      <h1 className={displayHeading}>Personal Vault</h1>
      <p className="mt-3 max-w-xl font-serif text-muted">
        What I read and watch when I am not shipping. Ask me about any of them.
      </p>

      <div className="mt-12 space-y-12">
        {SECTIONS.map(({ category, icon: Icon }) => {
          const items = vault.filter((item) => item.category === category);
          // A category with nothing in it renders nothing at all, rather than
          // an empty heading.
          if (!items.length) return null;

          return (
            <section key={category} aria-labelledby={`vault-${category}`}>
              <h2
                id={`vault-${category}`}
                className="flex items-center gap-2 text-lg font-semibold text-fg"
              >
                <Icon size={18} aria-hidden="true" className="text-accent-2" />
                {category}
              </h2>

              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {items.map((item) => (
                  <li
                    key={`${item.category}-${item.title}`}
                    className={cn(cardSurface, "px-4 py-3")}
                  >
                    <p className="font-medium text-fg">{item.title}</p>
                    <p className="text-sm text-muted">{item.subtitle}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
