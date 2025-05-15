import React, { useState } from "react";
import "./AttendanceLogbookPage.css";

const AttendanceLogbookPage = () => {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    date: "",
    entryTime: "",
    exitTime: "",
    remark: "",
    hoursWorked: ""
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { employeeId, date, entryTime, exitTime, remark, hoursWorked } = formData;

    if (!employeeId || !date || !entryTime || !exitTime || !remark || !hoursWorked) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:9002/api/attendance/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setRecords([...records, formData]);
        setFormData({
          employeeId: "",
          date: "",
          entryTime: "",
          exitTime: "",
          remark: "",
          hoursWorked: ""
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("Server error");
    }
  };

  const filteredRecords = records.filter(
    (record) =>
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.date.includes(searchTerm)
  );

  return (
    <div className="logbook-container">
      <div className="logbook-header">
        <h1>Attendance Logbook</h1>
        <div className="logbook-controls">
          <button className="small-btn">Add</button>
          <button className="small-btn">Approve</button>
          <button className="small-btn" onClick={() => window.print()}>Print</button>
        </div>
      </div>
      <form className="logbook-form" onSubmit={handleSubmit}>
        <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="Employee ID" />
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
        <input type="time" name="entryTime" value={formData.entryTime} onChange={handleChange} />
        <input type="time" name="exitTime" value={formData.exitTime} onChange={handleChange} />
        <input type="text" name="remark" value={formData.remark} onChange={handleChange} placeholder="Remark" />
        <input type="text" name="hoursWorked" value={formData.hoursWorked} onChange={handleChange} placeholder="Hours Worked" />
        <button type="submit">Submit</button>
      </form>

      <input
        type="text"
        placeholder="Search by Employee ID or Date"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {filteredRecords.length === 0 ? (
        <p>No records found</p>
      ) : (
        <table className="logbook-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Date</th>
              <th>Entry Time</th>
              <th>Exit Time</th>
              <th>Remark</th>
              <th>Hours Worked</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.employeeId}</td>
                <td>{record.date}</td>
                <td>{record.entryTime}</td>
                <td>{record.exitTime}</td>
                <td>{record.remark}</td>
                <td>{record.hoursWorked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceLogbookPage;
