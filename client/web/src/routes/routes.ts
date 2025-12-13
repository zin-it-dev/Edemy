import { lazy, type ComponentType } from "react";

interface RouteConfig {
  path: string;
  component: ComponentType<any>;
}

export const publicRoutes: RouteConfig[] = [
  {
    path: "/",
    component: lazy(() => import("@/pages/Home")),
  },
  {
    path: "/courses/",
    component: lazy(() => import("@/pages/Courses")),
  },
  {
    path: "/about",
    component: lazy(() => import("@/pages/About")),
  },
] as const;

export const privateRoutes: RouteConfig[] = [] as const;
