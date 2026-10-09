// biome-ignore-all lint/suspicious/noDocumentCookie: Analytics consent revocation requires expiring existing GA cookies.
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
let initialized = false;

type ConsentState = "granted" | "denied";
type Gtag = (...parameters: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: Gtag;
  }
}

export function startAnalytics(): void {
  if (initialized) return;
  if (!measurementId) {
    console.warn("Measurement ID is missing!");
    return;
  }
  initialized = true;
  if (!window.dataLayer) window.dataLayer = [];
  const dataLayer = window.dataLayer;
  window.gtag = (...parameters) => dataLayer.push(parameters);

  // Basic consent mode v2: no Google request is made until consent is granted.
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("consent", "update", { analytics_storage: "granted" });
  window.gtag("config", measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.append(script);
}

export function trackPageView(title: string, pathname: string): void {
  if (!initialized || !window.gtag) {
    console.warn("Could not send page load to analytics", {
      initialized,
      gtag: !!window.gtag,
    });
    return;
  }
  console.log("Sending page load to analytics", { title, pathname });
  window.gtag("event", "page_view", {
    page_title: title,
    page_location: `${window.location.origin}${pathname}`,
    page_path: pathname,
  });
}

function removeGoogleAnalyticsCookies(): void {
  const domain = window.location.hostname;
  for (const item of document.cookie.split(";")) {
    const name = item.trim().split("=")[0];
    if (!name?.startsWith("_ga")) continue;
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${domain}; SameSite=Lax`;
    const parts = domain.split(".");
    if (parts.length > 2) {
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${parts.slice(-2).join(".")}; SameSite=Lax`;
    }
  }
}

export function revokeAnalytics(): void {
  if (initialized) {
    window.gtag?.("consent", "update", { analytics_storage: "denied" });
    removeGoogleAnalyticsCookies();
    // A reload also unloads the previously injected Google script.
    window.location.reload();
  }
}

export function getAnalyticsConsentStatus(): ConsentState {
  return initialized ? "granted" : "denied";
}
