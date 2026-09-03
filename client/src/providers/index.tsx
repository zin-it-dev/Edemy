import { ReactNode, ComponentType } from 'react';
import QueryProvider from '@/providers/query-provider';
import { ThemeProvider } from './theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { shadcn } from '@clerk/ui/themes';

interface ComposeProvidersProps {
  providers: Array<ComponentType<any> | [ComponentType<any>, Record<string, any>]>;
  children: ReactNode;
}

const ComposeProviders = ({ providers, children }: ComposeProvidersProps) => {
  return providers.reduceRight((acc, curr) => {
    if (Array.isArray(curr)) {
      const [Provider, props] = curr;
      return <Provider {...props}>{acc}</Provider>;
    }
    const Provider = curr;
    return <Provider>{acc}</Provider>;
  }, children);
};

export const Providers = ({children}: {children: ReactNode}) => {
    const providers = [
        [ClerkProvider, { appearance: { theme: shadcn } }],
        QueryProvider,
        [
          ThemeProvider, 
          {
            attribute: "class",
            defaultTheme: "dark",
            enableSystem: true,
            disableTransitionOnChange: true,
          }
      ]
    ] as const;

    return (
        <ComposeProviders providers={providers as any}>
            {children}
        </ComposeProviders>
    )
}