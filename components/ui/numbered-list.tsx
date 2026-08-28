import { cn } from "@/lib/utils";

/** Outcome pointers. The index is the UI: a tabular-figure numeral in its own
 *  chip, so a scanning eye can count the wins without reading them first.
 *  Body copy is set in the serif. */
export default function NumberedList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ol className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border border-border bg-bg font-mono text-[0.7rem] font-semibold tabular-nums text-fg"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-serif text-[0.95rem] leading-relaxed text-muted">
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}
