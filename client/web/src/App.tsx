import React from "react";
import { Route, Routes } from "react-router";

import RootLayout from "@/components/layouts/RootLayout";
import { publicRoutes } from "@/routes/routes";
import useDynamicMeta from "@/hooks/useDynamicMeta";

const App: React.FC = () => {
  useDynamicMeta([
    {
      name: "description",
      property: "og:description",
      content: "Discover and learn about any topic 🔖",
    },
  ]);

  return (
    <Routes>
      <Route element={<RootLayout />}>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default App;
