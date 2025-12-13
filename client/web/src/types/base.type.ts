export interface Generic {
  id: string | number;
  slug: string;
}

export interface Timestamp {
  created: number;
}

export interface ApiParams {
  limit?: string;
  page: string;
  category: string;
  search: string;
}

export interface GenericPaginationParams {
  siblingCount?: number;
}

export interface PaginationParams extends GenericPaginationParams {
  count: number;
  pageSize: number;
}
