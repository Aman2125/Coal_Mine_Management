import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWind, FaMask, FaExclamationTriangle, FaArrowLeft, FaMapMarkerAlt, FaLocationArrow, FaHistory, FaChartLine, FaExchangeAlt, FaThermometerHalf, FaTint, FaSearch, FaLightbulb, FaRobot, FaComments, FaIndustry, FaHardHat } from 'react-icons/fa';
import { WiDust } from 'react-icons/wi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './AirQualityAlert.css';

const API_KEY = "ee59cf9309d065963dc102cfceb15d9d";

const MINING_CITIES = [
  { name: "Dhanbad", icon: "", aqi: 156, temp: "34°C", humidity: "45%", type: "Coal Mining" },
  { name: "Korba", icon: "", aqi: 145, temp: "33°C", humidity: "40%", type: "Coal Mining" },
  { name: "Talcher", icon: "", aqi: 162, temp: "35°C", humidity: "38%", type: "Coal Mining" },
  { name: "Singrauli", icon: "", aqi: 158, temp: "36°C", humidity: "35%", type: "Coal Mining" },
  { name: "Jharia", icon: "", aqi: 170, temp: "34°C", humidity: "42%", type: "Coal Mining" },
  { name: "Raniganj", icon: "", aqi: 148, temp: "33°C", humidity: "44%", type: "Coal Mining" },
  { name: "Neyveli", icon: "", aqi: 135, temp: "32°C", humidity: "48%", type: "Lignite Mining" },
  { name: "Chandrapur", icon: "", aqi: 152, temp: "35°C", humidity: "39%", type: "Coal Mining" }
];

// Helper function to get AQI status color
const getAqiStatusColor = (aqi) => {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 150) return 'sensitive';
  if (aqi <= 200) return 'unhealthy';
  if (aqi <= 300) return 'very-unhealthy';
  return 'hazardous';
};

// Helper function to get AQI status text
const getAqiStatusText = (aqi) => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

// Helper function to get AQI level text
const getAqiLevelText = (aqi) => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

// Helper function to get AQI color class
const getAqiColorClass = (aqi) => {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 150) return 'sensitive';
  if (aqi <= 200) return 'unhealthy';
  if (aqi <= 300) return 'very-unhealthy';
  return 'hazardous';
};

// Calculate AQI based on pollutant concentrations
const calculateAQI = (components) => {
  // PM2.5 breakpoints
  const pm25Breakpoints = [
    { min: 0, max: 12, aqi: { min: 0, max: 50 } },
    { min: 12.1, max: 35.4, aqi: { min: 51, max: 100 } },
    { min: 35.5, max: 55.4, aqi: { min: 101, max: 150 } },
    { min: 55.5, max: 150.4, aqi: { min: 151, max: 200 } },
    { min: 150.5, max: 250.4, aqi: { min: 201, max: 300 } },
    { min: 250.5, max: 500.4, aqi: { min: 301, max: 500 } }
  ];

  // PM10 breakpoints
  const pm10Breakpoints = [
    { min: 0, max: 54, aqi: { min: 0, max: 50 } },
    { min: 55, max: 154, aqi: { min: 51, max: 100 } },
    { min: 155, max: 254, aqi: { min: 101, max: 150 } },
    { min: 255, max: 354, aqi: { min: 151, max: 200 } },
    { min: 355, max: 424, aqi: { min: 201, max: 300 } },
    { min: 425, max: 604, aqi: { min: 301, max: 500 } }
  ];

  const calculatePollutantAQI = (concentration, breakpoints) => {
    for (const bp of breakpoints) {
      if (concentration >= bp.min && concentration <= bp.max) {
        return Math.round(
          ((bp.aqi.max - bp.aqi.min) / (bp.max - bp.min)) * 
          (concentration - bp.min) + 
          bp.aqi.min
        );
      }
    }
    return concentration > breakpoints[breakpoints.length - 1].max ? 500 : 0;
  };

  const pm25AQI = calculatePollutantAQI(components.pm2_5, pm25Breakpoints);
  const pm10AQI = calculatePollutantAQI(components.pm10, pm10Breakpoints);

  // Return the highest AQI value
  return Math.max(pm25AQI, pm10AQI);
};

// Mining safety recommendations based on AQI
const getMiningRecommendations = (aqi) => {
  if (aqi <= 50) return [
    "Standard safety protocols apply",
    "Regular dust monitoring in mine shafts",
    "Normal ventilation systems sufficient",
    "Continue regular coal dust suppression"
  ];
  if (aqi <= 100) return [
    "Increase ventilation in underground mines",
    "Enhance water spraying at coal handling plants",
    "Monitor methane levels closely",
    "Workers in deep mines must wear dust masks",
    "Increase frequency of air quality checks"
  ];
  if (aqi <= 150) return [
    "Enhanced ventilation required in all mine areas",
    "Mandatory PPE for all underground workers",
    "Reduce exposure time in high-dust zones",
    "Increase dust suppression at transfer points",
    "Consider reducing non-essential mining operations"
  ];
  return [
    "Implement emergency ventilation protocols",
    "All underground operations require high-grade PPE",
    "Minimize workforce in deep mining areas",
    "Halt non-essential underground operations",
    "Activate emergency dust control measures",
    "Monitor worker health closely"
  ];
};

// Chatbot responses
const CHATBOT_RESPONSES = {
  greeting: [
    "Hello! I'm your mining safety assistant. How can I help you today?",
    "Welcome! I can help you with air quality and safety information. What would you like to know?"
  ],
  aqi_info: [
    "The Air Quality Index (AQI) measures pollution levels. Higher numbers indicate worse air quality.",
    "Would you like to know more about specific pollutants or safety measures?"
  ],
  safety_tips: [
    "Always wear appropriate PPE in mining areas.",
    "Check ventilation systems regularly.",
    "Monitor gas levels continuously.",
    "Keep emergency equipment readily accessible."
  ],
  emergency: [
    "In case of emergency:",
    "1. Evacuate the affected area immediately",
    "2. Contact your supervisor",
    "3. Follow emergency protocols",
    "4. Use emergency breathing apparatus if needed"
  ]
};

const AirQualityAlert = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: CHATBOT_RESPONSES.greeting[0] }
  ]);
  const [userInput, setUserInput] = useState('');
  const [airQualityData, setAirQualityData] = useState({
    aqi: 117,
    pm25: 43,
    pm10: 107,
    status: "Poor",
    temperature: 36,
    humidity: 5,
    windSpeed: 6,
    uvIndex: 10
  });
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const searchTimeout = useRef(null);

  // Debounced search function
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      setSearchError(null);
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    
    try {
      const apiKey = 'ee59cf9309d065963dc102cfceb15d9d';
      const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${apiKey}`;
      
      const geoResponse = await fetch(geocodingUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!geoResponse.ok) {
        throw new Error(`Geocoding failed: ${geoResponse.statusText}`);
      }
      
      const geoData = await geoResponse.json();
      
      if (!geoData || !Array.isArray(geoData) || geoData.length === 0) {
        throw new Error('Location not found. Please try a different location.');
      }
      
      const { lat, lon, name, country } = geoData[0];
      if (typeof lat !== 'number' || typeof lon !== 'number') {
        throw new Error('Invalid location coordinates received');
      }
      
      const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      
      const [aqiResponse, weatherResponse] = await Promise.all([
        fetch(aqiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        }),
        fetch(weatherUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        })
      ]);

      if (!aqiResponse.ok) {
        throw new Error(`Air quality data fetch failed: ${aqiResponse.statusText}`);
      }
      if (!weatherResponse.ok) {
        throw new Error(`Weather data fetch failed: ${weatherResponse.statusText}`);
      }
      
      const [aqiData, weatherData] = await Promise.all([
        aqiResponse.json(),
        weatherResponse.json()
      ]);
      
      if (!aqiData.list || !aqiData.list[0]) {
        throw new Error('Air quality data not available for this location');
      }

      const currentAqi = aqiData.list[0];
      const standardAQI = calculateAQI(currentAqi.components);
      
      setSearchResults({
        location: `${name}, ${country}`,
        aqi: standardAQI,
        aqiLevel: getAqiLevelText(standardAQI),
        aqiColorClass: getAqiColorClass(standardAQI),
        components: {
          pm2_5: currentAqi.components.pm2_5.toFixed(1),
          pm10: currentAqi.components.pm10.toFixed(1),
          no2: currentAqi.components.no2.toFixed(1),
          so2: currentAqi.components.so2.toFixed(1),
          co: currentAqi.components.co.toFixed(1),
          o3: currentAqi.components.o3.toFixed(1)
        },
        weather: {
          temp: Math.round(weatherData.main.temp),
          humidity: weatherData.main.humidity,
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
          windSpeed: (weatherData.wind.speed * 3.6).toFixed(1) // Convert m/s to km/h
        }
      });
    } catch (error) {
      console.error('Search error:', error);
      setSearchError(
        error.message === 'Failed to fetch' 
          ? 'Network error: Please check your internet connection'
          : error.message
      );
      setSearchResults(null);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle input change with debouncing
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    
    // Set new timeout for debouncing
    searchTimeout.current = setTimeout(() => {
      handleSearch(query);
    }, 500); // Wait 500ms after user stops typing
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  // Handle city search
  const handleCitySearch = async (e) => {
    e.preventDefault();
    const foundCity = MINING_CITIES.find(
      city => city.name.toLowerCase() === searchQuery.toLowerCase()
    );
    
    if (foundCity) {
      setSelectedCity(foundCity);
      setAirQualityData({
        aqi: foundCity.aqi,
        pm25: Math.round(foundCity.aqi * 0.4),
        pm10: Math.round(foundCity.aqi * 0.8),
        status: getAqiStatusText(foundCity.aqi),
        temperature: parseInt(foundCity.temp),
        humidity: parseInt(foundCity.humidity),
        windSpeed: 6,
        uvIndex: 10
      });
    } else {
      alert('City not found. Please try one of the mining cities shown below.');
    }
  };

  // Generate different data for 7-day view
  const getChartData = () => {
    const baseAqi = selectedCity ? selectedCity.aqi : airQualityData.aqi;
    
    if (selectedTimeRange === '24h') {
      return Array.from({ length: 7 }, (_, i) => ({
        time: `${11 + i}:00`,
        aqi: baseAqi + Math.round(Math.sin(i) * 10),
        pm2_5: Math.round((baseAqi + Math.sin(i) * 10) * 0.4),
        pm10: Math.round((baseAqi + Math.sin(i) * 10) * 0.8)
      }));
    } else {
      return Array.from({ length: 7 }, (_, i) => ({
        time: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        aqi: baseAqi + Math.round(Math.sin(i) * 15),
        pm2_5: Math.round((baseAqi + Math.sin(i) * 15) * 0.4),
        pm10: Math.round((baseAqi + Math.sin(i) * 15) * 0.8)
      }));
    }
  };

  // Handle chat messages
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message
    const newMessages = [...chatMessages, { type: 'user', text: userInput }];
    
    // Generate bot response based on keywords
    let botResponse = "";
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi')) {
      botResponse = CHATBOT_RESPONSES.greeting[1];
    } else if (input.includes('aqi') || input.includes('air quality')) {
      botResponse = CHATBOT_RESPONSES.aqi_info[0];
    } else if (input.includes('safety') || input.includes('protect')) {
      botResponse = CHATBOT_RESPONSES.safety_tips.join('\n');
    } else if (input.includes('emergency') || input.includes('danger')) {
      botResponse = CHATBOT_RESPONSES.emergency.join('\n');
    } else {
      botResponse = "I'm here to help with mining safety and air quality questions. Could you please be more specific?";
    }

    newMessages.push({ type: 'bot', text: botResponse });
    setChatMessages(newMessages);
    setUserInput('');
  };

  return (
    <div className="air-quality-dashboard">
      {/* Navigation */}
      <div className="nav-breadcrumb">
        <FaArrowLeft style={{ cursor: 'pointer' }} onClick={() => navigate('/alert')} /> 
        <a href="#" onClick={() => navigate('/alert')}>Back to Alerts</a> / Air Quality
      </div>

      {/* Page Title */}
      <h1 className="page-title">Mining Areas Air Quality Index (AQI) | Air Pollution</h1>
      <p className="page-subtitle">Real-time PM2.5, PM10 air pollution level in Mining Regions</p>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-input-container">
          <div className="search-input-wrapper">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Enter any location to check air quality..."
              aria-label="Search location"
            />
            <FaSearch className="search-icon" />
          </div>
        </div>
        
        {isSearching && (
          <div className="loading-message">
            Searching...
          </div>
        )}
        
        {searchError && (
          <div className="error-message">
            {searchError}
          </div>
        )}
      </div>

      {/* Mining Cities Grid */}
      <div className="metro-cities-grid">
        {MINING_CITIES.map(city => (
          <div key={city.name} className="city-card" onClick={() => {
            setSearchQuery(city.name);
            setSelectedCity(city);
            setAirQualityData({
              aqi: city.aqi,
              pm25: Math.round(city.aqi * 0.4),
              pm10: Math.round(city.aqi * 0.8),
              status: getAqiStatusText(city.aqi),
              temperature: parseInt(city.temp),
              humidity: parseInt(city.humidity),
              windSpeed: 6,
              uvIndex: 10
            });
          }}>
            <div className="city-icon">{city.icon}</div>
            <div className="city-name">{city.name}</div>
            <div className="city-type">{city.type}</div>
            <div className={`city-aqi ${getAqiStatusColor(city.aqi)}`}>{city.aqi}</div>
            <div className="city-metrics">
              <span>Temp: {city.temp}</span>
              <span>Hum: {city.humidity}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main AQI Display */}
      {searchResults ? (
        <div className="aqi-main-display">
          <div className="aqi-main-content">
            <div>
              <div className="live-indicator">
                <span className="live-dot"></span>
                Live Air Quality Data
              </div>
              <h2 className="location-title">{searchResults.location}</h2>
              <div className={`aqi-value-large ${searchResults.aqiColorClass}`}>
                {searchResults.aqi}
              </div>
              <div className={`aqi-status ${searchResults.aqiColorClass}`}>
                Air Quality is {searchResults.aqiLevel}
              </div>
              
              <div className="aqi-details">
                <div className="aqi-detail-item">
                  <WiDust /> PM2.5: {searchResults.components.pm2_5} µg/m³
                </div>
                <div className="aqi-detail-item">
                  <WiDust /> PM10: {searchResults.components.pm10} µg/m³
                </div>
              </div>
            </div>
            
            <div className="weather-info">
              <div className="weather-item">
                <FaThermometerHalf /> {searchResults.weather.temp}°C
              </div>
              <div className="weather-item">
                <FaTint /> {searchResults.weather.humidity}% Humidity
              </div>
              <div className="weather-item">
                <FaWind /> {searchResults.weather.windSpeed} km/h
              </div>
              <div className="weather-item">
                <img 
                  src={`https://openweathermap.org/img/wn/${searchResults.weather.icon}@2x.png`}
                  alt={searchResults.weather.description}
                  className="weather-icon"
                />
                {searchResults.weather.description}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="aqi-main-display">
          <div className="aqi-main-content">
            <div className="aqi-info">
              <div className="live-indicator">
                <span className="live-dot"></span> LIVE
              </div>
              <div className="aqi-value-large">{airQualityData.aqi}</div>
              <div className="aqi-status">Air Quality is {getAqiStatusText(airQualityData.aqi)}</div>
              <div className="aqi-details">
                <div className="aqi-detail-item">
                  <WiDust /> PM10: {airQualityData.pm10} µg/m³
                </div>
                <div className="aqi-detail-item">
                  <WiDust /> PM2.5: {airQualityData.pm25} µg/m³
                </div>
              </div>
            </div>
            <div className="weather-info">
              <div className="weather-item">
                <FaThermometerHalf /> {airQualityData.temperature}°C
              </div>
              <div className="weather-item">
                <FaTint /> Humidity: {airQualityData.humidity}%
              </div>
              <div className="weather-item">
                <FaWind /> Wind Speed: {airQualityData.windSpeed} km/h
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pollutants Section */}
      {searchResults && (
        <div className="pollutants-section">
          <h3 className="section-title">
            <WiDust /> Detailed Air Quality Components
          </h3>
          <div className="pollutants-grid">
            <div className="pollutant-card">
              <WiDust className="pollutant-icon" />
              <div className="pollutant-info">
                <h4>PM2.5</h4>
                <div className="pollutant-value">
                  {searchResults.components.pm2_5} <span className="pollutant-unit">µg/m³</span>
                </div>
              </div>
            </div>
            <div className="pollutant-card">
              <WiDust className="pollutant-icon" />
              <div className="pollutant-info">
                <h4>PM10</h4>
                <div className="pollutant-value">
                  {searchResults.components.pm10} <span className="pollutant-unit">µg/m³</span>
                </div>
              </div>
            </div>
            <div className="pollutant-card">
              <WiDust className="pollutant-icon" />
              <div className="pollutant-info">
                <h4>NO₂</h4>
                <div className="pollutant-value">
                  {searchResults.components.no2} <span className="pollutant-unit">µg/m³</span>
                </div>
              </div>
            </div>
            <div className="pollutant-card">
              <WiDust className="pollutant-icon" />
              <div className="pollutant-info">
                <h4>SO₂</h4>
                <div className="pollutant-value">
                  {searchResults.components.so2} <span className="pollutant-unit">µg/m³</span>
                </div>
              </div>
            </div>
            <div className="pollutant-card">
              <WiDust className="pollutant-icon" />
              <div className="pollutant-info">
                <h4>CO</h4>
                <div className="pollutant-value">
                  {searchResults.components.co} <span className="pollutant-unit">mg/m³</span>
                </div>
              </div>
            </div>
            <div className="pollutant-card">
              <WiDust className="pollutant-icon" />
              <div className="pollutant-info">
                <h4>O₃</h4>
                <div className="pollutant-value">
                  {searchResults.components.o3} <span className="pollutant-unit">µg/m³</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Historical Data Chart */}
      <div className="chart-section">
        <div className="chart-header">
          <h2 className="chart-title">Historical Air Quality Data</h2>
          <div className="chart-controls">
            <div className="time-range-selector">
              <button 
                className={`time-range-btn ${selectedTimeRange === '24h' ? 'active' : ''}`}
                onClick={() => setSelectedTimeRange('24h')}
              >
                24 Hours
              </button>
              <button 
                className={`time-range-btn ${selectedTimeRange === '7d' ? 'active' : ''}`}
                onClick={() => setSelectedTimeRange('7d')}
              >
                7 Days
              </button>
            </div>
          </div>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="aqi" stroke="#ff4d4f" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="pm2_5" stroke="#e74c3c" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="pm10" stroke="#2ecc71" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mining Recommendations */}
      <div className="mining-recommendations">
        <div className="recommendations-header">
          <h2 className="section-title">
            <FaHardHat /> Mining Safety Recommendations
          </h2>
          <div className="header-buttons">
            <button 
              className="ai-assistant-btn"
              onClick={() => setShowAiSuggestions(!showAiSuggestions)}
            >
              <FaRobot /> AI Assistant
            </button>
            <button 
              className="chat-btn"
              onClick={() => setShowChat(!showChat)}
            >
              <FaComments /> Chat Support
            </button>
          </div>
        </div>
        <div className="recommendations-grid">
          {getMiningRecommendations(searchResults ? searchResults.aqi : airQualityData.aqi).map((rec, index) => (
            <div key={index} className="recommendation-card">
              <FaExclamationTriangle className="recommendation-icon" />
              <p>{rec}</p>
            </div>
          ))}
        </div>
        {showAiSuggestions && (
          <div className="ai-suggestions">
            <h3>AI Assistant Suggestions</h3>
            <div className="ai-suggestions-grid">
              {[
                "Would you like me to analyze dust levels in mine shafts?",
                "I can help optimize ventilation systems based on current conditions.",
                "Let me suggest safe working hours for different mining areas.",
                "I can recommend specific PPE for different mining operations.",
                "Would you like to see correlations between mining activity and air quality?"
              ].map((suggestion, index) => (
                <div key={index} className="ai-suggestion-card">
                  <FaRobot className="ai-icon" />
                  <p>{suggestion}</p>
                  <button className="ai-action-btn">Get Insights</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Buttons */}
      <div className="floating-buttons">
        <button 
          className="floating-button ai-assistant-btn"
          onClick={() => setShowAiSuggestions(true)}
        >
          <span className="button-icon">🤖</span>
          <span className="button-text">AI Assistant</span>
        </button>
        <button 
          className="floating-button chat-support-btn"
          onClick={() => setShowChat(true)}
        >
          <span className="button-icon">💬</span>
          <span className="button-text">Chat Support</span>
        </button>
      </div>

      {/* Chatbot */}
      {showChat && (
        <div className="chat-window">
          <div className="chat-header">
            <FaRobot /> Mining Safety Assistant
            <button className="close-chat" onClick={() => setShowChat(false)}>×</button>
          </div>
          <div className="chat-messages">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.type}`}>
                {msg.type === 'bot' && <FaRobot className="chat-icon" />}
                <div className="message-text">{msg.text}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="chat-input-form">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your question here..."
              className="chat-input"
            />
            <button type="submit" className="chat-send-btn">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AirQualityAlert;
