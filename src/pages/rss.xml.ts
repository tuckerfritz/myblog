import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function GET(context: any) {
  return rss({
    title: "Tucker Fritz | Blog",
    description: "My journey learning Astro",
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob("./**/*.md")),
    customData: `<language>en-us</language>`,
  });
}
