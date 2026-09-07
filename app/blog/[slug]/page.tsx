import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPost, getPosts } from "@/lib/blog";
import { profile } from "@/content/profile";
import { PostMetaLine } from "@/components/sections/Blog";

/** One real HTML file per post is generated at deploy time: instant loads for
 *  visitors, plain HTML for search engines. */
export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.meta.title,
    description: post.meta.summary,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.summary,
      publishedTime: post.meta.date,
      authors: [profile.name],
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // Already sorted newest-first, so "previous" is the next index along.
  const all = await getPosts();
  const i = all.findIndex((p) => p.slug === slug);
  const newer = i > 0 ? all[i - 1] : undefined;
  const older = i >= 0 && i < all.length - 1 ? all[i + 1] : undefined;

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All posts
      </Link>

      <article className="mt-8">
        <header className="border-b border-border pb-8">
          <h1 className="text-3xl font-semibold leading-tight text-fg sm:text-4xl">
            {post.meta.title}
          </h1>
          <p className="mt-3 max-w-2xl font-serif text-lg leading-relaxed text-muted">
            {post.meta.summary}
          </p>
          <div className="mt-5">
            <PostMetaLine post={post.meta} />
          </div>
        </header>

        {/* Typography for Markdown output, without pulling in a plugin. */}
        <div className="mt-8 space-y-5 font-serif text-[1.05rem] leading-relaxed text-muted [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l-2 [&_blockquote]:border-accent-2 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-fg [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_h2]:pt-4 [&_h2]:font-sans [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-fg [&_h3]:pt-2 [&_h3]:font-sans [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-fg [&_li]:ml-5 [&_ol]:list-decimal [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-surface [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:text-fg [&_ul]:list-disc">
          <MDXRemote source={post.body} />
        </div>
      </article>

      {(newer || older) && (
        <nav
          aria-label="More posts"
          className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
        >
          {newer ? (
            <Link
              href={`/blog/${newer.slug}`}
              className="group rounded-xl border border-border bg-surface/60 p-4 transition-colors hover:border-accent-2/50"
            >
              <span className="font-mono text-xs text-muted">← Newer</span>
              <span className="mt-1 block font-medium text-fg group-hover:text-accent">
                {newer.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden="true" className="hidden sm:block" />
          )}
          {older ? (
            <Link
              href={`/blog/${older.slug}`}
              className="group rounded-xl border border-border bg-surface/60 p-4 transition-colors hover:border-accent-2/50 sm:text-right"
            >
              <span className="font-mono text-xs text-muted">Older →</span>
              <span className="mt-1 block font-medium text-fg group-hover:text-accent">
                {older.title}
              </span>
            </Link>
          ) : null}
        </nav>
      )}
    </div>
  );
}
