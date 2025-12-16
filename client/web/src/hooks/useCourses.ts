import { fetchCourse, fetchCourses } from "@/services/course.service";
import type { ApiParams } from "@/types/base.type";
import { useQuery } from "@tanstack/react-query";

export const useCourses = (params: ApiParams) => {
  return useQuery({
    queryKey: ["courses", {...params}],
    queryFn: () => fetchCourses(params),
  });
};


export const useCourse = (slug: string) => {
  return useQuery({
    queryKey: ["courses", slug],
    queryFn: () => fetchCourse(slug),
  });
};
