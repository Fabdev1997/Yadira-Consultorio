import React from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  UserPlus
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  // Mock data for charts
  const monthlyRevenue = [
    { month: 'Ene', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Abr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 },
  ];

  const appointmentsByDentist = [
    { name: 'Dr. González', appointments: 45 },
    { name: 'Dr. Martínez', appointments: 38 },
    { name: 'Dr. López', appointments: 32 },
    { name: 'Dr. Rodríguez', appointments: 41 },
  ];

  const serviceDistribution = [
    { name: 'Limpieza', value: 35, color: '#9333EA' },
    { name: 'Ortodoncia', value: 25, color: '#EC4899' },
    { name: 'Endodoncia', value: 20, color: '#F59E0B' },
    { name: 'Cirugía', value: 12, color: '#EF4444' },
    { name: 'Otros', value: 8, color: '#8B5CF6' },
  ];

  const metrics = [
    {
      title: 'Total Pacientes',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Citas del Mes',
      value: '156',
      change: '+8%',
      changeType: 'positive',
      icon: Calendar,
      color: 'pink'
    },
    {
      title: 'Ingresos del Mes',
      value: '$67,000',
      change: '+15%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Tasa de Ocupación',
      value: '87%',
      change: '+3%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'pink'
    }
  ];

  const todayStats = [
    {
      label: 'Citas Pendientes',
      value: 8,
      icon: Clock,
      color: 'yellow'
    },
    {
      label: 'Citas Completadas',
      value: 12,
      icon: CheckCircle,
      color: 'green'
    },
    {
      label: 'Citas Canceladas',
      value: 2,
      icon: XCircle,
      color: 'red'
    },
    {
      label: 'Pacientes Nuevos',
      value: 3,
      icon: UserPlus,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">¡Bienvenido, Administrador!</h1>
        <p className="text-purple-100">
          Resumen ejecutivo de Consultorio Yadira - {new Date().toLocaleDateString('es-CO', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  metric.color === 'purple' ? 'bg-purple-50' : 'bg-pink-50'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    metric.color === 'purple' ? 'text-purple-600' : 'text-pink-600'
                  }`} />
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  metric.changeType === 'positive' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-gray-600 text-sm">{metric.title}</p>
            </div>
          );
        })}
      </div>

      {/* Today's Overview */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Resumen de Hoy</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {todayStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  stat.color === 'purple' ? 'bg-purple-100' :
                  stat.color === 'pink' ? 'bg-pink-100' :
                  stat.color === 'yellow' ? 'bg-yellow-100' :
                  stat.color === 'green' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    stat.color === 'purple' ? 'text-purple-600' :
                    stat.color === 'pink' ? 'text-pink-600' :
                    stat.color === 'yellow' ? 'text-yellow-600' :
                    stat.color === 'green' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Ingresos Mensuales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Ingresos']} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#9333EA" 
                strokeWidth={3}
                dot={{ fill: '#9333EA', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Appointments by Dentist */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Citas por Odontólogo</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentsByDentist}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="appointments" fill="#EC4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Services Distribution */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Distribución de Servicios</h2>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {serviceDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-4">
            {serviceDistribution.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: service.color }}
                  />
                  <span className="font-medium text-gray-900">{service.name}</span>
                </div>
                <span className="text-gray-600 font-medium">{service.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => onNavigate('appointments')}
            className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors text-left"
          >
            <Calendar className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Nueva Cita</h3>
            <p className="text-sm text-gray-600">Agendar cita para paciente</p>
          </button>
          <button 
            onClick={() => onNavigate('patients')}
            className="p-4 bg-pink-50 hover:bg-pink-100 rounded-lg border border-pink-200 transition-colors text-left"
          >
            <UserPlus className="w-8 h-8 text-pink-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Nuevo Paciente</h3>
            <p className="text-sm text-gray-600">Registrar nuevo paciente</p>
          </button>
          <button 
            onClick={() => onNavigate('invoices')}
            className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors text-left"
          >
            <DollarSign className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Facturación</h3>
            <p className="text-sm text-gray-600">Generar nueva factura</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;