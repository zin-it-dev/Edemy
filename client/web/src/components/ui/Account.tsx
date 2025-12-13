import { useAuth, useClerk, UserButton } from "@clerk/clerk-react";
import { Button, type ButtonProps } from "react-bootstrap";

type AccountProps = {
  styles?: string;
  sizes?: ButtonProps;
};

const Account = ({ styles, sizes }: AccountProps) => {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useAuth();

  return (
    <>
      {isSignedIn ? (
        <UserButton
          appearance={{
            elements: {
              userButtonTrigger: `shadow-none d-flex align-items-center ${styles}`,
            },
          }}
        >
          {/* <UserButton.MenuItems>
          <UserButton.Action
            label="Courses"
            labelIcon={<HiMiniTicket />}
            onClick={() => navigate("/learing/courses")}
          />
        </UserButton.MenuItems> */}
        </UserButton>
      ) : (
        <Button
          className={styles}
          variant="outline-primary"
          onClick={() =>
            openSignIn({
              redirectUrl: "/",
            })
          }
          {...sizes}
        >
          Sign In
        </Button>
      )}
    </>
  );
};

export default Account;
