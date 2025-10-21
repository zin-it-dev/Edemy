import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import Home from "@/pages/Home";
import RootLayout from "./components/layouts/RootLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Generator from "./pages/Generator";
import Dashboard from "./pages/Dashboard";
import GeneratorOutlet from "./pages/GeneratorOutlet";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<RootLayout />}>
            <Route path="/tutor" element={<Generator />} />
            <Route path="/tutor/outline" element={<GeneratorOutlet />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
