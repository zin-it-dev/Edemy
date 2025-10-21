import { Card, Container, Row, Col, Badge, ListGroup, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface CourseOutline {
  topic: string;
  description?: string;
  level: string;
  duration: string;
  video: string;
  chapters: number;
  outline?: {
    title: string;
    description: string;
    lessons?: {
      title: string;
      duration: string;
      hasVideo?: boolean;
    }[];
  }[];
  generatedAt?: string;
}

const GeneratorOutlet = () => {
  const navigate = useNavigate();
  const [courseOutline, setCourseOutline] = useState<CourseOutline | null>(null);

  useEffect(() => {
    const savedOutline = localStorage.getItem('courseOutline');
    if (savedOutline) {
      try {
        setCourseOutline(JSON.parse(savedOutline));
      } catch (error) {
        console.error('Error parsing course outline:', error);
      }
    }
  }, []);

  const handleBackToGenerator = () => {
    navigate('/tutor/generator');
  };

  const handleGenerateNew = () => {
    localStorage.removeItem('courseOutline');
    navigate('/tutor/generator');
  };

  if (!courseOutline) {
    return (
      <Container className="my-5">
        <Card className="shadow-sm">
          <Card.Body className="text-center py-5">
            <h3>No Course Outline Found</h3>
            <p>Please generate a course outline first.</p>
            <Button variant="primary" onClick={handleBackToGenerator}>
              Go to Generator
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Course Outline</h2>
        <div>
          <Button variant="outline-secondary" onClick={handleBackToGenerator} className="me-2">
            ← Back
          </Button>
          <Button variant="primary" onClick={handleGenerateNew}>
            Generate New
          </Button>
        </div>
      </div>

      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">📚 {courseOutline.topic}</h4>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <strong>Level:</strong> 
              <Badge bg="info" className="ms-2">
                {courseOutline.level}
              </Badge>
            </Col>
            <Col md={6}>
              <strong>Duration:</strong> 
              <Badge bg="success" className="ms-2">
                {courseOutline.duration}
              </Badge>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <strong>Video Content:</strong> 
              <Badge bg={courseOutline.video === "Yes" ? "warning" : "secondary"} className="ms-2">
                {courseOutline.video}
              </Badge>
            </Col>
            <Col md={6}>
              <strong>Chapters:</strong> 
              <Badge bg="primary" className="ms-2">
                {courseOutline.chapters}
              </Badge>
            </Col>
          </Row>
          {courseOutline.description && (
            <div className="mt-3">
              <strong>Description:</strong>
              <p className="mt-2">{courseOutline.description}</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Hiển thị chi tiết outline */}
      {courseOutline.outline && courseOutline.outline.length > 0 ? (
        <Card className="shadow-sm">
          <Card.Header className="bg-light">
            <h5 className="mb-0">📋 Course Structure</h5>
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              {courseOutline.outline.map((chapter, index) => (
                <ListGroup.Item key={index} className="px-0 py-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="mb-0">
                      <Badge bg="primary" className="me-2">
                        Chapter {index + 1}
                      </Badge>
                      {chapter.title}
                    </h6>
                  </div>
                  <p className="text-muted mb-3">{chapter.description}</p>
                  
                  {/* Hiển thị lessons nếu có */}
                  {chapter.lessons && chapter.lessons.length > 0 && (
                    <ListGroup variant="flush" className="ms-4">
                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <ListGroup.Item key={lessonIndex} className="px-0 py-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <span>
                              <strong>Lesson {lessonIndex + 1}:</strong> {lesson.title}
                            </span>
                            <div>
                              <Badge bg="outline-secondary" className="me-2">
                                {lesson.duration}
                              </Badge>
                              {lesson.hasVideo && (
                                <Badge bg="danger">Video</Badge>
                              )}
                            </div>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      ) : (
        <Card className="shadow-sm">
          <Card.Body className="text-center py-5">
            <h5>Detailed outline will be generated here</h5>
            <p className="text-muted">
              The course structure and lessons will appear in this section once generated.
            </p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default GeneratorOutlet;