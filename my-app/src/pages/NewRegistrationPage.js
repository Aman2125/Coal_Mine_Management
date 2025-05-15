import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NewRegistrationPage.css";

const NewRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Worker",
    password: "",
  });

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

    if (!formData.name || !formData.email || !formData.password) {
      setMessage("⚠️ All fields are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:9002/api/register", formData);

      setMessage(
        `✅ Registration Successful! Your Employee ID: ${response.data.employeeId}. 📩 It has also been sent to your registered email (${formData.email}).`
      );

      setTimeout(() => {
        navigate("/login"); // Redirecting to the login page after successful registration
      }, 3000);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setMessage("⚠️ User already exists. Try a different email.");
        } else {
          setMessage("❌ Registration failed. Please try again.");
        }
      } else {
        setMessage("❌ Server error. Please check your connection.");
      }
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-container">
      <h2>New Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="Worker">Worker</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Admin">Admin</option>
        </select>

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default NewRegistration;
