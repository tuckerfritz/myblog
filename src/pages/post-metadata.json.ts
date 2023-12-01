import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("posts");
  const postMetadata: PostMetadata[] = posts.map((post) => ({
    slug: post.slug,
    title: post.data.title,
    pubDate: post.data.pubDate,
    description: post.data.description,
  }));
  return new Response(JSON.stringify(postMetadata));
}
