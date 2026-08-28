import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/content/profile";
import { getPosts } from "@/lib/blog";
import { PostList } from "@/components/sections/Blog";
import { cn, displayHeading } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Writing",
  description: `Posts by ${profile.name} on building for the web.`,
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const posts = await getPosts();
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to home
      </Link>

      <h1 className={cn(displayHeading, "mt-8")}>
        Writing
      </h1>

      <div className="mt-8">
        {posts.length ? (
          <PostList posts={posts} />
        ) : (
          <p className="text-muted">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
