import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import RootLayout from '@/components/layouts/root-layout';
import Protected from '@/routes/protected';

const Home = lazy(() => import('@/pages/landing-page'));
const NotFound = lazy(() => import('@/pages/not-found'));
const Dashboard = lazy(() => import('@/pages/dashboard'));
const Detail = lazy(() => import('@/pages/detail'));
const Explorer = lazy(() => import('@/pages/explorer'));
const Pricings = lazy(() => import('@/pages/pricings'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/pricing',
        element: <Pricings />,
      },
      {
        path: 'courses',
        children: [
          {
            index: true,
            element: <Explorer />,
          },
          {
            path: ':slug',
            element: <Detail />,
          },
        ],
      },
    ],
  },
  {
    element: <Protected />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
  { path: '*', element: <NotFound /> },
];
