import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "bootswatch/dist/minty/bootstrap.min.css";
import { Provider } from "react-redux";

import Auth0ProviderNavigate from "@/providers/auth0-provider-navigate";
import QueryProvider from "@/providers/query-provider";
import "@/styles/globals.css";
import App from "@/App";
import { store } from "@/store";

const root = document.getElementById("root") as HTMLElement;

createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderNavigate>
        <Provider store={store}>
          <QueryProvider>
            <App />
          </QueryProvider>
        </Provider>
      </Auth0ProviderNavigate>
    </BrowserRouter>
  </StrictMode>
);
