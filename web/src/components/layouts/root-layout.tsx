import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@clerk/react';
import Header from '../ui/header';
import Footer from '../ui/footer';
import { Spinner } from '../ui/loading';

const RootLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Spinner size={8} />;
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
