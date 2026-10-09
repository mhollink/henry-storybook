import { Link } from "react-router-dom";

export function NotFoundPage() {
	return (
		<main id="main" className="page-shell">
			<div className="container not-found">
				<span className="not-found__star" aria-hidden="true">
					✦
				</span>
				<h1>Deze pagina is even uit het zicht.</h1>
				<p>
					Misschien vind je wat je zoekt tussen Henry's brieven en
					herinneringen.
				</p>
				<Link to="/verhalen" className="button button--primary">
					Naar de verhalen
				</Link>
			</div>
		</main>
	);
}
