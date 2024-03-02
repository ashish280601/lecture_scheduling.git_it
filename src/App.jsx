import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Login from './auth/Login';
import AdminPanel from './AdminPanel';
import InstructorPanel from './InstructorPanel';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = parseJwt(token);
      if (decodedToken) {
        setIsLoggedIn(true);
        setIsAdmin(decodedToken.isAdmin);
      }
    }
  }, []);

  const handleLogin = (isAdmin) => {
    setIsLoggedIn(true);
    setIsAdmin(isAdmin);
  };

  return (
    <Router>
      <div>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? 9(
                isAdmin ? (
                  <Navigate to="/admin" />
                ) : (
                  <Navigate to="/instructor" />
                )
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/instructor" element={<InstructorPanel />} />
        </Routes>
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
