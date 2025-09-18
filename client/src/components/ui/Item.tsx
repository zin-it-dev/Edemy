import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router";
// import { CiStar } from "react-icons/ci";

import type { Course } from "@/types/course.type";

const Item: React.FC<Course> = (props: Course) => {
  return (
    <Card>
      <Link
        className="text-decoration-none"
        to={`/courses/${props.slug}`}
        onClick={() => scrollTo(0, 0)}
      >
        <Card.Img
          variant="top"
          style={{
            objectFit: "cover",
          }}
          src="https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png"
        />
      </Link>
      <Card.Body>
        <Card.Title>
          <Link
            className="text-decoration-none fw-bold"
            to={`/courses/${props.id}`}
            onClick={() => scrollTo(0, 0)}
          >
            {props.name}
          </Link>
        </Card.Title>
        <Card.Text
          dangerouslySetInnerHTML={{
            __html: props.description.slice(0, 80),
          }}
        ></Card.Text>
        {/* <div>
          <Card.Text>4.5</Card.Text>
          <div>
            {[...Array(5)].map((_, idx) => (
              <CiStar key={idx} size={24} />
            ))}
          </div>
          <p>22</p>
        </div>
        <Card.Text>$4555</Card.Text> */}
        <Button className="w-100" variant="primary">
          Get it Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Item;
