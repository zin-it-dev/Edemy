import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";
import ClerkProviderWithRoutes from "@/providers/clerk-provider-with-routes";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    return (
        <ClerkProviderWithRoutes>
            <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
                <AnimatedSplashOverlay />
                <AppTabs />
            </ThemeProvider>
        </ClerkProviderWithRoutes>
    );
}
