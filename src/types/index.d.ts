type PostMetadata = Pick<
  CollectionEntry<"posts">["data"],
  "title" | "pubDate" | "description"
> &
  Pick<CollectionEntry<"posts">, "slug">;
