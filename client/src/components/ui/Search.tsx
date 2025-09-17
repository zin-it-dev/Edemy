import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router";

type Size = "lg" | "sm";

const Search = ({
  size = "lg",
  className,
}: {
  className?: string;
  size?: Size;
}) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate({
      pathname: "/courses/",
      search: createSearchParams({ search: keyword }).toString(),
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className={`d-flex align-items-center rounded ${className}`}
    >
      <Form.Control
        size={size}
        className="w-100"
        type="search"
        placeholder="Search for courses"
        aria-label="Search for courses"
        name={"search"}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button size={size} type="submit" variant="primary">
        Search
      </Button>
    </Form>
  );
};

export default Search;
