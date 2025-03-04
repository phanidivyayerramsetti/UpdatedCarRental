import React, { useState } from "react";
import OwnerHeader from "./RenterHeader"; // Ensure correct path
import "../styles/RenterDashboard.css"; // Ensure correct path

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("Home"); // Default to Home

  return (
    <div className="dashboard-container">
      <OwnerHeader setActiveTab={setActiveTab} />
      <main className="dashboard-main">
        {activeTab === "Home" && (
          <div className="welcome-section">
            <h2>Welcome to Car Rental Management System!</h2>
          </div>
        )}

        {activeTab === "Manage Cars" && (
          <section className="manage-cars-section">
            <h3>Manage Cars</h3>
            <div className="car-list">
              <div className="car-card">
                <h4>Car 1</h4>
                <p>Model: Sedan</p>
                <p>Status: Available</p>
              </div>
              <div className="car-card">
                <h4>Car 2</h4>
                <p>Model: SUV</p>
                <p>Status: Rented</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default OwnerDashboard;
