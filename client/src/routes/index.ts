import Home from "@/pages/Home";
import Profile from "@/pages/Profile";

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
    path: "/profile",
    component: Profile,
    layout: undefined,
  },
];
