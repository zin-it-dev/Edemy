'use client'

import { Show, SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import { Trophy, UserRound } from "lucide-react";
import { Button } from "../ui/button";

const DotIcon = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            fill='currentColor'
        >
            <path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z' />
        </svg>
    );
};

const ClerkUserButton = () => {
    const { has } = useAuth();

    return (
        <>
            <Show when='signed-out'>
                <SignInButton>
                   <Button size="icon" variant='outline'>
                    <UserRound className="absolute h-[1.2rem] w-[1.2rem]" />
                   </Button>
                </SignInButton>
            </Show>
            <Show when='signed-in'>
                <UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action
                            label='Open chat'
                            labelIcon={<DotIcon />}
                            onClick={() => alert("init chat")}
                        />
                    </UserButton.MenuItems>
                    <UserButton.MenuItems>
                        <UserButton.Link
                            label='My achievements'
                            labelIcon={<Trophy absoluteStrokeWidth />}
                            href="/"
                        />
                    </UserButton.MenuItems>
                </UserButton>
            </Show>
        </>
    );
};

export default ClerkUserButton;
