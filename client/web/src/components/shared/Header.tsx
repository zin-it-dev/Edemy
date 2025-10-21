import React from "react";
import { NavLink } from "react-router";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useAuth } from "@clerk/clerk-react";

import Logo from "../ui/Logo";
import AuthMenu from "./AuthMenu";

const Header: React.FC = () => {
  const { isSignedIn } = useAuth();

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to={isSignedIn ? '/dashboard' : '/'} className="fw-bold logo">
          <Logo size={30} />
        </Navbar.Brand>
        <Nav className="ms-auto">
          <AuthMenu /> 
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
