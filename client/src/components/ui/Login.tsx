import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Nav } from "react-bootstrap";
import { IoPersonOutline } from "react-icons/io5";

const Login: React.FC = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <Nav.Link onClick={() => loginWithPopup()}>
      <IoPersonOutline size={24} />
    </Nav.Link>
  );
};

export default Login;
