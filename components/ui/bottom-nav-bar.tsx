"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import {
  Home,
  User,
  Briefcase,
  Wrench,
  GraduationCap,
  PenLine,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* 21st.dev "Bottom Nav Bar", pasted in and edited in place. What changed and
 * why — every item here was a defect in this codebase, not a preference:
 *
 * 1. `<button>` + local useState -> `<Link>` + real hrefs. As published this is
 *    a picker, not a navigation: buttons do not navigate, and an ATS scraper or
 *    a crawler sees zero links. This site's whole job is being read by those.
 * 2. Active state follows the URL and the scrolled section, not the last thing
 *    clicked, so the expanded label never lies about where you are.
 * 3. shadcn tokens (bg-card, text-muted-foreground, bg-primary,
 *    border-sidebar-border) do not exist here and compile to nothing. Mapped to
 *    this repo's tokens.
 * 4. `focus:outline-none focus-visible:ring-0` deleted. It removes the focus
 *    ring, which is a hard non-negotiable in CLAUDE.md.
 * 5. The mount animation (`initial={{ opacity: 0 }}`) is gone. The primary
 *    navigation must not be invisible until JavaScript arrives.
 * 6. "framer-motion" -> "motion/react": same library, already installed.
 * 7. The item list lives here rather than being passed in: icons are React
 *    components, and a server component cannot hand a function to a client one.
 */

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#about", label: "About", icon: User },
  { href: "/#experience", label: "Experience", icon: Briefcase },
  { href: "/#skills", label: "Skills", icon: Wrench },
  { href: "/#education", label: "Education", icon: GraduationCap },
  { href: "/blog", label: "Blog", icon: PenLine },
  { href: "/#contact", label: "Contact", icon: Mail },
];

const MOBILE_LABEL_WIDTH = 72;

type BottomNavBarProps = {
  className?: string;
  /** Float it at the bottom of the viewport instead of wherever it is placed. */
  stickyBottom?: boolean;
};

/** Which nav item is current: the route for real pages, and the section in view
 *  for the home page's anchors. */
function useActiveHref() {
  const pathname = usePathname();
  // Tagged with the path it was measured on, so a stale reading from a previous
  // visit to "/" is discarded by derivation rather than by a reset effect.
  const [spy, setSpy] = useState<{ path: string; href: string } | null>(null);

  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) return;

    const ids = navItems
      .filter((i) => i.href.startsWith("/#"))
      .map((i) => i.href.slice(2));

    // The band is the middle of the viewport: whatever sits there is what the
    // reader is looking at.
    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (top) setSpy({ path: "/", href: `/#${top.target.id}` });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [onHome]);

  if (!onHome) {
    // /blog/some-post should still light up "Blog".
    return (
      navItems.find((i) => i.href !== "/" && pathname.startsWith(i.href))
        ?.href ?? null
    );
  }
  return spy?.path === pathname ? spy.href : "/";
}

export function BottomNavBar({
  className,
  stickyBottom = false,
}: BottomNavBarProps) {
  const activeHref = useActiveHref();
  const reduce = useReducedMotion();

  // Reduced motion never changes what renders — only how fast it gets there.
  const labelTransition = reduce
    ? { duration: 0 }
    : {
        width: { type: "spring" as const, stiffness: 350, damping: 32 },
        opacity: { duration: 0.19 },
        marginLeft: { duration: 0.19 },
      };

  return (
    <nav
      aria-label="Main"
      className={cn(
        // Glass: translucent fill, blurred backdrop, a hairline edge and an
        // inner top highlight. The highlight is what sells it on a dark page,
        // where there is often too little behind the bar for blur to show.
        "flex h-[52px] max-w-[95vw] items-center gap-1 rounded-full border border-white/10 bg-surface/50 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl backdrop-saturate-150",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_16px_40px_-12px_rgba(0,0,0,0.6)]",
        stickyBottom && "fixed inset-x-0 bottom-4 z-20 mx-auto w-fit",
        className,
      )}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeHref === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            // Clicking "Home" while already on "/" is a no-op for Link: same
            // URL, no hash, nothing to scroll to. Scroll it back to the hero
            // ourselves. behavior is left to CSS, which is `smooth` and already
            // switched off under prefers-reduced-motion.
            onClick={
              item.href === "/" ? () => window.scrollTo({ top: 0 }) : undefined
            }
            aria-current={isActive ? "page" : undefined}
            title={item.label}
            className={cn(
              "relative flex h-10 min-w-[36px] items-center justify-center rounded-full px-2 transition-[color,background-color,transform] duration-200 active:scale-[0.97] sm:min-w-[44px] sm:px-3",
              isActive
                ? "bg-accent/15 text-accent"
                : "text-muted hover:bg-surface hover:text-fg",
            )}
          >
            <Icon size={20} strokeWidth={2} aria-hidden="true" />
            {/* The label is the accessible name; the icon is decorative. */}
            <span className="sr-only">{item.label}</span>

            <motion.span
              initial={false}
              animate={{
                width: isActive ? `${MOBILE_LABEL_WIDTH}px` : "0px",
                opacity: isActive ? 1 : 0,
                marginLeft: isActive ? "8px" : "0px",
              }}
              transition={labelTransition}
              aria-hidden="true"
              // max-w-0 below `sm` keeps eight items inside a 360px phone: the
              // CSS cap wins over the inline width motion writes.
              className="flex max-w-0 items-center overflow-hidden sm:max-w-[72px]"
            >
              <span className="select-none overflow-hidden text-ellipsis whitespace-nowrap text-xs font-medium leading-[1.9]">
                {item.label}
              </span>
            </motion.span>
          </Link>
        );
      })}
    </nav>
  );
}

export default BottomNavBar;
