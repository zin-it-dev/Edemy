import Item from "@/components/ui/Item";
import Paginator from "@/components/ui/Paginator";
import { useCourses } from "@/hooks/use-course";

import React from "react";
import { Col, Row } from "react-bootstrap";

const Courses: React.FC = () => {
  const { data } = useCourses();

  return (
    <div className="container">
      <h3>Courses</h3>

      {data ? (
        <Row className="text-start gy-4">
          {data.results.map((course) => (
            <Col lg={3} md={6} key={course.id}>
              <Item {...course} />
            </Col>
          ))}

          <Paginator count={data.count} page_size={data.page_size} />
        </Row>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default Courses;
