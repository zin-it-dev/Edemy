import Course from "@/pages/Course";
import Courses from "@/pages/Courses";
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
    path: "/profile",
    component: Profile,
    layout: undefined,
  },
];
