import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/RenterHeader.css';

const RenterHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for profile dropdown
  const [openSubDropdown, setOpenSubDropdown] = useState(null); // State for sub-dropdown
  const dropdownRef = useRef(null); // Ref for the dropdown container

  // Determine the active tab based on the current route
  const getActiveTab = () => {
    if (location.pathname.includes('catalog')) return 'Catalog';
    if (location.pathname.includes('notifications')) return 'Notifications';
    if (location.pathname.includes('history')) return 'History';
    if (location.pathname.includes('profile')) return 'Profile'; // Check for profile routes
    return '/renter'; // Default to Home
  };

  const activeTab = getActiveTab();

  const deleteAccount = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the user's token
      const response = await fetch('/api/users/auth/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in the request
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete account');
      }
  
      return data; // Return the response data
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  };

  // Handle tab click
  const handleTabClick = (tabName) => {
    setIsMenuOpen(false); // Close the menu after clicking a tab
    setIsDropdownOpen(false); // Close the dropdown after clicking a tab
    setOpenSubDropdown(null); // Close any open sub-dropdown
    switch (tabName) {
      case 'Catalog':
        navigate('/renter/catalog');
        break;
      case 'Notifications':
        navigate('/renter/notifications');
        break;
      case 'Requests':
        navigate('/renter/requests');
        break;
      case 'History':
        navigate('/renter/history');
        break;
      case 'Profile':
        navigate('/renter/profile');
        break;
      default:
        navigate('/renter');
    }
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    localStorage.removeItem('role'); // Remove role
    navigate('/login'); // Redirect to login page
  };

  // Dropdown options
  const dropdownOptions = [
    {
      label: 'Account Info',
      action: () => navigate('/renter/profile/renter-info'), // Navigate to account info
    },
    {
      label: 'Theme',
      subOptions: [
        { label: 'Light', action: () => console.log('Light theme selected') },
        { label: 'Dark', action: () => console.log('Dark theme selected') },
      ],
    },
    {
      label: 'Delete Account',
      subOptions: [
        {
          label: 'Yes',
          action: async () => {
            try {
              // Call the API to delete the account
              const token = localStorage.getItem('token');
              console.log(token);
              const response = await deleteAccount(token);
              console.log(response);
              console.log(response.message);

    
              // If the account is deleted successfully
              if (response.message==="Account deleted successfully") {
                console.log('Account deleted successfully');
                localStorage.removeItem('token'); // Remove token
                localStorage.removeItem('role'); // Remove role
                navigate('/login'); // Redirect to login page
              } else {
                console.error('Failed to delete account:', response.data?.message);
                alert('Failed to delete account. Please try again.'); // Show error message
              }
            } catch (error) {
              console.error('Error deleting account:', error);
              alert('An error occurred while deleting your account. Please try again.'); // Show error message
            }
          },
        },
        { label: 'No', action: () => setOpenSubDropdown(null) }, // Close sub-dropdown
      ],
    },
    {
      label: 'Logout',
      subOptions: [
        { label: 'Yes', action: handleLogout }, // Logout action
        { label: 'No', action: () => setOpenSubDropdown(null) }, // Close sub-dropdown
      ],
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setOpenSubDropdown(null); // Close sub-dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="app-header">
      {/* Left Side: App Title */}
      <h1>Car Rental Management System</h1>

      {/* Hamburger Menu (Visible on Small Screens) */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <FaBars size={24} />
      </div>

      {/* Middle: Navigation Tabs */}
      <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          {['Catalog', 'Notifications','History'].map((tab) => (
            <li
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </nav>

      {/* Right Side: Profile Icon and Dropdown */}
      <div className="profile-dropdown-container" ref={dropdownRef}>
        <div
          className={`profile-icon ${activeTab === 'Profile' ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation(); // Stop event propagation
            setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
            setIsMenuOpen(false); // Close the hamburger menu if open
            setOpenSubDropdown(null); // Close any open sub-dropdown
            navigate('/renter/profile'); // Navigate to the profile page
          }}
        >
          <FaUserCircle size={24} />
        </div>
        {isDropdownOpen && (
          <div className="dropdown">
            {dropdownOptions.map((option) => (
              <div key={option.label} className="dropdown-item-container">
                <div
                  className={`dropdown-item ${
                    openSubDropdown === option.label ? 'highlighted' : ''
                  }`}
                  onClick={() => {
                    if (option.subOptions) {
                      setOpenSubDropdown(openSubDropdown === option.label ? null : option.label);
                    } else {
                      option.action?.(); // Trigger the action
                      setIsDropdownOpen(false); // Close the dropdown
                    }
                  }}
                >
                  {option.label}
                </div>
                {openSubDropdown === option.label && option.subOptions && (
                  <div className="sub-dropdown">
                    {option.subOptions.map((subOption) => (
                      <div
                        key={subOption.label}
                        className="sub-dropdown-item"
                        onClick={() => {
                          subOption.action?.(); // Trigger the sub-option action
                          setIsDropdownOpen(false); // Close the dropdown
                          setOpenSubDropdown(null); // Close the sub-dropdown
                        }}
                      >
                        {subOption.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default RenterHeader;