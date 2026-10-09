import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getStory } from "../content/posts";
import { startAnalytics, trackPageView } from "../features/analytics/analytics";
import { useAnalyticsConsent } from "../features/analytics/ConsentProvider";

function getMetadata(pathname: string): { title: string; description: string } {
  if (pathname === "/")
    return {
      title: "Henry Hollink | Voor altijd onze kleine Henry",
      description:
        "Een plek vol liefde, brieven en herinneringen voor Henry Hollink.",
    };
  if (pathname === "/verhalen")
    return {
      title: "Brieven & herinneringen | Henry Hollink",
      description:
        "Lees de brieven en herinneringen die we voor Henry bewaren.",
    };
  if (pathname === "/over-henry")
    return {
      title: "Over Henry | Henry Hollink",
      description: "Over Henry en de verhalen die we voor hem bewaren.",
    };
  if (pathname === "/privacy")
    return {
      title: "Privacyverklaring | Henry Hollink",
      description: "Hoe deze website omgaat met gegevens en Google Analytics.",
    };
  if (pathname.startsWith("/post/")) {
    const story = getStory(pathname.substring("/post/".length));
    if (story)
      return {
        title: `${story.titel} | Henry Hollink`,
        description:
          story.bijschrift || "Een brief of herinnering voor Henry Hollink.",
      };
  }
  return {
    title: "Pagina niet gevonden | Henry Hollink",
    description: "Deze pagina bestaat niet.",
  };
}

export function PageMetadata() {
  const { pathname } = useLocation();
  const { consent } = useAnalyticsConsent();

  useEffect(() => {
    console.debug("Reloading page meta data!");
    const meta = getMetadata(pathname);
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
    if (consent === "granted") {
      startAnalytics();
      trackPageView(meta.title, pathname);

    } else {
      console.warn(
        "Skipped sending page view event to analytics, no consent given...",
      );
    }
  }, [pathname, consent]);

  return null;
}
