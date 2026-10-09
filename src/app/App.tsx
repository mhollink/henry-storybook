import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import { CookieBanner } from "../components/privacy/CookieBanner";
import { AboutPage } from "../pages/AboutPage";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PrivacyPage } from "../pages/PrivacyPage";
import { StoriesPage } from "../pages/StoriesPage";
import { StoryPage } from "../pages/StoryPage";
import { PageMetadata } from "./PageMetadata";

function ScrollToTop() {
  const { pathname } = useLocation();
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
      <Outlet />
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
