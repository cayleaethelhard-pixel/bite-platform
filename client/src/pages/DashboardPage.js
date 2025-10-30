//src/pages/DashboardPage.js
import React from 'react';
import Dashboard from '../components/Dashboard';

const DashboardPage = ({ userRole }) => {
  return <Dashboard userRole={userRole} />;
};

export default DashboardPage;