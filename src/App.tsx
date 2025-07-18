import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { NotificationProvider } from './context/NotificationContext';
import AppRouter from './components/Router/AppRouter';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <NotificationProvider>
          <div className="min-h-screen bg-gray-50">
            <AppRouter />
          </div>
        </NotificationProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;