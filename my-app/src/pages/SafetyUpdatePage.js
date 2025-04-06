import React from 'react';

const SafetyUpdatePage = () => {
  return (
    <div style={styles.page}>
      <h2>Safety Update Page</h2>
      <p>Update and manage safety records here.</p>
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

export default SafetyUpdatePage;
