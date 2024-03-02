import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Login from './auth/Login';
import AdminPanel from './AdminPanel';
import InstructorPanel from './InstructorPanel';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = parseJwt(token);
      if (decodedToken) {
        setIsLoggedIn(true);
        setUserType(decodedToken.isAdmin);
      }
    }
  }, []);

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
  };

  return (
    <Router>
      <div>
        <Toaster />
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          {/* Route to AdminPanel if user is logged in and is an admin */}
          {isLoggedIn && userType === true && (
            <Route path="/admin" element={<AdminPanel />} />
          )}
          {/* Route to InstructorPanel if user is logged in and is an instructor */}
          {isLoggedIn && userType === false && (
            <Route path="/instructor" element={<InstructorPanel />} />
          )}
        </Routes>
        {/* Redirect to appropriate panel based on userType after login */}
        {isLoggedIn && (
          <Navigate to={userType === true ? "/admin" : "/instructor"} replace />
        )}
      </div>
    </Router>
  );
};

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export default App;
