import { useState } from "react";
import { Form } from "react-bootstrap";
import { useSearchParams } from "react-router";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialKeyword = searchParams.get("search") || "";
  const [keyword, setKeyword] = useState(initialKeyword);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    const newParams = Object.fromEntries(searchParams.entries());
    
    if (newKeyword) {
      newParams.search = newKeyword;
    } else {
      delete newParams.search;
    }

    setSearchParams(newParams);
  };

  return (
    <Form.Control
      type="search"
      placeholder="Search"
      aria-label="Search"
      name={"search"}
      value={keyword}
      onChange={handleSearch}
    />
  );
};

export default Search;
