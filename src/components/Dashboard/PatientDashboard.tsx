import React from 'react';
import { Calendar, FileText, Tag, Clock } from 'lucide-react';

interface PatientDashboardProps {
  onNavigate: (page: string) => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ onNavigate }) => {
  const upcomingAppointments = [
    { date: '2024-01-15', time: '10:30', doctor: 'Dr. González', service: 'Limpieza dental' },
    { date: '2024-02-15', time: '14:00', doctor: 'Dr. López', service: 'Revisión' },
  ];

  const recentInvoices = [
    { date: '2024-01-10', amount: '$150,000', status: 'Pagada', service: 'Limpieza dental' },
    { date: '2023-12-20', amount: '$300,000', status: 'Pagada', service: 'Endodoncia' },
  ];

  const activePromotions = [
    { title: '20% OFF en Limpieza', description: 'Válida hasta el 31 de enero', discount: '20%' },
    { title: 'Blanqueamiento 2x1', description: 'Promoción especial de temporada', discount: '50%' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">¡Hola, Carlos!</h1>
        <p className="text-purple-100">
          Tu próxima cita es el 15 de enero a las 10:30 AM
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Próximas Citas
          </h2>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <div key={index} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{appointment.service}</h3>
                  <span className="text-sm text-purple-600 font-medium">{appointment.time}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {new Date(appointment.date).toLocaleDateString('es-CO')} con {appointment.doctor}
                </p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => onNavigate('appointments')}
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Solicitar Nueva Cita
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-pink-600" />
            Facturas Recientes
          </h2>
          <div className="space-y-4">
            {recentInvoices.map((invoice, index) => (
              <div key={index} className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{invoice.service}</h3>
                  <span className="text-lg font-bold text-pink-600">{invoice.amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    {new Date(invoice.date).toLocaleDateString('es-CO')}
                  </p>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => onNavigate('invoices')}
            className="w-full mt-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Ver Todas las Facturas
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Tag className="w-5 h-5 text-purple-600" />
          Promociones Activas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activePromotions.map((promo, index) => (
            <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{promo.title}</h3>
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm font-bold">
                  {promo.discount}
                </span>
              </div>
              <p className="text-sm text-gray-600">{promo.description}</p>
              <button 
                onClick={() => onNavigate('promotions')}
                className="mt-3 text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                Aplicar promoción →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;