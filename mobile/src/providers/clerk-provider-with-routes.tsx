import React from "react";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
    throw new Error("Add your Clerk Publishable Key to the .env file");
}

const ClerkProviderWithRoutes = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
            {children}
        </ClerkProvider>
    );
};

export default ClerkProviderWithRoutes;
