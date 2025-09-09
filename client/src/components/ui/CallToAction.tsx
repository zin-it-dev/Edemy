import React from "react";
import { Button, Col, Container } from "react-bootstrap";

const CallToAction: React.FC = () => {
  return (
    <Container as={"section"} className="py-5 px-lg-4 px-4 text-center">
      <Col>
        <h2 className="fw-bold">Learn anything, anytime, anywhere</h2>
        <p className="mb-4">
          Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim
          id veniam aliqua proident excepteur commodo do ea.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-lg-0 mb-md-0 mb-3">
          <Button className="gap-3">Get started</Button>
          <Button variant="outline-primary">Learn more</Button>
        </div>
      </Col>
    </Container>
  );
};

export default CallToAction;
