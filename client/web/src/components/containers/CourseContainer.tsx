import { useSearchParams } from "react-router";

import { useCourses } from "@/hooks/useCourses";
import type { ApiParams } from "@/types/base.type";
import Item from "../ui/Item";
import withGridRender from "../ui/withGridRender";
import Paginator from "../ui/Paginator";

const Items = withGridRender(Item);

const CourseContainer = ({
  limit,
  pagination = true,
}: {
  limit?: string;
  pagination?: boolean;
}) => {
  const [searchParams] = useSearchParams();

  const params: ApiParams = {
    limit,
    category: searchParams.get("category")!,
    page: searchParams.get("page")! || "1",
    search: searchParams.get("search")!,
  };

  const { data: courses, isPending } = useCourses(params);
  console.log(courses);

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    courses && (
      <>
        <Items
          data={courses?.results}
          gird={{
            sizes: {
              xs: 1,
              sm: 2,
              md: 3,
            },
            styles: "g-4",
          }}
        />
        {pagination && (
          <Paginator count={courses?.count} pageSize={courses?.page_size} />
        )}
      </>
    )
  );
};

export default CourseContainer;
