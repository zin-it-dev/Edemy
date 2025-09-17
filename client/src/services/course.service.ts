import axios from "@/libs/configs/axios";
import { endpoints } from "@/libs/constants/endpoints";
import type { Course, Courses } from "@/types/course.type";

export const getCourses = async (
  keyword?: string,
  category?: string,
  page?: string
): Promise<Courses> => {
  const res = await axios.get(
    endpoints.courses({ keyword: keyword, category: category, page: page })
  );
  return res.data;
};

export const getCourse = async (slug?: string): Promise<Course> => {
  const res = await axios.get(endpoints.course(slug));
  return res.data;
};
