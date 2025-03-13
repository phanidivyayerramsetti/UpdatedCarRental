import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import OwnerDashboard from './components/OwnerDashboard';
import RenterDashboard from './components/RenterDashboard';
import OwnerLayout from './components/OwnerLayout';
import ManageCars from './components/ManageCars';
import Notifications from './components/Notifications';
import Requests from './components/Requests';
import History from './components/History';
import Profile from './components/Profile';
import AccountInfo from './components/AccountInfo'; // Import AccountInfo component
import RenterHistory from './components/RenterHistory';
import RenterNotifications from './components/RenterNotifications';
import Catalog from './components/Catalog';
import RenterLayout from './components/RenterLayout';
import RenterProfile from './components/RenterProfile';
import RenterInfo from './components/RenterInfo';
import ForgotPassword from './components/ForgotPassword';

 
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

        {/* Owner-specific routes */}
        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<OwnerDashboard />} /> {/* Default owner page */}
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="requests" element={<Requests />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />}/>
          <Route path="profile/account-info" element={<AccountInfo />} /> {/* Account Info page */}
        </Route>

        {/* Forgot Password route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Renter-specific routes */}
        <Route path="/renter" element={<RenterLayout />}>
          <Route index element={<RenterDashboard />} /> {/* Default owner page */}
          <Route path="catalog" element={<Catalog />} />
          <Route path="notifications" element={<RenterNotifications />} />
          <Route path="history" element={<RenterHistory />} />
          <Route path="profile" element={<RenterProfile />}/>
          <Route path="profile/renter-info" element={<RenterInfo />} /> {/* Account Info page */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;