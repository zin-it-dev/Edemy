/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentType, FC } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import QueryProvider from "@/components/providers/query-provider";

type ProviderWithProps =
    | ComponentType<{ children: React.ReactNode }>
    | [ComponentType<any>, Record<string, any>];

interface ComposeProvidersProps {
    components: ProviderWithProps[];
    children: React.ReactNode;
}

const TreeProviders: FC<ComposeProvidersProps> = ({ components, children }) => {
    return components.reduceRight<React.ReactNode>((acc, item) => {
        if (Array.isArray(item)) {
            const [Provider, props] = item;
            return <Provider {...props}>{acc}</Provider>;
        }
        const Provider = item;
        return <Provider>{acc}</Provider>;
    }, children);
};

const Provider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <TreeProviders
            components={[
                [
                    ThemeProvider,
                    {
                        attribute: "class",
                        defaultTheme: "dark",
                        enableSystem: true,
                        disableTransitionOnChange: true,
                    },
                ],
                ClerkProvider,
                QueryProvider,
            ]}
        >
            {children}
        </TreeProviders>
    );
};

export default Provider;
