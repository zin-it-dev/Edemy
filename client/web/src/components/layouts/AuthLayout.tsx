import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

const AuthLayout: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Đang tải xác thực...</div>;
  }

  return isSignedIn ? <Outlet /> : <Navigate to="/" />;
};

export default AuthLayout;
