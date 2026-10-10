import { Link } from "react-router-dom";
import { SkyIllustration } from "../components/decorations/SkyIllustration";

export function AboutPage() {
  return (
    <main id="main" className="page-shell">
      <div className="container about-layout">
        <section className="about-layout__copy">
          <span className="eyebrow">Over onze kleine jongen</span>
          <h1>Dit is Henry.</h1>
          <p>Henry is ons zoontje. Hij werd in november 2021 stil geboren.</p>
          <p>
            Op deze website bewaren we onze brieven aan hem en de herinneringen
            die we met anderen willen delen. Het zijn verhalen over liefde en
            gemis, over bijzondere dagen en over alles wat Henry voor ons
            betekent.
          </p>
          <p>
            Deze plek is voor Henry, maar ook voor iedereen die zijn verhaal wil
            leren kennen.
          </p>
          <p>
            Voor Henry hebben we ook een ster laten registreren. Je kunt zijn
            ster bekijken via{" "}
            <a
              className="text-link"
              href="https://stars.osr.org/henry-ac-hollink"
              target="_blank"
              rel="noopener noreferrer"
            >
              zijn sterrenpagina <span aria-hidden="true">↗</span>
            </a>
            .
          </p>
          <Link className="button button--primary" to="/verhalen">
            Lees onze verhalen
          </Link>
        </section>
        <div className="about-layout__illustration">
          <SkyIllustration />
        </div>
      </div>
    </main>
  );
}
