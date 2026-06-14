import axios from '@/lib/axios';
import type { Category } from '@/utils/types';

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await axios.get('/categories');
  return res.data;
};
