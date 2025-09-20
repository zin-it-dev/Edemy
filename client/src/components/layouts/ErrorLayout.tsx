import React from "react";
import { Outlet } from "react-router";

const ErrorLayout: React.FC = () => {
  return (
    <>
      <main className="min-vh-100">
        <Outlet />
      </main>
    </>
  );
};

export default ErrorLayout;
