import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { fetchCourses } from "@/services/course.service";

export const useCourses = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const keyword = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";

  return useQuery({
    queryKey: ["courses", category, keyword, page],
    queryFn: () => fetchCourses(category, keyword, page),
    placeholderData: keepPreviousData,
  });
};
