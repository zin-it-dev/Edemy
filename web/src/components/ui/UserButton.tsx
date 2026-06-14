import { SignInButton, UserButton as UserBtn, useUser } from '@clerk/react';
import { CircleUser, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router';

const UserButton = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  return (
    <>
      {isSignedIn ? (
        <UserBtn
          appearance={{
            elements: {
              userButtonTrigger: 'shadow-none',
            },
          }}
        >
          <UserBtn.MenuItems>
            <UserBtn.Action
              label="My courses"
              labelIcon={<Ticket size={14} />}
              onClick={() => navigate('/tickets')}
            />
          </UserBtn.MenuItems>
        </UserBtn>
      ) : (
        <SignInButton
          fallbackRedirectUrl="/dashboard"
          forceRedirectUrl="/dashboard"
        >
          <button className="cursor-pointer">
            <CircleUser size={24} />
          </button>
        </SignInButton>
      )}
    </>
  );
};

export default UserButton;
