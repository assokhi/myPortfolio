"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/theme-toggle";

/** The nav is text, not icons. Two reasons, both structural rather than
 *  aesthetic: an ATS scraper and a search crawler read link text and ignore
 *  `aria-label`, and this site's whole job is being read by those. It also
 *  removes a row of icon-only controls that each needed a hand-written
 *  accessible name to be usable at all. */
export const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
];

/** How far you scroll before the bar collapses into the pill. Small enough
 *  that it happens on the first flick, large enough that a one-pixel rubber
 *  band at the top of iOS does not trigger it. */
const COLLAPSE_AT = 32;

function useCollapsed() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // Read once on mount too: a reload restores scroll position, and the
    // listener alone would leave the bar flat halfway down the page.
    const read = () => setCollapsed(window.scrollY > COLLAPSE_AT);
    read();
    window.addEventListener("scroll", read, { passive: true });
    return () => window.removeEventListener("scroll", read);
  }, []);

  return collapsed;
}

/** True for the item matching the current route. "/" must match exactly or
 *  every route lights it up; everything else matches its subtree, so
 *  /blog/some-post still marks Blog as current. */
function isCurrent(href: string, pathname: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const collapsed = useCollapsed();
  // Derived, not stored: the menu is open when it was opened ON the route
  // currently displayed. A route change therefore closes it by arithmetic
  // rather than by an effect that calls setState — which is both a cascading
  // render and, if the effect is ever missed, an overlay left covering the
  // page it just navigated to.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const menuOpen = openedAt === pathname;
  const setMenuOpen = (open: boolean) => setOpenedAt(open ? pathname : null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // showModal() rather than a styled div, and this is the whole reason:
  // <dialog> in modal state gets focus trapping, Escape-to-close, an inert
  // background and the top layer for free. Every one of those is a thing a
  // hand-rolled overlay has to re-implement, and usually implements two of.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog.open) dialog.close();
  }, [menuOpen]);

  // Escape and the backdrop close the dialog without going through setState,
  // so React has to hear about it from the element rather than the other way
  // round.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    // setOpenedAt directly, not the setMenuOpen wrapper: the setter from
    // useState is stable across renders, so this listener is attached once
    // instead of being torn down and rebound on every render.
    const sync = () => setOpenedAt(null);
    dialog.addEventListener("close", sync);
    return () => dialog.removeEventListener("close", sync);
  }, []);

  return (
    <>
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex items-center gap-1",
          // The whole flat-to-pill move is CSS transitions on a handful of
          // properties. No animation library, and the global reduced-motion
          // rule in globals.css already flattens transition-duration to
          // nothing, so this needs no guard of its own.
          "transition-[max-width,border-radius,background-color,border-color,box-shadow,padding] duration-300 ease-out",
          collapsed
            ? [
                // Glass pill: translucent fill, blurred backdrop, a hairline
                // edge and an inner top highlight. The highlight is what sells
                // it on a dark page, where there is often too little behind the
                // bar for the blur to show.
                "max-w-fit rounded-full border border-ink/10 bg-surface/50 px-2 py-2",
                "shadow-[inset_0_1px_0_0_var(--glass-highlight),0_16px_40px_-12px_var(--glass-drop)]",
                "backdrop-blur-xl backdrop-saturate-150",
              ]
            : [
                // Flat: full width, square, no fill. Only a hairline underline
                // separates it from the page.
                "w-full max-w-6xl rounded-none border-b border-ink/[0.06] bg-transparent px-1 py-3",
              ],
          // On a phone the bar is only ever the two controls, so the pill
          // treatment would be a bubble around a hamburger. Stay flat and let
          // the controls sit at the right edge.
          "max-sm:w-full max-sm:max-w-none max-sm:justify-end max-sm:rounded-none max-sm:border-none max-sm:bg-transparent max-sm:p-0 max-sm:shadow-none max-sm:backdrop-blur-none",
        )}
      >
        {/* Six text links, hidden on phones where they do not fit on one line.
            They are still in the DOM inside the dialog below, so a crawler
            reads the same six links at every viewport. */}
        <div className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => {
            const active = isCurrent(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200",
                  active
                    ? "bg-accent/15 text-accent"
                    : "text-muted hover:bg-surface hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <ThemeToggle className={cn(!collapsed && "sm:ml-auto")} />

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg sm:hidden"
        >
          <Menu size={22} aria-hidden="true" />
          {/* The button is an icon, so its name has to be written down. */}
          <span className="sr-only">Open menu</span>
        </button>
      </nav>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        // Clicking the backdrop closes it. The check is what keeps a click
        // *inside* the panel from closing it too: the event target is the
        // dialog itself only when the click landed on the backdrop.
        onClick={(event) => {
          if (event.target === dialogRef.current) setMenuOpen(false);
        }}
        className={cn(
          // A modal dialog is centred by the UA; these override it to fill the
          // screen. `open:` because the styles must not apply while closed.
          // bg tint plus backdrop-blur on the dialog itself, rather than a
          // filter on <body>: elements in the top layer are not affected by an
          // ancestor's filter, so blurring the body is both unnecessary and
          // unreliable across engines. This blurs exactly what is behind.
          "m-0 h-full max-h-none w-full max-w-none bg-bg/80 p-0 text-fg backdrop-blur-xl backdrop:bg-transparent",
          "open:flex open:flex-col open:items-center open:justify-center",
          "motion-safe:open:animate-[toast-in_180ms_ease-out]",
          "sm:hidden",
        )}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-6 flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg"
        >
          <X size={24} aria-hidden="true" />
          <span className="sr-only">Close menu</span>
        </button>

        <ul className="flex flex-col items-center gap-7">
          {navItems.map((item) => {
            const active = isCurrent(item.href, pathname);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "text-3xl font-semibold transition-colors",
                    active
                      ? "text-fg underline decoration-2 underline-offset-8"
                      : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </dialog>
    </>
  );
}

export default SiteNav;
