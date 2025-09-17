import useCategory from "@/hooks/use-category";
import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router";

const Navigation: React.FC = () => {
  const { data } = useCategory();

  return (
    <NavDropdown title="Categories" id="collapsible-nav-dropdown">
      {data?.map((cat) => (
        <NavDropdown.Item
          key={cat.id}
          as={Link}
          to={`/courses/?category=${cat.slug}`}
        >
          {cat.name}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

export default Navigation;
