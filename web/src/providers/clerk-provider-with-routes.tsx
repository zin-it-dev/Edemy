import React from "react";
import { ClerkProvider } from "@clerk/react";
import { useNavigate } from "react-router";
import { siteConfig } from "@/constants/env";

const ClerkProviderWithRoutes = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const PUBLISHABLE_KEY = siteConfig.clerkKey;

    if (!PUBLISHABLE_KEY) {
        throw new Error("Missing Publishable Key");
    }

    const navigate = useNavigate();

    return (
        <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}
            routerPush={(to) => navigate(to)}
            routerReplace={(to) => navigate(to, { replace: true })}
            signInFallbackRedirectUrl={"/dashboard"}
            signUpFallbackRedirectUrl={"/dashboard"}
        >
            {children}
        </ClerkProvider>
    );
};

export default ClerkProviderWithRoutes;
