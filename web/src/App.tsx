import { Suspense } from 'react';
import { useRoutes } from 'react-router';
import { routes } from '@/routes/react-router.config';
import { Spinner } from '@/components/ui/loading';
import { AuthProvider } from '@/providers/auth-provider';

const App = () => {
  const element = useRoutes(routes);

  return (
    <AuthProvider>
      <Suspense fallback={<Spinner size={8} />}>
        {element}
        {/* <Cookie /> */}
      </Suspense>
    </AuthProvider>
  );
};

export default App;
