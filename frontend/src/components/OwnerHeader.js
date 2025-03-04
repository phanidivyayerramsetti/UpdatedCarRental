import React, { useState } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa"; // Import icons
import "../styles/OwnerHeader.css"; // Import CSS for styling

const OwnerHeader = ({ setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setTab] = useState("Home"); // Default to Home

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabClick = (tabName) => {
    setTab(tabName); // Update active tab in header
    setActiveTab(tabName); // Update in parent component
  };

  return (
    <header className="app-header">
      {/* Left Side: App Title */}
      <h1>Car Rental Management System</h1>

      {/* Hamburger Menu (Visible on Small Screens) */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <FaBars size={24} />
      </div>

      {/* Middle: Navigation Tabs */}
      <nav className={`header-nav ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li
            className={activeTab === "Manage Cars" ? "active" : ""}
            onClick={() => handleTabClick("Manage Cars")}
          >
            Manage Cars
          </li>
          <li
            className={activeTab === "Notifications" ? "active" : ""}
            onClick={() => handleTabClick("Notifications")}
          >
            Notifications
          </li>
          <li
            className={activeTab === "Requests" ? "active" : ""}
            onClick={() => handleTabClick("Requests")}
          >
            Requests
          </li>
          <li
            className={activeTab === "History" ? "active" : ""}
            onClick={() => handleTabClick("History")}
          >
            History
          </li>
        </ul>
      </nav>

      {/* Right Side: Profile Icon (Now a Tab) */}
      <div
        className={`profile-icon ${activeTab === "Profile" ? "active" : ""}`}
        onClick={() => handleTabClick("Profile")}
      >
        <FaUserCircle size={24} />
      </div>
    </header>
  );
};

export default OwnerHeader;
