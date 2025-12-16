import { Card } from "react-bootstrap";
import { Link } from "react-router";

export type CourseProps = {
  slug: string;
  name: string;
  price: string | number;
  description: string;
};

const Item = ({ slug, name, price, description }: CourseProps) => {
  return (
    <Card>
      <Link className="text-decoration-none" to={`/courses/${slug}/`}>
        <Card.Img variant="top" src="holder.js/100px180" alt={name} />
      </Link>
      <Card.Body>
        <Card.Title>
          <Link to={`/courses/${slug}/`} className="text-decoration-none">
            {name}
          </Link>
        </Card.Title>
        <Card.Text className="line-clamp">
          {description}
        </Card.Text>
        <Card.Text>{price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Item;
