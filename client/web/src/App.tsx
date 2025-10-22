import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import RootLayout from "@/components/layouts/RootLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import PublicGuard from "./components/guards/PublicGuard";
import PrivateGuard from "./components/guards/PrivateGuard";
import { NOT_FOUND_ROUTE, PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/routes/routes";
import ErrorLayout from "./components/layouts/ErrorLayout";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {PUBLIC_ROUTES.map((route) => {
          return (
            <Route element={<PublicGuard />}>
              <Route key={route.path} element={<RootLayout />}>
                <Route path={route.path} element={<route.component />} />
              </Route>
            </Route>
          );
        })}

        {PRIVATE_ROUTES.map((route) => {
          const Layout = route.layout !== null ? RootLayout : DashboardLayout;
          return (
            <Route element={<PrivateGuard />}>
              <Route element={<Layout />}>
                <Route path={route.path} element={<route.component />} />
              </Route>
            </Route>
          );
        })}

        <Route element={<ErrorLayout />}>
          <Route path={NOT_FOUND_ROUTE.path} element={<NOT_FOUND_ROUTE.component />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
