import { useCourse } from "@/hooks/use-course";
import { useLessons } from "@/hooks/use-lesson";

import React from "react";
import { Accordion, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router";

const Course: React.FC = () => {
  const { slug } = useParams();

  const { data, isLoading } = useCourse(slug);
  const { data: lessons } = useLessons(slug);

  console.log(data);

  return (
    <Container>
      <Row className="align-items-start justify-content-between py-lg-5 py-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          data && (
            <>
              <Col lg={7} md={6}>
                <h1 className="text-primary fw-bold">{data.name}</h1>
                <p
                  dangerouslySetInnerHTML={{
                    __html: data.description.slice(0, 200),
                  }}
                ></p>
                <div className="d-flex gap-2">
                  <p>Start</p>
                  <Link
                    to={`/courses/?category=${data.category}`}
                    className="text-decoration-none"
                  >
                    {data.category}
                  </Link>
                </div>
                <p>
                  Course by: <Link to={"/"}>ZIN</Link>
                </p>

                <div className="py-2">
                  <h3 className="mb-3 text-primary fw-bold">
                    Course Structure
                  </h3>

                  <Accordion defaultActiveKey="0">
                    {lessons?.map((lesson, idx) => (
                      <Accordion.Item key={idx} eventKey={idx.toString()}>
                        <Accordion.Header>
                          <h6 className="mb-0 fw-bold">{lesson.name}</h6>
                        </Accordion.Header>
                        <Accordion.Body></Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>

                <div className="py-3">
                  <h3 className="mb-3 text-primary fw-bold">
                    Course Description
                  </h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: data.description,
                    }}
                  ></p>
                </div>
              </Col>
              <Col lg={5} md={6}>
                <Card>
                  <Card.Img
                    variant="top"
                    src="https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png"
                  />
                  <Card.Body>
                    <div className="d-flex gap-3 align-items-center pt-2 text-warning">
                      <Card.Text className="display-6 fw-bold">
                        $
                        {(
                          data.price -
                          (data.price * data.discount) / 100
                        ).toFixed(2)}
                      </Card.Text>
                      <Card.Text className="text-decoration-line-through">
                        ${data.price}
                      </Card.Text>
                      <Card.Text>{data.discount * 100}% off</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )
        )}
      </Row>
    </Container>
  );
};

export default Course;
