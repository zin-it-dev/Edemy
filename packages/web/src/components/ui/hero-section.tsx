import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import heroBg from "@/assets/hero.png";
import { BadgeCheck, Sparkles } from "lucide-react";
import { Link } from "react-router";
// import { useState } from "react";
import { companiesData } from "@/constants/data";

type FieldTextareaProps = {
    label: string;
    placeholder: string;
    description: string;
};

const FieldTextarea = (props: FieldTextareaProps) => {
    return (
        <FieldSet className='w-full max-w-2xl'>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor='textarea-invalid'>
                        {props.label}
                    </FieldLabel>
                    <div className='relative w-full'>
                        <Textarea
                            id='textarea-invalid'
                            placeholder={props.placeholder}
                            rows={8}
                            className={"rounded-xl pb-12"}
                            required
                        />
                        <Button
                            className='absolute bottom-3 right-3 flex items-center rounded-md'
                            variant='outline'
                            type='submit'
                        >
                            <Sparkles data-icon='inline-start' />
                            Generate
                        </Button>
                    </div>
                    <FieldDescription>{props.description}</FieldDescription>
                </Field>
            </FieldGroup>
        </FieldSet>
    );
};

const HeroSection = () => {
    // const [input, setInput] = useState("");

    // const onSubmitHandler = async (e: { preventDefault: () => void }) => {
    //     e.preventDefault();
    // };

    return (
        <section className='flex min-h-[calc(100dvh-4rem)] flex-1 flex-col justify-between gap-12 overflow-x-hidden pt-8 sm:gap-16 sm:pt-16 pb-10 lg:pb-20 lg:gap-24 lg:pt-24'>
            {/* Hero Background */}
            <img
                src={heroBg}
                className='absolute inset-0 -z-10 size-full opacity'
            />

            {/* Hero Content */}
            <div className='mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8'>
                <div className='flex flex-wrap items-center justify-center gap-2.5 rounded-full border px-2 py-1 text-sm'>
                    <Badge
                        className='rounded-full'
                        render={
                            <Link to={"/"}>
                                <BadgeCheck data-icon='inline-start' />{" "}
                                AI-Powered
                            </Link>
                        }
                    />
                    <span className='text-muted-foreground'>
                        Discover and learn about any topic 🎓
                    </span>
                </div>

                <h1 className='text-3xl leading-[1.29167] font-bold text-balance sm:text-4xl lg:text-5xl'>
                    Design, Build & Launch
                    <br />
                    <span className='relative'>
                        Effortless
                        <svg
                            width='223'
                            height='12'
                            viewBox='0 0 223 12'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            className='absolute inset-x-0 bottom-0 w-full translate-y-1/2 max-sm:hidden'
                        >
                            <path
                                d='M1.11716 10.428C39.7835 4.97282 75.9074 2.70494 114.894 1.98894C143.706 1.45983 175.684 0.313587 204.212 3.31596C209.925 3.60546 215.144 4.59884 221.535 5.74551'
                                stroke='url(#paint0_linear_10365_68643)'
                                strokeWidth='2'
                                strokeLinecap='round'
                            />
                            <defs>
                                <linearGradient
                                    id='paint0_linear_10365_68643'
                                    x1='18.8541'
                                    y1='3.72033'
                                    x2='42.6487'
                                    y2='66.6308'
                                    gradientUnits='userSpaceOnUse'
                                >
                                    <stop stopColor='var(--primary)' />
                                    <stop
                                        offset='1'
                                        stopColor='var(--primary-foreground)'
                                    />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>{" "}
                    Learning Paths in Minutes!
                </h1>

                <p className='text-muted-foreground'>
                    Our platform helps you build, test, and deliver learn
                    faster!
                    <br />
                    Join a community-driven effort to create high-quality
                    courses that empower everyone to master their tech stack.
                </p>

                <FieldTextarea
                    label={"What can I help you learn?"}
                    placeholder='Describe your course topic, audience, goals, and preferred style...'
                    description='Edemy can be inaccurate. Please double check its responses.'
                />

                {/* <Button variant='outline' disabled>
                        <Spinner data-icon='inline-start' />
                        Generating
                    </Button> */}
            </div>

            {/* Image */}
            <div className='flex flex-wrap lg:flex-nowrap items-center justify-center gap-16 md:gap-20 mx-auto'>
                {companiesData.map((item) => {
                    const CompanyIcon = item.Icon;
                    return (
                        <div
                            key={item.altText}
                            className='grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300'
                        >
                            <CompanyIcon
                                className='h-7 md:h-8 w-auto object-contain'
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default HeroSection;
