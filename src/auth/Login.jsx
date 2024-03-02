import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const hostUrl = "https://lecture-scheduling-api-git-it.onrender.com";

const Login = ({ onLogin }) => {
  const [login, setLogin] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdminLogin = async () => {
    try {
      const res = await axios.post(`${hostUrl}/api/auth/adminpanel/admin/login`, login);
      const { token, role } = res.data;
      console.log("Login successful. Role:", role);
      onLogin(token, role);
      toast.success("Login Successful As Admin",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (error) {
      toast.error("Invalid Credential", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  };

  const handleInstructorLogin = async () => {
    try {
      const res = await axios.post(`${hostUrl}/api/auth/instructorpanel/instructor/login`, login);
      const { token, role } = res.data;
      console.log("Login successful. Role:", role);
      onLogin(token, role);
      toast.success("Login Successful As Instructor",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (error) {
      toast.error("Invalid Credential", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginRight: '10px' }}>Username</label>
        <input type="text" name="username" value={login.username} onChange={handleChange} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginRight: '10px' }}>Password </label>
        <input type="password" name="password" value={login.password} onChange={handleChange} />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button style={{ marginRight: '10px' }} onClick={handleAdminLogin}>Admin Login</button>
        <button onClick={handleInstructorLogin}>Instructor Login</button>
      </div>
    </div>
  );
};

export default Login;

