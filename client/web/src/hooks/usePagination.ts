import { createSearchParams, useNavigate, useSearchParams } from "react-router";
import { useMemo } from "react";

import type { PaginationParams } from "@/types/base.type";

export const usePagination = ({ count, pageSize }: PaginationParams) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get("page")) || 1;

  const total = useMemo(() => Math.ceil(count / pageSize), [count, pageSize]);

  const jump = (param: number) => {
    if (param >= 1 && param <= total) {
      const params = createSearchParams({
        ...Object.fromEntries(searchParams),
        page: param.toString(),
      });

      navigate(`?${params.toString()}`, {
        replace: false,
        state: { preserveScroll: true },
      });
    }
  };

  const next = () => jump(page + 1);
  const prev = () => jump(page - 1);

  return { total, page, jump, next, prev };
};
