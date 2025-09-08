import { useQuery } from "@tanstack/react-query";

import { getCourses } from "@/services/course.service";

const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });
};

const useCourse = () => {
  return;
};

export { useCourse, useCourses };
