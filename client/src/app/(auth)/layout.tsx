import { cn } from "@/lib/utils";
import Image from "next/image";

export default function MarketingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={cn("flex min-h-screen w-full items-center justify-center")}>
            <div className={cn('flex h-[600px] w-full max-w-4xl overflow-hidden')}>
                <div className="relative hidden w-1/2 md:block">
                    <Image fill priority className="object-cover rounded-3xl" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png" alt="Authentication Banner" />
                </div>
                <main className="flex w-full items-center justify-center p-6 md:w-1/2 no-scrollbar overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
