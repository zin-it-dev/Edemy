import { useAuth } from '@clerk/clerk-react';
import React from 'react'
import { Navigate, Outlet } from 'react-router';

const PublicGuard:React.FC = () => {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return <p>Loading...</p>;
    }
  
    return isSignedIn ? <Navigate to="/dashboard" /> : <Outlet />
}

export default PublicGuard