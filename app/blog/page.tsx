import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/content/profile";
import { getPosts } from "@/lib/blog";
import { FeaturedPost, PostList } from "@/components/sections/Blog";
import { cn, displayHeading } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: `Posts by ${profile.name} on building for the web.`,
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;
  const tags = [...new Set(posts.flatMap((p) => p.tags))];

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to home
      </Link>

      <header className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
        <h1 className={cn(displayHeading, "mt-2")}>Blog</h1>
        <p className="mt-3 max-w-xl font-serif text-[1.05rem] leading-relaxed text-muted">
          Things I worked out the hard way and wrote down — notes on shipping,
          performance and the parts nobody documents.
        </p>
        {tags.length ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[0.7rem] text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      {posts.length ? (
        <>
          <div className="mt-10">
            <FeaturedPost post={featured} />
          </div>
          {rest.length ? (
            <div className="mt-12">
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                All posts
              </h2>
              <PostList posts={rest} startIndex={2} />
            </div>
          ) : null}
        </>
      ) : (
        <p className="mt-10 text-muted">No posts yet.</p>
      )}
    </div>
  );
}
