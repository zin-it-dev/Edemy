import type { Metadata } from "next";
import { Architects_Daughter, Merriweather, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { RootLayoutProps } from "@/types";
import { ThemeProvider } from "@/components/providers/theme-provider";

const fontSans = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Edemy 🎓",
  description: "🔖 Discover and learn about any topic.📍 An online learning platform where you can join courses, track your personal learning journey, and share knowledge with the community 🐧",
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", fontSans.variable, fontSerif.variable, fontMono.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
