import type { Generic } from "./base.type";

export interface Course extends Generic {
  name: string;
  description: string;
  price: string | number;
  category: string;
  tags: string[];
}

export interface Courses {
  page_size: number;
  count: number;
  results: Pick<
    Course,
    "slug" | "name" | "description" | "price" | "category"
  >[];
}
