"use client";

import Image from "next/image";
import Link from "next/link";
import { Send } from "lucide-react";
import { socials } from "@/data/socials";
import { navItems } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="font-nav border-t border-night-800 bg-night-1000 py-12">
      <div className="mx-auto flex max-w-7xl flex-wrap items-start justify-between gap-10 px-5 sm:px-8">
        <div>
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-white/10">
            <Image
              src="/pfpfooter.jpg"
              alt="Arvinder Singh Sokhi"
              fill
              sizes="112px"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAIAAgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCGZIjqc0huiygrs2n5AMcqe2c0UUVKLZ//2Q=="
              className="object-cover"
            />
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-night-100">Arvinder Singh Sokhi</h2>
          <p className="mt-4 max-w-[300px] text-lg text-night-300">
            Software Developer who likes building,
            tinkering, and exploring new tech.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="rounded-full p-2 text-night-100 transition hover:-translate-y-0.5 hover:bg-night-800 hover:text-blue-400"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-night-300 transition-colors hover:text-blue-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="w-full max-w-sm rounded-2xl border border-night-800 bg-night-900/50 p-6">
          <p className="text-sm text-night-300">
            Get notified by email when I publish something new.
            <br />
            No spam, unsubscribe anytime.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-4 flex items-center gap-2 rounded-full border border-night-800 bg-night-1000 py-1 pr-1 pl-4 transition-colors focus-within:border-night-600"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full min-w-0 bg-transparent text-night-100 placeholder:text-night-500 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="shrink-0 rounded-full bg-night-100 p-2 text-night-1000 transition-colors hover:bg-white"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-night-800 px-5 pt-6 text-sm text-night-300 sm:px-8">
        © {new Date().getFullYear()} Arvinder Singh Sokhi. Your email is only used to send blog updates and is never shared.
      </div>
    </footer>
  );
}
