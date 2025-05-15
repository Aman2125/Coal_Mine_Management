import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    employeeId: "", // Changed from email to employeeId
    password: "",
  });

  const [role, setRole] = useState("Worker"); // Default role
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    if (!formData.employeeId || !formData.password) {
      setMessage("⚠️ Both Employee ID and password are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:9002/api/login", formData);
      
      // ✅ Store token & role in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", response.data.role);

      setRole(response.data.role); // Get user role from response

      setMessage("✅ Login Successful! Redirecting...");

      setTimeout(() => {
        if (response.data.role === "Admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/frontpage-logout");
        }
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("❌ Invalid credentials. Please try again.");
      } else {
        setMessage("❌ Server error. Please check your connection.");
      }
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Employee ID:</label> {/* Changed from Email to Employee ID */}
        <input
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default LoginPage;
