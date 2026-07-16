import { useRoutes } from 'react-router';
import RootLayout from '@/components/layouts/root-layout';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import Home from '@/pages/home';
import Dashboard from '@/pages/dashboard';
import Game from './pages/game';
import Pricing from './pages/pricing';
import { AuthProvider } from '@/components/providers/auth-provider';
import { ProtectedRoute } from '@/components/routes/protected-route';

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

  return <AuthProvider>{element}</AuthProvider>;
};

export default App;
