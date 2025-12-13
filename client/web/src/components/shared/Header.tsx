import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, NavLink } from "react-router";

import Search from "../ui/Search";
import Account from "../ui/Account";

const Header = () => {
  const expand: string = "sm" as const;

  return (
    <Navbar
      className={"small"}
      as={"header"}
      expand={expand}
      bg={"dark"}
      variant="dark"
    >
      <Container>
        {/* Brand */}
        <Navbar.Brand
          as={Link}
          to={"/"}
          className="fs-4 fw-bold text-uppercase playfair text-muted text-shadow"
        >
          Edemy 🎓
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-2">
          <Account
            styles="d-sm-none"
            sizes={{
              size: "sm",
            }}
          />
          {/* Toggle */}
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        </div>

        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              className="playfair text-shadow text-uppercase"
              id={`offcanvasNavbarLabel-expand-${expand}`}
            >
              Edemy 🎓
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* Search */}
            <Search
              styles="d-sm-none mb-1"
              control={{
                placeholder: "Search courses, skills, or topics...",
              }}
            />

            {/* Navbar */}
            <Nav className="ms-auto gap-3">
              <Nav.Item>
                <Nav.Link as={NavLink} to={"/"}>
                  Courses
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to={"/about"}>
                  About Us
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to={"/pricing"}>
                  Pricing
                </Nav.Link>
              </Nav.Item>
            </Nav>

            {/* Login */}
            <Account styles="ms-md-3 d-none d-sm-block" sizes={{ size: "sm" }} />
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
