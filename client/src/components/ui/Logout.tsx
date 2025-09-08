import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavDropdown } from "react-bootstrap";

const Logout: React.FC = () => {
  const { logout } = useAuth0();

  return (
    <NavDropdown.Item
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Sign out
    </NavDropdown.Item>
  );
};

export default Logout;
