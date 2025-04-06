// src/pages/ClaimReportPage.js
import React, { useState } from 'react';

const ClaimReportPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        employeeId: '',
        date: '',
        complaint: '',
        attachment: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            attachment: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Save data to local storage
        const storedComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
        storedComplaints.push({
            ...formData,
            status: 'Pending', // Set initial status
        });
        localStorage.setItem('complaints', JSON.stringify(storedComplaints));

        console.log('Stored Complaints:', storedComplaints); // Debugging line

        // Reset the form after submission
        setFormData({
            name: '',
            address: '',
            phone: '',
            employeeId: '',
            date: '',
            complaint: '',
            attachment: null,
        });

        alert('Your claim/report has been submitted to the supervisor.');
    };

    return (
        <div className="claim-report-page">
            <h1>Submit a Claim/Report</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Employee ID:</label>
                    <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Complaint/Claim:</label>
                    <textarea name="complaint" value={formData.complaint} onChange={handleChange} rows="5" required />
                </div>
                <div className="form-group">
                    <label>Attachment:</label>
                    <input type="file" name="attachment" onChange={handleFileChange} />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default ClaimReportPage;