import React from "react";
import { Col, Row } from "react-bootstrap";

import { useCourses } from "@/hooks/use-course";
import Item from "./Item";

const List: React.FC = () => {
  const { data } = useCourses();

  return (
    <Row className="pt-2 g-4">
      {data?.results.map((course) => (
        <Col key={course.id} md={4}>
          <Item {...course} />
        </Col>
      ))}
    </Row>
  );
};

export default List;
