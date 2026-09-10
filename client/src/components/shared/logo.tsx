"use client";

import Image from "next/image";
import Link from "next/link";

const Logo = ({
    label = "Edemy",
    altText = "Edemy",
    className
}: {
    label?: string;
    altText?: string;
    className?: string;
}) => {
    return (
        <Link href='/' className={className} aria-label={altText}>
            <Image
                src='/logo.png'
                alt={altText}
                width={30}
                height={30}
                priority
            />
            <span className='text-xl tracking-tight'>{label}</span>
        </Link>
    );
};

export default Logo;
