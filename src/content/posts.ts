import YAML from "yaml";

export interface Story {
  filename: string;
  titel: string;
  schrijver: string;
  datum: string;
  categorie: string;
  onderwerpen: string[];
  cover?: string;
  bijschrift: string;
  serie?: string;
  serieIndex?: number;
  verbergen: boolean;
  markdown: string;
}

function asText(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export function parseStory(filename: string, source: string): Story {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source);
  if (!match) throw new Error(`Missing YAML frontmatter: ${filename}`);

  const parsed: unknown = YAML.parse(match[1] ?? "");
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`Invalid YAML frontmatter: ${filename}`);
  }
  const data = parsed as Record<string, unknown>;
  const titel = asText(data.titel);
  const datum = asText(data.datum);
  if (!titel || !/^\d{4}-\d{2}-\d{2}$/.test(datum)) {
    throw new Error(`Story ${filename} requires titel and a YYYY-MM-DD datum`);
  }

  return {
    filename,
    titel,
    datum,
    schrijver: asText(data.schrijver),
    categorie: asText(data.categorie, "Verhaal"),
    onderwerpen: Array.isArray(data.onderwerpen)
      ? data.onderwerpen.filter(
          (entry): entry is string => typeof entry === "string",
        )
      : [],
    cover: asText(data.cover) || undefined,
    bijschrift: asText(data.bijschrift),
    serie: asText(data.serie) || undefined,
    serieIndex:
      typeof data.serieIndex === "number" ? data.serieIndex : undefined,
    verbergen: data.verbergen === true,
    markdown: match[2] ?? "",
  };
}

// Vite compiles all Markdown files as raw strings; no backend or per-page network fetches.
const modules = import.meta.glob<string>("./posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const stories: Story[] = Object.entries(modules)
  .map(([path, raw]) =>
    parseStory(path.split("/").pop()!.replace(/\.md$/, ""), raw),
  )
  .sort((first, second) => second.datum.localeCompare(first.datum));

export const publicStories: Story[] = stories.filter(
  (story) => !story.verbergen,
);

export function getStory(filename: string | undefined): Story | undefined {
  return stories.find((story) => story.filename === filename);
}

export function formatStoryDate(date: string): string {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
