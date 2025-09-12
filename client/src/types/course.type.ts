import type { Base } from "./base.type";
import type { Paginate } from "./paginate.type";

export type Course = Base & {
  name: string;
  description: string;
};

export type Courses = Paginate & {
  results: Pick<Course, "id" | "slug" | "name" | "description">[];
};
