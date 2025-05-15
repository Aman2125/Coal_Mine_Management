import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Calendar from './pages/Calendar';
import DateDetails from './pages/DateDetails';
import Guideline1Page from './pages/Guideline1Page';
import Guideline2Page from './pages/Guideline2Page.js';
import Guideline3Page from './pages/Guideline3Page';
import LeaveApplicationForm from './pages/LeaveApplicationForm';

import OperationalMetricsPage from './pages/OperationalMetricsPage';
import SafetyAlertsPage from './pages/SafetyAlertsPage';
import ComplianceStatusPage from './pages/ComplianceStatusPage';
import DGMSGuidelinesPage from './pages/DGMSGuidelinesPage';
import TrackComplaintPage from './pages/TrackComplaintPage';
import HomePage from './pages/HomePage';

// Page Components
import FrontPage from './pages/FrontPage';
import LoginPage from './pages/LoginPage';
import SafetyGuidelinesPage from './pages/SafetyGuidelinesPage';
import Alert from './pages/Alert.js';
import MonthYearSelector from './pages/MonthYearSelector';
import AttendanceLogbookPage from './pages/AttendanceLogbookPage.js';
import MachineryMaintenance from './pages/MachineryMaintenance.js';
import ProfileAccessPage from './pages/ProfileAccessPage';
import Dashboard from './pages/Dashboard';
import NewRegistrationPage from './pages/NewRegistrationPage';
import ClaimReportPage from './pages/ClaimReportPage';
import FAQ from './pages/FAQ.js';
import ProfilePage from './pages/ProfilePage.js';

// Import FrontPageLogOut, AdminDashboard, and ManageUsers components
import FrontPageLogOut from './pages/FrontPageLogOut'; 
import AdminDashboard from './pages/AdminDashboard'; 
import ManageUsers from './pages/ManageUsers'; // Import ManageUsers

// Import AttendanceLeave Component
import AttendanceLeave from './pages/AttendanceLeave'; // Added AttendanceLeave path

function App() {
  const [dateDetails, setDateDetails] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleSaveDetails = (date, updatedDetails) => {
    setDateDetails({ ...dateDetails, [date]: updatedDetails });
    setSelectedDate(null); // Close the modal after saving
  };

  const handleClose = () => {
    setSelectedDate(null);
  };

  return (
    <>
      <Routes>
        {/* Calendar route with date selection */}
        <Route
          path="/calendar/:year/:month"
          element={
            <Calendar
              onDateClick={handleDateClick}
              dateDetails={dateDetails}
              year={new Date().getFullYear()}
              month={new Date().getMonth() + 1}
            />
          }
        />

        {/* Main App Routes */}
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/safety-guidelines" element={<SafetyGuidelinesPage />} />
        <Route path="/alert" element={<Alert />} />
        <Route path="/MonthYearSelector" element={<MonthYearSelector />} />
        <Route path="/attendance-logbook" element={<AttendanceLogbookPage />} />
        <Route path="/profile-access" element={<ProfileAccessPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/MachineryMaintenance" element={<MachineryMaintenance />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/new-registration" element={<NewRegistrationPage />} />

        {/* Newly added routes */}
        <Route path="/leave-application" element={<LeaveApplicationForm />} />
        <Route path="/operational-metrics" element={<OperationalMetricsPage />} />
        <Route path="/safety-alerts" element={<SafetyAlertsPage />} />
        <Route path="/compliance-status" element={<ComplianceStatusPage />} />
        <Route path="/claim-report" element={<ClaimReportPage />} />
        <Route path="/track-complaints" element={<TrackComplaintPage />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/dgms-guidelines" element={<DGMSGuidelinesPage />} />
        <Route path="/guideline1" element={<Guideline1Page />} />
        <Route path="/guideline2" element={<Guideline2Page />} />
        <Route path="/guideline3" element={<Guideline3Page />} />
        <Route path="/profile-page" element={<ProfilePage />} />

        {/* Attendance & Leave Route */}
        <Route path="/attendance-leave" element={<AttendanceLeave />} /> {/* Added AttendanceLeave route */}

        {/* FrontPageLogOut Route */}
        <Route path="/frontpage-logout" element={<FrontPageLogOut />} />

        {/* Admin Dashboard Route */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Manage Users Route (Admin only) */}
        <Route path="/manage-users" element={<ManageUsers />} /> {/* Added Manage Users Route */}
      </Routes>

      {/* Render DateDetails modal if a date is selected */}
      {selectedDate && (
        <DateDetails
          date={selectedDate}
          details={dateDetails[selectedDate] || {}}
          onClose={handleClose}
          onSave={handleSaveDetails}
        />
      )}
    </>
  );
}

export default App;
