import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { ExperienceBento } from "@/components/sections/Experience";
import { displayHeading } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Experience",
  description: `Roles, outcomes and live coding stats for ${profile.name}.`,
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <article>
      <h1 className={displayHeading}>
        Experience
      </h1>
      <p className="mt-2 font-serif text-muted">
        Outcomes rather than duties, plus numbers pulled from GitHub, LeetCode
        and Codeforces.
      </p>

      <div className="mt-8">
        <ExperienceBento />
      </div>
    </article>
  );
}
