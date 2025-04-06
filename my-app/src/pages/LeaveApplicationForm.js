import React, { useState } from 'react';
import './LeaveApplicationForm.css'; // Import the CSS file for styling

const LeaveApplicationForm = () => {
  const [formData, setFormData] = useState({
    applicantName: '',
    designation: '',
    casualLeave: '',
    periodOfLeave: '',
    purposeOfLeave: '',
    addressWhileOnLeave: '',
    otherRemarks: '',
    date: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission, like sending data to an API
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="leave-application-container">
      <h2>Casual Leave Application Form</h2>
      <form onSubmit={handleSubmit} className="leave-form">
        <div className="form-group">
          <label>Applicant's Name:</label>
          <input
            type="text"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Designation:</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Casual Leave Availed During the Year:</label>
          <input
            type="number"
            name="casualLeave"
            value={formData.casualLeave}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Period of Leave:</label>
          <input
            type="text"
            name="periodOfLeave"
            value={formData.periodOfLeave}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Purpose of Leave:</label>
          <input
            type="text"
            name="purposeOfLeave"
            value={formData.purposeOfLeave}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address While on Leave:</label>
          <input
            type="text"
            name="addressWhileOnLeave"
            value={formData.addressWhileOnLeave}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Other Remarks (If Leaving HQ):</label>
          <input
            type="text"
            name="otherRemarks"
            value={formData.otherRemarks}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Submit Application</button>
      </form>
    </div>
  );
};

export default LeaveApplicationForm;
