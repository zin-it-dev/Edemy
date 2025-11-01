import React from "react";
import { Card, Col, Row } from "react-bootstrap";

import type { FeatureType } from "@/types/data.type";
import { features } from "@/utils/constants";

const Feature = (feat: FeatureType) => {
  return (
    <Col>
      <Card className="border-primary">
        <div className={"mx-auto mt-3"}>
          <feat.icon size={35} />
        </div>
        <Card.Body>
          <Card.Title className="text-uppercase text-center">{feat.title}</Card.Title>
          <Card.Text
            className="fst-italic"
            dangerouslySetInnerHTML={{ __html: feat.description }}
          />
          <Card.Subtitle>{feat.benefit}</Card.Subtitle>
        </Card.Body>
      </Card>
    </Col>
  );
};

const Features: React.FC = () => {
  return (
    <Row xs={1} md={3} className="g-4 mt-2" as="section">
      {features.map((feat) => (
        <Feature key={feat.title} {...feat} />
      ))}
    </Row>
  );
};

export default Features;
