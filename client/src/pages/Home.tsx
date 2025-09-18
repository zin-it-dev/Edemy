import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

import Companies from "@/components/ui/Companies";
import Hero from "@/components/ui/Hero";
import Title from "@/components/ui/Title";
import Benefits from "@/components/ui/Benefits";
import List from "@/components/ui/List";
import Pricings from "@/components/ui/Pricings";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Hero />
      <Companies />

      <section className="py-4">
        <Row className="pb-4 align-items-center">
          <Col md={10} xs={12}>
            <Title
              subject="Benefits"
              description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
              inventore, architecto vero dolore dolorum veniam cumque!"
            />
          </Col>
        </Row>

        <Benefits />
      </section>

      <section className="py-4">
        <Row className="pb-4 align-items-center">
          <Col md={10} xs={12}>
            <Title
              subject="Our Courses"
              description="Discover our top-rated courses across various categories. From coding
        and design to business and wellness, our courses are crafted to deliver
        results."
            />
          </Col>
          <Col md={2} xs={12}>
            <Button
              onClick={() => {
                scrollTo(0, 0);
                navigate("/courses");
              }}
            >
              View All
            </Button>
          </Col>
        </Row>

        <List />
      </section>

      <section className="py-4">
        <Row className="pb-4 align-items-center">
          <Col md={10} xs={12}>
            <Title
              subject="Our Pricing"
              description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
              inventore, architecto vero dolore dolorum veniam cumque!"
            />
          </Col>
          <Col md={2} xs={12}>
            <Button>View All</Button>
          </Col>
        </Row>

        <Pricings />
      </section>
    </>
  );
};

export default Home;
