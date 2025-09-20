import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { createSearchParams, useNavigate, useSearchParams } from "react-router";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialKeyword = searchParams.get("search") || "";
  const [keyword, setKeyword] = useState(initialKeyword);

  useEffect(() => {
    setKeyword(initialKeyword);
  }, [initialKeyword]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate({
      pathname: "/courses/",
      search: createSearchParams({ search: keyword }).toString(),
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if (e.target.value === "") {
      navigate("/courses");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={"d-flex rounded"}>
      <Form.Control
        type="search"
        placeholder="Search for courses"
        aria-label="Search for courses"
        name={"search"}
        value={keyword}
        onChange={handleSearch}
      />
    </Form>
  );
};

export default Search;
