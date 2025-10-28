import { Pagination } from "react-bootstrap";

import { usePagination } from "@/hooks/usePagination";
import type { Paginate } from "@/types/base.type";

const Paginator = ({ count, page_size }: Paginate) => {
  const { total, page, jump, next, prev } = usePagination({
    count,
    page_size,
  });

  return (
    <>
      {total > 1 && (
        <Pagination className="justify-content-center my-4">
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
          {Array.from({ length: total }, (_, i) => i + 1).map((item) => (
            <Pagination.Item
              active={item === page}
              key={item}
              as="button"
              onClick={() => jump(item)}
            >
              {item}
            </Pagination.Item>
          ))}
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
      )}
    </>
  );
};

export default Paginator;
