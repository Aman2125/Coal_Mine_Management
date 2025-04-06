import React from 'react';

const LogRecordPage = () => {
  return (
    <div style={styles.page}>
      <h2>Log Record Page</h2>
      <p>Access and manage detailed log records here.</p>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
};

export default LogRecordPage;
