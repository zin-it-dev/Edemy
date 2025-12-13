import type { GenericPaginationParams } from "@/types/base.type";

const DOTS = "...";

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => i + start);

interface PaginationRangeParams extends GenericPaginationParams {
  total: number;
  page: number;
}

export const usePaginationRange = ({
  total,
  page,
  siblingCount = 1,
}: PaginationRangeParams) => {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPageNumbers >= total) {
    return range(1, total);
  }

  const leftSiblingIndex = Math.max(page - siblingCount, 1);
  const rightSiblingIndex = Math.min(page + siblingCount, total);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < total - 1;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    return [...range(1, 3 + siblingCount * 2), DOTS, total];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    return [1, DOTS, ...range(total - (3 + siblingCount * 2) + 1, total)];
  }

  return [1, DOTS, ...range(leftSiblingIndex, rightSiblingIndex), DOTS, total];
};
