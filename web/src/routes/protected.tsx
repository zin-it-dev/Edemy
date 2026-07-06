import { Spinner } from '@/components/ui/loading';
import { useAuth } from '@clerk/react';
import { Navigate, Outlet, useLocation } from 'react-router';

const Protected = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return <Spinner size={8} />
  }

  if (!isSignedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default Protected;
