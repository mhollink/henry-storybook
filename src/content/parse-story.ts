import YAML from "yaml";
import type { Story } from "./posts";

function asText(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export function parseStory(
  filename: string,
  source: string,
): Story & { markdown: string } {
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
