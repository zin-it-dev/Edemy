import { useRoutes } from 'react-router';
import { routes } from '@/routes/react-router.config';
import Banner from '@/components/ui/Banner';
import { Suspense } from 'react';
// import Loading from './components/ui/Loading';
import { Spinner } from '@/components/ui/Loading';
// import Cookie from '@/components/ui/Cookie';
// import AuthProvider from '@/providers/auth-provider';

const App = () => {
  const element = useRoutes(routes);

  return (
    // <AuthProvider>
    <Suspense fallback={<Spinner />}>
      <Banner />
      {element}
      {/* <Cookie /> */}
    </Suspense>
  );
};

export default App;
