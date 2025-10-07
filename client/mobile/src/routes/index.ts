import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { RouteConfig } from "@/types/route.type";
import { ProfileTabIcon } from "@/components/ProfileTabBarIcon";

export const rootRoutes: RouteConfig[] = [
  {
    name: "(auth)",
  },
];

export const protectedRoutes: RouteConfig[] = [
  {
    name: "(tabs)",
  },
];

export const publicRoutes: RouteConfig[] = [
  {
    name: "sign-in",
  },
];

export const privateRoutes: RouteConfig[] = [
  {
    name: "index",
    options: {
      title: "Home",
      tabBarIcon: ({ color }: { color: string }) =>
        React.createElement(MaterialIcons, {
          name: "home",
          size: 32,
          color,
        }),
    },
  },
  {
    name: "courses",
    options: {
      title: "Courses",
      tabBarIcon: ({ color }: { color: string }) =>
        React.createElement(MaterialIcons, {
          name: "school",
          size: 32,
          color,
        }),
    },
  },
  {
    name: "profile",
    options: {
      title: "Profile",
      tabBarIcon: ({ color }: { color: string }) =>
        React.createElement(ProfileTabIcon, {
          size: 32,
          color,
        }),
    },
  },
];
