// Each Markdown file becomes a separate on-demand chunk in the Vite production build.
const storyModules = import.meta.glob<string>("./posts/*.md", {
  query: "?raw",
  import: "default",
});

export async function loadStoryMarkdown(filename: string): Promise<string> {
  const loader = storyModules[`./posts/${filename}.md`];
  if (!loader) throw new Error(`Story not found: ${filename}`);

  const source = await loader();
  const match = /^---\r?\n[\s\S]*?\r?\n---\r?\n?([\s\S]*)$/.exec(source);
  if (!match) throw new Error(`Missing YAML frontmatter: ${filename}`);
  return match[1] ?? "";
}
