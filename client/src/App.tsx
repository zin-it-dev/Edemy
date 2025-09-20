import React from "react";
import { Route, Routes } from "react-router";

import { routes } from "@/routes";
import RootLayout from "@/components/layouts/RootLayout";
import ErrorLayout from "@/components/layouts/ErrorLayout";

const App: React.FC = () => {
  return (
    <Routes>
      {routes.map((route) => {
        const Layout = route.layout === undefined ? ErrorLayout : RootLayout;
        return (
          <Route element={<Layout />}>
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          </Route>
        );
      })}
    </Routes>
  );
};

export default App;
