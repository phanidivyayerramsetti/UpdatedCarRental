import React, { useState } from "react";
import { FaUserCircle, FaBars, FaHeart, FaShoppingCart } from "react-icons/fa"; // Import new icons
import "../styles/RenterHeader.css"; // Import CSS for styling

const RenterHeader = ({ setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setTab] = useState("Catalog"); // Default to Catalog

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
            className={activeTab === "Catalog" ? "active" : ""}
            onClick={() => handleTabClick("Catalog")}
          >
            Catalog
          </li>
          <li
            className={activeTab === "Notifications" ? "active" : ""}
            onClick={() => handleTabClick("Notifications")}
          >
            Notifications
          </li>
          <li
            className={activeTab === "History" ? "active" : ""}
            onClick={() => handleTabClick("History")}
          >
            History
          </li>
        </ul>
      </nav>

      {/* Right Side: Wishlist Icon, Cart Icon, and Profile Icon */}
      <div className="icon-container">
        <div
          className={`wishlist-icon ${activeTab === "Wishlist" ? "active" : ""}`}
          onClick={() => handleTabClick("Wishlist")}
        >
          <FaHeart size={24} />
        </div>
        <div
          className={`cart-icon ${activeTab === "Cart" ? "active" : ""}`}
          onClick={() => handleTabClick("Cart")}
        >
          <FaShoppingCart size={24} />
        </div>
        <div
          className={`profile-icon ${activeTab === "Profile" ? "active" : ""}`}
          onClick={() => handleTabClick("Profile")}
        >
          <FaUserCircle size={24} />
        </div>
      </div>
    </header>
  );
};

export default RenterHeader;
