"use client";

import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn, cardSurface } from "@/lib/utils";

/** One expandable row, shared by Experience and Education.
 *
 *  Built on native `<details>`/`<summary>` rather than a div with useState.
 *  That is not laziness for its own sake: the native element is already
 *  keyboard operable, already announced as expanded or collapsed by screen
 *  readers, already findable by the browser's in-page search inside collapsed
 *  content, and it works with JavaScript switched off. A hand-rolled version
 *  has to re-earn every one of those, and usually earns three.
 *
 *  The open/close animation is CSS (see `.accordion` in globals.css) and is a
 *  progressive enhancement: where `::details-content` is not supported the
 *  row still opens, just instantly.
 *
 *  Hover-to-preview below is the one bit of client JS this component carries,
 *  and it is deliberately additive: it only ever opens a row that hover
 *  itself opened, and only closes that same row again on mouse-leave. A row
 *  opened by click or keyboard (native `<details>` behaviour, untouched) is
 *  never auto-closed by this — mousing away from a row you clicked open
 *  leaves it open, exactly as before this existed. No-JS, keyboard-only and
 *  screen-reader use are all unaffected: they never fire these handlers and
 *  fall back to the native toggle this always had. */
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
  const detailsRef = useRef<HTMLDetailsElement>(null);
  // Tracks whether THIS row's current open state came from hover, so
  // mouse-leave only ever undoes what hover itself did.
  const hoverOpenedRef = useRef(false);

  return (
    <details
      ref={detailsRef}
      open={defaultOpen}
      onMouseEnter={() => {
        const el = detailsRef.current;
        if (el && !el.open) {
          el.open = true;
          hoverOpenedRef.current = true;
        }
      }}
      onMouseLeave={() => {
        const el = detailsRef.current;
        if (el && hoverOpenedRef.current) {
          el.open = false;
          hoverOpenedRef.current = false;
        }
      }}
      className={cn("accordion group", cardSurface, className)}
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
