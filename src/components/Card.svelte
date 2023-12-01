<script lang="ts">  
  export let slug: string;
  export let title: string;
  export let description: string;
  export let pubDate: Date | string;

  if(typeof pubDate == "string") {
    pubDate = new Date(pubDate);
  }

  const dateIso = pubDate.toISOString();
  const dateString = pubDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
</script>

<div class="py-2">
  <h2><a class="link" href={`/posts/${slug}`}>{title}</a></h2>
  <p class="font-semibold">
    Published on <time datetime={dateIso}>{dateString}</time>
  </p>
  <p>{description}</p>
</div>