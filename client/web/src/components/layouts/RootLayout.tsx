import React from "react";
import { Outlet } from "react-router";

const RootLayout: React.FC = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
