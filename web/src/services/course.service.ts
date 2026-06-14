import axios from '@/lib/axios';
import type { Course, Courses } from '@/utils/types';

export const fetchCourses = async (): Promise<Courses> => {
  const res = await axios.get<Courses>('/courses');
  return res.data;
};

export const fetchCourse = async (slug: string): Promise<Course> => {
  const res = await axios.get<Course>(`/courses/${slug}`);
  return res.data;
};
