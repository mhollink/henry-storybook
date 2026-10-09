import { describe, expect, it } from "vitest";
import { parseStory } from "./posts";

describe("parseStory", () => {
	it("retains the legacy frontmatter format and URL filename", () => {
		const story = parseStory(
			"2025-11-13-verjaardag",
			`---
titel: "Een brief aan Henry"
datum: "2025-11-13"
schrijver: "Pappa"
categorie: "Brief"
onderwerpen: ["verjaardag"]
serie: "Brieven"
serieIndex: 3
---
Lieve Henry.`,
		);

		expect(story.filename).toBe("2025-11-13-verjaardag");
		expect(story.onderwerpen).toEqual(["verjaardag"]);
		expect(story.serieIndex).toBe(3);
		expect(story.markdown).toBe("Lieve Henry.");
	});

	it("rejects missing titles", () => {
		expect(() =>
			parseStory("missing", '---\ndatum: "2025-11-13"\n---\nText'),
		).toThrow("requires titel");
	});
});
