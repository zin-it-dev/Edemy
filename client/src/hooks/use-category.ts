import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/services/category.service";

const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export default useCategory;
