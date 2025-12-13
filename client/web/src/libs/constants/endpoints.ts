import type { ApiParams } from "@/types/base.type";

export const endpoints = {
  categories: "/categories/",
  courses: (params: ApiParams) => {
    if (params.limit) return `/courses/?limit=${params.limit}`;

    const query = new URLSearchParams(
      Object.entries(params)
        .filter(
          ([_, value]) => value !== undefined && value !== null && value !== ""
        )
        .map(([key, value]) => [key, String(value)])
    ).toString();

    return query ? `/courses/?${query}` : "/courses/";
  },
} as const;
