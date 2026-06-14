interface ApiResponse {
  id: string;
  slug: string;
  is_active: boolean;
}

export interface Category extends ApiResponse {
  name: string;
}

export interface Course extends ApiResponse {
  name: string;
  price: boolean;
  description?: string;
}

export interface Courses {
  page_size: number;
  count: number;
  results: Pick<Course, 'id' | 'slug' | 'is_active' | 'name' | 'price'>[];
}
