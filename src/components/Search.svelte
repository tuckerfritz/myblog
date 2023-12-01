<script lang="ts">
  import { onMount } from "svelte";
  import Fuse, { type FuseResult } from "fuse.js";
  import type { FormEventHandler } from "svelte/elements";
  import Card from "@components/Card.svelte";

  let fuse: Fuse<PostMetadata>;
  let searchParam: string;
  let searchResults: FuseResult<PostMetadata>[] = [];

  onMount(async () => {
    /* Fetch post metadata and search index */
    Promise.all([fetch("/post-metadata.json"), fetch("/post-index.json")]).then(
      async (responses) => {
        const postMetadata = await responses[0].json();
        const postIndex = Fuse.parseIndex(await responses[1].json());
        fuse = new Fuse(
          postMetadata,
          { keys: ["title", "description"] },
          postIndex
        ) as Fuse<PostMetadata>;
        /* Get search parameter from URL */
        searchParam =
          new URLSearchParams(window.location.search).get("q") ?? "";
        searchResults = fuse.search(searchParam);
      }
    );
  });

  const onInput: FormEventHandler<HTMLInputElement> = (event) => {
    /* Get new input value and update the URL */
    const newSearchParam = event.currentTarget.value;
    const queryString = new URLSearchParams({ q: newSearchParam }).toString();
    window.history.replaceState(null, "", `?${queryString}`);
    /* Update searchResults */
    searchResults = fuse?.search(event.currentTarget.value) ?? [];
  };
</script>

<label class="sr-only" for="search"> Search </label>
<input
  id="search"
  type="search"
  class="border-2 border-solid border-sky-800 outline-none rounded-md focus:ring ring-blue-500 ring-offset-1 w-72 p-1.5 mt-2"
  placeholder="Start typing..."
  value={searchParam}
  on:input={onInput}
/>
<span id="num-results" class="pl-2 text-lg">{searchResults.length} Results</span>
<ol aria-label="search-results">
  {#each searchResults as post}
    <li>
      <Card
        slug={post.item.slug}
        title={post.item.title}
        pubDate={post.item.pubDate}
        description={post.item.description}
      />
    </li>
  {/each}
</ol>
