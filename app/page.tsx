import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import GithubActivity from "@/components/sections/GithubActivity";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import VaultTeaser from "@/components/sections/VaultTeaser";
import RouteToast from "@/components/ui/route-toast";
import { getPosts } from "@/lib/blog";

export default async function Home() {
  const posts = await getPosts();
  const latest = posts[0];

  return (
    <>
      <Hero />
      {/* Only the most recent role and the top two projects. The full lists
          live at /work and /projects — a recruiter who wants depth clicks, and
          one who does not is not made to scroll past it. */}
      <Experience limit={1} />
      <GithubActivity />
      <Education />
      <Skills />
      <Projects limit={2} />
      <VaultTeaser />

      {/* Rendered only when there is a post to point at, so the toast can
          never announce an empty blog. */}
      {latest ? (
        <RouteToast
          storageKey="home"
          badge="New blog post"
          title={latest.title}
          description={latest.summary}
          href={`/blog/${latest.slug}`}
          cta="Read article"
          cover={latest.cover}
        />
      ) : null}
    </>
  );
}
