import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("posts");
  const postMetadata = posts.map((post) => ({
    slug: post.slug,
    title: post.data.title,
    description: post.data.description,
  }));
  return new Response(JSON.stringify(postMetadata));
}
