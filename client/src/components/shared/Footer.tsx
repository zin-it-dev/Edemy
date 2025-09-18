import React from "react";
import { Col, Container, Image, Nav, Row } from "react-bootstrap";
import {
  FaBook,
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaHeart,
  FaHome,
  FaInfoCircle,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Link, NavLink } from "react-router";

import { assets } from "@/libs/constants/assets";

const Footer: React.FC = () => {
  const menu = [
    { path: "/", title: "Home", icon: <FaHome className="me-2" /> },
    { path: "/courses", title: "Courses", icon: <FaBook className="me-2" /> },
    {
      path: "/about",
      title: "About Us",
      icon: <FaInfoCircle className="me-2" />,
    },
    {
      path: "/contact",
      title: "Contact",
      icon: <FaEnvelope className="me-2" />,
    },
  ];

  const socialLinks = [
    {
      icon: <FaGithub size={24} />,
      url: "https://github.com/zin-it-dev/",
      name: "GitHub",
    },
    { icon: <FaFacebook size={24} />, url: "#", name: "Facebook" },
    { icon: <FaLinkedin size={24} />, url: "#", name: "LinkedIn" },
    { icon: <FaInstagram size={24} />, url: "#", name: "Instagram" },
  ];

  return (
    <footer
      className="text-white text-lg-start text-md-start mt-auto"
      style={{ backgroundColor: "rgb(17 24 39 / var(--tw-bg-opacity, 1))" }}
    >
      <Container className="pt-5 px-2">
        <Row className="g-4">
          <Col lg={6} md={6} xs={12} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <Image
                alt="Edemy Logo"
                src={assets.logo}
                width="40"
                height="40"
                className="d-inline-block me-2 rounded-circle bg-white p-1"
              />
              <h3 className="text-white fw-bold mb-0">Edemy</h3>
            </div>
            <p className="text-light mb-4 text-start">
              Edemy provides high-quality educational content to help you
              advance your career and expand your knowledge. Learn from industry
              experts and join our community of learners.
            </p>
            <div className="d-flex gap-3">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  to={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white fs-5 opacity-75 hover-opacity-100"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </Col>

          <Col md={3} xs={6} className="mb-4">
            <h5 className="text-white fw-bold mb-3">Company</h5>
            <Nav as={"ul"} className="flex-column">
              {menu.map((item) => (
                <li key={item.path} className="nav-item mb-2">
                  <Nav.Link
                    as={NavLink}
                    to={item.path}
                    className="text-white p-0 opacity-75 hover-opacity-100 d-flex align-items-center"
                  >
                    {item.icon}
                    {item.title}
                  </Nav.Link>
                </li>
              ))}
            </Nav>
          </Col>

          <Col md={3} xs={6} className="mb-4">
            <h5 className="text-white fw-bold mb-3">Support</h5>
            <Nav as="ul" className="flex-column">
              <li className="nav-item mb-2">
                <Nav.Link
                  href="#"
                  className="p-0 text-light opacity-75 hover-opacity-100"
                >
                  Help Center
                </Nav.Link>
              </li>
              <li className="nav-item mb-2">
                <Nav.Link
                  href="#"
                  className="p-0 text-light opacity-75 hover-opacity-100"
                >
                  FAQ
                </Nav.Link>
              </li>
              <li className="nav-item mb-2">
                <Nav.Link
                  href="#"
                  className="p-0 text-light opacity-75 hover-opacity-100"
                >
                  Contact
                </Nav.Link>
              </li>
              <li className="nav-item mb-2">
                <Nav.Link
                  href="#"
                  className="p-0 text-light opacity-75 hover-opacity-100"
                >
                  Privacy Policy
                </Nav.Link>
              </li>
            </Nav>
          </Col>
        </Row>

        <hr className="my-4 opacity-25 bg-white" />

        <Row className="align-items-center pb-3 ">
          <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
            <p className="mb-0 opacity-75">
              &copy; {new Date().getFullYear()} Edemy. Made with{" "}
              <FaHeart className="text-danger mx-1" /> by{" "}
              <Link
                className="text-decoration-none fw-semibold hover-opacity-100"
                to="https://github.com/zin-it-dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                ZIN
              </Link>
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <span className="opacity-75">All rights reserved.</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
