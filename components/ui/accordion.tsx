import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/** One expandable row, shared by Experience and Education.
 *
 *  Built on native `<details>`/`<summary>` rather than a div with useState.
 *  That is not laziness for its own sake: the native element is already
 *  keyboard operable, already announced as expanded or collapsed by screen
 *  readers, already findable by the browser's in-page search inside collapsed
 *  content, and it works with JavaScript switched off. A hand-rolled version
 *  has to re-earn every one of those, and usually earns three.
 *
 *  This is a server component — there is no client JavaScript in an accordion
 *  on this site at all. The open/close animation is CSS (see `.accordion` in
 *  globals.css) and is a progressive enhancement: where `::details-content`
 *  is not supported the row still opens, just instantly. */
export default function Accordion({
  summary,
  defaultOpen = false,
  className,
  children,
}: {
  /** The always-visible row. Anything but an interactive element — a `<summary>`
   *  containing a link or button is a keyboard trap. */
  summary: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className={cn(
        "accordion group rounded-2xl border border-border bg-surface/60 backdrop-blur-sm transition-colors duration-200 hover:border-accent-2/50",
        className,
      )}
    >
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center gap-4 px-5 py-5 sm:px-6",
          // Safari still paints its own triangle without this.
          "[&::-webkit-details-marker]:hidden",
        )}
      >
        <div className="min-w-0 flex-1">{summary}</div>
        <ChevronDown
          size={20}
          aria-hidden="true"
          className="shrink-0 text-muted transition-transform duration-300 ease-out group-open:rotate-180"
        />
      </summary>

      <div className="px-5 pb-6 sm:px-6">{children}</div>
    </details>
  );
}
