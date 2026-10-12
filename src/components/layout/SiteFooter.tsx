import { Link } from "react-router-dom";
import { useAnalyticsConsent } from "../../features/analytics/ConsentProvider";

export function SiteFooter() {
  const { openPreferences } = useAnalyticsConsent();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__signature">
          <span className="small-star" aria-hidden="true">
            ✦
          </span>
          <strong>Henry Hollink</strong>
          <span>Voor altijd dichtbij.</span>
        </div>
        <nav className="site-footer__links" aria-label="Footernavigatie">
          <Link to="/verhalen">Verhalen</Link>
          <Link to="/over-henry">Over Henry</Link>
          <a
            href="https://stars.osr.org/henry-ac-hollink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Henry's ster <span aria-hidden="true">↗</span>
          </a>
          <Link to="/privacy">Privacy</Link>
          <button type="button" onClick={openPreferences}>
            Cookievoorkeuren
          </button>
          <a href="/rss.xml">RSS</a>
          <a
            href="https://editor.hollink.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Verhalenbeheer
          </a>
        </nav>
      </div>
    </footer>
  );
}
