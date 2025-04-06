import React, { useState } from 'react';

const DateDetails = ({ date, details, onClose, onSave }) => {
  const [shiftDetails, setShiftDetails] = useState(details.shiftDetails || '');
  const [assignedTasks, setAssignedTasks] = useState(details.assignedTasks || '');
  const [machinery, setMachinery] = useState(details.machinery || '');
  const [message, setMessage] = useState(details.message || '');

  const handleSave = () => {
    onSave(date, { shiftDetails, assignedTasks, machinery, message });
    onClose();
  };

  return (
    <div style={styles.modal}>
      <h2 style={styles.modalHeader}>Details for {date}</h2>
      <form style={styles.form}>
        <label style={styles.label}>Shift Details:</label>
        <input
          type="text"
          value={shiftDetails}
          onChange={(e) => setShiftDetails(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Assigned Tasks:</label>
        <input
          type="text"
          value={assignedTasks}
          onChange={(e) => setAssignedTasks(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Machinery Required:</label>
        <input
          type="text"
          value={machinery}
          onChange={(e) => setMachinery(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Message from Shift Manager:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
        />

        <div style={styles.buttonContainer}>
          <button type="button" onClick={handleSave} style={styles.saveButton}>Save</button>
          <button type="button" onClick={onClose} style={styles.closeButton}>Close</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    zIndex: '1000',
  },
  modalHeader: {
    marginBottom: '20px',
    color: '#007BFF',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: '12px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  closeButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default DateDetails;
