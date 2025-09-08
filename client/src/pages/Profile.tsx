import Avatar from "@/components/ui/Avatar";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import {
  Accordion,
  Col,
  ListGroup,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";

const Profile: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user, isAuthenticated } = useAuth0();

  return (
    <>
      <NavDropdown.Item onClick={handleShow}>Profile</NavDropdown.Item>

      {isAuthenticated && user && (
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="d-flex gap-2">
              <Avatar url={user.picture} title={user.nickname} size={30} />
              <Col>
                <h6 className="mb-0">
                  {user.given_name} {user.family_name}
                </h6>
                <p className="fs-6 fw-light mb-0">{user.email}</p>
              </Col>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Infomation</Accordion.Header>
                <Accordion.Body>
                  <ListGroup as="ol">
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="me-auto">
                        <div className="fw-bold">Full name</div>
                        {user.given_name} {user.family_name}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="me-auto">
                        <div className="fw-bold">Username</div>
                        {user.nickname}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="me-auto">
                        <div className="fw-bold">Email</div>
                        {user.email}
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>My Courses</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Offcanvas.Body>
        </Offcanvas>
      )}
    </>
  );
};

export default Profile;
