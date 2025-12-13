import React, { useState } from "react";
import {
  Form,
  InputGroup,
  type FormControlProps,
  type InputGroupProps,
} from "react-bootstrap";
import { useNavigate } from "react-router";

type ControlProps = FormControlProps & {
  placeholder: string;
};

type SearchProps = {
  styles?: string;
  group?: InputGroupProps;
  control?: ControlProps;
};

const Search = ({ styles, group, control }: SearchProps) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    navigate(`/courses/?search=${encodeURIComponent(keyword.trim())}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setKeyword(e.target.value);
  }

  return (
    <Form className={styles} role="search" onSubmit={handleSubmit}>
      <InputGroup {...group}>
        <Form.Control
          {...control}
          type="search"
          placeholder={control?.placeholder}
          aria-label={control?.placeholder}
          required
          name={"search"}
          value={keyword}
          onChange={handleSearch}
        />
      </InputGroup>
    </Form>
  );
};

export default Search;
