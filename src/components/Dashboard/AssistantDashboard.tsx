import React from 'react';
import { Calendar, Users, Clock, FileText } from 'lucide-react';

interface AssistantDashboardProps {
  onNavigate: (page: string) => void;
}

const AssistantDashboard: React.FC<AssistantDashboardProps> = ({ onNavigate }) => {
  const pendingTasks = [
    { task: 'Confirmar cita de Ana García', priority: 'high', time: '2 horas' },
    { task: 'Actualizar datos de Carlos López', priority: 'medium', time: '1 día' },
    { task: 'Enviar recordatorio a María Rodríguez', priority: 'low', time: '3 horas' },
  ];

  const stats = [
    { title: 'Citas Programadas', value: '12', icon: Calendar, color: 'purple' },
    { title: 'Pacientes Atendidos', value: '8', icon: Users, color: 'pink' },
    { title: 'Tareas Pendientes', value: '3', icon: Clock, color: 'purple' },
    { title: 'Reportes Generados', value: '2', icon: FileText, color: 'pink' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">¡Hola, Ana!</h1>
        <p className="text-purple-100">
          Panel de control del auxiliar - Gestiona las operaciones diarias
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

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Tareas Pendientes</h2>
        <div className="space-y-4">
          {pendingTasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">{task.task}</h3>
                <p className="text-sm text-gray-600">Vence en {task.time}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                task.priority === 'high' 
                  ? 'bg-red-100 text-red-700'
                  : task.priority === 'medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => onNavigate('appointments')}
            className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors text-left"
          >
            <Calendar className="w-6 h-6 text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Gestionar Citas</h3>
            <p className="text-sm text-gray-600">Ver y administrar citas del día</p>
          </button>
          <button 
            onClick={() => onNavigate('patients')}
            className="p-4 bg-pink-50 hover:bg-pink-100 rounded-lg border border-pink-200 transition-colors text-left"
          >
            <Users className="w-6 h-6 text-pink-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Gestionar Pacientes</h3>
            <p className="text-sm text-gray-600">Actualizar información de pacientes</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssistantDashboard;