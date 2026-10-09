import { Link } from "react-router-dom";
import { SkyIllustration } from "../components/decorations/SkyIllustration";
import { StoryCard } from "../components/stories/StoryCard";
import { publicStories, type Story } from "../content/posts";

export function HomePage() {
	return (
		<main id="main">
			<section className="hero">
				<div className="container hero__grid">
					<div className="hero__copy">
						<span className="eyebrow">
							<span aria-hidden="true">✦</span> Een plek om te blijven vertellen
						</span>
						<h1>
							Voor altijd onze <em>kleine Henry.</em>
						</h1>
						<p>
							Een plek vol liefde, herinneringen en woorden die we voor Henry
							willen bewaren.
						</p>
						<div className="hero__actions">
							<Link className="button button--primary" to="/over-henry">
								Leer Henry kennen
							</Link>
							<Link className="text-link" to="/verhalen">
								Lees onze verhalen <span aria-hidden="true">→</span>
							</Link>
						</div>
					</div>
					<div className="hero__picture">
						<SkyIllustration />
					</div>
				</div>
				<div className="hero__cloud-edge" aria-hidden="true" />
			</section>

			<section className="introduction section container">
				<div className="introduction__icon" aria-hidden="true">
					✦
				</div>
				<div>
					<span className="eyebrow">Met liefde bewaard</span>
					<h2>Lieve Henry,</h2>
					<p>
						We schrijven je brieven, bewaren herinneringen en vertellen over de
						momenten die ons aan je doen denken. Hier mogen die verhalen blijven
						bestaan.
					</p>
					<Link className="text-link" to="/over-henry">
						Over Henry en deze plek <span aria-hidden="true">→</span>
					</Link>
				</div>
			</section>

			<section className="section section--paper">
				<div className="container">
					<div className="section-heading">
						<div>
							<span className="eyebrow">Woorden voor jou</span>
							<h2>Brieven & herinneringen</h2>
						</div>
						<Link className="text-link" to="/verhalen">
							Alle verhalen <span aria-hidden="true">→</span>
						</Link>
					</div>
					{publicStories.length ? (
						<div className="stories-grid">
							{publicStories.slice(0, 3).map((story: Story) => (
								<StoryCard key={story.filename} story={story} />
							))}
						</div>
					) : (
						<p className="empty-state">
							Er zijn momenteel geen verhalen ingeladen op de website. Kom later
							terug wanneer er meer te lezen valt.
						</p>
					)}
				</div>
			</section>
			<div className="closing-star" aria-hidden="true">
				✦
			</div>
		</main>
	);
}
