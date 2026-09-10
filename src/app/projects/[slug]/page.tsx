import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="font-nav mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <div className="relative aspect-video overflow-hidden rounded-lg border border-slate-900/10 shadow-sm dark:border-white/10">
        <Image
          src={project.image}
          alt={project.title}
          fill
          preload
          sizes="(min-width: 768px) 768px, 100vw"
          placeholder="blur"
          blurDataURL={project.blurDataURL}
          className="object-cover"
        />
      </div>
      <h1 className="mt-8 text-4xl font-bold tracking-tight text-slate-950 dark:text-night-100">
        {project.title}
      </h1>
      <p className="mt-8 text-lg text-slate-600 dark:text-night-300">{project.description}</p>
    </main>
  );
}
