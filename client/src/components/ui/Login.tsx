import { useAuth0 } from "@auth0/auth0-react";
import { Nav } from "react-bootstrap";
import { IoPersonOutline } from "react-icons/io5";

const Login = (props: { size: number }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Nav.Link onClick={() => loginWithRedirect()}>
      <IoPersonOutline size={props.size} />
    </Nav.Link>
  );
};

export default Login;
