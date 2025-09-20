import Item, { ItemSkeleton } from "@/components/ui/Item";
import Paginator from "@/components/ui/Paginator";
import { useCourses } from "@/hooks/use-course";

import React from "react";
import { Alert, Breadcrumb, Col, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";

const Courses: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const { data } = useCourses();
  const navigate = useNavigate();

  return (
    <section className="py-4">
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

      {data && data.results.length > 0 ? (
        <>
          <Row className="gy-4">
            {data.results.map((course) => (
              <Col key={course.id} xl={3} lg={4} md={6}>
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

          <div className="mt-5">
            <Paginator count={data.count} page_size={data.page_size} />
          </div>
        </>
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">No courses found</p>
        </div>
      )}
    </section>
  );
};

export default Courses;
