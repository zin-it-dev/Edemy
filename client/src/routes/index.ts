import { lazy } from "react";

const Home = lazy(() => import("@/pages/Home"));
const Courses = lazy(() => import("@/pages/Courses"));
const Course = lazy(() => import("@/pages/Course"));
const NotFound = lazy(() => import("@/pages/NotFound"));

type Route = {
  path: string;
  component: React.FC;
  layout?: null;
};

export const routes: Route[] = [
  {
    path: "/",
    component: Home,
    layout: null,
  },
  {
    path: "/courses",
    component: Courses,
    layout: null,
  },
  {
    path: "/courses/:slug",
    component: Course,
    layout: null,
  },
  {
    path: "*",
    component: NotFound,
    layout: undefined,
  },
];
