import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const hostUrl = "http://localhost:5000";

const Login = ({ onLogin }) => {
  const [login, setLogin] = useState({});
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const {name, value} = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${hostUrl}/api/login`, login)
      console.log("res", res.data);
      const { isAdmin } = res.data; // Change to isAdmin
      onLogin(isAdmin ? 'admin' : 'instructor'); // Adjust userType based on isAdmin
      console.log("admin", isAdmin);
      toast.success("Login Successful");
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username</label>
        <input type="text" name='username' value={login?.username || ""} onChange={handleChange} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name='password' value={login?.password || ""} onChange={handleChange} />
      </div>
      {error && <p>{error}</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
