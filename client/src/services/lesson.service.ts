import axios from "@/libs/configs/axios";
import { endpoints } from "@/libs/constants/endpoints";
import type { Lesson } from "@/types/lesson.type";

export const getLessons = async (slug?: string): Promise<Lesson[]> => {
  const res = await axios.get(endpoints.lessons(slug));
  return res.data;
};

export const getLesson = async (slug?: string, lesson_slug?: string) => {
  const res = await axios.get(endpoints.lesson({ slug, lesson_slug }));
  return res.data;
};
