import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MarkdownContent } from "../components/stories/MarkdownContent.tsx";
import { loadStoryMarkdown } from "../content/load-story";
import { formatStoryDate, getStory, publicStories } from "../content/posts";
import { NotFoundPage } from "./NotFoundPage";

type ContentState =
  | { status: "loading" }
  | { status: "ready"; markdown: string }
  | { status: "error" };

export function StoryPage() {
  const { filename } = useParams<{ filename: string }>();
  const [content, setContent] = useState<ContentState>({ status: "loading" });
  const story = getStory(filename);

  useEffect(() => {
    if (!filename || !story) return;
    let active = true;
    loadStoryMarkdown(filename).then(
      (markdown) => {
        if (active) setContent({ status: "ready", markdown });
      },
      () => {
        if (active) setContent({ status: "error" });
      },
    );
    return () => {
      active = false;
    };
  }, [filename, story]);

  if (!story) return <NotFoundPage />;

  const publishedIndex = publicStories.findIndex(
    (item) => item.filename === story.filename,
  );
  const next =
    publishedIndex >= 0 ? publicStories[publishedIndex + 1] : undefined;
  const previous =
    publishedIndex >= 0 ? publicStories[publishedIndex - 1] : undefined;

  return (
    <main id="main" className="page-shell story-page">
      <div className="container">
        <Link className="text-link story-page__back" to="/verhalen">
          <span aria-hidden="true">←</span> Alle verhalen
        </Link>
        <article className="reading-sheet">
          <header className="reading-sheet__header">
            <span className="eyebrow">{story.categorie}</span>
            <h1>{story.titel}</h1>
            <p className="story-page__meta">
              {formatStoryDate(story.datum)}
              {story.schrijver ? ` · ${story.schrijver}` : ""}
            </p>
          </header>
          {story.cover && (
            <img className="reading-sheet__cover" src={story.cover} alt="" />
          )}
          {content.status === "loading" ? (
            <p role="status">Het verhaal wordt geladen...</p>
          ) : content.status === "error" ? (
            <p role="alert">
              Het verhaal kon niet worden geladen. Probeer de pagina opnieuw te
              openen.
            </p>
          ) : (
            <MarkdownContent markdown={content.markdown} />
          )}
          <div className="reading-sheet__ending" aria-hidden="true">
            ✦
          </div>
        </article>
        {(next || previous) && (
          <nav className="story-navigation" aria-label="Andere verhalen">
            {next ? (
              <Link to={`/post/${next.filename}`}>
                <small>Ouder verhaal</small>
                <strong>{next.titel}</strong>
              </Link>
            ) : (
              <span />
            )}
            {previous ? (
              <Link to={`/post/${previous.filename}`}>
                <small>Nieuwer verhaal</small>
                <strong>{previous.titel}</strong>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>
    </main>
  );
}
