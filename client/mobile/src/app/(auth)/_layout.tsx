import { Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import { protectedRoutes, publicRoutes } from "@/routes";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={!isSignedIn}>
        {publicRoutes.map((route) => (
          <Stack.Screen key={route.name} name={route.name} />
        ))}
      </Stack.Protected>

      <Stack.Protected guard={isSignedIn!}>
        {protectedRoutes.map((route) => (
          <Stack.Screen name={route.name} />
        ))}
      </Stack.Protected>
    </Stack>
  );
}