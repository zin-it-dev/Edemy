import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "bootswatch/dist/vapor/bootstrap.min.css";

import "@/styles/globals.css";
import App from "@/App";
import QueryProvider from "@/providers/QueryProvider";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const root = document.getElementById("root") as HTMLElement;

createRoot(root!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} signInUrl="/">
      <QueryProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <App />
        </Suspense>
      </QueryProvider>
    </ClerkProvider>
  </StrictMode>
);
