import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '@clerk/react';
import { GlobalSpinner } from '@/components/ui/spinner';

export function ProtectedRoute() {
  const { isSignedIn, isLoaded } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return <GlobalSpinner />;
  }

  if (!isSignedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
