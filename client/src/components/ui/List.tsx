import React from "react";
import { Col, Row } from "react-bootstrap";

import { useCourses } from "@/hooks/use-course";
import { ItemSkeleton } from "./Item";

const Item = React.lazy(() => import("./Item"));

const List: React.FC = () => {
  const { data } = useCourses();

  return (
    <Row className="g-4">
      {data &&
        data.results.slice(0, 12).map((course) => (
          <Col key={course.id} md={4}>
            <React.Suspense
              fallback={Array.from({ length: 12 }).map((_, i) => (
                <ItemSkeleton key={i} />
              ))}
            >
              <Item {...course} />
            </React.Suspense>
          </Col>
        ))}
    </Row>
  );
};

export default List;
