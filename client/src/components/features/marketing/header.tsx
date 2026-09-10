"use client";
import Link from "next/link";
import { ArrowRight, LogIn, Menu, Sparkles, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { categoriesQueryOptions } from "@/services/catalog";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Show, SignInButton, GoogleOneTap } from "@clerk/nextjs";
import Logo from "@/components/shared/logo";
import CustomUserButton from "@/components/shared/user-button";

const exploreLinks = [
    {
        href: "/courses",
        title: "Browse courses",
        description: "Find your next skill.",
    },
    {
        href: "/stories",
        title: "Learner stories",
        description: "See what others are building.",
    },
] as const;

const learnLinks = [
    {
        href: "/docs",
        title: "Documentation",
        description: "Get started with Edemy.",
    },
    {
        href: "/pricing",
        title: "Pricing",
        description: "Simple plans for every pace.",
    },
] as const;

type MenuLinkProps = {
    href: string;
    title: string;
    description: string;
};

const MenuLink = ({ href, title, description }: MenuLinkProps) => (
    <NavigationMenuLink
        render={<Link href={href} />}
        className='group flex-col items-start gap-1 p-3'
    >
        <span className='font-medium group-hover:text-primary'>{title}</span>
        <span className='text-xs text-muted-foreground'>{description}</span>
    </NavigationMenuLink>
);

const Header = () => {
    const { data: categories = [], isLoading: categoriesLoading } = useQuery(
        categoriesQueryOptions(),
    );

    const categoryLinks = categories.map((category) => ({
        href: `/courses?category=${category.slug}`,
        title: category.name,
        description: `Explore ${category.name.toLowerCase()} courses.`,
    }));

    return (
        <header className='sticky top-0 z-50 bg-background/85 px-4 backdrop-blur-xl sm:px-6'>
            <div className='mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 md:grid md:grid-cols-[1fr_auto_1fr]'>
                <Logo className='flex w-fit shrink-0 items-center gap-2 justify-self-start font-semibold' />

                <NavigationMenu
                    className='hidden justify-self-center md:flex'
                    align='center'
                >
                    <NavigationMenuList className='gap-1'>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Explore
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className='w-[min(90vw,34rem)]'>
                                <div className='grid grid-cols-2 gap-1 p-2'>
                                    <div className='rounded-md bg-primary/10 p-4'>
                                        <Sparkles
                                            className='mb-6 text-primary'
                                            aria-hidden='true'
                                        />
                                        <p className='text-sm font-semibold'>
                                            Learn in your rhythm
                                        </p>
                                        <p className='mt-1 text-xs text-muted-foreground'>
                                            Personalized paths that keep
                                            momentum visible.
                                        </p>
                                    </div>
                                    <div className='grid gap-1'>
                                        {[
                                            ...exploreLinks,
                                            ...categoryLinks,
                                        ].map((link) => (
                                            <MenuLink
                                                key={link.href}
                                                {...link}
                                            />
                                        ))}
                                        {categoriesLoading && (
                                            <span className='px-2 py-2 text-xs text-muted-foreground'>
                                                Loading categories...
                                            </span>
                                        )}
                                        {categoryLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className='rounded-md px-2 py-2.5 hover:bg-muted'
                                            >
                                                <span className='block text-sm font-medium'>
                                                    {link.title}
                                                </span>
                                                <span className='block text-xs text-muted-foreground'>
                                                    {link.description}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                            <NavigationMenuContent className='w-[min(90vw,28rem)]'>
                                <div className='grid gap-1 p-2'>
                                    {learnLinks.map((link) => (
                                        <MenuLink key={link.href} {...link} />
                                    ))}
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                render={<Link href='/contact' />}
                                className='px-4 py-2'
                            >
                                Contact
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className='flex items-center justify-end gap-2 md:justify-self-end'>
                    <Show when='signed-out'>
                        <GoogleOneTap />
                        <SignInButton>
                          <User />
                        </SignInButton>
                    </Show>
                    <Show when='signed-in'>
                        <CustomUserButton />
                    </Show>
                    <Sheet>
                        <SheetTrigger
                            render={
                                <Button
                                    variant='outline'
                                    size='icon'
                                    className='md:hidden'
                                    aria-label='Open menu'
                                />
                            }
                        >
                            <Menu aria-hidden='true' />
                        </SheetTrigger>
                        <SheetContent
                            side='right'
                            className='w-[min(22rem,90vw)]'
                        >
                            <SheetHeader>
                                <SheetTitle className='text-primary'>
                                    Edemy
                                </SheetTitle>
                                <SheetDescription>
                                    Explore courses and manage your learning
                                    journey.
                                </SheetDescription>
                            </SheetHeader>
                            <nav
                                className='flex flex-col gap-1 px-4'
                                aria-label='Mobile navigation'
                            >
                                <section className='rounded-lg border border-border/60 p-3'>
                                    <div className='mb-2 flex items-center gap-2 px-1'>
                                        <Sparkles
                                            className='size-4 text-primary'
                                            aria-hidden='true'
                                        />
                                        <h2 className='text-sm font-semibold'>
                                            Explore
                                        </h2>
                                    </div>
                                    <p className='mb-2 px-1 text-xs text-muted-foreground'>
                                        Learn in your rhythm with personalized
                                        paths that keep momentum visible.
                                    </p>
                                    <div className='grid gap-1'>
                                        {exploreLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className='rounded-md px-2 py-2.5 hover:bg-muted'
                                            >
                                                <span className='block text-sm font-medium'>
                                                    {link.title}
                                                </span>
                                                <span className='block text-xs text-muted-foreground'>
                                                    {link.description}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                                <section className='rounded-lg border border-border/60 p-3'>
                                    <h2 className='mb-2 px-1 text-sm font-semibold'>
                                        Learn
                                    </h2>
                                    <div className='grid gap-1'>
                                        {learnLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className='rounded-md px-2 py-2.5 hover:bg-muted'
                                            >
                                                <span className='block text-sm font-medium'>
                                                    {link.title}
                                                </span>
                                                <span className='block text-xs text-muted-foreground'>
                                                    {link.description}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                                <Link
                                    href='/contact'
                                    className='rounded-md px-3 py-3 text-base font-medium hover:bg-muted'
                                >
                                    Contact
                                </Link>
                            </nav>
                            <div className='mt-auto flex flex-col gap-2 p-4'>
                                <ButtonLink
                                    href='/sign-in'
                                    variant='outline'
                                    className='w-full'
                                >
                                    <LogIn
                                        data-icon='inline-start'
                                        aria-hidden='true'
                                    />
                                    Sign in
                                </ButtonLink>
                                <ButtonLink
                                    href='/sign-up'
                                    className='w-full rounded-full'
                                >
                                    Start learning
                                    <ArrowRight
                                        data-icon='inline-end'
                                        aria-hidden='true'
                                    />
                                </ButtonLink>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Header;

interface ButtonLinkProps
    extends
        React.ComponentProps<typeof Link>,
        VariantProps<typeof buttonVariants> {
    children: React.ReactNode;
}

export function ButtonLink({
    href,
    children,
    variant,
    size = "sm",
    className,
    ...props
}: ButtonLinkProps) {
    return (
        <Link
            href={href}
            className={buttonVariants({ variant, size, className })}
            {...props}
        >
            {children}
        </Link>
    );
}
