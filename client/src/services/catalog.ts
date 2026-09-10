import axios from "@/lib/axios";
import { Category, CoursesResponse } from "@/types/types";
import { queryOptions } from "@tanstack/react-query";

export const catalogQueryKeys = {
  categories: ["categories"] as const,
  courses: ["courses"] as const,
};

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get<Category[]>("/categories/");
  return data;
};

export const getLatestCourses = async (): Promise<CoursesResponse> => {
  const { data } = await axios.get<CoursesResponse>("/courses/");

  return {
    ...data,
    results: [...data.results].sort((firstCourse, secondCourse) => {
    const firstDate = firstCourse.date_created ?? "";
    const secondDate = secondCourse.date_created ?? "";
    return secondDate.localeCompare(firstDate);
    }),
  };
};

export const categoriesQueryOptions = () =>
  queryOptions({
    queryKey: catalogQueryKeys.categories,
    queryFn: getCategories,
  });

export const latestCoursesQueryOptions = () =>
  queryOptions({
    queryKey: catalogQueryKeys.courses,
    queryFn: getLatestCourses,
  });