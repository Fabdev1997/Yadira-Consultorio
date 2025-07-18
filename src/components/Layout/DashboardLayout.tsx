import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardHome from '../Dashboard/DashboardHome';
import AppointmentsPage from '../Appointments/AppointmentsPage';
import PatientsPage from '../Patients/PatientsPage';
import MedicalRecordsPage from '../MedicalRecords/MedicalRecordsPage';
import InvoicesPage from '../Invoices/InvoicesPage';
import PromotionsPage from '../Promotions/PromotionsPage';
import UsersPage from '../Users/UsersPage';
import SettingsPage from '../Settings/SettingsPage';
import ReportsPage from '../Reports/ReportsPage';
import InventoryPage from '../Inventory/InventoryPage';
import FinancialPage from '../Financial/FinancialPage';

const DashboardLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome onNavigate={setCurrentPage} />;
      case 'appointments':
        return <AppointmentsPage />;
      case 'patients':
        return <PatientsPage />;
      case 'medical-records':
        return <MedicalRecordsPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'financial':
        return <FinancialPage />;
      case 'invoices':
        return <InvoicesPage />;
      case 'promotions':
        return <PromotionsPage />;
      case 'users':
        return <UsersPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardHome onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          user={user}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;