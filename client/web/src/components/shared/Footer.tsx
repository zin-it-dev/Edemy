import React, { type ComponentType } from "react";
import { Col, Nav } from "react-bootstrap";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

import Logo from "../ui/Logo";

type Social = {
  url: string;
  icon: ComponentType<any>;
};

const Footer: React.FC = () => {
  const socials: Social[] = [
    {
      url: "https://www.facebook.com/zin.it.dev",
      icon: FaFacebookF,
    },
    {
      url: "https://www.instagram.com/zin.0.1.0.4",
      icon: FaInstagram,
    },
  ];

  return (
    <footer className="container d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <Col md={4} class="d-flex align-items-center">
        <Link to="/" className="text-body-secondary text-decoration-none lh-1">
          <Logo size={30} />
        </Link>
        <span className="text-body-secondary">
          &copy; {new Date().getFullYear()}
        </span>
      </Col>
      <Nav className="col-md-4 justify-content-end list-unstyled d-flex">
        {socials.map((social) => (
          <li key={social.url} className="ms-3">
            <Link
              className="text-body-secondary"
              to={social.url}
              target="_blank"
            >
              <social.icon size={20} />
            </Link>
          </li>
        ))}
        <li className="ms-3">
          <Link
            target="_blank"
            to={"https://github.com/zin-it-dev/Edemy/issues"}
            className="fw-bold"
          >
            Support
          </Link>
        </li>
      </Nav>
    </footer>
  );
};

export default Footer;
