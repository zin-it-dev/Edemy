import React from "react";
import { NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router";

import useCategory from "@/hooks/use-category";

const Categories: React.FC = () => {
  const { data } = useCategory();

  return (
    <NavDropdown title="Categories" id="courses-nav-dropdown">
      {data?.map((cat) => (
        <NavDropdown.Item
          key={cat.id}
          as={NavLink}
          to={`/courses/?category=${cat.slug}`}
        >
          {cat.name}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

export default Categories;
