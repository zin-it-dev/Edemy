import { SignIn } from "@clerk/nextjs";

export default function LogIn() {
    return (
        <SignIn
            appearance={{
                elements: {
                    rootBox: "w-full max-w-sm flex justify-center items-center m-0 p-0",
                    cardBox: "w-full shadow-none border-none p-0 bg-transparent m-0",
                    card: "shadow-none p-0 w-full bg-transparent m-0",
                    headerTitle: "text-3xl font-medium text-gray-900 text-center",
                    headerSubtitle: "text-sm text-gray-500 mt-1 text-center",
                    socialButtonsBlockButton:
                        "rounded-full h-11 border-gray-200 hover:bg-gray-50 transition-colors",
                    dividerLine: "bg-gray-200",
                    dividerText: "text-xs text-gray-400 font-normal uppercase",
                    formFieldInput:
                        "rounded-full h-11 border-gray-300 focus:border-indigo-500 text-sm px-5",
                    formButtonPrimary:
                        "rounded-full h-11 bg-indigo-500 hover:bg-indigo-600 text-sm font-medium transition-colors mt-2",
                    footerActionLink: "text-indigo-500 hover:underline font-medium",
                    footer: "bg-transparent p-0 mt-3",
                    footerAction: "m-0 p-0",
                    footerPagesLink: "hidden",
                    devActionable: "hidden",
                }
            }}
        />
    );
}
