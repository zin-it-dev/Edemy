import React from "react";
import { Card, Placeholder } from "react-bootstrap";
import { Link } from "react-router";

import type { Course } from "@/types/course.type";

const Item: React.FC<Course> = (props: Course) => {
  return (
    <Link
      className="text-decoration-none"
      to={`/courses/${props.slug}`}
      onClick={() => scrollTo(0, 0)}
    >
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="text-primary fw-bold">{props.name}</Card.Title>
          <Card.Text
            dangerouslySetInnerHTML={{
              __html: props.description.slice(0, 80),
            }}
          ></Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export const ItemSkeleton: React.FC = () => {
  return (
    <Card>
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};

export default Item;
