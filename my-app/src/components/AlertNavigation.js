import React from 'react';
import { Link as NavLink, useLocation } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import './AlertNavigation.css';

const AlertNavigation = () => {
  const location = useLocation();

  return (
    <div className="alert-navigation">
      <NavLink 
        to="/alert" 
        className={`nav-link ${location.pathname === '/alert' ? 'active' : ''}`}
      >
        <FaExclamationTriangle />
        <span>Alerts</span>
      </NavLink>
    </div>
  );
};

export default AlertNavigation;
