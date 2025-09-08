import axios from "@/libs/configs/axios";
import type { Course } from "@/types/course.type";

export const getCourses = async (): Promise<Course[]> => {
  const res = await axios.get("/courses/");
  return res.data;
};
