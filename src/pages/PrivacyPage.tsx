import { Fragment } from "react";
import { useAnalyticsConsent } from "../features/analytics/ConsentProvider";

export function PrivacyPage() {
  const { openPreferences } = useAnalyticsConsent();
  const email = import.meta.env.VITE_CONTACT_EMAIL?.trim();
  return (
    <main id="main" className="page-shell">
      <article className="container legal-page">
        <span className="eyebrow">Jouw gegevens</span>
        <h1>Privacyverklaring</h1>
        <p>
          Op deze website delen we brieven en herinneringen aan Henry. Je kunt
          alle verhalen lezen zonder account en zonder analytische cookies te
          accepteren.
        </p>

        <h2>Google Analytics</h2>
        <p>
          Alleen als je daarvoor toestemming geeft, gebruiken we Google
          Analytics 4 om te begrijpen hoeveel mensen de website bezoeken, welke
          pagina’s worden gelezen, uit welke landen of regio’s bezoekers
          ongeveer komen en via welke websites ze ons vinden.
        </p>
        <p>
          Daarbij worden bezoekgegevens verwerkt door Google. Google Analytics
          kan cookies plaatsen en technische gegevens verwerken. We schakelen
          advertentiepersonalisatie en Google-signalen uit en sturen geen namen,
          e-mailadressen of andere bewust identificerende gegevens mee als zelf
          ingestelde gebeurtenisparameters.
        </p>
        <p>
          Meer informatie vind je bij{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Google's privacybeleid
          </a>
          .
        </p>

        <h2>Jouw keuze</h2>
        <p>
          We laden Google Analytics pas nadat je expliciet op ‘Toestaan’ hebt
          geklikt. De keuze bewaren we maximaal 180 dagen in de lokale opslag
          van je browser, zodat we je niet bij ieder bezoek opnieuw hoeven te
          vragen. Zonder toestemming laden we geen Google Analytics-script.
        </p>
        <p>
          Je kunt je toestemming op ieder moment wijzigen via de knop hieronder
          of via ‘Cookievoorkeuren’ in de footer.
        </p>
        <button
          className="button button--outline"
          type="button"
          onClick={openPreferences}
        >
          Cookievoorkeuren wijzigen
        </button>

        {email && (
          <Fragment>
            <h2>Contact</h2>
            <p>
              Heb je vragen over jouw privacy of gegevens? Mail ons via{" "}
              <a href={`mailto:${email}`}>{email}</a>.
            </p>
          </Fragment>
        )}
        <p className="legal-page__footnote">
          Controleer deze verklaring en je Google Analytics-instellingen vóór
          publicatie. Dit is een praktisch uitgangspunt en geen juridisch
          advies.
        </p>
      </article>
    </main>
  );
}
