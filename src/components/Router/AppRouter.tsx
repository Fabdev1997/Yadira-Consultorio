import React from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginPage from '../Auth/LoginPage';
import LoadingSpinner from '../Common/LoadingSpinner';
import DashboardLayout from '../Layout/DashboardLayout';

const AppRouter: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <LoginPage />;
  }

  return <DashboardLayout />;
};

export default AppRouter;