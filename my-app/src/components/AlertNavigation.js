import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WiThunderstorm, WiDust } from 'react-icons/wi';
import './AlertNavigation.css';

const AlertNavigation = () => {
  const location = useLocation();

  return (
    <div className="alert-navigation">
      <Link 
        to="/alert" 
        className={`nav-link ${location.pathname === '/alert' ? 'active' : ''}`}
      >
        <WiThunderstorm />
        <span>Weather & Seismic</span>
      </Link>
      <Link 
        to="/air-quality" 
        className={`nav-link ${location.pathname === '/air-quality' ? 'active' : ''}`}
      >
        <WiDust />
        <span>Air Quality</span>
      </Link>
    </div>
  );
};

export default AlertNavigation;
