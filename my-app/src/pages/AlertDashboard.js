import React from "react";

const AlertDashboard = ({ alerts }) => {
  return (
    <div>
      {alerts.length === 0 ? (
        <p>No active alerts</p>
      ) : (
        alerts.map(alert => (
          <div key={alert.id} style={{ border: "1px solid red", margin: "5px", padding: "10px" }}>
            <strong>{alert.type} Alert:</strong> {alert.message}
            <br />
            <small>{new Date(alert.timestamp).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default AlertDashboard;
