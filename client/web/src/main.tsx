import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ClerkProvider } from "@clerk/clerk-react";
import "bootswatch/dist/vapor/bootstrap.min.css";

import "@/styles/globals.css";
import App from "@/App";
import Loading from "@/components/ui/Loading";
import QueryProvider from "@/providers/query-provider";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const Main = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <App />
          </Suspense>
        </BrowserRouter>
      </QueryProvider>
    </ClerkProvider>
  );
};

const root = createRoot((document.getElementById("root") as HTMLElement)!);

if (import.meta.env.DEV) {
  root.render(
    <StrictMode>
      <Main />
    </StrictMode>
  );
} else {
  root.render(<Main />);
}
