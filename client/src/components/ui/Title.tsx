import { Col } from "react-bootstrap";

type TitleProps = {
  subject: string;
  description: string;
};

const Title = (props: TitleProps) => {
  return (
    <Col lg={10} md={12}>
      <h2 className="fw-bold text-body-emphasis">{props.subject}</h2>
      <p>{props.description}</p>
    </Col>
  );
};

export default Title;
