import { Show, SignInButton, UserButton } from '@clerk/react';
import { CircleUser, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from './button';

const CurrentUserButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <Show when="signed-out">
        <SignInButton
          fallbackRedirectUrl="/dashboard"
          forceRedirectUrl="/dashboard"
        >
          <Button variant="ghost" size="icon">
            <CircleUser />
          </Button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <UserButton
          appearance={{
            elements: {
              userButtonTrigger: 'shadow-none',
            },
          }}
        >
          <UserButton.MenuItems>
            <UserButton.Action
              label="My courses"
              labelIcon={<Ticket size={16} />}
              onClick={() => navigate('/tickets')}
            />
          </UserButton.MenuItems>
        </UserButton>
      </Show>
    </>
  );
};

export default CurrentUserButton;
