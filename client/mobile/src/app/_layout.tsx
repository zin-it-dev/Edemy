import { ClerkProvider } from "@clerk/clerk-expo";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

import "@/styles/globals.css";
import { tokenCache } from "@/utils/cache";
import QueryProvider from "@/providers/QueryProvider";
import { rootRoutes } from "@/routes";
import { useAppFocus } from "@/hooks/useAppFocus";

const RootLayout = () => {
  useAppFocus();

  const PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={PUBLISHABLE_KEY}>
      <QueryProvider>
        <SafeAreaProvider>
          <SafeAreaView className="flex-1">
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }}>
              {rootRoutes.map((route) => (
                <Stack.Screen key={route.name} name={route.name} />
              ))}
            </Stack>
          </SafeAreaView>
        </SafeAreaProvider>
      </QueryProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
