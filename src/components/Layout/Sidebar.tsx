import React from 'react';
import { 
  Home, 
  Calendar, 
  Users, 
  FileText, 
  Tag, 
  UserCheck, 
  BarChart3, 
  Settings,
  X,
  Stethoscope,
  Package,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, isOpen, onToggle }) => {
  const { user } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'appointments', label: 'Citas', icon: Calendar },
    ];

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        { id: 'patients', label: 'Pacientes', icon: Users },
        { id: 'medical-records', label: 'Historias Clínicas', icon: Stethoscope },
        { id: 'users', label: 'Usuarios', icon: UserCheck },
        { id: 'inventory', label: 'Inventario', icon: Package },
        { id: 'financial', label: 'Gestión Financiera', icon: DollarSign },
        { id: 'invoices', label: 'Facturación', icon: FileText },
        { id: 'promotions', label: 'Promociones', icon: Tag },
        { id: 'reports', label: 'Reportes', icon: BarChart3 },
        { id: 'settings', label: 'Configuración', icon: Settings },
        { id: 'settings', label: 'Configuración', icon: Settings },
      ];
    } else if (user?.role === 'dentist') {
      return [
        ...baseItems,
        { id: 'patients', label: 'Mis Pacientes', icon: Users },
        { id: 'medical-records', label: 'Historias Clínicas', icon: Stethoscope },
        { id: 'invoices', label: 'Facturación', icon: FileText },
        { id: 'reports', label: 'Mis Reportes', icon: BarChart3 },
      ];
    } else if (user?.role === 'assistant') {
      return [
        ...baseItems,
        { id: 'patients', label: 'Pacientes', icon: Users },
        { id: 'medical-records', label: 'Historias Clínicas', icon: Stethoscope },
        { id: 'inventory', label: 'Inventario', icon: Package },
        { id: 'reports', label: 'Reportes', icon: BarChart3 },
      ];
    } else if (user?.role === 'patient') {
      return [
        { id: 'dashboard', label: 'Mi Panel', icon: Home },
        { id: 'appointments', label: 'Mis Citas', icon: Calendar },
        { id: 'invoices', label: 'Mis Facturas', icon: FileText },
        { id: 'promotions', label: 'Promociones', icon: Tag },
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <img 
                src="/Consultorio Yadira.png" 
                alt="Consultorio Yadira" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-gray-900">Consultorio Yadira</span>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
        <div className="pb-24"> {/* Add padding bottom to prevent overlap with user info */}
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg 
                  text-left transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-r-2 border-purple-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
        </nav>

        {/* User info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role === 'admin' ? 'Administrador' :
                 user?.role === 'dentist' ? 'Odontólogo' :
                 user?.role === 'assistant' ? 'Auxiliar' : 'Paciente'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;