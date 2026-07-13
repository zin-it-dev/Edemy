import { Link } from "react-router";
import { useState, useEffect } from "react";
import { SearchIcon, MenuIcon, CircleUser } from "lucide-react";
import { Show, SignInButton } from "@clerk/react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/components/ui/logo";
import NavigationMenuItemLink, { type NavigationItem } from "@/components/ui/navigation-menu-item-link";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";


const Navbar = () => {
    const navigationData: NavigationItem[] = [
        {
            title: "Courses" as const,
            to: "/courses" as const,
        },
        {
            title: "Pricing" as const,
            to: "/pricing" as const,
        },
        {
            title: "Projects" as const,
            to: "/projects" as const,
        },
        {
            title: "Contact Us" as const,
            to: "/contact-us" as const,
        },
    ] as const;

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                isScrolled
                    ? "bg-background/10 backdrop-blur-md"
                    : "bg-transparent"
            }`}
        >
            <nav className='mx-auto flex w-full max-w-7xl items-center px-6 py-3 md:px-10 lg:px-16 xl:px-24'>
                <Logo to="/" className='flex-1 text-foreground gap-3' />

                <NavigationMenu align="center" className="hidden md:flex">
                    <NavigationMenuList className={"gap-8"}>
                        {navigationData.map((item) => (
                            <NavigationMenuItemLink key={item.title} {...item} />
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className='flex flex-1 items-center gap-3 justify-end'>
                    <Button variant='ghost' size='icon'>
                        <SearchIcon />
                        <span className='sr-only'>Search</span>
                    </Button>

                    <Show when='signed-out'>
                        <SignInButton
                            fallbackRedirectUrl='/dashboard'
                            forceRedirectUrl='/dashboard'
                        >
                            <Button variant='ghost' size='icon'>
                                <CircleUser />
                            </Button>
                        </SignInButton>
                    </Show>

                    <ModeToggle />

                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className='md:hidden'
                            render={<Button variant='outline' size='icon' />}
                        >
                            <MenuIcon />
                            <span className='sr-only'>Menu</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56' align='end'>
                            <DropdownMenuGroup>
                                {navigationData.map((item, index) => (
                                    <DropdownMenuItem key={index}>
                                        <Link to={item.to}>{item.title}</Link>
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
