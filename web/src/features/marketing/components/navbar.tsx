import { Link, NavLink } from 'react-router';
import { useState, useEffect } from 'react';
import { MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Logo from '@/features/marketing/components/logo';
import { ModeToggle } from '@/features/marketing/components/mode-toggle';
import CurrentUserButton from '@/features/auth/components/currentuser-button';
import { navigationData } from '@/constants/data';
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import type { ListMenuItem, NavigationItem } from '@/types';
import Search from '@/components/ui/search';


export function ListItem({ title, children, to, ...props }: ListMenuItem) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link to={to}>
            <div className="flex flex-col gap-1 text-sm">
              <div className="leading-none font-medium">{title}</div>
              <div className="text-muted-foreground line-clamp-2">
                {children}
              </div>
            </div>
          </Link>
        }
      />
    </li>
  );
}

export function NavigationMenuItemLink({
  title,
  to,
  children,
}: NavigationItem) {
  if (!children?.length) {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink
          render={<NavLink to={to}>{title}</NavLink>}
          className={navigationMenuTriggerStyle()}
        />
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem className="hidden md:flex">
      <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
          {children.map((component) => (
            <ListItem key={component.title} {...component}>
              {component.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-background/10 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center px-6 py-3 md:px-10 lg:px-16 xl:px-24">
        <Logo className="text-foreground flex-1" />

        <NavigationMenu align="center" className="hidden md:flex">
          <NavigationMenuList className={'gap-8'}>
            {navigationData.map((item) => (
              <NavigationMenuItemLink key={item.title} {...item} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex flex-1 items-center justify-end gap-3">
          <Search />

          <CurrentUserButton />

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger
              className="md:hidden"
              render={<Button variant="outline" size="icon" />}
            >
              <MenuIcon />
              <span className="sr-only">Menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuGroup>
                {navigationData.map((item, index) => (
                  <DropdownMenuItem key={index}>
                    <NavLink to={item.to}>{item.title}</NavLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
