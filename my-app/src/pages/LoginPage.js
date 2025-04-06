import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9002/api/login', formData); // Change to your backend login endpoint
      
      console.log(response.data); // Debugging: check response from backend

      if (response.status === 200) {
        // Assume the response contains a token or user information on successful login
        const { token, user } = response.data;

        // Save token in localStorage or sessionStorage for authentication management
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect to FrontPageLogOut.js after successful login
        navigate('/frontpage-logout'); // Redirect to the FrontPageLogOut route
      } else {
        console.log("Unexpected response status:", response.status);
        setErrorMessage("Invalid response from server.");
      }
    } catch (error) {
      setErrorMessage("Invalid credentials or server error.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="background-container">
      <div className="login-container">
        {/* Government Branding */}
        <div className="branding">
          <div className="branding-header">
            <img src="satyamev.jpg" alt="Ashoka Emblem" className="ashoka-logo" />
            <h2>Government of India</h2>
          </div>
          <h3>MINISTRY OF COAL</h3>
        </div>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit" className="btn">Login</button>
        </form>

        {/* Registration Link */}
        <p className="signup-text">
          Don't have an account? <Link to="/new-registration">New Registration</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
