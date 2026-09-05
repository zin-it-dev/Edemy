type Base = {
  id: number;
  slug: string;
  date_created: string | null;
};

export type User = {
  id: number;
  email: string;
};

export type Category = Base & {
  name: string;
};

export type Course = Base & {
  title: string;
  description: string;
  price: string;
  category: Category;
};

export type CourseSummary = Pick<Course, "id" | "slug" | "title" | "price" | "description" | "date_created">;

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type CoursesResponse = PaginatedResponse<CourseSummary>;