import React, { useState, useEffect } from "react";
import "./AttendanceLeave.css";
import axios from "axios";

const AttendanceLeave = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const attendanceRes = await axios.get("http://localhost:9002/api/attendance");
      setAttendanceRecords(attendanceRes.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="attendance-leave-container">
      <h1>Attendance Management</h1>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="section">
          <h2>Attendance Records</h2>
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Date</th>
                <th>Entry Time</th>
                <th>Exit Time</th>
                <th>Hours Worked</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.length === 0 ? (
                <tr><td colSpan="6">No attendance records found.</td></tr>
              ) : (
                attendanceRecords.map((record) => (
                  <tr key={record._id}>
                    <td>{record.employeeId}</td>
                    <td>{record.date}</td>
                    <td>{record.entryTime}</td>
                    <td>{record.exitTime}</td>
                    <td>{record.hoursWorked}</td>
                    <td>{record.remark}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceLeave;
