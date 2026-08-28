import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { PostMeta } from "@/content/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    summary: String(data.summary ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
  };
}

/** All posts, newest first. Returns [] if the folder is missing or empty —
 *  an empty blog is hidden, not shown empty. */
export async function getPosts(): Promise<PostMeta[]> {
  let files: string[];
  try {
    files = await readdir(BLOG_DIR);
  } catch {
    return [];
  }

  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx?$/, "");
        const raw = await readFile(path.join(BLOG_DIR, file), "utf8");
        return toMeta(slug, matter(raw).data);
      }),
  );

  return posts.toSorted((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(
  slug: string,
): Promise<{ meta: PostMeta; body: string } | null> {
  // Path traversal guard: slug comes from the URL. Anything with a separator
  // or a dot segment is rejected before it touches the filesystem.
  if (!/^[a-z0-9-]+$/i.test(slug)) return null;

  for (const ext of [".mdx", ".md"]) {
    try {
      const raw = await readFile(path.join(BLOG_DIR, slug + ext), "utf8");
      const { data, content } = matter(raw);
      return { meta: toMeta(slug, data), body: content };
    } catch {
      // try the next extension
    }
  }
  return null;
}
