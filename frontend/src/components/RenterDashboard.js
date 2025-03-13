import React, { useState } from "react";
import RenterHeader from "./RenterHeader"; // Ensure correct path
import "../styles/RenterDashboard.css"; // Ensure correct path

const RenterDashboard = () => {
  const [activeTab, setActiveTab] = useState("Home"); // Default to Home

  return (
    <div className="dashboard-container">
      <RenterHeader setActiveTab={setActiveTab} />
      <main className="dashboard-main">
        {activeTab === "Home" && (
          <div className="welcome-section">
            <h2>Welcome to Car Rental Management System!</h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default RenterDashboard;
