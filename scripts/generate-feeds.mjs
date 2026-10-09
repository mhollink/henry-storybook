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
