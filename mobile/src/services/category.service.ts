import axios from "@/libs/configs/axios";
import { Category } from "@/types/category.type";

export async function fetchCategories(): Promise<Category[]> {
  const response = await axios.get("/categories");
  return response.data;
}
