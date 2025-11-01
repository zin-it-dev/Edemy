import React from "react";
import { Outlet } from "react-router";

import Header from "../shared/Header";
import Footer from "../shared/Footer";

const RootLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
