import { ReactNode, ComponentType } from "react";
import QueryProvider from "@/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { shadcn } from "@clerk/ui/themes";

type ChildrenProps = { children: ReactNode };

function withProps<P extends object>(
  Component: ComponentType<P & ChildrenProps>,
  props: P
): ComponentType<ChildrenProps> {
  return function WithProps({ children }: ChildrenProps) {
    return <Component {...props}>{children}</Component>;
  };
}

interface ComposeProvidersProps {
  providers: ComponentType<ChildrenProps>[];
  children: ReactNode;
}

const ComposeProviders = ({ providers, children }: ComposeProvidersProps) => {
  return providers.reduceRight<ReactNode>(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};

export const Providers = ({ children }: { children: ReactNode }) => {
  const providers: ComponentType<ChildrenProps>[] = [
    withProps(ClerkProvider, { appearance: { theme: shadcn } }),
    QueryProvider,
    withProps(ThemeProvider, {
      attribute: "class",
      defaultTheme: "dark",
      enableSystem: true,
      disableTransitionOnChange: true,
    } as const),
    AuthProvider,
  ];

  return <ComposeProviders providers={providers}>{children}</ComposeProviders>;
};