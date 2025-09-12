import { assets } from "@/libs/constants/assets";
import React from "react";
import { Button, Col, Container, Form, Image, Nav, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router";

const Footer: React.FC = () => {
  const menu = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/courses",
      title: "Courses",
    },
    {
      path: "https://github.com/zin-it-dev/",
      title: "Contact us",
    },
  ];

  return (
    <footer
      className="text-white text-center text-lg-start text-md-start"
      style={{ backgroundColor: "rgb(17 24 39 / var(--tw-bg-opacity, 1))" }}
    >
      <Container>
        <Row className="pt-lg-5 pt-md-5 pb-lg-4 pb-md-4 py-4">
          <Col md={3} xs={12} className="mb-3">
            <h2 className="text-primary fw-bold">
              <Image
                alt=""
                src={assets.logo}
                width="40"
                height="40"
                className="d-inline-block"
              />{" "}
              Edemy
            </h2>
            <p className="col-lg-10 col-12">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
            </p>
          </Col>
          <Col md={3} xs={12} className="mb-3">
            <h5 className="text-primary fw-bold">Company</h5>
            <Nav as={"ul"} className="flex-column">
              {menu.map((item) => (
                <li key={item.path} className="nav-item mb-2">
                  <Nav.Link
                    as={NavLink}
                    to={item.path}
                    className="p-0 text-body-secondary"
                  >
                    {item.title}
                  </Nav.Link>
                </li>
              ))}
            </Nav>
          </Col>

          <Col md={5} className="offset-md-1 d-none d-md-block d-lg-block">
            <Form>
              <h5 className="text-primary fw-bold">
                Subscribe to our newsletter
              </h5>
              <p>
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <Form.Group className="d-flex">
                <Form.Control
                  className="w-75 me-2"
                  placeholder="Email address"
                />
                <Button size={"sm"}>Subscribe</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <div className="text-center py-2 border-top">
          <p className="mb-0 fs-6 py-2">
            &copy; {new Date().getFullYear()}{" "}
            <Link
              className="text-decoration-none fw-bold"
              to={"https://github.com/zin-it-dev/"}
              target="_blank"
            >
              ZIN
            </Link>
            , Inc. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
