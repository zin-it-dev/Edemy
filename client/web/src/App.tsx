import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import Home from "@/pages/Home";
import RootLayout from "./components/layouts/RootLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import Generator from "./pages/Generator";
import Profile from "./pages/Profile";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />

          <Route element={<AuthLayout />}>
            <Route path="/generate" element={<Generator />} />
            <Route path="/learning/courses" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
