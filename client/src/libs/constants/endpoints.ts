export const endpoints = {
  currentUser: "/users/current-user/",
  categories: "/categories",
  courses: (params?: {
    keyword?: string;
    category?: string;
    page?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append("category", params.category);
    if (params?.keyword) searchParams.append("search", params.keyword);
    if (params?.page) searchParams.append("page", params.page);
    const queryString = searchParams.toString();
    return queryString ? `/courses/?${queryString}` : "/courses";
  },
  course: (slug?: string | null) => `/courses/${slug}`,
  lessons: (slug?: string | null) => `/courses/${slug}/lessons/`,
  lesson: (params?: { slug?: string | null; lesson_slug?: string | null }) =>
    `/courses/${params?.slug}/lessons/${params?.lesson_slug}`,
};
