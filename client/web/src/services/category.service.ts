import { endpoints } from "@/utils/constants";
import axios from "@/libs/apis/axios";
import type { Category } from "@/types/category.type";

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get(endpoints.categories);
  return response.data;
};
