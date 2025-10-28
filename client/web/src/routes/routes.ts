import type { RouteType } from "@/types/route.type";
import { lazy } from "react";

export const PRIVATE_ROUTES: RouteType[] = [
  {
    path: "/dashboard",
    component: lazy(() => import("@/pages/Dashboard")),
    layout: null,
  },
  {
    path: "/dashboard/explore",
    component: lazy(() => import("@/pages/Explore")),
  },
  {
    path: "/tutor",
    component: lazy(() => import("@/pages/Generator")),
  },
  {
    path: "/tutor/outline/:id",
    component: lazy(() => import("@/pages/Outline")),
  }
];

export const PUBLIC_ROUTES: RouteType[] = [
  {
    path: "/",
    component: lazy(() => import("@/pages/Home")),
  }
];

export const NOT_FOUND_ROUTE: RouteType =  {
    path: "*",
    component: lazy(() => import("@/pages/NotFound")),
}