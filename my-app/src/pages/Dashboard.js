import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import io from 'socket.io-client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaHardHat, 
  FaGasPump, 
  FaThermometerHalf, 
  FaMapMarkerAlt,
  FaIndustry,
  FaChartLine
} from 'react-icons/fa';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SOCKET_SERVER_URL = 'http://localhost:9002';

// Mine Information
const MINE_INFO = {
  name: "Korba Coal Mine",
  location: "Korba, Chhattisgarh",
  coordinates: "22.3595° N, 82.7501° E",
  type: "Open Cast Coal Mine",
  area: "50 sq km",
  depth: "200 meters",
  operator: "Coal India Limited"
};

// Safety Thresholds
const SAFETY_THRESHOLDS = {
  methane: { warning: 1.0, danger: 1.5 }, // % concentration
  carbonMonoxide: { warning: 25, danger: 50 }, // ppm
  oxygenLevel: { warning: 19.5, danger: 18 }, // %
  temperature: { warning: 35, danger: 40 }, // °C
  humidity: { warning: 85, danger: 95 } // %
};

// Mock data generators with realistic values
const generateMockGasLevels = () => ({
  methane: 0.5 + Math.random() * 1.5, // 0.5-2.0%
  carbonMonoxide: 10 + Math.random() * 40, // 10-50 ppm
  oxygenLevel: 18 + Math.random() * 3 // 18-21%
});

const generateMockTemperature = () => 28 + Math.random() * 12; // 28-40°C
const generateMockHumidity = () => 65 + Math.random() * 30; // 65-95%

const Dashboard = () => {
  const [socket, setSocket] = useState(null);
  const [safetyAlerts, setSafetyAlerts] = useState([]);
  const [stats, setStats] = useState({
    safetyScore: 95,
    activeWorkers: {
      total: 245,
      underground: 180,
      surface: 65
    },
    activeAlerts: 0,
    evacuationStatus: 'clear',
    shiftInfo: {
      current: 'Day Shift',
      workers: 82,
      supervisor: 'R. K. Singh'
    }
  });

  // Environmental data
  const [environmentalData, setEnvironmentalData] = useState({
    gasLevels: [],
    temperature: [],
    humidity: [],
    timestamps: []
  });

  // Production metrics
  const [productionData, setProductionData] = useState({
    today: 12500, // tons
    target: 15000, // tons
    efficiency: 83, // percentage
    operational_equipment: 28,
    total_equipment: 32
  });

  // Safety incidents data
  const [safetyIncidents, setSafetyIncidents] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    data: [2, 1, 0, 1, 0]
  });

  // Socket connection
  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  // Mock real-time data updates
  useEffect(() => {
    const updateEnvironmentalData = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString();

      setEnvironmentalData(prev => {
        const newGasLevels = generateMockGasLevels();
        const newTemp = generateMockTemperature();
        const newHumidity = generateMockHumidity();

        // Check thresholds and generate alerts
        if (newGasLevels.methane > SAFETY_THRESHOLDS.methane.warning) {
          generateSafetyAlert('gas', 'High methane levels detected in Section B', 
            newGasLevels.methane > SAFETY_THRESHOLDS.methane.danger ? 'critical' : 'warning');
        }

        if (newTemp > SAFETY_THRESHOLDS.temperature.warning) {
          generateSafetyAlert('temperature', 'High temperature in mining area C',
            newTemp > SAFETY_THRESHOLDS.temperature.danger ? 'critical' : 'warning');
        }

        return {
          gasLevels: [...prev.gasLevels.slice(-11), newGasLevels],
          temperature: [...prev.temperature.slice(-11), newTemp],
          humidity: [...prev.humidity.slice(-11), newHumidity],
          timestamps: [...prev.timestamps.slice(-11), timeStr]
        };
      });

      // Update production data
      setProductionData(prev => ({
        ...prev,
        today: prev.today + Math.floor(Math.random() * 100),
        efficiency: 80 + Math.floor(Math.random() * 5)
      }));
    };

    const interval = setInterval(updateEnvironmentalData, 5000);
    return () => clearInterval(interval);
  }, []);

  const generateSafetyAlert = (type, message, severity) => {
    setSafetyAlerts(prev => [{
      id: Date.now(),
      type,
      message,
      severity,
      timestamp: new Date().toISOString(),
      location: 'Section ' + String.fromCharCode(65 + Math.floor(Math.random() * 4)) // A, B, C, or D
    }, ...prev.slice(0, 4)]);
  };

  // Chart configurations
  const gasLevelsChart = {
    labels: environmentalData.timestamps,
    datasets: [
      {
        label: 'Methane (CH₄) %',
        data: environmentalData.gasLevels.map(g => g.methane),
        borderColor: 'rgb(255, 99, 132)',
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
      },
      {
        label: 'Carbon Monoxide (CO) ppm',
        data: environmentalData.gasLevels.map(g => g.carbonMonoxide),
        borderColor: 'rgb(75, 192, 192)',
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
      },
      {
        label: 'Oxygen (O₂) %',
        data: environmentalData.gasLevels.map(g => g.oxygenLevel),
        borderColor: 'rgb(53, 162, 235)',
        fill: true,
        backgroundColor: 'rgba(53, 162, 235, 0.1)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Real-time Environmental Monitoring',
        color: 'rgba(255, 255, 255, 0.9)',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="mine-info">
            <h1>{MINE_INFO.name}</h1>
            <div className="mine-details">
              <span><FaMapMarkerAlt /> {MINE_INFO.location}</span>
              <span><FaIndustry /> {MINE_INFO.type}</span>
              <span><FaHardHat /> {stats.shiftInfo.current} - {stats.shiftInfo.supervisor}</span>
            </div>
          </div>
          <div className="real-time-indicator">
            <span className="pulse"></span>
            Live Monitoring
          </div>
        </div>

        <div className="quick-stats">
          <div className="stat-card">
            <FaHardHat className="stat-icon" />
            <h3>Active Workers</h3>
            <div className="stat-value">{stats.activeWorkers.total}</div>
            <div className="stat-breakdown">
              <span>Underground: {stats.activeWorkers.underground}</span>
              <span>Surface: {stats.activeWorkers.surface}</span>
            </div>
          </div>
          <div className="stat-card">
            <FaChartLine className="stat-icon" />
            <h3>Production Today</h3>
            <div className="stat-value">{productionData.today.toLocaleString()} tons</div>
            <div className="stat-breakdown">
              <span>Target: {productionData.target.toLocaleString()} tons</span>
              <span>Efficiency: {productionData.efficiency}%</span>
            </div>
          </div>
          <div className={`stat-card ${stats.evacuationStatus !== 'clear' ? 'danger' : ''}`}>
            <FaExclamationTriangle className="stat-icon" />
            <h3>Safety Status</h3>
            <div className="stat-value">{stats.safetyScore}%</div>
            <div className="stat-breakdown">
              <span>Equipment: {productionData.operational_equipment}/{productionData.total_equipment}</span>
              <span>Alerts: {safetyAlerts.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="grid-item chart-container">
          <h2><FaGasPump /> Gas Levels Monitoring</h2>
          <Line data={gasLevelsChart} options={chartOptions} />
        </div>

        <div className="grid-item alerts-panel">
          <h2>Safety Alerts</h2>
          <div className="alert-list">
            {safetyAlerts.map(alert => (
              <div key={alert.id} className={`alert-item ${alert.type} ${alert.severity}`}>
                <div className="alert-icon">
                  <FaExclamationTriangle />
                </div>
                <div className="alert-content">
                  <p>{alert.message}</p>
                  <div className="alert-details">
                    <span className="location"><FaMapMarkerAlt /> {alert.location}</span>
                    <span className="timestamp">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
