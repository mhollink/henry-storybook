import { createContext, type ReactNode, useContext, useState } from "react";
import { revokeAnalytics } from "./analytics";

type Consent = "granted" | "denied" | null;
interface ConsentContextValue {
  consent: Consent;
  preferencesOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  decide: (value: Exclude<Consent, null>) => void;
}

const KEY = "henry-analytics-consent-v1";
const SIX_MONTHS = 180 * 24 * 60 * 60 * 1000;
const ConsentContext = createContext<ConsentContextValue | null>(null);

function readConsent(): Consent {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const item = parsed as { value?: unknown; timestamp?: unknown };
    if (
      typeof item.timestamp !== "number" ||
      Date.now() - item.timestamp > SIX_MONTHS
    )
      return null;
    return item.value === "granted" || item.value === "denied"
      ? item.value
      : null;
  } catch {
    return null;
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<Consent>(readConsent);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const decide = (value: "granted" | "denied") => {
    const wasGranted = consent === "granted";
    try {
      window.localStorage.setItem(
        KEY,
        JSON.stringify({ value, timestamp: Date.now() }),
      );
    } catch {
      // Consent is still respected in memory when browser storage is unavailable.
    }
    setConsent(value);
    setPreferencesOpen(false);
    if (wasGranted && value === "denied") revokeAnalytics();
  };

  return (
    <ConsentContext.Provider
      value={{
        consent,
        preferencesOpen,
        openPreferences: () => setPreferencesOpen(true),
        closePreferences: () => setPreferencesOpen(false),
        decide,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useAnalyticsConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) throw new Error("useAnalyticsConsent requires ConsentProvider");
  return context;
}
