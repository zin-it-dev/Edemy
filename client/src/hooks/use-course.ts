import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { getCourse, getCourses } from "@/services/course.service";

const useCourses = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
  const keyword = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";

  return useQuery({
    queryKey: ["courses", keyword, category, page],
    queryFn: () => getCourses(keyword, category, page),
    placeholderData: keepPreviousData,
  });
};

const useCourse = (slug?: string) => {
  return useQuery({
    queryKey: ["course", slug],
    queryFn: () => getCourse(slug),
    enabled: !!slug,
  });
};

export { useCourse, useCourses };
