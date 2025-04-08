import React, { useState, useEffect } from 'react';
import { WiDust, WiThermometer, WiHumidity } from 'react-icons/wi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './WeatherCard.css';

const API_KEY = 'ee59cf9309d065963dc102cfceb15d9d';

const AirQualityCard = ({ location }) => {
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirQuality = async () => {
      if (!location?.lat || !location?.lon) return;

      try {
        setLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch air quality data');
        }

        const data = await response.json();
        const currentData = data.list[0];
        
        setAirQualityData({
          aqi: currentData.main.aqi,
          components: currentData.components,
          dt: currentData.dt,
          location: location.name
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAirQuality();
    const interval = setInterval(fetchAirQuality, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [location]);

  if (loading) {
    return <div className="modern-card">Loading air quality data...</div>;
  }

  if (error) {
    return <div className="modern-card">Error: {error}</div>;
  }

  if (!airQualityData) {
    return null;
  }

  const getAqiStatus = (aqi) => {
    switch (aqi) {
      case 1: return 'Good';
      case 2: return 'Fair';
      case 3: return 'Moderate';
      case 4: return 'Poor';
      case 5: return 'Very Poor';
      default: return 'Unknown';
    }
  };

  const timestamp = new Date(airQualityData.dt * 1000).toLocaleString('en-US', {
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
          <WiDust className="header-icon" />
          <h2>Air Quality</h2>
        </div>
        <span className="timestamp">{timestamp}</span>
      </div>

      <div className="card-subtitle">
        {getAqiStatus(airQualityData.aqi)} air quality in {airQualityData.location}
      </div>

      <div className="metrics-container">
        <div className="metric-row">
          <WiDust className="metric-icon" />
          <div className="metric-label">AQI Index:</div>
          <div className="metric-value">{airQualityData.aqi} - {getAqiStatus(airQualityData.aqi)}</div>
        </div>

        <div className="metric-row">
          <WiDust className="metric-icon" />
          <div className="metric-label">PM2.5:</div>
          <div className="metric-value">{airQualityData.components.pm2_5.toFixed(1)} µg/m³</div>
        </div>

        <div className="metric-row">
          <WiDust className="metric-icon" />
          <div className="metric-label">PM10:</div>
          <div className="metric-value">{airQualityData.components.pm10.toFixed(1)} µg/m³</div>
        </div>

        <div className="metric-row">
          <WiThermometer className="metric-icon" />
          <div className="metric-label">O₃:</div>
          <div className="metric-value">{airQualityData.components.o3.toFixed(1)} µg/m³</div>
        </div>

        <div className="metric-row">
          <WiHumidity className="metric-icon" />
          <div className="metric-label">CO:</div>
          <div className="metric-value">{(airQualityData.components.co / 1000).toFixed(2)} mg/m³</div>
        </div>

        <div className="metric-row">
          <WiDust className="metric-icon" />
          <div className="metric-label">NO₂:</div>
          <div className="metric-value">{airQualityData.components.no2.toFixed(1)} µg/m³</div>
        </div>

        <div className="metric-row">
          <FaMapMarkerAlt className="metric-icon" />
          <div className="metric-label">Region:</div>
          <div className="metric-value">India</div>
        </div>
      </div>
    </div>
  );
};

export default AirQualityCard;
