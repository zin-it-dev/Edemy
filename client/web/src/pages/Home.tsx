import CourseContainer from "@/components/containers/CourseContainer";
import Hero from "@/components/ui/Hero";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router";

const Home = () => {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Popular courses */}
      <Container as={"section"} className="py-5">
        <Row className="mb-4 align-items-center">
          <Col xs={7}>
            <h2 className="fw-bold">Popular Courses</h2>
            <p className="text-info">
              Explore high-quality courses crafted by our instructor team
            </p>
          </Col>
          <Col className="text-end">
            <Link to="/courses/" className="btn btn-sm btn-outline-primary">
              See All
            </Link>
          </Col>
        </Row>

        {/* Course List */}
        <CourseContainer limit="6" pagination={false} />
      </Container>
    </>
  );
};

export default Home;
