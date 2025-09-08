import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

import Item from "./Item";
import { useCourses } from "@/hooks/use-course";

const List: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useCourses();

  return (
    <section className="py-lg-5 py-4 bg-body-tertiary px-lg-4 px-3 text-center">
      <h2 className="text-primary fw-bold">Learn from the best</h2>
      <p className="mb-4">
        Discover our top-rated courses across various categories. From coding
        and design to business and wellness, our courses are crafted to deliver
        results.
      </p>

      <Row className="text-start gy-4">
        {data?.map((course) => (
          <Col lg={3} md={6} key={course.id}>
            <Item {...course} />
          </Col>
        ))}
      </Row>

      <Button
        className="mt-4"
        variant="outline-primary"
        onClick={() => {
          scrollTo(0, 0);
          navigate("/courses");
        }}
      >
        Show all courses
      </Button>
    </section>
  );
};

export default List;
