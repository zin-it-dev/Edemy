import axios from "@/libs/apis/axios";
import { endpoints } from "@/libs/constants/endpoints";
import type { Category } from "@/types/category.type";

export const fetchCategories = async (): Promise<Category[]> =>
  (await axios(endpoints.categories)).data;