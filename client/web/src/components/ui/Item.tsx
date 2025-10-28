import { Card, Col } from "react-bootstrap";

import type { Course } from "@/types/course.type";

const Item = (props: Course) => {
  return (
    <Col>
      <Card className="shadow">
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Subtitle></Card.Subtitle>
          <Card.Text dangerouslySetInnerHTML={{ __html: props.description }} />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Item;
