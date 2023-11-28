import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("posts");
  return rss({
    title: "tuckerfritz.dev | Blog",
    description: "Keep up to date with the latest blog posts from tuckerfritz.dev",
    site: "https://tuckerfritz.dev/",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
