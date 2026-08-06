"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
        } else if (theme === "dark") {
            setTheme("system");
        } else {
            setTheme("light");
        }
    };

    if (!mounted) {
        return (
            <Button variant='outline' size='icon' disabled>
                <Sun className='h-[1.2rem] w-[1.2rem]' />
            </Button>
        );
    }

    return (
        <Button variant='outline' size='icon' onClick={toggleTheme}>
            {theme === "light" && (
                <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
            )}
            {theme === "dark" && (
                <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
            )}
            {theme === "system" && (
                <SunMoon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
            )}
            <span className='sr-only'>Toggle theme</span>
        </Button>
    );
}
