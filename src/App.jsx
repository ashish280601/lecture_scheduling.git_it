import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Login from './auth/Login';
import AdminPanel from './AdminPanel';
import InstructorPanel from './InstructorPanel';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const decodedToken = parseJwt(token);
  //     if (decodedToken) {
  //       setIsLoggedIn(true);
  //       setIsAdmin(decodedToken.isAdmin);
  //     }
  //   }
  // }, []);

  const handleLogin = (token, userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole('');
    localStorage.removeItem('token');
    window.location.href = '/'; 
  };

  return (
    <Router>
      <div>
        <Toaster />
        <nav>
          <ul>
            {isLoggedIn && (
              <li className="sign-out"> 
                <button onClick={handleLogout}>Sign Out</button>
              </li>
            )}
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                role === "admin" ? (
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
