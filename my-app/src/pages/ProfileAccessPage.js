import React from 'react';

const ProfileAccessPage = () => {
  return (
    <div style={styles.page}>
      <h2>Profile Access Page</h2>
      <p>Manage and view your profile settings here.</p>
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

export default ProfileAccessPage;
