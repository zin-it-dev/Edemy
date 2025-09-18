import React from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";

const Pricings: React.FC = () => {
  const pricings = [
    {
      id: 1,
      name: "Free Plan",
      price: 0,
      features: [
        "Access to free courses",
        "Community support",
        "Basic progress tracking",
        "Team analytics dashboard",
      ],
      buttonText: "Get Started",
    },
    {
      id: 2,
      name: "Pro Plan",
      price: 19,
      features: [
        "Unlimited access to all courses",
        "Downloadable resources",
        "Certificates of completion",
        "Priority support",
      ],
      buttonText: "Upgrade Now",
    },
  ];

  return (
    <Row className="pt-2 pb-4 g-5">
      {pricings.map((item) => (
        <Col key={item.id} md={6} xs={12}>
          <Card className="rounded-3 shadow-sm text-black">
            <Card.Header className="text-center">{item.name}</Card.Header>
            <Card.Body>
              <Card.Title className="text-black fw-bold text-center fs-1">
                ${item.price}
                <small className="text-body-secondary fw-light">/mo</small>
              </Card.Title>
              <ListGroup variant="flush">
                {item.features.map((feature, idx) => (
                  <ListGroup.Item key={idx}>{feature}</ListGroup.Item>
                ))}
              </ListGroup>
              <Button className="w-100" variant="primary">
                {item.buttonText}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Pricings;
