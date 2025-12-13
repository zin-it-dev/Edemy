import { Badge, Col, Container } from "react-bootstrap";

import Search from "./Search";

const Hero = () => {
  return (
    <section className="bg-dark py-5">
      <Container className="py-5">
        <Col lg={8} className="mx-auto text-center">
          <h1 className="display-4 fw-bold">
            An <span className="text-primary">intelligent</span> online learning
            platform
            <strong className="text-primary">
              {" "}
              powered by{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #EA39B8, #6610f2)",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                AI Powered
              </span>
            </strong>{" "}
            🔖
          </h1>
          <p className="lead text-muted mt-3">
            Learn smarter with personalized paths, a 24/7 AI tutor, hundreds of
            premium courses, and your own AI companion for every topic.
          </p>

          <Search
            styles="mt-4"
            group={{
              size: "lg",
            }}
            control={{
              placeholder: "Search courses, skills, or topics...",
            }}
          />

          <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
            {[
              "🎓 300+ Courses",
              "🤖 AI Tutor 24/7",
              "⭐ Personalized Paths",
              " 🏆 Certificates",
            ].map((item, index) => (
              <Badge
                key={index}
                bg="secondary"
                className="px-3 py-2 small rounded shadow-sm"
              >
                {item}
              </Badge>
            ))}
          </div>
        </Col>
      </Container>
    </section>
  );
};

export default Hero;
