// Layout.js
import React from 'react';
import { Link } from 'react-router-dom';
import './FrontPage.css'; // Keep the styling

import logo from './satyamev.jpg'; // Import your logo

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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

      {/* Navbar Section */}
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
          <li><Link to="/attendance">Attendance Report</Link></li>
          <li><Link to="/safety-guidelines">Safety Guidelines</Link></li>
          <li><Link to="/new-registration">New Registration</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/FAQ">FAQ</Link></li>
        </ul>
      </nav>

      {/* Main content (children) */}
      <main>
        {children}
      </main>

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

export default Layout;
