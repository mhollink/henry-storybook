import storyIndex from "./generated/stories.json";

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
}

// Generated from Markdown frontmatter at build time. Full article text is not in this bundle.
export const stories: Story[] = storyIndex;
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
