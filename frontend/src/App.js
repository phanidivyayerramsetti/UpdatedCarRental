import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // Adjust the path based on your folder structure
import Registration from './components/Registration'; // Adjust the path based on your folder structure
import OwnerDashboard from './components/OwnerDashboard'; // Import the OwnerDashboard component
import RenterDashboard from './components/RenterDashboard'; // Import RenterDashboard

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route to Login */}
        <Route path="/" element={<Login />} />

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Registration route */}
        <Route path="/register" element={<Registration />} />

        {/* Owner Dashboard page */}
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />

        <Route path="/renter-dashboard" element={<RenterDashboard />} />

      </Routes>
    </Router>
  );
};

export default App;