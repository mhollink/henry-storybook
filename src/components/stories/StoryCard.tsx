import { Link } from "react-router-dom";
import { formatStoryDate, type Story } from "../../content/posts";

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="story-card">
      <Link className="story-card__link" to={`/post/${story.filename}`}>
        {story.cover ? (
          <div className="story-card__picture">
            <img src={story.cover} alt="" loading="lazy" />
          </div>
        ) : (
          <div
            className="story-card__picture story-card__picture--empty"
            aria-hidden="true"
          >
            ✦
          </div>
        )}
        <div className="story-card__body">
          <div className="story-card__meta">
            {story.categorie} <span aria-hidden="true">·</span>{" "}
            {formatStoryDate(story.datum)}
          </div>
          <h3>{story.titel}</h3>
          {story.bijschrift && <p>{story.bijschrift}</p>}
          <span className="story-card__read">
            Lees het verhaal <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
