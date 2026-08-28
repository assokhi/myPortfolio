import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { EducationList } from "@/components/sections/Education";
import { displayHeading } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Education",
  description: `Education and coursework for ${profile.name}.`,
  alternates: { canonical: "/education" },
};

export default function EducationPage() {
  return (
    <article>
      <h1 className={displayHeading}>
        Education
      </h1>
      <div className="mt-8 max-w-3xl">
        <EducationList detailed />
      </div>
    </article>
  );
}
