import { useRoutes } from 'react-router';
import { GoogleOneTap } from '@clerk/react';
import RootLayout from '@/components/layouts/root-layout';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import Home from '@/pages/home';
import Dashboard from '@/pages/dashboard';
import Game from './pages/game';
import Pricing from './pages/pricing';
import { ProtectedRoute } from '@/routes/protected-route';

const App = () => {
  const element = useRoutes([
    {
      path: '/',
      Component: RootLayout,
      children: [
        { index: true, Component: Home },
        { path: 'pricing', Component: Pricing },
      ],
    },
    {
      Component: ProtectedRoute,
      children: [
        {
          path: '/dashboard',
          Component: DashboardLayout,
          children: [
            { index: true, Component: Dashboard },
            { path: 'game', Component: Game },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <GoogleOneTap />
      {element}
    </>
  );
};

export default App;
