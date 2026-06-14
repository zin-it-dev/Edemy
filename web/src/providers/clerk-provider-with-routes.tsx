import React from 'react';
import { ClerkProvider } from '@clerk/react';
import { useNavigate } from 'react-router';
import { VITE_ENV } from '@/constants/env';

const ClerkProviderWithRoutes = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  if (!VITE_ENV.publishableKey) {
    throw new Error('Missing Publishable Key');
  }

  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={VITE_ENV.publishableKey}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
    >
      {children}
    </ClerkProvider>
  );
};

export default ClerkProviderWithRoutes;
