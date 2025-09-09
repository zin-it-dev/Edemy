import React from "react";
import { Button, Form } from "react-bootstrap";

const Search: React.FC = () => {
  return (
    <div>
      <Form className="d-flex align-items-center rounded">
        <Form.Control
          size="lg"
          className="w-100"
          type="search"
          placeholder="Search for courses"
          aria-label="Search for courses"
        />
        <Button size="lg" variant="primary">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default Search;
