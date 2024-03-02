// AuthenticatedRoutes.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminPanel from '../AdminPanel';
import InstructorPanel from '../InstructorPanel';

const AuthenticatedRoutes = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token found, navigate to the login page
    return <Navigate to="/login" />;
  }

  const decodedToken = parseJwt(token);

  if (!decodedToken) {
    // If token cannot be decoded, navigate to the login page
    return <Navigate to="/login" />;
  }

  // Render different panels based on user role
  if (decodedToken.isAdmin) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/instructor" element={<InstructorPanel />} />
      </Routes>
    );
  }
};

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error('Error parsing JWT token:', error);
    return null;
  }
};

export default AuthenticatedRoutes;
