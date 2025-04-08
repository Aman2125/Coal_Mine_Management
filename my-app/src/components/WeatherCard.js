import React from 'react';
import { WiThermometer, WiHumidity, WiStrongWind, WiBarometer, WiDaySunny } from 'react-icons/wi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './WeatherCard.css';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  const timestamp = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="modern-card">
      <div className="card-header">
        <div className="header-title">
          <WiDaySunny className="header-icon" />
          <h2>Weather</h2>
        </div>
        <span className="timestamp">{timestamp}</span>
      </div>

      <div className="card-subtitle">
        {weatherData.description} in {weatherData.location}
      </div>

      <div className="metrics-container">
        <div className="metric-row">
          <WiThermometer className="metric-icon" />
          <div className="metric-label">Temperature:</div>
          <div className="metric-value">{weatherData.temperature}°C</div>
        </div>

        <div className="metric-row">
          <WiThermometer className="metric-icon" />
          <div className="metric-label">Feels Like:</div>
          <div className="metric-value">{weatherData.feelsLike}°C</div>
        </div>

        <div className="metric-row">
          <WiHumidity className="metric-icon" />
          <div className="metric-label">Humidity:</div>
          <div className="metric-value">{weatherData.humidity}%</div>
        </div>

        <div className="metric-row">
          <WiStrongWind className="metric-icon" />
          <div className="metric-label">Wind:</div>
          <div className="metric-value">{weatherData.wind} m/s</div>
        </div>

        <div className="metric-row">
          <WiBarometer className="metric-icon" />
          <div className="metric-label">Pressure:</div>
          <div className="metric-value">{weatherData.pressure} hPa</div>
        </div>

        <div className="metric-row">
          <FaMapMarkerAlt className="metric-icon" />
          <div className="metric-label">Region:</div>
          <div className="metric-value">{weatherData.region}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
