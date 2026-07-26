import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from '@/components/ui/fallback';
import AppProvider from '@/providers/app-provider';
import '@/styles/globals.css';
import App from '@/App';
import { ThemeProvider } from './providers/theme-provider';

const root = document.getElementById('root') as HTMLElement;

createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <ErrorBoundary
        FallbackComponent={Fallback}
        onReset={(details) => {
          // Reset the state of your app so the error doesn't happen again
        }}
      >
        <AppProvider>
          <App />
        </AppProvider>
      </ErrorBoundary>
        </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
