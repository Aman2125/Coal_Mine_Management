import React, { useEffect, useState, useCallback } from "react";
import { FaSearch, FaExclamationTriangle, FaHistory, FaThermometerHalf, FaMapMarkerAlt } from "react-icons/fa";
import { WiThunderstorm, WiEarthquake, WiHumidity, WiStrongWind, WiDust } from "react-icons/wi";
import { GiEarthCrack, GiMining } from "react-icons/gi";
import WeatherCard from "../components/WeatherCard";
import AirQualityCard from "../components/AirQualityCard";
import "./Alert.css";

const API_KEY = "ee59cf9309d065963dc102cfceb15d9d";

// Important mining regions in India
const MINING_REGIONS = [
  {
    state: "Jharkhand",
    regions: ["Dhanbad", "Bokaro", "Hazaribagh", "Ramgarh", "Giridih", "Chatra", "Godda"]
  },
  {
    state: "Odisha",
    regions: ["Talcher", "Angul", "Sambalpur", "Jharsuguda", "Sundargarh"]
  },
  {
    state: "Chhattisgarh",
    regions: ["Korba", "Raigarh", "Bilaspur", "Koriya", "Surguja"]
  },
  {
    state: "West Bengal",
    regions: ["Asansol", "Durgapur", "Raniganj", "Purulia"]
  },
  {
    state: "Madhya Pradesh",
    regions: ["Singrauli", "Umaria", "Shahdol", "Anuppur"]
  }
];

const Alert = () => {
  const [searchInput, setSearchInput] = useState("Jharkhand");
  const [location, setLocation] = useState("Jharkhand");
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [seismicAlerts, setSeismicAlerts] = useState([]);
  const [airQualityData, setAirQualityData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [activeTab, setActiveTab] = useState("weather");
  const [seismicFilter, setSeismicFilter] = useState("all");
  const [loading, setLoading] = useState({
    weather: false,
    seismic: false
  });

  // Constants for seismic data
  const INDIA_BOUNDS = {
    north: 35.5,
    south: 6.5,
    east: 97.5,
    west: 68.0
  };

  // List of major Indian mining states and regions
  const MINING_REGIONS_LIST = [
    "Jharkhand", "Bihar", "Odisha", "Chhattisgarh", "West Bengal",
    "Madhya Pradesh", "Maharashtra", "Telangana", "Andhra Pradesh"
  ];

  const isLocationInIndia = (lat, lng) => {
    return lat >= INDIA_BOUNDS.south && 
           lat <= INDIA_BOUNDS.north && 
           lng >= INDIA_BOUNDS.west && 
           lng <= INDIA_BOUNDS.east;
  };

  const isInMiningRegion = (place) => {
    return MINING_REGIONS_LIST.some(region => 
      place.toLowerCase().includes(region.toLowerCase())
    );
  };

  // Fetch weather data when location changes
  useEffect(() => {
    const fetchWeatherAndAirQuality = async () => {
      if (!location) return;
      
      setLoading(prev => ({ ...prev, weather: true }));
      try {
        // Fetch weather data
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        );
        const weatherData = await weatherResponse.json();

        if (weatherData.cod === "404") {
          console.error("Location not found");
          setWeatherAlerts([]);
          return;
        }

        const alerts = weatherData.weather.map((w, index) => ({
          id: `weather-${index}`,
          type: "Weather",
          message: `${w.description} in ${weatherData.name}, ${weatherData.sys.country}`,
          details: {
            temperature: `${Math.round(weatherData.main.temp)}°C`,
            "feels like": `${Math.round(weatherData.main.feels_like)}°C`,
            humidity: `${weatherData.main.humidity}%`,
            wind: `${Math.round(weatherData.wind.speed)} m/s`,
            pressure: `${weatherData.main.pressure} hPa`,
            region: weatherData.sys.country === "IN" ? "India" : "International",
            lat: weatherData.coord.lat,
            lon: weatherData.coord.lon
          },
          level: getWeatherAlertLevel(weatherData.main.temp, weatherData.wind.speed),
          timestamp: new Date().toISOString(),
          icon: w.icon,
          isIndian: weatherData.sys.country === "IN"
        }));

        setWeatherAlerts(alerts);

        // Fetch air quality data
        const { lat, lon } = weatherData.coord;
        const airQualityResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const airQualityData = await airQualityResponse.json();

        if (airQualityData.list && airQualityData.list.length > 0) {
          const aqiData = airQualityData.list[0];
          setAirQualityData({
            aqi: aqiData.main.aqi,
            components: {
              pm2_5: aqiData.components.pm2_5,
              pm10: aqiData.components.pm10,
              no2: aqiData.components.no2,
              so2: aqiData.components.so2,
              co: aqiData.components.co
            },
            location: weatherData.name,
            timestamp: new Date(aqiData.dt * 1000).toISOString()
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setWeatherAlerts([]);
        setAirQualityData(null);
      } finally {
        setLoading(prev => ({ ...prev, weather: false }));
      }
    };

    fetchWeatherAndAirQuality();
    const intervalId = setInterval(fetchWeatherAndAirQuality, 300000);
    return () => clearInterval(intervalId);
  }, [location]);

  // Debounced location suggestions
  const fetchLocationSuggestions = useCallback(async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    // List of important mining regions in India
    const miningRegions = [
      "Jharkhand", "Dhanbad", "Bokaro", "Ranchi", "Hazaribagh", "Ramgarh",
      "Odisha", "Talcher", "Angul", "Sambalpur", "Jharsuguda",
      "Chhattisgarh", "Korba", "Raigarh", "Bilaspur",
      "West Bengal", "Asansol", "Durgapur", "Raniganj",
      "Madhya Pradesh", "Singrauli", "Umaria",
      "Maharashtra", "Chandrapur", "Nagpur"
    ];

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${API_KEY}&units=metric&limit=10`
      );
      const data = await response.json();
      if (data.list) {
        const suggestions = data.list.map(city => ({
          name: city.name,
          country: city.sys.country,
          fullName: `${city.name}, ${city.sys.country}`,
          isMiningRegion: city.sys.country === "IN" && 
            miningRegions.some(region => 
              city.name.toLowerCase().includes(region.toLowerCase()) ||
              region.toLowerCase().includes(city.name.toLowerCase())
            )
        }));

        // Sort suggestions: Mining regions first, then Indian cities, then others
        const sortedSuggestions = suggestions.sort((a, b) => {
          if (a.isMiningRegion && !b.isMiningRegion) return -1;
          if (!a.isMiningRegion && b.isMiningRegion) return 1;
          if (a.country === "IN" && b.country !== "IN") return -1;
          if (a.country !== "IN" && b.country === "IN") return 1;
          return 0;
        });

        setSuggestions(sortedSuggestions);
      }
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      setSuggestions([]);
    }
  }, []);

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchInput.trim()) {
        fetchLocationSuggestions(searchInput);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput, fetchLocationSuggestions]);

  // Fetch seismic data
  useEffect(() => {
    const fetchSeismicAlerts = async () => {
      setLoading(prev => ({ ...prev, seismic: true }));
      try {
        // Fetch worldwide earthquakes in the past month with magnitude > 2.5
        const earthquakeResponse = await fetch(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"
        );
        const earthquakeData = await earthquakeResponse.json();

        const alerts = earthquakeData.features.map((eq) => {
          const lat = eq.geometry.coordinates[1];
          const lng = eq.geometry.coordinates[0];
          const isIndian = isLocationInIndia(lat, lng);
          const isMiningRegion = isInMiningRegion(eq.properties.place);

          return {
            id: `quake-${eq.id}`,
            type: "Seismic",
            message: `M${eq.properties.mag.toFixed(1)} - ${eq.properties.place}`,
            details: {
              magnitude: eq.properties.mag.toFixed(1),
              depth: `${Math.round(eq.properties.dmin * 111.19)} km`,
              location: eq.properties.place,
              significance: eq.properties.sig,
              "tsunami risk": eq.properties.tsunami ? "Yes" : "No",
              region: isIndian ? (isMiningRegion ? "Indian Mining Region" : "India") : "International"
            },
            level: getSeismicAlertLevel(eq.properties.mag),
            timestamp: new Date(eq.properties.time).toISOString(),
            coordinates: { lat, lng },
            isIndian,
            isMiningRegion
          };
        });

        // Sort alerts: Indian mining regions first, then Indian locations, then by magnitude
        const sortedAlerts = alerts.sort((a, b) => {
          if (a.isMiningRegion && !b.isMiningRegion) return -1;
          if (!a.isMiningRegion && b.isMiningRegion) return 1;
          if (a.isIndian && !b.isIndian) return -1;
          if (!a.isIndian && b.isIndian) return 1;
          return parseFloat(b.details.magnitude) - parseFloat(a.details.magnitude);
        });

        setSeismicAlerts(sortedAlerts);
      } catch (error) {
        console.error("Error fetching seismic alerts:", error);
      } finally {
        setLoading(prev => ({ ...prev, seismic: false }));
      }
    };

    fetchSeismicAlerts();
    const intervalId = setInterval(fetchSeismicAlerts, 300000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation.name); // Update location first
    setSearchInput(selectedLocation.fullName);
    setSuggestions([]);
  };

  const getWeatherAlertLevel = (temp, windSpeed) => {
    if (temp > 40 || temp < -10 || windSpeed > 20) return "danger";
    if (temp > 35 || temp < 0 || windSpeed > 15) return "warning";
    return "info";
  };

  const getSeismicAlertLevel = (magnitude) => {
    if (magnitude >= 6.0) return "danger";
    if (magnitude >= 4.5) return "warning";
    return "info";
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getAlertIcon = (type, level) => {
    if (type === "Weather") {
      return <WiThunderstorm className={`alert-icon ${level}`} />;
    }
    return <GiEarthCrack className={`alert-icon ${level}`} />;
  };

  const AlertCard = ({ alert }) => (
    <div className={`alert-card ${alert.level}`}>
      <div className="alert-header">
        <div className="alert-type">
          {getAlertIcon(alert.type, alert.level)}
          <span>{alert.type}</span>
        </div>
        <span className="alert-time">{formatTime(alert.timestamp)}</span>
      </div>
      <div className="alert-content">
        <h3>{alert.message}</h3>
        <div className="alert-details">
          {Object.entries(alert.details).map(([key, value]) => (
            <div key={key} className="detail-item">
              <span className="detail-label">
                {key === "temperature" && <FaThermometerHalf />}
                {key === "humidity" && <WiHumidity />}
                {key === "wind" && <WiStrongWind />}
                {key === "magnitude" && <WiEarthquake />}
                {key}:
              </span>
              <span className="detail-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const getFilteredSeismicAlerts = () => {
    switch (seismicFilter) {
      case "mining":
        return seismicAlerts.filter(alert => alert.isMiningRegion);
      case "india":
        return seismicAlerts.filter(alert => alert.isIndian && !alert.isMiningRegion);
      case "international":
        return seismicAlerts.filter(alert => !alert.isIndian);
      default:
        return seismicAlerts;
    }
  };

  // Helper function to get AQI status and color
  const getAqiInfo = (aqi) => {
    switch (aqi) {
      case 1:
        return { status: 'Good', color: '#00C853', textColor: '#004D1F' };
      case 2:
        return { status: 'Fair', color: '#FFD600', textColor: '#4D4000' };
      case 3:
        return { status: 'Moderate', color: '#FF9100', textColor: '#4D2B00' };
      case 4:
        return { status: 'Poor', color: '#FF3D00', textColor: '#4D1200' };
      case 5:
        return { status: 'Very Poor', color: '#D50000', textColor: '#400000' };
      default:
        return { status: 'Unknown', color: '#9E9E9E', textColor: '#2F2F2F' };
    }
  };

  return (
    <div className="alert-page">
      <div className="dashboard-header">
        <h1>Coal Mine Emergency Alert System</h1>
      </div>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'weather' ? 'active' : ''}`}
          onClick={() => setActiveTab('weather')}
        >
          <WiThunderstorm />
          Weather
        </button>
        <button
          className={`tab-btn ${activeTab === 'seismic' ? 'active' : ''}`}
          onClick={() => setActiveTab('seismic')}
        >
          <WiEarthquake />
          Seismic
        </button>
      </div>

      {activeTab === "weather" && (
        <div className="search-section">
          <div className="search-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search for mining regions or other locations..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
              />
              <FaSearch className="search-icon" />
            </div>
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li 
                    key={index} 
                    onClick={() => handleLocationSelect(suggestion)}
                    className={`suggestion-item ${suggestion.isMiningRegion ? 'mining-region' : ''}`}
                  >
                    <span className="city-name">
                      {suggestion.name}
                      {suggestion.isMiningRegion && 
                        <span className="mining-badge">Mining Region</span>
                      }
                    </span>
                    <span className="country-code">{suggestion.country}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mining-suggestions">
            <h3><GiMining /> Popular Mining Regions</h3>
            <div className="mining-regions-grid">
              {MINING_REGIONS.map((state) => (
                <div key={state.state} className="state-group">
                  <h4>{state.state}</h4>
                  <div className="regions-list">
                    {state.regions.map((region, index) => (
                      <button
                        key={`${state.state}-${index}`}
                        className="mining-region-tag"
                        onClick={() => {
                          setSearchInput(region);
                          setLocation(region);
                          setSuggestions([]);
                        }}
                      >
                        <FaMapMarkerAlt />
                        {region}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "seismic" && (
        <div className="seismic-filters">
          <button 
            className={`filter-btn ${seismicFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSeismicFilter('all')}
          >
            <GiEarthCrack />
            All Regions
          </button>
          <button 
            className={`filter-btn mining ${seismicFilter === 'mining' ? 'active' : ''}`}
            onClick={() => setSeismicFilter('mining')}
          >
            <GiMining />
            Indian Mining Regions
          </button>
          <button 
            className={`filter-btn india ${seismicFilter === 'india' ? 'active' : ''}`}
            onClick={() => setSeismicFilter('india')}
          >
            <FaMapMarkerAlt />
            Other Indian Regions
          </button>
          <button 
            className={`filter-btn international ${seismicFilter === 'international' ? 'active' : ''}`}
            onClick={() => setSeismicFilter('international')}
          >
            <WiEarthquake />
            International
          </button>
        </div>
      )}

      <div className="alerts-container">
        {activeTab === 'weather' && (
          <>
            {weatherAlerts.map((alert) => (
              <WeatherCard
                key={alert.id}
                weatherData={{
                  description: alert.message,
                  location: location,
                  temperature: alert.details.temperature.replace('°C', ''),
                  feelsLike: alert.details["feels like"].replace('°C', ''),
                  humidity: alert.details.humidity.replace('%', ''),
                  wind: alert.details.wind.replace(' m/s', ''),
                  pressure: alert.details.pressure.replace(' hPa', ''),
                  region: alert.details.region
                }}
              />
            ))}
            {weatherAlerts.length > 0 && weatherAlerts[0].details && (
              <AirQualityCard 
                location={{
                  lat: weatherAlerts[0].details.lat || 22.06,
                  lon: weatherAlerts[0].details.lon || 82.15,
                  name: location
                }} 
              />
            )}
          </>
        )}

        {activeTab === 'seismic' && (
          <div className="seismic-alerts">
            {loading.seismic ? (
              <div className="loading">Loading seismic data...</div>
            ) : getFilteredSeismicAlerts().length > 0 ? (
              getFilteredSeismicAlerts().map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))
            ) : (
              <div className="no-alerts">No seismic alerts available for the selected region</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
