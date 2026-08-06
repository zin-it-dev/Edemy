import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/shared/navbar";

export const metadata: Metadata = {
    title: "Edemy 🎓",
    description:
        "🔖 Discover and learn about any topic.📍 An online learning platform where you can join courses, track your personal learning journey, and share knowledge with the community 🐧",
};

export default function MarketingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={cn('min-h-full flex flex-col')}>
            <Navbar />
            <main>{children}</main>
        </div>
    );
}
