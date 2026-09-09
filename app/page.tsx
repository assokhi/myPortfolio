import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import GithubActivity from "@/components/sections/GithubActivity";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import { HomeBlogCards } from "@/components/sections/Blog";
import RouteToast from "@/components/ui/route-toast";
import { getPosts } from "@/lib/blog";

export default async function Home() {
  const posts = await getPosts();
  const latest = posts[0];

  return (
    <>
      <Hero />
      {/* Scriptivox and the SeaTunnel contribution, not Maven — Maven is the
          lowest-priority role (also last in content/experience.ts) and stays
          /work-only. The full lists live at /work and /projects — a
          recruiter who wants depth clicks, one who does not is not made to
          scroll past it. */}
      <Experience limit={2} />
      <GithubActivity />
      <Education />
      <Skills />
      <Projects limit={3} />
      <HomeBlogCards posts={posts} />

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
        />
      ) : null}
    </>
  );
}
