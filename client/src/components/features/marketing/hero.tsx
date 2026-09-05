"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Sparkles, Wand2 } from "lucide-react";

import { Learnthis } from "@/components/ui/svgs/learnthis";
import { Platzi } from "@/components/ui/svgs/platzi";
import { Udacity } from "@/components/ui/svgs/udacity";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const SUGGESTED_PROMPTS = [
    "45-min AI lesson plan",
    "Flutter pitch deck",
    "UI/UX for Beginners intro",
];

export const Hero = () => {
    const [input, setInput] = useState("");

    const handlePromptClick = (prompt: string) => {
        setInput(prompt);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        // Handle presentation generation logic
    };

    return (
        <section className='flex flex-col items-center justify-center w-full p-4 md:px-16 lg:px-24 xl:px-32'>
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

            <h1 className='mt-6 text-center text-[40px] leading-[48px] md:text-6xl md:leading-[70px] font-semibold max-w-3xl mx-auto'>
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
            <p className='mt-4 max-w-md text-center text-sm leading-relaxed text-slate-400 md:text-base'>
                Create, customize, and present course decks faster than ever
                with intelligent AI-powered design.
            </p>

            {/* Interactive Form Card */}
            <div className='mt-8 w-full max-w-xl'>
                <form
                    onSubmit={handleSubmit}
                    className='group relative rounded-2xl border border-white/10 p-2.5 shadow-2xl backdrop-blur-xl transition-all duration-300 md:p-3'
                >
                    <div className='relative'>
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            rows={4}
                            placeholder='Describe your course presentation in detail (e.g., 10 slides intro to Machine Learning...)'
                            className='w-full resize-none border-0 bg-transparent p-2 text-sm text-white placeholder:text-slate-500 md:text-base'
                            required
                        />
                    </div>

                    <div className='mt-2 flex items-center justify-between border-t border-white/5 pt-2.5'>
                        <div className='flex items-center gap-1.5 text-xs text-slate-400 pl-1'>
                            <Sparkles className='h-3.5 w-3.5 text-white animate-pulse' />
                            <span>
                                Powered by AI
                            </span>
                        </div>

                        <Button
                            type='submit'
                            size='default'
                            className='text-white'
                        >
                            <Wand2 className='mr-2 h-4 w-4' />
                            Generate
                        </Button>
                    </div>
                </form>

                {/* Quick Prompt Suggestions */}
                <div className='mt-3 flex flex-wrap items-center justify-center gap-1.5 px-1'>
                    <span className='text-[11px] text-slate-500 font-medium mr-1'>
                        Try:
                    </span>
                    {SUGGESTED_PROMPTS.map((prompt, idx) => (
                        <button
                            key={idx}
                            type='button'
                            onClick={() => handlePromptClick(prompt)}
                            className='rounded-full border border-white/5 bg-white/3 px-2.5 py-1 text-[11px] text-slate-400 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-slate-200'
                        >
                            {prompt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Social Proof / Trusted By */}
            <div className='mt-14 flex flex-col items-center justify-center gap-4'>
                <div className='flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale transition-all duration-300 hover:grayscale-0 md:gap-12'>
                    <div className='h-6 w-auto flex items-center justify-center'>
                        <Learnthis />
                    </div>
                    <div className='h-6 w-auto flex items-center justify-center'>
                        <Platzi />
                    </div>
                    <div className='h-6 w-auto flex items-center justify-center'>
                        <Udacity />
                    </div>
                </div>
            </div>
        </section>
    );
};
