import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import RootLayout from '@/components/layouts/RootLayout';
import Protected from '@/components/ui/Protected';

const Home = lazy(() => import('@/pages/Home'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const CourseDetail = lazy(() => import('@/pages/CourseDetail'));
const OfficialCourses = lazy(() => import('@/pages/OfficialCourses'));
const Pricings = lazy(() => import('@/pages/Pricings'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
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
            element: <OfficialCourses />,
          },
          {
            path: ':slug',
            element: <CourseDetail />,
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
