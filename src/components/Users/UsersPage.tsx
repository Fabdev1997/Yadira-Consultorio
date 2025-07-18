import React, { useState } from 'react';
import { Users, Plus, Search, Filter, UserCheck, Mail, Phone, Calendar, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const { user } = useAuth();

  // Only accessible by admin users
  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Acceso Restringido</h3>
          <p className="text-gray-600">Solo los administradores pueden acceder a esta sección.</p>
        </div>
      </div>
    );
  }

  const mockUsers = [
    {
      id: '1',
      name: 'Dr. Admin Sistema',
      email: 'admin@clinica.com',
      role: 'admin',
      phone: '+57 300 123 4567',
      createdAt: '2024-01-01',
      lastLogin: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Dr. María González',
      email: 'maria@clinica.com',
      role: 'dentist',
      phone: '+57 300 234 5678',
      specialization: 'Ortodoncia',
      license: 'COL12345',
      createdAt: '2024-01-15',
      lastLogin: '2024-01-15',
      status: 'active'
    },
    {
      id: '3',
      name: 'Dr. Carlos Martínez',
      email: 'carlos.martinez@clinica.com',
      role: 'dentist',
      phone: '+57 300 345 6789',
      specialization: 'Endodoncia',
      license: 'COL23456',
      createdAt: '2024-01-20',
      lastLogin: '2024-01-14',
      status: 'active'
    },
    {
      id: '4',
      name: 'Ana Rodríguez',
      email: 'ana@clinica.com',
      role: 'assistant',
      phone: '+57 300 456 7890',
      createdAt: '2024-02-01',
      lastLogin: '2024-01-15',
      status: 'active'
    },
    {
      id: '5',
      name: 'Laura Sánchez',
      email: 'laura@clinica.com',
      role: 'assistant',
      phone: '+57 300 567 8901',
      createdAt: '2024-02-10',
      lastLogin: '2024-01-10',
      status: 'inactive'
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700';
      case 'dentist':
        return 'bg-pink-100 text-pink-700';
      case 'assistant':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'dentist':
        return 'Odontólogo';
      case 'assistant':
        return 'Auxiliar';
      default:
        return role;
    }
  };

  const userStats = {
    total: mockUsers.length,
    admins: mockUsers.filter(u => u.role === 'admin').length,
    dentists: mockUsers.filter(u => u.role === 'dentist').length,
    assistants: mockUsers.filter(u => u.role === 'assistant').length,
    active: mockUsers.filter(u => u.status === 'active').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600 mt-1">
            Administra los usuarios del sistema (odontólogos, auxiliares y administradores)
          </p>
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Usuario
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{userStats.total}</h3>
              <p className="text-gray-600 text-sm">Total Usuarios</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <UserCheck className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{userStats.admins}</h3>
              <p className="text-gray-600 text-sm">Administradores</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-50 rounded-lg">
              <Users className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{userStats.dentists}</h3>
              <p className="text-gray-600 text-sm">Odontólogos</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{userStats.assistants}</h3>
              <p className="text-gray-600 text-sm">Auxiliares</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <UserCheck className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{userStats.active}</h3>
              <p className="text-gray-600 text-sm">Usuarios Activos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar usuarios por nombre, email o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Todos los roles</option>
              <option value="admin">Administradores</option>
              <option value="dentist">Odontólogos</option>
              <option value="assistant">Auxiliares</option>
            </select>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Lista de Usuarios</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Especialización
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Acceso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-medium text-sm">
                          {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {user.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {user.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {getRoleText(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.specialization || '-'}
                    {user.license && (
                      <div className="text-xs text-gray-500">Lic: {user.license}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(user.lastLogin).toLocaleDateString('es-CO')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-purple-600 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 p-2 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      {user.id !== '1' && ( // Don't allow deleting the main admin
                        <button className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <UserCheck className="w-6 h-6 text-purple-600 mt-1" />
          <div>
            <h3 className="font-semibold text-purple-900 mb-2">Gestión Segura de Usuarios</h3>
            <ul className="text-purple-800 text-sm space-y-1">
              <li>• Todos los usuarios deben tener contraseñas seguras</li>
              <li>• Los odontólogos requieren licencia profesional válida</li>
              <li>• Los cambios de rol requieren confirmación adicional</li>
              <li>• Se mantiene un registro de auditoría de todas las acciones</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;