<script lang="ts">
  import Fuse, { type FuseResult, type FuseIndex } from "fuse.js";
  import type { FormEventHandler } from "svelte/elements";
  import Card from "@components/Card.svelte";
  import Spinner from "./Spinner.svelte";

  let fuse: Fuse<PostMetadata>;
  let searchParam: string;
  let searchResults: FuseResult<PostMetadata>[] = [];

  const fetchData = async () => {
    const response = await fetch("/post-index.json");
    if(!response.ok) {
      throw new Error();
    }
    const data: PostIndexResp = await response.json();
    const postIndex: FuseIndex<PostMetadata> = Fuse.parseIndex(data.index);
    fuse = new Fuse(
      data.metadata,
      { keys: ["title", "description"] },
      postIndex
    ) as Fuse<PostMetadata>;
    /* Get search parameter from URL */
    searchParam = new URLSearchParams(window.location.search).get("q") ?? "";
    searchResults = fuse.search(searchParam);
  };

  const onInput: FormEventHandler<HTMLInputElement> = (event) => {
    /* Get new input value and update the URL */
    const newSearchParam = event.currentTarget.value;
    const queryString = new URLSearchParams({ q: newSearchParam }).toString();
    window.history.replaceState(null, "", `?${queryString}`);
    /* Update searchResults */
    searchResults = fuse.search(event.currentTarget.value);
  };
</script>

{#await fetchData()}
  <Spinner />
{:then}
  <label class="sr-only" for="search"> Search </label>
  <input
    id="search"
    type="search"
    class="border-2 border-solid border-sky-800 outline-none rounded-md focus:ring ring-blue-500 ring-offset-1 w-72 p-1.5 mt-2"
    placeholder="Start typing..."
    value={searchParam}
    on:input={onInput}
  />
  <span id="num-results" class="pl-2 text-lg"
    >{searchResults.length} Results</span
  >
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
{:catch}
  <span class="text-red-500 font-bold">Error loading search index. Search unavailable.</span>
{/await}
