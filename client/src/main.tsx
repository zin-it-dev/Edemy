import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "bootswatch/dist/minty/bootstrap.min.css";
import { Provider } from "react-redux";

import Auth0ProviderNavigate from "@/providers/auth0-provider-navigate";
import QueryProvider from "@/providers/query-provider";
import ThemeProvider from "@/providers/theme-provider";
import "@/styles/globals.css";
import App from "@/App";
import { store } from "@/store";
import Loading from "@/components/ui/Loading";

const root = document.getElementById("root") as HTMLElement;

createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderNavigate>
        <ThemeProvider>
          <Provider store={store}>
            <QueryProvider>
              <Suspense
                fallback={
                  <Loading fullScreen message="Loading..." variant="primary" />
                }
              >
                <App />
              </Suspense>
            </QueryProvider>
          </Provider>
        </ThemeProvider>
      </Auth0ProviderNavigate>
    </BrowserRouter>
  </StrictMode>
);
