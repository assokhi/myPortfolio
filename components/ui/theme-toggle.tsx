"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/** Day / night switch. The whole theme is a palette swap in globals.css keyed
 *  off `data-theme` on <html>, so this button's entire job is to write that
 *  attribute and remember the choice.
 *
 *  No React state, on purpose. The server has no idea which theme this visitor
 *  picked, so any state-driven icon would render the wrong one and then snap
 *  after hydration. The two icons and the two labels are both in the markup
 *  and the `light:` / `night:` variants decide which pair is displayed — CSS resolves it
 *  in the same paint that applies the palette, so there is nothing to flash
 *  and nothing to mismatch. */
export default function ThemeToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        const root = document.documentElement;
        const next = root.dataset.theme === "light" ? "dark" : "light";
        root.dataset.theme = next;
        // Private browsing throws on write. A theme that fails to persist is
        // not worth an uncaught error on click.
        try {
          localStorage.setItem("theme", next);
        } catch {}
      }}
      className={cn(
        "flex h-10 min-w-[36px] items-center justify-center rounded-full border border-border px-2 text-muted transition-[color,background-color,transform] duration-200 hover:bg-surface hover:text-fg active:scale-[0.97] sm:min-w-[44px] sm:px-3",
        className,
      )}
    >
      <Sun size={20} strokeWidth={2} aria-hidden="true" className="light:hidden" />
      <Moon size={20} strokeWidth={2} aria-hidden="true" className="night:hidden" />
      <span className="sr-only light:hidden">Switch to the light theme</span>
      <span className="sr-only night:hidden">Switch to the dark theme</span>
    </button>
  );
}
