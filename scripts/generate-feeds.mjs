import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import YAML from "yaml";

const SITE = "https://henry.hollink.dev";
const POSTS_DIR = "src/content/posts";
const esc = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
const frontmatter = (source) => {
  const found = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  return found ? YAML.parse(found[1]) : {};
};
const date = (value) => {
  const parsed = new Date(`${String(value).slice(0, 10)}T12:00:00Z`);
  return Number.isNaN(parsed.getTime()) ? new Date(0) : parsed;
};

await mkdir("public", { recursive: true });
const names = (await readdir(POSTS_DIR)).filter((name) => name.endsWith(".md"));
const posts = await Promise.all(
  names.map(async (name) => ({
    filename: name.slice(0, -3),
    ...frontmatter(await readFile(join(POSTS_DIR, name), "utf8")),
  })),
);
// Generate a metadata-only index to keep full Markdown and YAML out of the initial bundle.
const storyIndex = posts
  .map((post) => {
    if (
      typeof post.titel !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(String(post.datum))
    ) {
      throw new Error(
        `Story ${post.filename} requires titel and a YYYY-MM-DD datum`,
      );
    }
    return {
      filename: post.filename,
      titel: post.titel,
      schrijver: typeof post.schrijver === "string" ? post.schrijver : "",
      schrijverId: typeof post.schrijverId === "string" ? post.schrijverId : "",
      datum: post.datum,
      categorie:
        typeof post.categorie === "string" ? post.categorie : "Verhaal",
      onderwerpen: Array.isArray(post.onderwerpen)
        ? post.onderwerpen.filter((value) => typeof value === "string")
        : [],
      ...(typeof post.cover === "string" && post.cover
        ? { cover: post.cover }
        : {}),
      bijschrift: typeof post.bijschrift === "string" ? post.bijschrift : "",
      ...(typeof post.serie === "string" && post.serie
        ? { serie: post.serie }
        : {}),
      ...(typeof post.serieIndex === "number"
        ? { serieIndex: post.serieIndex }
        : {}),
      verbergen: post.verbergen === true,
    };
  })
  .sort((a, b) => b.datum.localeCompare(a.datum));
await mkdir("src/content/generated", { recursive: true });
await writeFile(
  "src/content/generated/stories.json",
  `${JSON.stringify(storyIndex, null, 2)}\n`,
);
await writeFile(
  "public/stories.json",
  `${JSON.stringify(storyIndex, null, 2)}\n`,
);
const published = posts
  .filter((post) => !post.verbergen)
  .sort((a, b) => date(b.datum) - date(a.datum));
const lastUpdated = published.length
  ? date(published[0].datum).toISOString().slice(0, 10)
  : "2025-11-13";
const routes = [
  "/",
  "/verhalen",
  "/over-henry",
  "/privacy",
  ...published.map((post) => `/post/${encodeURIComponent(post.filename)}`),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${esc(`${SITE}${route}`)}</loc><lastmod>${lastUpdated}</lastmod></url>`).join("\n")}\n</urlset>\n`;
const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel>\n<title>Henry Hollink - Brieven en herinneringen</title>\n<link>${SITE}</link>\n<description>Verhalen voor Henry.</description>\n<language>nl-NL</language>\n${published.map((post) => `  <item><title>${esc(post.titel)}</title><link>${SITE}/post/${encodeURIComponent(post.filename)}</link><guid>${SITE}/post/${encodeURIComponent(post.filename)}</guid><pubDate>${date(post.datum).toUTCString()}</pubDate><description>${esc(post.bijschrift)}</description></item>`).join("\n")}\n</channel></rss>\n`;
await writeFile("public/sitemap.xml", sitemap);
await writeFile("public/rss.xml", rss);
console.info(
  `Generated sitemap and RSS from ${published.length} public stories.`,
);
