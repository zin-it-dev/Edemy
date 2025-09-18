import Item from "@/components/ui/Item";
import Paginator from "@/components/ui/Paginator";
import { useCourses } from "@/hooks/use-course";

import React from "react";
import { Alert, Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";

const Courses: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const { data, isLoading } = useCourses();
  const navigate = useNavigate();

  return (
    <Container as={"section"} className="py-4">
      <Row className="align-items-center">
        <Col md={6} className="mb-3 mb-md-0">
          <h1 className="text-primary fw-bold mb-2">Our Courses</h1>
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => navigate("/")}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Courses</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      {searchQuery && (
        <Alert variant="info" className="mb-4">
          Search results for: <strong>"{searchQuery}"</strong>
          {data && <span className="ms-2">({data.count} found)</span>}
        </Alert>
      )}

      {isLoading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading courses...</p>
        </div>
      )}

      {!isLoading && data && (
        <>
          {data.results.length > 0 ? (
            <>
              <Row className="gy-4">
                {data.results.map((course) => (
                  <Col key={course.id} xl={3} lg={4} md={6}>
                    <Item {...course} />
                  </Col>
                ))}
              </Row>

              <div className="mt-5">
                <Paginator count={data.count} page_size={data.page_size} />
              </div>
            </>
          ) : (
            <div className="text-center py-5">
              <div className="mb-4">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="#6c757d"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h5 className="text-muted">No courses found</h5>
              <p className="text-muted">
                {searchQuery
                  ? "Try adjusting your search terms or browse all courses."
                  : "We're adding new courses regularly. Check back soon!"}
              </p>
              {searchQuery && (
                <button
                  className="btn btn-outline-primary mt-2"
                  onClick={() => navigate("/courses")}
                >
                  Browse All Courses
                </button>
              )}
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Courses;
