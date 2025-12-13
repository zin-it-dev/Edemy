import { Button, Card } from "react-bootstrap";

export type CourseProps = {
  slug: string;
  name: string;
  price: string | number;
};

const Item = ({ name, price }: CourseProps) => {
  return (
    <Card>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text className="line-clamp">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Text>{price}</Card.Text>
        <Button variant="primary">Learn now</Button>
      </Card.Body>
    </Card>
  );
};

export default Item;
