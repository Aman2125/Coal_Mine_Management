import React, { useEffect, useState } from 'react';
import './AttendanceLogbookPage.css';
import { Link } from 'react-router-dom';
import './FrontPage.css'; // Import the CSS file for styling
import logo from './satyamev.jpg';

<img src={logo} alt="Logo" className="header-logo" />


const FrontPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="frontpage-container">
      {/* New header section */}
      <header className="top-header">
        <div className="top-header-content">
        <img src={logo} alt="Logo" className="header-logo" />

          <div className="header-text">
            <h1>Ministry of Coal</h1>
            <p>Government of India</p>
          </div>
        </div>
      </header>

      <nav className="main-nav">
        <div className="nav-logo">
          <h1>CarbonX</h1>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/attendance">Attendance Report</Link></li>
          <li><Link to="/safety-guidelines">Safety Guidelines</Link></li>
          <li><Link to="/new-registration">New Registration</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/FAQ">FAQ</Link></li>
        </ul>
      </nav>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
          <div className="footer-info">
            <p>&copy; {new Date().getFullYear()} CarbonX. All rights reserved.</p>
            <p>1234 Carbon Lane, Suite 100, City, Country</p>
            <p>Email: support@carbonx.com | Phone: (123) 456-7890</p>
          </div>
        </div>
      </footer>
    </div>
  );
};


const AttendanceLogbookPage = () => {
  const [entries, setEntries] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [entryHour, setEntryHour] = useState('00');
  const [entryMinute, setEntryMinute] = useState('00');
  const [exitHour, setExitHour] = useState('00');
  const [exitMinute, setExitMinute] = useState('00');
  const [entryPeriod, setEntryPeriod] = useState('AM');
  const [exitPeriod, setExitPeriod] = useState('PM');
  const [remarks, setRemarks] = useState('Present');
  const [reasonForAbsence, setReasonForAbsence] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const updateClock = () => setCurrentTime(new Date());
    const timerId = setInterval(updateClock, 1000); // Update every second

    return () => clearInterval(timerId); // Cleanup on component unmount
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const formattedHours = hours.toString().padStart(2, '0');
    return `${formattedHours}:${minutes}:${seconds} ${period}`;
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleAddEntry = () => {
    if (!employeeName || !employeeId || !entryHour || !entryMinute || !exitHour || !exitMinute) {
      alert('Please fill in all fields.');
      return;
    }

    let reason = remarks === 'Absent' ? reasonForAbsence : 'None';
    let hoursWorked = calculateHoursWorked(entryHour, entryMinute, entryPeriod, exitHour, exitMinute, exitPeriod);

    const newEntry = {
      employeeName,
      employeeId,
      entryTime: `${entryHour}:${entryMinute} ${entryPeriod}`,
      exitTime: `${exitHour}:${exitMinute} ${exitPeriod}`,
      remarks,
      reasonForAbsence: reason,
      hoursWorked
    };

    if (isEditing) {
      const updatedEntries = [...entries];
      updatedEntries[editIndex] = newEntry;
      setEntries(updatedEntries);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setEntries([...entries, newEntry]);
    }

    clearForm();
  };

  const calculateHoursWorked = (entryHour, entryMinute, entryPeriod, exitHour, exitMinute, exitPeriod) => {
    const entryTime = new Date();
    entryTime.setHours(parseInt(entryHour, 10) + (entryPeriod === 'PM' && parseInt(entryHour, 10) !== 12 ? 12 : 0), parseInt(entryMinute, 10), 0);

    const exitTime = new Date();
    exitTime.setHours(parseInt(exitHour, 10) + (exitPeriod === 'PM' && parseInt(exitHour, 10) !== 12 ? 12 : 0), parseInt(exitMinute, 10), 0);

    const diffMs = exitTime - entryTime;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.round((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHrs}h ${diffMins}m`;
  };

  const clearForm = () => {
    setEmployeeName('');
    setEmployeeId('');
    setEntryHour('00');
    setEntryMinute('00');
    setExitHour('00');
    setExitMinute('00');
    setEntryPeriod('AM');
    setExitPeriod('PM');
    setRemarks('Present');
    setReasonForAbsence('');
  };

  const handleEditEntry = (index) => {
    const entry = entries[index];
    setEmployeeName(entry.employeeName);
    setEmployeeId(entry.employeeId);
    const [entryTimeHour, entryTimeMinute] = entry.entryTime.split(' ')[0].split(':');
    setEntryHour(entryTimeHour);
    setEntryMinute(entryTimeMinute);
    setEntryPeriod(entry.entryTime.split(' ')[1]);
    const [exitTimeHour, exitTimeMinute] = entry.exitTime.split(' ')[0].split(':');
    setExitHour(exitTimeHour);
    setExitMinute(exitTimeMinute);
    setExitPeriod(entry.exitTime.split(' ')[1]);
    setRemarks(entry.remarks);
    setReasonForAbsence(entry.reasonForAbsence);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleSearch = () => {
    const filtered = entries.filter(entry =>
      entry.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered;
  };

  const handlePrint = () => {
    const printContent = document.getElementById('logbook-table').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const filteredEntries = searchTerm ? handleSearch() : entries;

  return (
    <div className="container">
      <header className="header">
        <button className="print-button" onClick={handlePrint}>Print</button>
        <div className="top-right-info">
          <div id="clock">{formatTime(currentTime)}</div>
          <div id="date">{formatDate(currentTime)}</div>
        </div>
      </header>

      <div className="search-container">
        <input
          type="text"
          name="search"
          className="search-input"
          placeholder="Search by Name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <div className="headline">Attendance Logbook</div>

      <table className="logbook-table" id="logbook-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Entry Time</th>
            <th>Exit Time</th>
            <th>Remarks</th>
            <th>Reason for Absence</th>
            <th>Hours Worked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.employeeName}</td>
                <td>{entry.employeeId}</td>
                <td className="entry-time">{entry.entryTime}</td>
                <td className="exit-time">{entry.exitTime}</td>
                <td>{entry.remarks}</td>
                <td>{entry.reasonForAbsence}</td>
                <td>{entry.hoursWorked}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditEntry(index)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>No records found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="entry-form">
        <input
          type="text"
          placeholder="Employee Name"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />

        <div className="time-select-container">
          <div>
            <label>Entry Time:</label>
            <select
              className="time-select"
              value={entryHour}
              onChange={(e) => setEntryHour(e.target.value)}
            >
              {[...Array(12).keys()].map(i => <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>)}
            </select>
            <select
              className="time-select"
              value={entryMinute}
              onChange={(e) => setEntryMinute(e.target.value)}
            >
              {[...Array(60).keys()].map(i => <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>)}
            </select>
            <select
              className="time-select"
              value={entryPeriod}
              onChange={(e) => setEntryPeriod(e.target.value)}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <div>
            <label>Exit Time:</label>
            <select
              className="time-select"
              value={exitHour}
              onChange={(e) => setExitHour(e.target.value)}
            >
              {[...Array(12).keys()].map(i => <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>)}
            </select>
            <select
              className="time-select"
              value={exitMinute}
              onChange={(e) => setExitMinute(e.target.value)}
            >
              {[...Array(60).keys()].map(i => <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>)}
            </select>
            <select
              className="time-select"
              value={exitPeriod}
              onChange={(e) => setExitPeriod(e.target.value)}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <select
          name="remarks"
          value={remarks}
          onChange={(e) => {
            setRemarks(e.target.value);
            if (e.target.value === 'Absent') {
              setReasonForAbsence('None');
            } else {
              setReasonForAbsence('');
            }
          }}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        {remarks === 'Absent' && (
          <input
            type="text"
            placeholder="Reason for Absence"
            value={reasonForAbsence}
            onChange={(e) => setReasonForAbsence(e.target.value)}
          />
        )}

        <button className="add-button" onClick={handleAddEntry}>
          {isEditing ? 'Update Entry' : 'Add Entry'}
        </button>
      </div>
    </div>
  );
};

export default AttendanceLogbookPage;
