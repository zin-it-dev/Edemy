import React from "react";
import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

import { assets } from "@/libs/constants/assets";
import useCurrentUser from "@/hooks/use-current-user";
import useTheme from "@/hooks/use-theme";
import Profile from "@/pages/Profile";
import Login from "../ui/Login";
import Logout from "../ui/Logout";
import Avatar from "../ui/Avatar";
import ThemeToggle from "../ui/ThemeToggle";

const Header: React.FC = () => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth0();
  const user = useCurrentUser();

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg={theme}
      variant={theme}
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand as={NavLink} to={"/"} className="fw-semibold">
          <Image
            alt=""
            src={assets.logo}
            width="40"
            height="40"
            className="d-inline-block"
          />{" "}
          Edemy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            <NavDropdown title="Categories" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="align-items-lg-center">
            {isAuthenticated && user ? (
              <NavDropdown
                title={
                  <Avatar url={user.picture} title={user.username} size={30} />
                }
                id="collapsible-nav-dropdown"
              >
                <Profile />
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <Logout />
              </NavDropdown>
            ) : (
              <Login />
            )}
            <ThemeToggle className="d-lg-block d-none" size={24} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
