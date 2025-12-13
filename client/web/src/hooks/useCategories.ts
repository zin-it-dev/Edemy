import { useQuery } from "@tanstack/react-query";

import { fetchCategories } from "@/services/category.service";

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
