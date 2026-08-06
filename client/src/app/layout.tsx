import type { Metadata } from "next";
import { Patrick_Hand, Lora, Fira_Code } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import Provider from "@/components/providers";

const fontSans = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
    title: "Edemy 🎓",
    description:
        "🔖 Discover and learn about any topic.📍 An online learning platform where you can join courses, track your personal learning journey, and share knowledge with the community 🐧",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang='en'
            className={cn(
                "h-full",
                "antialiased",
                fontSans.variable,
                fontSerif.variable,
                fontMono.variable,
            )}
            suppressHydrationWarning
        >
            <body>
                <Provider>
                    {children}
                </Provider>
            </body>
        </html>
    );
}
