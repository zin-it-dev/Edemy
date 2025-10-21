import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router";

import Logo from "../ui/Logo";
import AuthMenu from "./AuthMenu";

const DashboardHeader: React.FC = () => {
  return (
    <Navbar as={"header"} expand="lg" bg="primary" variant="dark" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to={"/dashboard"} className="fw-bold logo">
          <Logo size={30} />
        </Navbar.Brand>
        <Nav className="ms-auto">
          <AuthMenu />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default DashboardHeader;
