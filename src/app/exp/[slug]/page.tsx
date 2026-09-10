import Image from "next/image";
import { notFound } from "next/navigation";
import { experiences } from "@/data/experience";

export async function generateStaticParams() {
  return experiences.map((exp) => ({ slug: exp.slug }));
}

export default async function ExperiencePage({ params }: PageProps<"/exp/[slug]">) {
  const { slug } = await params;
  const experience = experiences.find((exp) => exp.slug === slug);
  if (!experience) notFound();

  return (
    <main className="font-nav mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <div className="relative aspect-[8/5] overflow-hidden rounded-lg border border-slate-900/10 bg-white shadow-sm dark:border-white/10">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          preload
          sizes="(min-width: 768px) 768px, 100vw"
          placeholder="blur"
          blurDataURL={experience.blurDataURL}
          className={`object-contain ${experience.slug === "seatunnel" ? "p-8" : "p-14"}`}
        />
      </div>
      <h1 className="mt-8 text-4xl font-bold tracking-tight text-slate-950 dark:text-night-100">
        {experience.title}
      </h1>
      <p className="mt-8 text-lg text-slate-600 dark:text-night-300">{experience.description}</p>
    </main>
  );
}
