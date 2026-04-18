import Home from '@/pages/home';
import { RouteObject } from 'react-router';

export default [
  {
    path: '/',
    children: [{ index: true, element: <Home /> }],
  },
] as const satisfies RouteObject[];
