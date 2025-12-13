import axios from "@/libs/apis/axios";
import { endpoints } from "@/libs/constants/endpoints";
import type { ApiParams } from "@/types/base.type";
import type { Courses } from "@/types/course.type";

export const fetchCourses = async (params: ApiParams): Promise<Courses> =>
  (await axios(endpoints.courses(params))).data;
