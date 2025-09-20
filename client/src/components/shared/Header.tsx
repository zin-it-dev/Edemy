import React from "react";
import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

import { assets } from "@/libs/constants/assets";
import useCurrentUser from "@/hooks/use-current-user";
import useTheme from "@/hooks/use-theme";
import Login from "../ui/Login";
import Logout from "../ui/Logout";
import Avatar from "../ui/Avatar";
import ThemeToggle from "../ui/ThemeToggle";
import Categories from "../ui/Categories";
import Search from "../ui/Search";

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
      sticky="top"
      className="border-bottom"
    >
      <Container>
        <Navbar.Brand
          as={NavLink}
          to={"/"}
          className="fw-bold d-flex align-items-center"
        >
          <Image
            alt="Edemy"
            src={assets.logo}
            width="40"
            height="40"
            loading="lazy"
          />
        </Navbar.Brand>

        <div className="d-flex gap-3 align-items-center">
          <div className="d-lg-none d-md-none d-flex gap-3">
            {isAuthenticated && user ? (
              <NavDropdown
                title={
                  <Avatar
                    src={user.picture}
                    alt={user.username}
                    sizes={{ width: 30, height: 30 }}
                  />
                }
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <Logout />
              </NavDropdown>
            ) : (
              <Login size={30} />
            )}
            <ThemeToggle size={30} />
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </div>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Categories />
            <Nav.Link as={NavLink} to={"/courses"}>
              Courses
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={"https://github.com/zin-it-dev/"}
              target="_blank"
            >
              Support
            </Nav.Link>
          </Nav>

          <Search />

          <Nav className="d-none d-lg-flex">
            {isAuthenticated && user ? (
              <NavDropdown
                title={
                  <Avatar
                    src={user.picture}
                    alt={user.username}
                    sizes={{ width: 30, height: 30 }}
                  />
                }
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <Logout />
              </NavDropdown>
            ) : (
              <>
                <Login size={25} />
              </>
            )}
            <ThemeToggle size={25} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
