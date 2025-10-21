import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";
import { Spinner } from "react-bootstrap";

const AuthLayout: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  }

  return isSignedIn ? <Outlet /> : <Navigate to="/" />;
};

export default AuthLayout;
