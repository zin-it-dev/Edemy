// import { useAuth } from '@/hooks/use-auth';
import { useAuth } from '@clerk/react';
import { Navigate, Outlet, useLocation } from 'react-router';

const Protected = () => {
  // const { user, isLoading } = useAuth();

  // if (isLoading) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center bg-purple-50/30">
  //       <div className="text-purple-600">Loading...</div>
  //     </div>
  //   );
  // }

  // if (!user) {
  //   return <Navigate to="/" replace />;
  // }

  const { isSignedIn, isLoaded } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-purple-50/30">
        <div className="text-purple-600">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default Protected;
