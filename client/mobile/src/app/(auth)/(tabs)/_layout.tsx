import { Tabs } from "expo-router";

import { privateRoutes } from "@/routes";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      {privateRoutes.map((route) => (
        <Tabs.Screen
          key={route.name}
          name={route.name}
          options={route.options}
        />
      ))}
    </Tabs>
  );
}
