import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getLesson, getLessons } from "@/services/lesson.service";

const useLessons = (slug?: string) => {
  return useQuery({
    queryKey: ["lessons", slug],
    queryFn: () => getLessons(slug),
    enabled: !!slug,
    placeholderData: keepPreviousData,
  });
};

const useLesson = (slug?: string, lessonSlug?: string) => {
  return useQuery({
    queryKey: ["lesson", slug],
    queryFn: () => getLesson(slug, lessonSlug),
    enabled: !!slug && !!lessonSlug,
    placeholderData: keepPreviousData,
  });
};

export { useLessons, useLesson };
