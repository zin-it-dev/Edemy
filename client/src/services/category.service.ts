import axios from "@/libs/configs/axios";
import { endpoints } from "@/libs/constants/endpoints";
import type { Category } from "@/types/category.type";

export const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get(endpoints.categories);
  return res.data;
};
