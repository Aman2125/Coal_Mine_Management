import React, { useState } from 'react';
import './MachineryMaintenance.css';
import { Link } from 'react-router-dom';

const MachineryMaintenance = () => {
  const [shift, setShift] = useState('');
  const [formData, setFormData] = useState({
    shiftManager: '',
    siteFace: '',
    supervisor: '',
    machineName: '',
    maintenanceDate: '',
    maintenanceDetails: '',
    maintenanceType: '',
    images: []
  });

  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const machineTypes = [
    'Excavator',
    'Bulldozer',
    'Dump Truck',
    'Loader',
    'Grader',
    'Crane',
    'Drill',
    'Backhoe',
    'Compactor'
  ];

  const handleShiftChange = (e) => {
    setShift(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const completeData = { ...formData, shift };

    if (editIndex !== null) {
      const updatedRecords = [...maintenanceRecords];
      updatedRecords[editIndex] = completeData;
      setMaintenanceRecords(updatedRecords);
      setEditIndex(null);
    } else {
      setMaintenanceRecords([...maintenanceRecords, completeData]);
    }

    setShift('');
    setFormData({
      shiftManager: '',
      siteFace: '',
      supervisor: '',
      machineName: '',
      maintenanceDate: '',
      maintenanceDetails: '',
      maintenanceType: '',
      images: []
    });
  };

  const handleEdit = (index) => {
    const { shift, ...restData } = maintenanceRecords[index];
    setShift(shift);
    setFormData(restData);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedRecords = maintenanceRecords.filter((_, i) => i !== index);
    setMaintenanceRecords(updatedRecords);
  };

  return (
    <div className="machinery-maintenance-container">
      <header className="main-header">
        <img src="/path-to-logo.png" alt="CarbonX Logo" />
        <h1>CarbonX</h1>
        <nav className="main-nav">
          <Link to="/">Home</Link>
        </nav>
      </header>

      <div className="machinery-maintenance-header">
        <h2>Machinery Maintenance Page</h2>
        <p>Manage and update safety and maintenance records here.</p>
      </div>

      <div className="shift-selection">
        <label htmlFor="shift">Select Shift</label>
        <select
          id="shift"
          name="shift"
          value={shift}
          onChange={handleShiftChange}
          required
        >
          <option value="">Select a Shift</option>
          <option value="Morning">Morning</option>
          <option value="Noon">Noon</option>
          <option value="Night">Night</option>
        </select>
      </div>

      {shift && (
        <form className="maintenance-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="shiftManager">Shift Manager</label>
            <input
              type="text"
              id="shiftManager"
              name="shiftManager"
              value={formData.shiftManager}
              onChange={handleChange}
              required
              placeholder="Enter Shift Manager Name"
            />
          </div>
          <div>
            <label htmlFor="siteFace">Site Face</label>
            <input
              type="text"
              id="siteFace"
              name="siteFace"
              value={formData.siteFace}
              onChange={handleChange}
              required
              placeholder="Enter Site Face Name"
            />
          </div>
          <div>
            <label htmlFor="supervisor">Supervisor</label>
            <input
              type="text"
              id="supervisor"
              name="supervisor"
              value={formData.supervisor}
              onChange={handleChange}
              required
              placeholder="Enter Supervisor Name"
            />
          </div>
          <div>
            <label htmlFor="machineName">Machine Name</label>
            <select
              id="machineName"
              name="machineName"
              value={formData.machineName}
              onChange={handleChange}
              required
            >
              <option value="">Select a Machine</option>
              {machineTypes.map((machine, index) => (
                <option key={index} value={machine}>
                  {machine}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="maintenanceDate">Maintenance Date</label>
            <input
              type="date"
              id="maintenanceDate"
              name="maintenanceDate"
              value={formData.maintenanceDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="maintenanceDetails">Maintenance Details</label>
            <textarea
              id="maintenanceDetails"
              name="maintenanceDetails"
              value={formData.maintenanceDetails}
              onChange={handleChange}
              required
              placeholder="Enter Maintenance Details"
            ></textarea>
          </div>
          <div>
            <label htmlFor="maintenanceType">Maintenance Type</label>
            <select
              id="maintenanceType"
              name="maintenanceType"
              value={formData.maintenanceType}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="routine">Routine</option>
              <option value="emergency">Emergency</option>
              <option value="preventive">Preventive</option>
            </select>
          </div>
          <div>
            <label htmlFor="images">Upload Damaged Machinery Images</label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImageChange}
              multiple
              accept="image/*"
            />
          </div>

          {formData.images.length > 0 && (
            <div className="image-preview">
              <h4>Image Preview</h4>
              <div className="image-preview-grid">
                {formData.images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="preview-img"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="maintenance-form-buttons">
            <button type="submit">{editIndex !== null ? 'Update' : 'Save'}</button>
          </div>
        </form>
      )}

      {maintenanceRecords.length > 0 && (
        <table className="maintenance-table">
          <thead>
            <tr>
              <th>Shift</th>
              <th>Shift Manager</th>
              <th>Site Face</th>
              <th>Supervisor</th>
              <th>Machine Name</th>
              <th>Date</th>
              <th>Details</th>
              <th>Type</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.shift}</td>
                <td>{record.shiftManager}</td>
                <td>{record.siteFace}</td>
                <td>{record.supervisor}</td>
                <td>{record.machineName}</td>
                <td>{record.maintenanceDate}</td>
                <td>{record.maintenanceDetails}</td>
                <td>{record.maintenanceType}</td>
                <td>
                  {record.images.map((image, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(image)}
                      alt={`Thumbnail ${idx + 1}`}
                      className="thumbnail-img"
                    />
                  ))}
                </td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <footer className="footer">
        <p>© Ministry of Coal, India</p>
        <p>Website maintained by CarbonX</p>
      </footer>
    </div>
  );
};

export default MachineryMaintenance;


