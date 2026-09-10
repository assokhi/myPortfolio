import Image from "next/image";
import Link from "next/link";
import { experiences } from "@/data/experience";

export function Experience({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section className="font-nav bg-slate-50 py-20 dark:bg-night-1000">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {showHeading && (
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-night-100 sm:text-4xl">
            Experience
          </h2>
        )}
        <div className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ${showHeading ? "mt-10" : ""}`}>
          {experiences.map((exp, index) => (
            <Link key={exp.slug} href={`/exp/${exp.slug}`} className="group block transition-transform duration-300 ease-out hover:-translate-y-1">
              <div className="relative aspect-[8/5] overflow-hidden rounded-lg border border-slate-900/10 bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-xl dark:border-white/10">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  preload={showHeading && index === 0}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  placeholder="blur"
                  blurDataURL={exp.blurDataURL}
                  className={`object-contain ${exp.slug === "seatunnel" ? "p-6" : "p-10"}`}
                />
              </div>
              <h3 className="mt-8 text-2xl font-bold tracking-tight text-slate-950 underline-offset-4 transition-colors group-hover:text-blue-600 group-hover:underline dark:text-night-100 dark:group-hover:text-blue-400">
                {exp.title}
              </h3>
              <p className="mt-8 text-slate-600 dark:text-night-300">{exp.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
