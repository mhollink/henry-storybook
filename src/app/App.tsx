import { lazy, Suspense, useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { PageLoading } from "../components/layout/PageLoading";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import { CookieBanner } from "../components/privacy/CookieBanner";
import { PageMetadata } from "./PageMetadata";

const HomePage = lazy(() =>
  import("../pages/HomePage").then(({ HomePage }) => ({ default: HomePage })),
);
const StoriesPage = lazy(() =>
  import("../pages/StoriesPage").then(({ StoriesPage }) => ({
    default: StoriesPage,
  })),
);
const StoryPage = lazy(() =>
  import("../pages/StoryPage").then(({ StoryPage }) => ({
    default: StoryPage,
  })),
);
const AboutPage = lazy(() =>
  import("../pages/AboutPage").then(({ AboutPage }) => ({
    default: AboutPage,
  })),
);
const PrivacyPage = lazy(() =>
  import("../pages/PrivacyPage").then(({ PrivacyPage }) => ({
    default: PrivacyPage,
  })),
);
const NotFoundPage = lazy(() =>
  import("../pages/NotFoundPage").then(({ NotFoundPage }) => ({
    default: NotFoundPage,
  })),
);

function ScrollToTop() {
  const { pathname } = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Scroll to top whenever the pathname changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function PageLayout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Direct naar inhoud
      </a>
      <SiteHeader />
      <Suspense fallback={<PageLoading />}>
        <Outlet />
      </Suspense>
      <SiteFooter />
    </>
  );
}

export function App() {
  return (
    <>
      <PageMetadata />
      <ScrollToTop />
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="verhalen" element={<StoriesPage />} />
          <Route path="post/:filename" element={<StoryPage />} />
          <Route path="over-henry" element={<AboutPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route
            path="contact"
            element={<Navigate to="/over-henry" replace />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <CookieBanner />
    </>
  );
}
