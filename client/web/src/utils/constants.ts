import { HiOutlineHome, HiOutlineSquare3Stack3D } from "react-icons/hi2";

import logo from "@/assets/images/logo.svg";
import type { MenuType } from "@/types/menu.type";

export const assets = {
  logo,
};

export const endpoints = {
  courses: (params?: {
    keyword: string;
    category: string;
    page: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append("category", params.category);
    if (params?.keyword) searchParams.append("search", params.keyword);
    if (params?.page) searchParams.append("page", params.page);
    const queryString = searchParams.toString();
    return queryString ? `/courses/?${queryString}` : "/courses";
  },
  categories: "/categories",
};

export const menu: MenuType[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: HiOutlineHome,
  },
  {
    path: "/dashboard/explore",
    name: "Explore",
    icon: HiOutlineSquare3Stack3D,
  },
];
