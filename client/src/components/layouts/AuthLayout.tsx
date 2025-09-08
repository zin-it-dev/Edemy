import React from "react";
import { Outlet } from "react-router";

const AuthLayout: React.FC = () => {
  return (
    <>
      <main className="min-vh-100">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
