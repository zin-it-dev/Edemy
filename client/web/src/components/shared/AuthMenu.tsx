import { useAuth, useClerk, UserButton } from "@clerk/clerk-react";
import { Nav } from "react-bootstrap";
import { HiMiniTicket, HiMiniUser } from "react-icons/hi2";
import { useNavigate } from "react-router";

const AuthMenu = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {isSignedIn ? (
        <UserButton
          appearance={{
            elements: {
              userButtonTrigger: "shadow-none",
            },
          }}
        >
          <UserButton.MenuItems>
            <UserButton.Action
              label="Courses"
              labelIcon={<HiMiniTicket />}
              onClick={() => navigate("/learing/courses")}
            />
          </UserButton.MenuItems>
        </UserButton>
      ) : (
        <Nav.Link
          onClick={() =>
            openSignIn({
              redirectUrl: "/dashboard",
            })
          }
        >
          <HiMiniUser size={24} />
        </Nav.Link>
      )}
    </>
  );
};

export default AuthMenu;
