import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Learnthis } from "@/components/ui/svgs/learnthis";
import { Platzi } from "@/components/ui/svgs/platzi";
import { Udacity } from "@/components/ui/svgs/udacity";
import { Badge } from "@/components/ui/badge";

export const Hero = () => {
    return (
        <section className='flex flex-col items-center justify-center w-full pt-8 md:pt-12 pb-16 md:pb-24 lg:pb-32'>
            <Link
                href='/pricing'
                className='group inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10'
            >
                <Badge>NEW</Badge>
                <span className='flex items-center gap-1 font-medium text-slate-200 text-xs'>
                    Start your 30-day free trial
                    <ChevronRight className='h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5' />
                </span>
            </Link>

            <h1 className='mt-8 md:mt-10 text-center text-[40px] leading-[48px] md:text-6xl md:leading-[70px] font-semibold max-w-3xl mx-auto'>
                Build, design{" "}
                <span className='relative inline-block'>
                    <span className='bg-linear-to-r from-amber-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent px-1'>
                        high-impact courses
                    </span>

                    <svg
                        className='absolute -bottom-2 left-0 w-full h-3 text-amber-400 pointer-events-none'
                        viewBox='0 0 250 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M3 14C60 4 170 18 247 7'
                            stroke='currentColor'
                            strokeWidth='4'
                            strokeLinecap='round'
                        />
                    </svg>
                </span>{" "}
                effortlessly with AI
            </h1>

            {/* Subtitle */}
            <p className='mt-6 md:mt-8 max-w-md text-center text-sm leading-relaxed text-slate-400 md:text-base'>
                Create, customize, and present course decks faster than ever
                with intelligent AI-powered design.
            </p>

            {/* Social Proof / Trusted By */}
            <div className='mt-12 md:mt-14 lg:mt-16 flex flex-col items-center justify-center gap-4'>
                <p className='text-xs text-slate-500 uppercase tracking-widest'>Trusted by leading platforms</p>
                <div className='flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12'>
                    <Learnthis width='28' height='28' />
                    <Platzi width='28' height='28' />
                    <Udacity width='28' height='28' />
                </div>
            </div>
        </section>
    );
};
