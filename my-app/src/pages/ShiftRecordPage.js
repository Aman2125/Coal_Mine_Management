import React from 'react';

const MonthYearSelector = () => {
  return (
    <div style={styles.page}>
      <h2>Shift Record Page</h2>
      <p>Manage and view shift records here.</p>
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

export default MonthYearSelector;
