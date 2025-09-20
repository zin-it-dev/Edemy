import React from "react";
import { Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="fw-bold py-lg-5 py-md-5 py-4 px-lg-4 px-md-4 px-3 text-lg-center text-md-center">
      <div className="my-lg-5 my-3">
        <h1 className="display-5 fw-bold text-body-emphasis">
          Empower your future with the courses designed to{" "}
          <span className="text-primary">fit your choice.</span>
        </h1>
        <Col lg={6} className="mx-auto">
          <p className="lead">
            We bring together world-class instructors, interactive content, and
            a supportive community to help you achieve your personal and
            professional goals.
          </p>
          <div className="d-flex gap-2 justify-content-center">
            <Button
              onClick={() => navigate("/courses")}
              className="p-lg-2 py-2 px-3"
              variant="primary"
            >
              Explore Courses
            </Button>
            <Button className="p-lg-2 py-2 px-3" variant="warning">
              View Pricing
            </Button>
          </div>
        </Col>
      </div>
    </section>
  );
};

export default Hero;
