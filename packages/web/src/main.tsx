import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ClerkProviderWithRoutes from "@/components/providers/clerk-provider-with-routes";
import "@/styles/globals.css";
import App from "@/App.tsx";
import { BrowserRouter } from "react-router";

const root = document.getElementById("root") as HTMLElement;

createRoot(root!).render(
    <StrictMode>
        <BrowserRouter>
            <ClerkProviderWithRoutes>
                <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
                    <App />
                </ThemeProvider>
            </ClerkProviderWithRoutes>
        </BrowserRouter>
    </StrictMode>,
);
