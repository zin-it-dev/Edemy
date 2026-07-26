import { apiEndpoints } from '@/constants/endpoints';
import { apiClient } from '@/services/api';
import type { User } from '@/types';


export const userService = {
  getCurrentUser: () => {
    return apiClient.get<User>(apiEndpoints.current_user);
  },
};