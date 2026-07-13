import React from "react";
import { ClerkProvider } from "@clerk/react";
import { useNavigate } from "react-router";

const ClerkProviderWithRoutes = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

    if (!PUBLISHABLE_KEY) {
        throw new Error("Missing Publishable Key");
    }

    const navigate = useNavigate();

    return (
        <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}
            routerPush={(to) => navigate(to)}
            routerReplace={(to) => navigate(to, { replace: true })}
        >
            {children}
        </ClerkProvider>
    );
};

export default ClerkProviderWithRoutes;
