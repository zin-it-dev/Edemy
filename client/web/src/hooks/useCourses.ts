import { fetchCourses } from "@/services/course.service";
import type { ApiParams } from "@/types/base.type";
import { useQuery } from "@tanstack/react-query";

export const useCourses = ({ limit, category, page, search }: ApiParams) => {
  return useQuery({
    queryKey: ["courses", limit, category, page, search],
    queryFn: () => fetchCourses({ limit, category, page, search }),
  });
};
