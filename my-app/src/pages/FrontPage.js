import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegClock, FaClipboardList, FaShieldAlt, FaFileAlt, FaCalendarAlt } from 'react-icons/fa';
import Slider from 'react-slick'; // Import react-slick for the slider
import './FrontPage.css';
import logo from './satyamev.jpg';
import sliderImage1 from './coal1.jpg'; // Add appropriate image paths
import sliderImage2 from './coal2.jpg';
import sliderImage3 from './coal3.jpg';


const FrontPage = ({ isLoggedIn, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Slider settings for the react-slick component
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
    <div className="frontpage-container">
      {/* Header Section */}
      <header className="top-header">
        <div className="top-header-content">
          <img src={logo} alt="Logo" className="header-logo" />
          <div className="header-text">
            <h1>Ministry of Coal</h1>
            <p>Government of India</p>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="main-nav">
        <div className="nav-logo">
          <h1>CarbonX</h1>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/alert">Alert</Link></li>
          <li><Link to="/safety-guidelines">Safety Guidelines</Link></li>
          <li><Link to="/new-registration">New Registration</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/FAQ">FAQ</Link></li>
          {isLoggedIn ? (
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          ) : null}
        </ul>
      </nav>

      {/* Image Slider */}
      <Slider {...sliderSettings} className="image-slider">
        <div>
          <img src={sliderImage1} alt="Coal Mine 1" className="slider-image" />
        </div>
        <div>
          <img src={sliderImage2} alt="Coal Mine 2" className="slider-image" />
        </div>
        <div>
          <img src={sliderImage3} alt="Coal Mine 3" className="slider-image" />
        </div>
      </Slider>

      {/* Mission and Vision Section */}
      <div className="two-column-container">
        <div className="left-column">
          <div className="mission-vision-container">
            <div className="mission-container">
              <h2>Our Mission</h2>
              <p>
                We aim to transform coal mining with a digital shift handover log and safety management system, replacing manual processes to boost productivity and safety. Our focus is on providing a secure, efficient platform that aligns with India’s coal production goals and ensures stakeholder well-being.
              </p>
            </div>
            <div className="vision-container">
              <h2>Our Vision</h2>
              <p>
                We strive to redefine coal mining by integrating digital technology into shift handover and safety management. Our goal is real-time insights and seamless communication for enhanced productivity and safety, supporting India's coal sector with advanced software and ERP integration.
              </p>
            </div>
          </div>
          <div className="quick-links-container">
            <h2>Quick Links</h2>
            <ul className="quick-links-list">
              <li><a href="https://coal.nic.in" target="_blank" rel="noopener noreferrer">Ministry of Coal - Official Website</a></li>
              <li><a href="https://drive.google.com/file/d/10mjOk_33sCRAr0AR0fWa8ZAR-Tm25O4l/view" target="_blank" rel="noopener noreferrer">DGMS Guidelines</a></li>
              <li><Link to="/safety-record">Record Updated Safety</Link></li>
              <li><Link to="/claim-report">Claim Report Page</Link></li>
              <li><Link to="/leave-application">Apply for Leave</Link></li>
            </ul>
          </div>
        </div>

        <div className="right-column">
          <h2>Web Pages</h2>
          <div className="card-container">
            <div className="card">
              <div className="card-content">
                <div className="text-content">
                  <h2>Shift Wise Record</h2>
                  <p>Manage and view shift-wise records efficiently.</p>
                  <Link to="/MonthYearSelector" className="card-link">View Record</Link>
                </div>
                <FaRegClock className="card-icon" />
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="text-content">
                  <h2>Log Record Detailed</h2>
                  <p>Access detailed log records for in-depth analysis.</p>
                  <Link to="/attendance-logbook" className="card-link">View Log</Link>
                </div>
                <FaClipboardList className="card-icon" />
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="text-content">
                  <h2>Record Updated Safety</h2>
                  <p>Check and update records related to safety compliance.</p>
                  <Link to="/MachineryMaintenance" className="card-link">Update Safety</Link>
                </div>
                <FaShieldAlt className="card-icon" />
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="text-content">
                  <h2>Claim Report Page</h2>
                  <p>You can report a claim for any error from a supervisor.</p>
                  <Link to="/Home-Page" className="card-link">Claim Report</Link>
                </div>
                <FaFileAlt className="card-icon" />
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="text-content">
                  <h2>Apply for Leave</h2>
                  <p>You can apply for leave here.</p>
                  <Link to="/leave-application" className="card-link">Apply Here</Link>
                </div>
                <FaCalendarAlt className="card-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
          <div className="footer-info">
            <p>&copy; {new Date().getFullYear()} CarbonX. All rights reserved.</p>
            <p>1234 Carbon Lane, Suite 100, City, Country</p>
            <p>Email: support@carbonx.com | Phone: (123) 456-7890</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FrontPage;
