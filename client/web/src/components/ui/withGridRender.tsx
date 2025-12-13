import React from "react";
import { Col, Row, type RowProps } from "react-bootstrap";

interface WithGridRenderProps<T> {
  data?: T[];
  gird?: {
    sizes: RowProps;
    styles?: string;
  };
}

function withGridRender<T extends object = any>(
  Component: React.ComponentType<T>
) {
  return function ({
    data = [],
    gird
  }: WithGridRenderProps<T>): React.JSX.Element {
    if (!data || data.length === 0) {
      return (
        <div className="text-center">
          <h5 className="fw-bold">No courses found.</h5>
          <p className="text-info">
            Try a different search or check back later.
          </p>
        </div>
      );
    }

    return (
      <>
        <Row {...gird?.sizes} className={gird?.styles}>
          {data.map((item: T, index: React.Key) => (
            <Col key={index}>
              <Component {...(item as T)} />
            </Col>
          ))}
        </Row>
      </>
    );
  };
}

export default withGridRender;
