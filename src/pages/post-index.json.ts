import { getCollection } from "astro:content";
import fuse from "fuse.js";

export async function GET() {
  const posts = await getCollection("posts");
  const postMetadata = posts.map((post) => ({
    slug: post.slug,
    title: post.data.title,
    pubDate: post.data.pubDate,
    description: post.data.description,
  }));
  const postIndex = fuse.createIndex(["title", "description"], postMetadata);
  return new Response(
    JSON.stringify({
      index: postIndex.toJSON(),
      metadata: postMetadata,
    })
  );
}
