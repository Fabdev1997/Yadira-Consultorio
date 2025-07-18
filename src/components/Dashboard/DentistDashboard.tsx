import React from 'react';
import { Calendar, Users, Clock, DollarSign, FileText, TrendingUp } from 'lucide-react';

interface DentistDashboardProps {
  onNavigate: (page: string) => void;
}

const DentistDashboard: React.FC<DentistDashboardProps> = ({ onNavigate }) => {
  const todayAppointments = [
    { time: '09:00', patient: 'Ana García', service: 'Limpieza dental', status: 'confirmed' },
    { time: '10:30', patient: 'Carlos López', service: 'Revisión ortodoncia', status: 'confirmed' },
    { time: '14:00', patient: 'María Rodríguez', service: 'Endodoncia', status: 'pending' },
    { time: '15:30', patient: 'Juan Pérez', service: 'Extracción', status: 'confirmed' },
  ];

  const stats = [
    { title: 'Citas Hoy', value: '4', icon: Calendar, color: 'purple' },
    { title: 'Mis Pacientes', value: '127', icon: Users, color: 'pink' },
    { title: 'Horas Trabajadas', value: '8.5h', icon: Clock, color: 'purple' },
    { title: 'Ingresos del Mes', value: '$24,500', icon: DollarSign, color: 'pink' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">¡Buenos días, Dr. González!</h1>
        <p className="text-purple-100">
          Tienes 4 citas programadas para hoy - {new Date().toLocaleDateString('es-CO')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  stat.color === 'purple' ? 'bg-purple-50' : 'bg-pink-50'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    stat.color === 'purple' ? 'text-purple-600' : 'text-pink-600'
                  }`} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Citas de Hoy</h2>
          <div className="space-y-4">
            {todayAppointments.map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{appointment.time}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{appointment.patient}</h3>
                    <p className="text-sm text-gray-600">{appointment.service}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  appointment.status === 'confirmed' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {appointment.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Acciones Rápidas</h2>
          <div className="space-y-4">
            <button 
              onClick={() => onNavigate('patients')}
              className="w-full p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors text-left"
            >
              <FileText className="w-6 h-6 text-purple-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Historia Clínica</h3>
              <p className="text-sm text-gray-600">Consultar historiales de pacientes</p>
            </button>
            <button 
              onClick={() => onNavigate('appointments')}
              className="w-full p-4 bg-pink-50 hover:bg-pink-100 rounded-lg border border-pink-200 transition-colors text-left"
            >
              <Calendar className="w-6 h-6 text-pink-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Mi Agenda</h3>
              <p className="text-sm text-gray-600">Ver y gestionar mi horario</p>
            </button>
            <button 
              onClick={() => onNavigate('reports')}
              className="w-full p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors text-left"
            >
              <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Mis Reportes</h3>
              <p className="text-sm text-gray-600">Ver estadísticas personales</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentistDashboard;