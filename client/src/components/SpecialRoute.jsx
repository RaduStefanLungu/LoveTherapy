import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SpecialRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  // If user is not logged in, redirect to the login page
  if (currentUser) {
    return <Navigate to="/profile" state={{ from: location.pathname }} />;
  }

  // If user is logged in, render the protected content
  return <>{children}</>;
};

export default SpecialRoute;
