import { ModeToggle } from '@/features/marketing/components/mode-toggle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Search from '@/components/ui/search';


const AppHeader = () => {
  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b px-4 backdrop-blur-md transition-all sm:px-6">
      <div className="flex max-w-md flex-1 items-center gap-3">
        <SidebarTrigger className="-ml-1 shrink-0" />
        <Search />
      </div>
      <ModeToggle />
    </header>
  );
};

export default AppHeader;
