import React from "react";
import { useAuth, useClerk, UserButton } from "@clerk/clerk-react";
import { NavLink, useNavigate } from "react-router";
import { HiMiniTicket, HiMiniUser } from "react-icons/hi2";

const Header: React.FC = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <header>
      <ul>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>

        <li>
          <NavLink to={"/generate"}>Generate</NavLink>
        </li>
      </ul>

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
              label="Learning"
              labelIcon={<HiMiniTicket />}
              onClick={() => navigate("/learing/courses")}
            />
          </UserButton.MenuItems>
        </UserButton>
      ) : (
        <button onClick={() => openSignIn()}>
          <HiMiniUser size={24} />
        </button>
      )}
    </header>
  );
};

export default Header;
