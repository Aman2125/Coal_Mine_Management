import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import io from 'socket.io-client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SOCKET_SERVER_URL = 'http://localhost:9002';

const Dashboard = () => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [airQuality, setAirQuality] = useState([]);
  const [safetyAlerts, setSafetyAlerts] = useState([]);
  const [stats, setStats] = useState({
    paperSaved: 0,
    activeDocuments: 0,
    safetyScore: 0,
    alerts: 0
  });

  // Socket connection
  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    // Cleanup on unmount
    return () => newSocket.close();
  }, []);

  // Socket event handlers
  useEffect(() => {
    if (!socket) return;

    // Initial data
    socket.on('initial-data', (data) => {
      setAirQuality(data.airQuality);
      setStats(prev => ({
        ...prev,
        safetyScore: data.safetyScore,
        paperSaved: data.paperSaved,
        alerts: data.activeAlerts
      }));
    });

    // Air quality updates
    socket.on('air-quality-update', (data) => {
      setAirQuality(prev => [...prev.slice(-11), data.value]);
    });

    // Safety score updates
    socket.on('safety-score-update', (data) => {
      setStats(prev => ({
        ...prev,
        safetyScore: data.score,
        paperSaved: prev.paperSaved + data.paperSaved
      }));
    });

    // New alerts
    socket.on('new-alert', (alert) => {
      setNotifications(prev => [alert, ...prev.slice(0, 4)]);
      if (alert.type === 'safety') {
        setSafetyAlerts(prev => [alert, ...prev.slice(0, 4)]);
      }
      setStats(prev => ({
        ...prev,
        alerts: prev.alerts + 1
      }));
    });

    return () => {
      socket.off('initial-data');
      socket.off('air-quality-update');
      socket.off('safety-score-update');
      socket.off('new-alert');
    };
  }, [socket]);

  // Initial documents data
  useEffect(() => {
    setDocuments([
      { id: 1, title: 'Safety Report', status: 'Updated', time: '2 mins ago' },
      { id: 2, title: 'Maintenance Log', status: 'Pending', time: '5 mins ago' },
      { id: 3, title: 'Inspection Record', status: 'Completed', time: '10 mins ago' }
    ]);
  }, []);

  const chartData = {
    labels: Array(12).fill('').map((_, i) => `${12 - i}m ago`),
    datasets: [
      {
        label: 'Air Quality Index',
        data: airQuality,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Real-time Air Quality Monitoring'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  const handleAlertAction = useCallback((alertId) => {
    setSafetyAlerts(prev => 
      prev.filter(alert => alert.id !== alertId)
    );
    setStats(prev => ({
      ...prev,
      alerts: Math.max(0, prev.alerts - 1)
    }));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Mine Operations Dashboard</h1>
          <div className="real-time-indicator">
            <span className="pulse"></span>
            Live Updates
          </div>
        </div>
        <div className="quick-stats">
          <div className="stat-card">
            <h3>Safety Score</h3>
            <div className="stat-value">{stats.safetyScore}%</div>
          </div>
          <div className="stat-card">
            <h3>Paper Saved</h3>
            <div className="stat-value">{stats.paperSaved} sheets</div>
          </div>
          <div className="stat-card">
            <h3>Active Alerts</h3>
            <div className="stat-value">{stats.alerts}</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="grid-item chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="grid-item notifications-panel">
          <h2>Live Notifications</h2>
          <div className="notification-list">
            {notifications.map(notification => (
              <div key={notification.id} className={`notification-item ${notification.type}`}>
                <div className="notification-content">
                  <p>{notification.message}</p>
                  <span className="timestamp">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid-item documents-panel">
          <h2>Recent Documents</h2>
          <div className="document-list">
            {documents.map(doc => (
              <div key={doc.id} className="document-item">
                <div className="doc-info">
                  <h3>{doc.title}</h3>
                  <span className={`status ${doc.status.toLowerCase()}`}>
                    {doc.status}
                  </span>
                </div>
                <span className="doc-time">{doc.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid-item alerts-panel">
          <h2>Safety Alerts</h2>
          <div className="alerts-list">
            {safetyAlerts.map(alert => (
              <div key={alert.id} className={`alert-item ${alert.level}`}>
                <div className="alert-icon">⚠️</div>
                <div className="alert-content">
                  <p>{alert.message}</p>
                  <button 
                    className="action-btn"
                    onClick={() => handleAlertAction(alert.id)}
                  >
                    Take Action
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="quick-actions-panel">
        <Link to="/digital-documents" className="action-link">
          <span className="icon">📄</span>
          Documents
        </Link>
        <Link to="/safety-alerts" className="action-link">
          <span className="icon">🚨</span>
          Alerts
        </Link>
        <Link to="/attendance-logbook" className="action-link">
          <span className="icon">📋</span>
          Attendance
        </Link>
        <Link to="/operational-metrics" className="action-link">
          <span className="icon">📊</span>
          Metrics
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
