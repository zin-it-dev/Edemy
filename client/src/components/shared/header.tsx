'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const glassEffect = isScrolled
        ? 'bg-background/60 backdrop-blur-xl shadow-lg shadow-black/10'
        : ''

    return (
        <header className={`sticky top-0 z-50 flex items-center justify-center w-full px-6 py-4 rounded-full text-foreground text-sm transition-all duration-300 ${glassEffect}`}>
            <Link href="/" className="flex items-center gap-2 font-semibold">
                <span className="text-2xl">🎓</span>
                <span className="text-xl tracking-tight">Edemy</span>
            </Link>

            <div className="hidden md:flex items-center gap-6 ml-7">
                <Link
                    href="/courses"
                    className="relative overflow-hidden h-6 group"
                >
                    <span className="block group-hover:-translate-y-full transition-transform duration-300">Courses</span>
                    <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Courses</span>
                </Link>
                <Link
                    href="/stories"
                    className="relative overflow-hidden h-6 group"
                >
                    <span className="block group-hover:-translate-y-full transition-transform duration-300">Stories</span>
                    <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Stories</span>
                </Link>
                <Link
                    href="/pricing"
                    className="relative overflow-hidden h-6 group"
                >
                    <span className="block group-hover:-translate-y-full transition-transform duration-300">Pricing</span>
                    <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Pricing</span>
                </Link>
                <Link
                    href="/docs"
                    className="relative overflow-hidden h-6 group"
                >
                    <span className="block group-hover:-translate-y-full transition-transform duration-300">Docs</span>
                    <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Docs</span>
                </Link>
            </div>

            <div className="hidden ml-14 md:flex items-center gap-4">
                <Show when="signed-in">
                    <UserButton />
                </Show>
                <Link
                    href="/sign-up"
                    className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300"
                >
                    Get Started
                </Link>
            </div>

            {isMobileMenuOpen && (
                <div className="absolute top-20 left-0 right-0 mx-4 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex-col items-center gap-4 md:hidden">
                    <Link
                        href="/courses"
                        className="hover:text-indigo-600 text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Courses
                    </Link>
                    <Link
                        href="/stories"
                        className="hover:text-indigo-600 text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Customer Stories
                    </Link>
                    <Link
                        href="/pricing"
                        className="hover:text-indigo-600 text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/docs"
                        className="hover:text-indigo-600 text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Docs
                    </Link>
                    <Link
                        href="/contact"
                        className="px-4 py-2 rounded-full text-sm font-medium transition text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Contact
                    </Link>
                    <Link
                        href="/sign-up"
                        className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Get Started
                    </Link>
                </div>
            )}
        </header>
    )
}

export default Header