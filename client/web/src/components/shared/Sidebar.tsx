import React from "react";
import { Button, Card, Nav, ProgressBar } from "react-bootstrap";
import {
  HiOutlineHome,
  HiOutlineShieldCheck,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";
import { NavLink } from "react-router";

import Logo from "../ui/Logo";

const Sidebar: React.FC = () => {
  const menu = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <HiOutlineHome size={20} />,
    },
    {
      path: "/dashboard/explore",
      name: "Explore",
      icon: <HiOutlineSquare3Stack3D size={20} />,
    }
  ];

  return (
    <div
      className="d-flex flex-column justify-content-between border-end bg-dark vh-100"
      style={{
        width: "18rem",
        minWidth: "15rem",
      }}
    >
      <div className="p-3">
        <NavLink
          className="mb-4 fw-bold logo text-decoration-none d-block"
          to={"/dashboard"}
        >
          <Logo size={30} />
        </NavLink>

        <Nav className="flex-column gap-3">
          {menu.map((item, index) => (
            <Nav.Link
              to={item.path}
              key={index}
              as={NavLink}
              className="d-flex align-items-center gap-2"
            >
              {item.icon} {item.name}
            </Nav.Link>
          ))}
        </Nav>
      </div>

      <div className="sticky-bottom">
         <Card bg="dark" className="text-dark shadow">
          <Card.Body className="p-3">    
            <h2 className="small mb-2">3 Out of 5 Course created</h2>
            <h3 className="small text-muted">Upgrade your plan for unlimted course generate</h3>
            <ProgressBar 
              now={33} 
              variant="success" 
              className="mb-3"
              animated
            />

            <Button 
              variant="primary" 
              size="sm" 
              className="fw-bold d-flex align-items-center justify-content-center gap-2 w-100 text-warning"
            >
              <HiOutlineShieldCheck size={20} /> Upgrade to Pro
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Sidebar;
