import Item from "@/components/ui/Item";
import Paginator from "@/components/ui/Paginator";
import Search from "@/components/ui/Search";
import { useCourses } from "@/hooks/use-course";

import React from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const Courses: React.FC = () => {
  const { data } = useCourses();
  const navigate = useNavigate();

  return (
    <Container as={"section"}>
      <div className="d-flex flex-column flex-lg-row flex-md-row gap-3 align-items-center justify-content-between py-3">
        <div className="text-center text-lg-start">
          <h3>Courses</h3>
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => navigate("/")}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item active={true}>Courses</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Search />
      </div>

      {data && data.results.length > 0 ? (
        <Row className="text-start gy-4 py-3">
          {data.results.map((course) => (
            <Col lg={3} md={6} key={course.id}>
              <Item {...course} />
            </Col>
          ))}

          <Paginator count={data.count} page_size={data.page_size} />
        </Row>
      ) : (
        <div className="text-center py-5">
          <h5 className="text-muted">No courses found</h5>
          <p>Please try searching with a different keyword.</p>
        </div>
      )}
    </Container>
  );
};

export default Courses;
