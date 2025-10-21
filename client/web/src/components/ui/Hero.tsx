import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function Hero() {
  return (
    <section className="bg-dark d-flex align-items-center py-3 justify-content-center">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={6} className="text-center">
            <h1 className="display-4 fw-bold text-light">
              AI Course Generator
            </h1>
            <p className="display-5 lead text-primary fw-bold">Custom Learning Paths, Powered by AI</p>

            <p className="mt-4 lead text-muted">
             Unlock personalized learning journeys with our AI-driven course generator. Tailored your learning journey to fit your unique goals and interests.
            </p>

            <div className="mt-4 d-flex justify-content-center gap-3">
              <Button variant="outline-light" size="lg" href="#" className="shadow">
                Get Started
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
