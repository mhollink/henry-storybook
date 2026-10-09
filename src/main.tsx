import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/nunito-sans/wght.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";
import { ConsentProvider } from "./features/analytics/ConsentProvider";
import "./styles/tokens.css";
import "./styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <ConsentProvider>
        <App />
      </ConsentProvider>
    </BrowserRouter>
  </StrictMode>,
);
