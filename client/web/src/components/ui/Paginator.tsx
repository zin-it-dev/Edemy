import { Pagination, type PaginationProps } from "react-bootstrap";

import { usePagination } from "@/hooks/usePagination";
import type { PaginationParams } from "@/types/base.type";
import { usePaginationRange } from "@/hooks/usePaginationRange";

type PaginatorProps = PaginationParams & {
  styles?: string;
  settings?: PaginationProps;
};

const Paginator = ({
  styles = "justify-content-center mt-3",
  count,
  pageSize,
  siblingCount = 1,
  settings,
}: PaginatorProps) => {
  const { total, page, next, prev, jump } = usePagination({
    count,
    pageSize,
  });

  const paginationRange = usePaginationRange({
    total,
    page,
    siblingCount,
  });

  if (total <= 1) return null;

  return (
    total > 1 && (
      <Pagination className={styles} {...settings}>
        <Pagination.First
          as={"button"}
          onClick={() => jump(1)}
          disabled={page <= 1}
        />
        <Pagination.Prev
          as={"button"}
          disabled={page <= 1}
          onClick={() => prev()}
        />
        {paginationRange.map((item, index) =>
          item === "..." ? (
            <Pagination.Ellipsis key={`dots-${index}`} disabled />
          ) : (
            <Pagination.Item
              key={item}
              active={item === page}
              as={"button"}
              onClick={() => jump(Number(item))}
              aria-current={item === page ? "page" : undefined}
            >
              {item}
            </Pagination.Item>
          )
        )}
        <Pagination.Next
          as={"button"}
          onClick={() => next()}
          disabled={page >= total}
        />
        <Pagination.Last
          as={"button"}
          onClick={() => jump(total)}
          disabled={page >= total}
        />
      </Pagination>
    )
  );
};

export default Paginator;
