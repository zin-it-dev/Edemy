import { endpoints } from "@/utils/constants";
import axios from "@/libs/apis/axios";
import type { AgentFormData } from "@/libs/validations/agent.schema";
import type { Courses } from "@/types/course.type";

export const generateCourseOutline = async (data: AgentFormData) => {
  const response = await axios.post("/courses/generate/", data);
  console.log("API Response:", response.data);
  return response.data;
};

export type Outline = {
  status: "PENDING" | "SUCCESS" | "FAILURE";
  result: {
    title: string;
    description: string;
    modules: Array<{
      title: string;
      lessons: Array<{
        title: string;
        content: string;
      }>;
    }>;
  };
};


export const fetchCourses = async (category: string, keyword: string, page: string): Promise<Courses> => {
  const response = await axios.get(endpoints.courses({category, keyword, page}))
  return response.data
}
