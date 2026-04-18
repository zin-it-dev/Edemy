type ApiEndpoints = string | ((...args: any[]) => string);

export const ENDPOINTS = {
  categories: '/categories',
  course: (id) => `/courses/${id}`,
} as const satisfies Record<string, ApiEndpoints>;
