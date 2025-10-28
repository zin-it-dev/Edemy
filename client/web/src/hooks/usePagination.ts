import { useMemo } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router";

import type { Paginate } from "@/types/base.type";

export const usePagination = (props: Paginate) => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const navigate = useNavigate();

  const total = useMemo(
    () => Math.ceil(props.count / props.page_size),
    [props.count, props.page_size]
  );

  const jump = (page: number) => {
    if (page >= page && page <= total) {
      const keyword = searchParams.get("search") || "";
      const params = createSearchParams({
        ...(keyword ? { search: keyword } : {}),
        page: page.toString(),
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
