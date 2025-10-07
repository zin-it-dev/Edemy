import { endpoints } from "@/constants/endpoints";
import axios from "@/libs/apis/axios";
import type { Course } from "@/types/course.type";

export const fetchCourses = async (): Promise<Course[]> => {
  const response = await axios.get<Course[]>(endpoints.courses);
  return response.data;
};
