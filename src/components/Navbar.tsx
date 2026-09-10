"use client";

import { navItems } from "@/data/navigation";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="11" cy="11" r="6.5" strokeWidth={1.8} />
      <path strokeLinecap="round" strokeWidth={1.8} d="m16 16 4 4" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const searchInput = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isSearchOpen) searchInput.current?.focus();
  }, [isSearchOpen]);

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="font-nav sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur dark:border-night-800 dark:bg-night-950/95">
      <nav aria-label="Main navigation" className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="/" className="shrink-0 text-[30px] font-bold tracking-tight text-slate-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400">Arvinder Singh</a>
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const className = `rounded-md px-3 py-2 text-base font-semibold underline-offset-4 transition-all hover:underline hover:decoration-2 hover:font-bold hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-night-800 dark:hover:text-blue-400 ${isActive(item.href) ? "text-slate-950 dark:text-white" : "text-slate-600 dark:text-night-300"}`;
            return item.href === "/"
              ? <a key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={className}>{item.label}</a>
              : <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={className}>{item.label}</Link>;
          })}
        </div>
        <div className="hidden items-center gap-1 sm:flex">
          {isSearchOpen && <form onSubmit={(event) => { event.preventDefault(); setIsSearchOpen(false); }}><label htmlFor="site-search" className="sr-only">Search</label><input ref={searchInput} id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === "Escape" && setIsSearchOpen(false)} placeholder="Search" className="w-32 border-b border-slate-400 bg-transparent px-2 py-1 text-base text-slate-900 outline-none placeholder:text-slate-400 dark:border-night-800 dark:text-white" /></form>}
          <button type="button" onClick={() => setIsSearchOpen((open) => !open)} aria-label="Search" className="rounded-full p-2 text-slate-700 hover:bg-slate-100 dark:text-night-100 dark:hover:bg-night-800"><SearchIcon /></button>
          <AnimatedThemeToggler className="text-slate-700 hover:bg-slate-100 dark:text-night-100 dark:hover:bg-night-800" />
        </div>
        <button type="button" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"} className="rounded-full p-2 text-slate-800 hover:bg-slate-100 dark:text-white dark:hover:bg-night-800 sm:hidden"><MenuIcon open={isOpen} /></button>
      </nav>
      {isOpen && <div className="border-t border-slate-200 bg-white px-5 py-4 dark:border-night-800 dark:bg-night-950 sm:hidden"><div className="flex flex-col gap-1">{navItems.map((item) => {
              const className = `rounded-md px-3 py-3 text-base font-semibold underline-offset-4 transition-all hover:underline hover:decoration-2 hover:font-bold hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-night-800 dark:hover:text-blue-400 ${isActive(item.href) ? "bg-slate-100 text-slate-950 dark:bg-night-800 dark:text-white" : "text-slate-600 dark:text-night-300"}`;
              return item.href === "/"
                ? <a key={item.href} href={item.href} className={className}>{item.label}</a>
                : <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={className}>{item.label}</Link>;
            })}<div className="mt-2 flex items-center justify-between gap-2 border-t border-slate-200 pt-3 dark:border-night-800"><button type="button" onClick={() => setIsSearchOpen((open) => !open)} className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-semibold text-slate-700 dark:text-night-100"><SearchIcon /> Search</button><div className="flex items-center gap-2 px-3 py-2 text-base font-semibold text-slate-700 dark:text-night-100">Theme <AnimatedThemeToggler /></div></div></div></div>}
    </header>
  );
}