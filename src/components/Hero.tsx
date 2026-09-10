import Image from "next/image";
import { socials } from "@/data/socials";

export function Hero() {
  return (
    <section className="font-nav mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
      <div>
        <h1 className="text-5xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
          Arvinder Singh Sokhi
        </h1>
        <p className="mt-6 max-w-lg text-lg text-slate-600 dark:text-night-300">
          {/* placeholder: one or two sentences about what you do */}
          Hi, I’m a Software Developer who enjoys building Web applications, automation tools, and contributing to Open Source. When I’m not coding, you’ll usually find me tinkering with AI and software, trying out new things and keeping up with tech through blogs, videos, and YouTube.
        </p>
        <div className="mt-8 flex items-center gap-2">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              className="rounded-full p-2 text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-100 hover:text-blue-500 dark:text-night-100 dark:hover:bg-night-800 dark:hover:text-blue-400"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-slate-900/10 shadow-sm dark:border-white/10">
        <Image
          src="/pfp.jpg"
          alt="Arvinder Singh Sokhi"
          fill
          preload
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAGAAgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCr/aqtqbQeW6uuYg4bPT26dqKKKwmknoWmf//Z"
        />
      </div>
    </section>
  );
}
