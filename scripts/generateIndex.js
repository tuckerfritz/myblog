import fs from "fs";
import fuse from "fuse.js";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

const distDirectory = "./dist";
const postsDirectory = "./src/content/posts";

if(!fs.existsSync(distDirectory)) {
  fs.mkdirSync(distDirectory);
}
const slugger = new GithubSlugger();
const files = fs.readdirSync(postsDirectory);
const postMetadata = files.map((file) => {
  const filePath = `${postsDirectory}/${file}`;
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContent);
  return {
    slug: slugger.slug(data.title),
    title: data.title,
    description: data.description,
  };
});
const postIndex = fuse.createIndex(["title", "description"], postMetadata);
fs.writeFileSync("./dist/post-metadata.json", JSON.stringify(postMetadata));
fs.writeFileSync("./dist/post-index.json", JSON.stringify(postIndex.toJSON()));
console.info("Finished generating metadata.json and post-index.json!");
