import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/content/profile";
import { getPosts } from "@/lib/blog";
import BlogFilter from "@/components/sections/BlogFilter";
import { cn, heading1, pageShell, proseMeasure } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: `Posts by ${profile.name} on building for the web.`,
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <div className={pageShell}>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to home
      </Link>

      <header className="mt-8 mb-8">
        <h1 className={heading1}>Writing &amp; thoughts</h1>
        <p className={cn("mt-3 text-[1.05rem] leading-relaxed text-muted", proseMeasure)}>
          Things I worked out the hard way and wrote down — notes on shipping,
          performance and the parts nobody documents.
        </p>
      </header>

      {posts.length ? (
        // The full list is server-rendered inside this component, so every post
        // is in the HTML a crawler sees regardless of which chip is active.
        <BlogFilter posts={posts} />
      ) : (
        <p className={cn("mt-10 text-muted")}>No posts yet.</p>
      )}
    </div>
  );
}
