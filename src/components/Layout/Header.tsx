import React from 'react';
import { Menu, Bell, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { User as UserType } from '../../types';

interface HeaderProps {
  onMenuClick: () => void;
  user: UserType | null;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, user }) => {
  const { logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            {user?.role === 'admin' ? 'Panel de Administración' :
             user?.role === 'dentist' ? 'Panel del Odontólogo' :
             user?.role === 'assistant' ? 'Panel del Auxiliar' :
             'Mi Panel de Paciente'}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>

        <button
          onClick={logout}
          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
          title="Cerrar sesión"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;