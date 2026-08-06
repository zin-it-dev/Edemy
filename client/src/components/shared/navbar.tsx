"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import {
    CircleAlertIcon,
    LucideIcon,
    Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button } from "@/components/ui/button";
import ClerkUserButton from "@/components/shared/clerk-user-button";


const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
];

export const Navbar = () => {
    return (
        <header
            className={cn(
                " mx-auto max-w-7xl w-full flex justify-between items-center md:px-16 lg:px-24 xl:px-32 p-4"
            )}
        >
            {/* Logo */}
            <Logo />

            {/* Navbar */}
            <NavigationMenu className={cn('hidden md:flex')}>
                <NavigationMenuList className={cn('gap-1')}>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            AI Tutor
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className={cn("w-96")}>
                                <ListItem href='/docs' icon={CircleAlertIcon} title='Create a Course'>
                                    Re-usable components built with Tailwind
                                    CSS.
                                </ListItem>
                                <ListItem
                                    href='/docs/installation'
                                    title='Test my Skills'
                                >
                                    How to install dependencies and structure
                                    your app.
                                </ListItem>
                                <ListItem
                                    href='/docs/primitives/typography'
                                    title='Ask AI Tutor'
                                >
                                    Styles for headings, paragraphs, lists...etc
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem className={cn("hidden md:flex")}>
                        <NavigationMenuTrigger>
                            Courses
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul
                                className={cn(
                                    "grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]",
                                )}
                            >
                                {components.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItemLink
                        href={"/pricing"}
                        title={"Pricing"}
                    />
                    <NavigationMenuItemLink
                        href={"/contact-us"}
                        title={"Contact Us"}
                    />
                </NavigationMenuList>
            </NavigationMenu>

            <div className={cn('flex items-center gap-3')}>
                <ClerkUserButton />

                <ModeToggle />

                {/* Mobile Toggle */}
                <Button className={cn("md:hidden")} size="icon" aria-label="Menu" variant='outline'>
                    <Menu className="h-[1.2rem] w-[1.2rem] transition-all" />
                </Button>
            </div>
        </header>
    );
};

function ListItem({
    title,
    children,
    href,
    icon: Icon,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; icon?: LucideIcon }) {
    return (
        <li {...props}>
            <NavigationMenuLink
                render={
                    <Link href={href}>
                        <div className={cn("flex flex-col gap-1 text-sm")}>
                            <div className={cn("leading-none font-medium", Icon && 'flex items-center gap-2')}>
                                {Icon && <Icon />}
                                {title}
                            </div>
                            <div
                                className={cn(
                                    "line-clamp-2 leading-snug text-muted-foreground",
                                )}
                            >
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
    href,
}: React.ComponentPropsWithoutRef<"a"> & { href: string }) {
    return (
        <NavigationMenuItem>
            <NavigationMenuLink
                render={<Link href={href}>{title}</Link>}
                className={navigationMenuTriggerStyle()}
            />
        </NavigationMenuItem>
    );
}

export function Logo({ size = 32 }: { size?: number }) {
    return (
        <Link href='/' className="flex items-center gap-2">
            <Image
                src='/logo.svg'
                width={size}
                height={size}
                alt='Discover and learn about any topic 🔖'
                priority
            />
        </Link>
    );
}

