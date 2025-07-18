import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import DentistDashboard from './DentistDashboard';
import AssistantDashboard from './AssistantDashboard';
import PatientDashboard from './PatientDashboard';

interface DashboardHomeProps {
  onNavigate: (page: string) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  switch (user?.role) {
    case 'admin':
      return <AdminDashboard onNavigate={onNavigate} />;
    case 'dentist':
      return <DentistDashboard onNavigate={onNavigate} />;
    case 'assistant':
      return <AssistantDashboard onNavigate={onNavigate} />;
    case 'patient':
      return <PatientDashboard onNavigate={onNavigate} />;
    default:
      return <AdminDashboard onNavigate={onNavigate} />;
  }
};

export default DashboardHome;