import { Link } from "react-router-dom";
import { useAnalyticsConsent } from "../../features/analytics/ConsentProvider";

export function CookieBanner() {
  const { consent, preferencesOpen, decide, closePreferences } =
    useAnalyticsConsent();
  if (consent !== null && !preferencesOpen) return null;

  return (
    <aside className="consent-banner" aria-label="Analyticsvoorkeuren">
      <div className="consent-banner__inner">
        <div>
          <h2>Een kleine vraag over privacy</h2>
          <p>
            Met jouw toestemming gebruiken we Google Analytics om te zien
            hoeveel mensen onze verhalen lezen, welke pagina’s worden bezocht en
            uit welke landen of via welke websites bezoekers komen. Zonder
            toestemming laden we Google Analytics niet. Lees onze{" "}
            <Link to="/privacy">privacyverklaring</Link>.
          </p>
        </div>
        <div className="consent-banner__actions">
          <button
            className="button button--outline"
            type="button"
            onClick={() => decide("denied")}
          >
            Weigeren
          </button>
          <button
            className="button button--primary"
            type="button"
            onClick={() => decide("granted")}
          >
            Toestaan
          </button>
          {preferencesOpen && consent !== null && (
            <button
              className="consent-banner__close"
              type="button"
              onClick={closePreferences}
            >
              Sluiten
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
