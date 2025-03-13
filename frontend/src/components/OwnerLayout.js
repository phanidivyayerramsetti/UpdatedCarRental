import React from 'react';
import { Outlet } from 'react-router-dom';
import OwnerHeader from './OwnerHeader'; // Import the OwnerHeader component

const OwnerLayout = () => {
  return (
    <div className="owner-layout">
      <OwnerHeader /> {/* Persistent header */}
      <Outlet /> {/* Nested routes will be rendered here */}
    </div>
  );
};

export default OwnerLayout;