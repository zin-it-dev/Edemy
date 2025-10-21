import { Col, Form, Row } from "react-bootstrap";

const Option = () => {
  const options = ["Beginner", "Intermediate", "Advanced"];
  const durations = ["1 Hours", "2 Hours", "More than 3 Hours"];
  const videos = ["Yes", "No"];

  return (
    <>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>🎓 Difficulty Level</Form.Label>
            <Form.Select aria-label="Select">
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>⏰ Duration</Form.Label>
            <Form.Select aria-label="Select">
              {durations.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>🎥 Include Video</Form.Label>
            <Form.Select aria-label="Select">
              {videos.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>📖 No of Chapters</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter number of chapters"
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default Option;
