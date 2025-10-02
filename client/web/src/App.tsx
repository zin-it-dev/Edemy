import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import Home from "@/pages/Home";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
