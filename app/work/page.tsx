import type { Metadata } from "next";
import Experience from "@/components/sections/Experience";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Every role, in full — what was built, which stack, and what changed as a result.",
  alternates: { canonical: "/work" },
};

/** The unabridged version of the home page's Experience block. Same component,
 *  no `limit` — so adding a role is a data edit and this page needs no change. */
export default function WorkPage() {
  return (
    <div className="pt-6 pb-10">
      <Experience headingLevel="h1" id="work" />
    </div>
  );
}
