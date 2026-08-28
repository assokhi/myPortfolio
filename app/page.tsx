import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import { getPosts } from "@/lib/blog";

export default async function Home() {
  const posts = await getPosts();
  return (
    <>
      <Hero />
      {/* Opaque and above the hero: this is the sheet that slides up over the
          pinned hero. Without a solid background you would see straight
          through it. */}
      <div className="relative z-10 bg-bg shadow-[0_-32px_64px_-16px_rgba(0,0,0,0.9)]">
        <About />
        <Experience />
        <Skills />
        <Education />
        <Blog posts={posts} />
        <Contact />
      </div>
    </>
  );
}
