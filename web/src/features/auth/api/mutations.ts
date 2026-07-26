// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { updateUser } from './endpoints';

// export const useUpdateUserMutation = () => {
//     const queryClient = useQueryClient();
    
//     return useMutation({
//         mutationFn: ({ id, data }) => updateUser(id, data),
//         onSuccess: (_, variables) => {
//             queryClient.invalidateQueries(['user', variables.id]);
//         }
//     });
// };