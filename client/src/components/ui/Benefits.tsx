import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { IoIosLink } from "react-icons/io";
import { Link } from "react-router";

const Benefits: React.FC = () => {
  const benefits = [
    {
      id: 1,
      title: "Learn Anytime, Anywhere",
      description:
        "Access courses from any device—laptop, tablet, or smartphone. Study without limits, wherever you are.",
    },
    {
      id: 2,
      title: "Expert Instructors",
      description:
        "Learn from industry experts with years of real-world experience and easy-to-follow teaching methods.",
    },
    {
      id: 3,
      title: "Up-to-date Content",
      description:
        "Courses are regularly updated to match the latest technologies and industry trends.",
    },
    {
      id: 4,
      title: "Completion Certificate",
      description:
        "Earn a certificate after finishing a course to boost your profile and career opportunities.",
    },
    {
      id: 5,
      title: "Learning Community",
      description:
        "Join a vibrant community of learners to discuss, share knowledge, and grow together.",
    },
    {
      id: 6,
      title: "Cost-effective Learning",
      description:
        "Save money on commuting and materials while accessing affordable and high-quality online courses.",
    },
  ];

  return (
    <Row className="pt-2 g-3">
      {benefits.map((item) => (
        <Col key={item.id} md={4}>
          <Card className="px-3">
            <Card.Body>
              <Card.Title className="text-primary text-end fw-bold display-4">
                0{item.id}
              </Card.Title>
              <Card.Subtitle className="text-primary fw-bold mb-2">
                {item.title}
              </Card.Subtitle>
              <Card.Text>{item.description}</Card.Text>
              <Card.Link
                as={Link}
                to={"/about"}
                className="d-block text-end text-muted text-decoration-none"
              >
                <IoIosLink size={24} />
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Benefits;
