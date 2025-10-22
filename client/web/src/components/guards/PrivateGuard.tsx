import React from 'react'
import { useAuth } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router';

const PrivateGuard:React.FC = () => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? <Outlet /> : <Navigate to="/" />
}

export default PrivateGuard