import { ModeToggle } from './mode-toggle';
import { SidebarTrigger } from './sidebar';
import { Show, UserButton } from '@clerk/react';

const AppHeader = () => {
  return (
    <nav className="flex items-center justify-between p-4 shadow-sm">
      <SidebarTrigger />
      <div className="flex gap-3">
        <ModeToggle />
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </nav>
  );
};

export default AppHeader;
