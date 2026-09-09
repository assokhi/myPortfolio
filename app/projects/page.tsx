import type { Metadata } from "next";
import Projects from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Things I built and shipped, with live links and the numbers that came out of them.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="no-grid-paper pt-6 pb-10">
      <Projects headingLevel="h1" id="all-projects" />
    </div>
  );
}
