import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AdminDashboard.css";
import sliderImage1 from "./coal1.jpg";
import sliderImage2 from "./coal2.jpg";
import sliderImage3 from "./coal3.jpg";
import { FaUserCog, FaClipboardList, FaChartBar, FaUsers, FaCogs } from "react-icons/fa";
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:9002/api/admin/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="admin-dashboard-container">
      <nav className="main-nav">
        <div className="nav-logo">
          <h1>Admin Dashboard</h1>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/reports">Reports</Link></li>
          <li><Link to="/manage-users">Manage Users</Link></li>
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      <Slider {...sliderSettings} className="image-slider">
        <div><img src={sliderImage1} alt="Coal Mine 1" className="slider-image" /></div>
        <div><img src={sliderImage2} alt="Coal Mine 2" className="slider-image" /></div>
        <div><img src={sliderImage3} alt="Coal Mine 3" className="slider-image" /></div>
      </Slider>

      <div className="card-container">
        <div className="card">
          <div className="card-content">
            <div className="text-content">
              <h2>Manage Users</h2>
              <p>Control user roles and access.</p>
              {loading ? (
                <p>Loading users...</p>
              ) : (
                <div>
                  {users.length === 0 ? (
                    <p>No users found.</p>
                  ) : (
                    <ul>
                      {users.map(user => (
                        <li key={user.id}>{user.name} - {user.role}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              <Link to="/manage-users" className="card-link">Go to Users</Link>
            </div>
            <FaUsers className="card-icon" />
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="text-content">
              <h2>Attendance & Leave</h2>
              <p>View attendance records and manage leave requests.</p>
              <Link to="/attendance-leave" className="card-link">View Attendance & Leave</Link>
            </div>
            <FaClipboardList className="card-icon" />
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="text-content">
              <h2>Reports & Analytics</h2>
              <p>Analyze key statistics, logs, and safety records.</p>
              <Link to="/reports" className="card-link">View Reports</Link>
            </div>
            <FaChartBar className="card-icon" />
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="text-content">
              <h2>System Settings</h2>
              <p>Configure admin preferences.</p>
              <Link to="/settings" className="card-link">Go to Settings</Link>
            </div>
            <FaCogs className="card-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
