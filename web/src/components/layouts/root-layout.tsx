import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router';
import Navbar from '@/features/marketing/components/navbar';
import Footer from '@/features/marketing/components/footer';
import { Toaster } from '@/components/ui/sonner';
import Fallback from '@/components/ui/fallback';

const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <ErrorBoundary
          fallbackRender={Fallback}
          onReset={(details) => {
            // Reset the state of your app so the error doesn't happen again
          }}
        >
          <Outlet />
        </ErrorBoundary>
      </main>
      <Toaster />
      <Footer />
    </div>
  );
};

export default RootLayout;
