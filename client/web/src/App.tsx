import React from "react";
import { Route, Routes } from "react-router";

import RootLayout from "@/components/layouts/RootLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default App;
