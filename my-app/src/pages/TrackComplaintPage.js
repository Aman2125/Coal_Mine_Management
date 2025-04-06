import React, { useState, useEffect } from 'react';

const TrackComplaintPage = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        // Retrieve data from local storage
        const storedComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
        console.log('Retrieved Complaints:', storedComplaints); // Debugging line
        setComplaints(storedComplaints);
    }, []);

    return (
        <div className="track-complaint-page">
            <h1>Track My Complaints</h1>
            <div className="complaint-list">
                {complaints.length === 0 ? (
                    <p>No complaints found.</p>
                ) : (
                    complaints.map((complaint, index) => (
                        <div
                            key={index}
                            className={`complaint-card ${
                                complaint.status === 'Resolved' ? 'resolved' : 'in-process'
                            }`}
                        >
                            <h3>Complaint ID: {index + 1}</h3>
                            <p><strong>Description:</strong> {complaint.complaint}</p>
                            <p><strong>Date Filed:</strong> {complaint.date}</p>
                            <p><strong>Status:</strong> {complaint.status}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TrackComplaintPage;