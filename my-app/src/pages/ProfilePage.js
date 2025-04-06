import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: 'Mahesh Kumar ',
    role: 'Supervisor',
    department: 'Coal Mining',
    attendance: 92, // Percentage
    completedTasks: 85, // Percentage
    profilePicture: 'profile.jpg',
    totalDaysWorked: 220,
    daysAbsent: 20,
    pendingLeave: 2,
    leaveBalance: 10,
    overtimeHours: 50,
    safetyRecords: 'No incidents',
    certifications: ['Safety Training', 'Machinery Operation'],
    notifications: [
      'Next shift: 14th September, 8 AM - 4 PM',
      'Pending task: Inspection of Machinery A23',
    ],
    phoneNumber: '123-456-7890',
    address: '123 Coal Mining Rd, Mining Town, MT',
  });

  const [newProfilePic, setNewProfilePic] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(user.phoneNumber);
  const [editedAddress, setEditedAddress] = useState(user.address);

  const handleProfilePicChange = (e) => {
    setNewProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const saveProfilePicture = () => {
    if (newProfilePic) {
      setUser({ ...user, profilePicture: newProfilePic });
      setNewProfilePic(null);
      setShowMenu(false);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeFullScreen = () => {
    setShowFullScreen(false);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveDetails = () => {
    setUser({
      ...user,
      phoneNumber: editedPhoneNumber,
      address: editedAddress,
    });
    setIsEditing(false);
  };

  // Monthly Attendance Data for Bar Chart
  const attendanceData = [
    { month: 'January', attendance: 95 },
    { month: 'February', attendance: 92 },
    { month: 'March', attendance: 88 },
    { month: 'April', attendance: 90 },
    { month: 'May', attendance: 85 },
    { month: 'June', attendance: 92 },
    { month: 'July', attendance: 94 },
    { month: 'August', attendance: 90 },
    { month: 'September', attendance: 93 },
    { month: 'October', attendance: 95 },
    { month: 'November', attendance: 87 },
    { month: 'December', attendance: 89 },
  ];

  // Task Performance Data for Pie Chart
  const taskPerformanceData = [
    { name: 'Completed Tasks', value: user.completedTasks },
    { name: 'Pending Tasks', value: 100 - user.completedTasks },
  ];

  const COLORS = ['#00C49F', '#FF8042'];

  return (
    <div style={styles.pageContainer}>
      <div style={styles.profileHeader}>
        <div style={styles.profilePicContainer}>
          <img
            src={user.profilePicture}
            alt="Profile"
            style={styles.profilePic}
            onClick={toggleMenu}
          />

          {showMenu && (
            <div style={styles.menu}>
              {user.profilePicture && (
                <button onClick={() => setShowFullScreen(true)} style={styles.menuItem}>
                  View Profile Photo
                </button>
              )}
              <label style={styles.menuItem}>
                Update Profile Photo
                <input
                  type="file"
                  onChange={handleProfilePicChange}
                  style={styles.fileInput}
                />
              </label>
              {newProfilePic && (
                <button onClick={saveProfilePicture} style={styles.saveButton}>
                  Save
                </button>
              )}
            </div>
          )}
        </div>

        <div style={styles.userInfo}>
          <h2>{user.name}</h2>
          <p>Role: {user.role}</p>
          <p>Department: {user.department}</p>
        </div>
      </div>

      {showFullScreen && (
        <div style={styles.fullScreenOverlay} onClick={closeFullScreen}>
          <img src={user.profilePicture} alt="Full Screen Profile" style={styles.fullScreenPic} />
        </div>
      )}

      <div style={styles.section}>
        <h3>Contact Information</h3>
        {isEditing ? (
          <>
            <label>
              Phone Number:
              <input
                type="text"
                value={editedPhoneNumber}
                onChange={(e) => setEditedPhoneNumber(e.target.value)}
                style={styles.input}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                value={editedAddress}
                onChange={(e) => setEditedAddress(e.target.value)}
                style={styles.input}
              />
            </label>
            <button onClick={saveDetails} style={styles.saveButton}>Save</button>
          </>
        ) : (
          <>
            <p>Phone Number: {user.phoneNumber}</p>
            <p>Address: {user.address}</p>
            <button onClick={toggleEdit} style={styles.editButton}>Edit</button>
          </>
        )}
      </div>
      <div style={styles.section}>
        <h3>Messages & Notifications</h3>
        <ul>
          {user.notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>

      <div style={styles.section}>
        <h3>Work Role and Shift Details</h3>
        <p>Work Completed: {user.completedTasks}%</p>
        <p>Role: {user.role}</p>
        <p>Overtime Hours: {user.overtimeHours} hours</p>
      </div>

      <div style={styles.section}>
        <h3>Attendance Overview</h3>
        <p>Total Attendance: {user.attendance}%</p>
        <p>Total Days Worked: {user.totalDaysWorked}</p>
        <p>Days Absent: {user.daysAbsent}</p>
        <p>Pending Leave Requests: {user.pendingLeave}</p>
      </div>


      <div style={styles.section}>
        <h3>Monthly Attendance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="attendance" fill="#007BFF" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.section}>
        <h3>Task Performance Summary</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={taskPerformanceData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {taskPerformanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <p>Tasks Completed: {user.completedTasks}%</p>
        <p>Pending Tasks: {100 - user.completedTasks}%</p>
      </div>

      <div style={styles.section}>
        <h3>Safety Records</h3>
        <p>{user.safetyRecords}</p>
      </div>

      <div style={styles.section}>
        <h3>Leave and Overtime</h3>
        <p>Leave Balance: {user.leaveBalance} days</p>
        <p>Overtime Hours: {user.overtimeHours} hours</p>
      </div>

      <div style={styles.section}>
        <h3>Achievements & Certifications</h3>
        <ul>
          {user.certifications.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      </div>

    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: '100vh', // Full page height
    backgroundColor: '#f4f4f9', // Light background
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '1200px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  profilePicContainer: {
    position: 'relative',
    marginRight: '20px',
  },
  profilePic: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    cursor: 'pointer',
    border: '2px solid #007BFF',
  },
  menu: {
    position: 'absolute',
    top: '130px',
    left: 0,
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    zIndex: 1,
    borderRadius: '5px',
    padding: '10px',
  },
  menuItem: {
    padding: '10px',
    cursor: 'pointer',
    color: '#007BFF',
    border: 'none',
    backgroundColor: 'transparent',
  },
  saveButton: {
    padding: '8px 15px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  userInfo: {
    marginLeft: '20px',
  },
  section: {
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '1200px',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  editButton: {
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  fullScreenOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenPic: {
    maxWidth: '90%',
    maxHeight: '90%',
    borderRadius: '10px',
  },
};

export default ProfilePage;
