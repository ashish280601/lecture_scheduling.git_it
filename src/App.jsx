import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Login from './auth/Login';
import AdminPanel from './AdminPanel';
import InstructorPanel from './InstructorPanel';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
  };

  return (
    <Router>
      <div>
        <Toaster />
        <Routes>
          {!isLoggedIn ? (
            <Route path="/" element={<Login onLogin={handleLogin} />} />
          ) : userType === 'admin' ? (
            <Route path="/admin" element={<AdminPanel />} />
          ) : (
            <Route path="/instructor" element={<InstructorPanel />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
