import { useQuery } from '@tanstack/react-query';
import { userService } from '@/features/auth/api/endpoints';

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => userService.getCurrentUser(),
  });
};
