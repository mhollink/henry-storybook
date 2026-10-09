import { useMemo, useState } from "react";
import { StoryCard } from "../components/stories/StoryCard";
import { publicStories } from "../content/posts";

export function StoriesPage() {
  const [category, setCategory] = useState("Alle verhalen");
  const categories = useMemo(
    () => [
      "Alle verhalen",
      ...new Set(publicStories.map((story) => story.categorie)),
    ],
    [],
  );
  const filtered =
    category === "Alle verhalen"
      ? publicStories
      : publicStories.filter((story) => story.categorie === category);

  return (
    <main id="main" className="page-shell">
      <div className="container">
        <header className="page-heading">
          <span className="eyebrow">Geschreven met liefde</span>
          <h1>Brieven & herinneringen</h1>
          <p>Een verzameling woorden, momenten en verhalen voor Henry.</p>
        </header>
        {categories.length > 1 && (
          <div
            className="category-filter"
            role="group"
            aria-label="Filter verhalen op categorie"
          >
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={`category-filter__button${item === category ? " is-selected" : ""}`}
                onClick={() => setCategory(item)}
                aria-pressed={item === category}
              >
                {item}
              </button>
            ))}
          </div>
        )}
        {filtered.length ? (
          <div className="stories-grid">
            {filtered.map((story) => (
              <StoryCard key={story.filename} story={story} />
            ))}
          </div>
        ) : (
          <p className="empty-state">
            Er zijn nog geen verhalen in deze categorie.
          </p>
        )}
      </div>
    </main>
  );
}
