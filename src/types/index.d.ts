type PostMetadata = Pick<
  CollectionEntry<"posts">["data"],
  "title" | "pubDate" | "description"
> &
  Pick<CollectionEntry<"posts">, "slug">;

type PostIndexResp = {
  index: import("fuse.js").FuseIndex<PostMetadata>;
  metadata: PostMetadata[];
};
