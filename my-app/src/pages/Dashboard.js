import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom'; 
import './Dashboard.css';

const Dashboard = () => {
  const [shiftComplianceRate, setShiftComplianceRate] = useState('9%');
  const [incidentReportRate, setIncidentReportRate] = useState('$1.432');
  const [safetyExpenses, setSafetyExpenses] = useState([
    { label: 'Training Costs', value: '$34,566.23' },
    { label: 'Equipment Maintenance', value: '$45,000.21' },
  ]);
  const [incidentLogs, setIncidentLogs] = useState([
    { label: 'Incident 1', value: 'Resolved' },
    { label: 'Incident 2', value: 'Pending' },
  ]);
  const [announcements, setAnnouncements] = useState([
    { label: 'Holiday Notice', value: 'Sep 10, 2024' },
    { label: 'Safety Meeting', value: 'Sep 12, 2024' },
  ]);

  const [editing, setEditing] = useState({
    shiftComplianceRate: false,
    incidentReportRate: false,
    safetyExpenses: false,
    incidentLogs: false,
    announcements: false,
  });

  // Sample data for charts
  const lineChartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
  ];

  const barChartData = [
    { name: 'Mon', value: 20 },
    { name: 'Tue', value: 30 },
    { name: 'Wed', value: 25 },
    { name: 'Thu', value: 40 },
    { name: 'Fri', value: 35 },
  ];

  const pieChartData = [
    { name: 'Training', value: 400 },
    { name: 'Equipment', value: 300 },
    { name: 'Safety', value: 300 },
  ];

  // Function to generate random data
  const generateRandomData = () => {
    setShiftComplianceRate(`${Math.floor(Math.random() * 100)}%`);
    setIncidentReportRate(`$${(Math.random() * 2).toFixed(3)}`);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      generateRandomData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleEdit = (field) => {
    setEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleSave = (field) => {
    setEditing((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (field, e, index = null, subField = null) => {
    const newValue = e.target.value;
    if (field === 'shiftComplianceRate') {
      setShiftComplianceRate(newValue);
    }
    if (field === 'incidentReportRate') {
      setIncidentReportRate(newValue);
    }
    if (field === 'expenses') {
      const updatedExpenses = [...safetyExpenses];
      if (subField === 'label') {
        updatedExpenses[index].label = newValue;
      } else {
        updatedExpenses[index].value = newValue;
      }
      setSafetyExpenses(updatedExpenses);
    }
    if (field === 'incidentLogs') {
      const updatedLogs = [...incidentLogs];
      if (subField === 'label') {
        updatedLogs[index].label = newValue;
      } else {
        updatedLogs[index].value = newValue;
      }
      setIncidentLogs(updatedLogs);
    }
    if (field === 'announcements') {
      const updatedAnnouncements = [...announcements];
      if (subField === 'label') {
        updatedAnnouncements[index].label = newValue;
      } else {
        updatedAnnouncements[index].value = newValue;
      }
      setAnnouncements(updatedAnnouncements);
    }
  };

  const addExpense = () => {
    setSafetyExpenses([...safetyExpenses, { label: 'New Expense', value: '' }]);
    setEditing((prev) => ({ ...prev, safetyExpenses: true }));
  };

  const deleteExpense = (index) => {
    setSafetyExpenses(safetyExpenses.filter((_, i) => i !== index));
  };

  const addIncidentLog = () => {
    setIncidentLogs([...incidentLogs, { label: 'New Incident', value: '' }]);
    setEditing((prev) => ({ ...prev, incidentLogs: true }));
  };

  const deleteIncidentLog = (index) => {
    setIncidentLogs(incidentLogs.filter((_, i) => i !== index));
  };

  const addAnnouncement = () => {
    setAnnouncements([...announcements, { label: 'New Announcement', value: '' }]);
    setEditing((prev) => ({ ...prev, announcements: true }));
  };

  const deleteAnnouncement = (index) => {
    setAnnouncements(announcements.filter((_, i) => i !== index));
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <ul>
          <li>
            <Link to="/">Home</Link> 
          </li>
          <li>
            <Link to="/dashboard">Safety Dashboard</Link> 
          </li>
          <li>
            <Link to="/attendance-logbook">Attendance Logbook</Link> 
          </li>
          <li>
            <Link to="/safety-guidelines">Safety Guidelines</Link> 
          </li>
          <li>
            <Link to="/faq">FAQ</Link> 
          </li>
        </ul>
      </aside>
      <main className="main-content">
        <section className="safety-dashboard">
          <div className="dashboard-overview">
            <div className="overview-item">
              <h3>Shift Compliance Rate</h3>
              <input
                type="text"
                value={shiftComplianceRate}
                onChange={(e) => handleChange('shiftComplianceRate', e)}
                disabled={!editing.shiftComplianceRate}
                className="editable-field"
              />
              {!editing.shiftComplianceRate && (
                <button onClick={() => handleEdit('shiftComplianceRate')}>Edit</button>
              )}
              {editing.shiftComplianceRate && (
                <button onClick={() => handleSave('shiftComplianceRate')}>Save</button>
              )}
            </div>
            <div className="overview-item">
              <h3>Incident Report Rate</h3>
              <input
                type="text"
                value={incidentReportRate}
                onChange={(e) => handleChange('incidentReportRate', e)}
                disabled={!editing.incidentReportRate}
                className="editable-field"
              />
              {!editing.incidentReportRate && (
                <button onClick={() => handleEdit('incidentReportRate')}>Edit</button>
              )}
              {editing.incidentReportRate && (
                <button onClick={() => handleSave('incidentReportRate')}>Save</button>
              )}
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-item">
              <h3>Line Chart - Incident Reports</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-item">
              <h3>Bar Chart - Daily Safety Scores</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-item">
              <h3>Pie Chart - Resource Allocation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="safety-expenses">
          <h3>Safety Expenses</h3>
          {safetyExpenses.map((expense, index) => (
            <div key={index} className="expense-item">
              <input
                type="text"
                value={expense.label}
                onChange={(e) => handleChange('expenses', e, index, 'label')}
                disabled={!editing.safetyExpenses}
                placeholder="Expense Label"
              />
              <input
                type="text"
                value={expense.value}
                onChange={(e) => handleChange('expenses', e, index, 'value')}
                disabled={!editing.safetyExpenses}
                placeholder="Expense Value"
              />
              <button onClick={() => deleteExpense(index)}>Delete</button>
            </div>
          ))}
          <button className="add-button" onClick={addExpense}>Add Expense</button>
        </section>

        {/* Incident Log Section */}
        <section className="incident-logs">
          <h3>Incident Logs</h3>
          {incidentLogs.map((log, index) => (
            <div key={index} className="incident-item">
              <input
                type="text"
                value={log.label}
                onChange={(e) => handleChange('incidentLogs', e, index, 'label')}
                disabled={!editing.incidentLogs}
                placeholder="Incident Label"
              />
              <input
                type="text"
                value={log.value}
                onChange={(e) => handleChange('incidentLogs', e, index, 'value')}
                disabled={!editing.incidentLogs}
                placeholder="Incident Status"
              />
              <button onClick={() => deleteIncidentLog(index)}>Delete</button>
            </div>
          ))}
          <button className="add-button" onClick={addIncidentLog}>Add Incident Log</button>
        </section>

        {/* Announcements Section */}
        <section className="announcements">
          <h3>Announcements</h3>
          {announcements.map((announcement, index) => (
            <div key={index} className="announcement-item">
              <input
                type="text"
                value={announcement.label}
                onChange={(e) => handleChange('announcements', e, index, 'label')}
                disabled={!editing.announcements}
                placeholder="Announcement Title"
              />
              <input
                type="text"
                value={announcement.value}
                onChange={(e) => handleChange('announcements', e, index, 'value')}
                disabled={!editing.announcements}
                placeholder="Announcement Date"
              />
              <button onClick={() => deleteAnnouncement(index)}>Delete</button>
            </div>
          ))}
          <button className="add-button" onClick={addAnnouncement}>Add Announcement</button>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
