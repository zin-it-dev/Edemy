import React from "react";
import { Accordion, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router";
import YouTube, { type YouTubeProps } from "react-youtube";

import { useCourse } from "@/hooks/use-course";
import { useLessons } from "@/hooks/use-lesson";

const Course: React.FC = () => {
  const { slug } = useParams();

  const { data } = useCourse(slug);
  const { data: lessons } = useLessons(slug);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
  };

  return (
    <section className="py-4 mb-3">
      <Row>
        {data && (
          <>
            <Col lg={7} md={6} className="order-md-0 order-1">
              <Card className="border-0">
                <Card.Body>
                  <Card.Title className="text-primary fw-bold">
                    Lessons
                  </Card.Title>
                  <Card.Text>{data.description}</Card.Text>

                  <Accordion defaultActiveKey="0">
                    {lessons?.map((les, idx) => (
                      <Accordion.Item key={idx} eventKey={idx.toString()}>
                        <Accordion.Header>Lesson #{les.id}</Accordion.Header>
                        <Accordion.Body>
                          <div className="ratio ratio-16x9">
                            <YouTube
                              videoId="2g811Eo7K8U"
                              onReady={onPlayerReady}
                              opts={opts}
                              className="w-100 h-100 rounded"
                            />
                          </div>

                          <Card className="border-0 p-0">
                            <Card.Body>
                              <Card.Title className="text-black fw-bold">
                                {les.name}
                              </Card.Title>
                              <Card.Text
                                className="text-muted fst-italic"
                                dangerouslySetInnerHTML={{
                                  __html: les.content.slice(0, 200),
                                }}
                              ></Card.Text>

                              <ListGroup className="list-group-flush">
                                <ListGroup.Item as={Link} to={"/"}>
                                  Cras justo odio
                                </ListGroup.Item>
                              </ListGroup>
                            </Card.Body>
                          </Card>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={5} md={6} className="order-0">
              <Card className="border-0 shadow-sm">
                <Card.Img
                  variant="top"
                  className="p-4 rounded-5"
                  src="https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png"
                />
                <Card.Body>
                  <Card.Title className="text-primary fw-bold">
                    {data.name}
                  </Card.Title>
                  <Card.Text
                    dangerouslySetInnerHTML={{
                      __html: data.description.slice(0, 200),
                    }}
                  ></Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </section>
  );
};

export default Course;
