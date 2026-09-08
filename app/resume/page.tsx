import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import { profile } from "@/content/profile";
import { cn, displayHeading } from "@/lib/utils";
import RouteToast from "@/components/ui/route-toast";

export const metadata: Metadata = {
  title: "Resume",
  description: `${profile.name} — ${profile.role}. Read or download the full resume.`,
  alternates: { canonical: "/resume" },
};

const buttonClass =
  "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-opacity duration-200 hover:opacity-90";

export default function ResumePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-5 pt-10 pb-20">
      <h1 className={displayHeading}>Resume</h1>
      <p className="mt-3 max-w-xl font-serif text-muted">
        The one-page version. Open it in a new tab or download it — the viewer
        below is the same file.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={profile.resumePath}
          target="_blank"
          rel="noreferrer noopener"
          className={cn(buttonClass, "bg-accent text-bg")}
        >
          <ExternalLink size={16} aria-hidden="true" />
          Open in new tab
        </a>
        <a
          href={profile.resumePath}
          // `download` is a hint the browser may ignore for cross-origin files;
          // this one is same-origin, so it holds.
          download
          className={cn(buttonClass, "border border-border bg-surface/60 text-fg")}
        >
          <Download size={16} aria-hidden="true" />
          Download PDF
        </a>
      </div>

      {/* An iframe, not a PDF.js bundle: every target browser ships a PDF
          viewer, and shipping a second one would be several hundred kilobytes
          to duplicate a native feature. The two buttons above are the fallback
          for the browsers that refuse to embed — mobile Safari in particular
          shows only the first page, which is why they are above the frame
          rather than below it. */}
      <iframe
        src={profile.resumePath}
        title={`${profile.name} — resume`}
        className="mt-8 h-[min(80vh,900px)] w-full rounded-2xl border border-border bg-surface"
      />

      <RouteToast
        storageKey="resume"
        badge="Open to opportunities"
        title="Looking for full-time SDE roles"
        description="I am actively interviewing. If you are hiring, the fastest route is a message."
        href="/contact"
        cta="Message me"
        delayMs={1800}
      />
    </div>
  );
}
