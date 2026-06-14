import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import '@/assets/styles/globals.css';
import App from '@/App';
import QueryProvider from '@/providers/query-provider';
import ClerkProviderWithRoutes from './providers/clerk-provider-with-routes';

const root = document.getElementById('root') as HTMLElement;

createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProviderWithRoutes>
        <QueryProvider>
          <App />
        </QueryProvider>
      </ClerkProviderWithRoutes>
    </BrowserRouter>
  </StrictMode>,
);
