import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import '@/assets/styles/globals.css';
import App from '@/App';
import QueryProvider from '@/providers/query-provider';
import ClerkProviderWithRoutes from './providers/clerk-provider-with-routes';
import { createHead, UnheadProvider } from '@unhead/react/client';

const head = createHead();

const root = document.getElementById('root') as HTMLElement;

createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProviderWithRoutes>
        <UnheadProvider head={head}>
          <QueryProvider>
            <App />
          </QueryProvider>
        </UnheadProvider>
      </ClerkProviderWithRoutes>
    </BrowserRouter>
  </StrictMode>,
);
