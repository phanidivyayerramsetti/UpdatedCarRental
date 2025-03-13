import React from 'react';
import { Outlet } from 'react-router-dom';
import RenterHeader from './RenterHeader'; // Import the OwnerHeader component

const RenterLayout = () => {
  return (
    <div className="renter-layout">
      <RenterHeader /> {/* Persistent header */}
      <Outlet /> {/* Nested routes will be rendered here */}
    </div>
  );
};

export default RenterLayout;