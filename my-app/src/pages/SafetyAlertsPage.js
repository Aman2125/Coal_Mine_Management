import React, { useState } from 'react';
import './SafetyAlertsPage.css';

const initialAlerts = [
  { id: 1, type: 'Critical', message: 'High dust levels detected in section A.', timestamp: '2024-09-04 08:00', status: 'Unresolved' },
  { id: 2, type: 'High', message: 'Equipment maintenance overdue for conveyor belt.', timestamp: '2024-09-04 09:00', status: 'Unresolved' },
  { id: 3, type: 'Critical', message: 'Hazardous gas detected, evacuate immediately.', timestamp: '2024-09-04 10:00', status: 'Resolved' },
];

const SafetyAlertsPage = () => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [sortOrder, setSortOrder] = useState('critical');
  const [showForm, setShowForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    type: '',
    message: '',
    timestamp: '',
    status: 'Unresolved',
  });

  const sortAlerts = (alerts, order) => {
    const priorityOrder = { 'Critical': 1, 'High': 2, 'Medium': 3, 'Low': 4 };
    return alerts.slice().sort((a, b) => priorityOrder[a.type] - priorityOrder[b.type]);
  };

  const handleMarkAsResolved = (id) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, status: 'Resolved' } : alert
    ));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAlert((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlerts([...alerts, { ...newAlert, id: alerts.length + 1 }]);
    setNewAlert({
      type: '',
      message: '',
      timestamp: '',
      status: 'Unresolved',
    });
    setShowForm(false); // Close the form after submission
  };

  return (
    <div className="safety-alerts-container">
      <header className="header">
        <h2>Safety Alerts</h2>
        <button 
          className="add-alert-button" 
          onClick={() => setShowForm(!showForm)}
        >
          Add Alert
        </button>
      </header>
      <section className="alerts-section">
        <p>This section provides real-time safety alerts for the mining operation. Stay updated on any safety warnings or emergency procedures.</p>
        
        <div className="sorting-controls">
          <label>Sort by Priority:</label>
          <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {showForm && (
          <form className="add-alert-form" onSubmit={handleSubmit}>
            <label>
              Type:
              <select
                name="type"
                value={newAlert.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </label>
            <br />
            <label>
              Message:
              <textarea
                name="message"
                value={newAlert.message}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Timestamp:
              <input
                type="datetime-local"
                name="timestamp"
                value={newAlert.timestamp}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <button type="submit">Add Alert</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        )}

        <ul className="alerts-list">
          {sortAlerts(alerts, sortOrder).map((alert) => (
            <li key={alert.id} className={`alert-item ${alert.type.toLowerCase()}`}>
              <div className="alert-details">
                <p><strong>Type:</strong> {alert.type}</p>
                <p><strong>Message:</strong> {alert.message}</p>
                <p><strong>Timestamp:</strong> {alert.timestamp}</p>
                <p><strong>Status:</strong> {alert.status}</p>
              </div>
              {alert.status === 'Unresolved' && (
                <button onClick={() => handleMarkAsResolved(alert.id)} className="resolve-button">
                  Mark as Resolved
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SafetyAlertsPage;
