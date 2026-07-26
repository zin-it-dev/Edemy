import React from 'react';
import { AuthProvider } from '@/providers/auth-provider';
import QueryProvider from '@/providers/query-provider';
import ClerkProviderWithRoutes from '@/providers/clerk-provider-with-routes';


const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const providers: React.ComponentType<{ children: React.ReactNode }>[] = [
    ClerkProviderWithRoutes,
    QueryProvider,
    AuthProvider,
  ];

  return (
    <>
      {providers.reduceRight(
        (acc, Provider) => (
          <Provider>{acc}</Provider>
        ),
        children,
      )}
    </>
  );
};

export default AppProvider;
