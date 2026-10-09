import DOMPurify from "dompurify";
import { marked } from "marked";
import { Link, useParams } from "react-router-dom";
import { formatStoryDate, getStory, publicStories } from "../content/posts";
import { NotFoundPage } from "./NotFoundPage";

export function StoryPage() {
  const { filename } = useParams<{ filename: string }>();
  const story = getStory(filename);
  if (!story) return <NotFoundPage />;

  const html = DOMPurify.sanitize(
    marked.parse(story.markdown, { async: false }) as string,
  );
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
          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          <div
            className="reading-sheet__ending"
            aria-label="Einde van het verhaal"
          >
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
