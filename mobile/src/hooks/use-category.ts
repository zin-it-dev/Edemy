import { useQuery } from "@tanstack/react-query";

import { fetchCategories } from "@/services/category.service";

const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};

export default useCategory;
