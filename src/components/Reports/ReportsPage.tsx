import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Filter, TrendingUp, Users, DollarSign, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../../context/AuthContext';

const ReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('overview');
  const [dentistFilter, setDentistFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const { user } = useAuth();

  // Mock data for charts
  const appointmentTrends = [
    { month: 'Ene', appointments: 145, revenue: 45000 },
    { month: 'Feb', appointments: 162, revenue: 52000 },
    { month: 'Mar', appointments: 138, revenue: 48000 },
    { month: 'Abr', appointments: 189, revenue: 61000 },
    { month: 'May', appointments: 156, revenue: 55000 },
    { month: 'Jun', appointments: 201, revenue: 67000 },
  ];

  const serviceDistribution = [
    { name: 'Limpieza', value: 35, revenue: 2100000, color: '#9333EA' },
    { name: 'Ortodoncia', value: 25, revenue: 3750000, color: '#EC4899' },
    { name: 'Endodoncia', value: 20, revenue: 2800000, color: '#F59E0B' },
    { name: 'Cirugía', value: 12, revenue: 1680000, color: '#EF4444' },
    { name: 'Otros', value: 8, revenue: 560000, color: '#8B5CF6' },
  ];

  const dentistPerformance = [
    { name: 'Dr. González', appointments: 45, revenue: 1350000, satisfaction: 4.8 },
    { name: 'Dr. Martínez', appointments: 38, revenue: 1140000, satisfaction: 4.7 },
    { name: 'Dr. López', appointments: 32, revenue: 960000, satisfaction: 4.9 },
    { name: 'Dr. Rodríguez', appointments: 41, revenue: 1230000, satisfaction: 4.6 },
  ];

  const cancellationReasons = [
    { reason: 'Enfermedad del paciente', count: 15, percentage: 35 },
    { reason: 'Emergencia personal', count: 12, percentage: 28 },
    { reason: 'Cambio de horario', count: 8, percentage: 19 },
    { reason: 'Problemas económicos', count: 5, percentage: 12 },
    { reason: 'Otros', count: 3, percentage: 7 },
  ];

  const hourlyData = [
    { hour: '8:00', appointments: 12 },
    { hour: '9:00', appointments: 18 },
    { hour: '10:00', appointments: 25 },
    { hour: '11:00', appointments: 22 },
    { hour: '14:00', appointments: 28 },
    { hour: '15:00', appointments: 24 },
    { hour: '16:00', appointments: 20 },
    { hour: '17:00', appointments: 15 },
  ];

  // Filter data based on selected filters
  const getFilteredData = () => {
    let filteredAppointments = appointmentTrends;
    let filteredServices = serviceDistribution;
    let filteredDentists = dentistPerformance;

    // Apply date range filter
    if (dateRange === 'week') {
      filteredAppointments = appointmentTrends.slice(-1);
    } else if (dateRange === 'quarter') {
      filteredAppointments = appointmentTrends.slice(-3);
    } else if (dateRange === 'year') {
      // Keep all data for year view
    }

    // Apply service filter
    if (serviceFilter !== 'all') {
      filteredServices = serviceDistribution.filter(service => 
        service.name.toLowerCase().includes(serviceFilter.toLowerCase())
      );
    }

    // Apply dentist filter
    if (dentistFilter !== 'all') {
      filteredDentists = dentistPerformance.filter(dentist => 
        dentist.name.toLowerCase().includes(dentistFilter.toLowerCase())
      );
    }

    return {
      appointments: filteredAppointments,
      services: filteredServices,
      dentists: filteredDentists
    };
  };

  const filteredData = getFilteredData();

  const getReportTitle = () => {
    if (user?.role === 'dentist') {
      return 'Mis Reportes Personales';
    }
    return 'Reportes y Analítica';
  };

  const getReportDescription = () => {
    if (user?.role === 'dentist') {
      return 'Consulta tus estadísticas personales y rendimiento';
    }
    return 'Análisis completo del rendimiento del Consultorio Yadira';
  };

  const exportReport = (format: 'pdf' | 'excel') => {
    // Simulate export functionality
    const reportData = {
      dateRange,
      reportType,
      filters: { dentist: dentistFilter, service: serviceFilter },
      data: filteredData,
      generatedAt: new Date().toISOString()
    };

    const content = `REPORTE CONSULTORIO YADIRA
Tipo: ${reportType}
Período: ${dateRange}
Generado: ${new Date().toLocaleString('es-CO')}

DATOS FILTRADOS:
${JSON.stringify(reportData, null, 2)}`;

    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `reporte-${reportType}-${dateRange}-${new Date().toISOString().split('T')[0]}.${format === 'pdf' ? 'txt' : 'csv'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{getReportTitle()}</h1>
          <p className="text-gray-600 mt-1">{getReportDescription()}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => exportReport('pdf')}
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar PDF
          </button>
          <button 
            onClick={() => exportReport('excel')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
              <option value="quarter">Este trimestre</option>
              <option value="year">Este año</option>
              <option value="custom">Rango personalizado</option>
            </select>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="overview">Resumen general</option>
              <option value="financial">Reporte financiero</option>
              <option value="appointments">Análisis de citas</option>
              <option value="services">Servicios más solicitados</option>
              {user?.role === 'admin' && <option value="dentists">Rendimiento por odontólogo</option>}
            </select>
            {user?.role === 'admin' && (
              <select
                value={dentistFilter}
                onChange={(e) => setDentistFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Todos los odontólogos</option>
                <option value="gonzález">Dr. González</option>
                <option value="martínez">Dr. Martínez</option>
                <option value="lópez">Dr. López</option>
                <option value="rodríguez">Dr. Rodríguez</option>
              </select>
            )}
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Todos los servicios</option>
              <option value="limpieza">Limpieza</option>
              <option value="ortodoncia">Ortodoncia</option>
              <option value="endodoncia">Endodoncia</option>
              <option value="cirugía">Cirugía</option>
            </select>
          </div>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtros avanzados
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {filteredData.appointments.reduce((sum, item) => sum + item.appointments, 0)}
              </h3>
              <p className="text-gray-600 text-sm">Citas del período</p>
              <p className="text-green-600 text-xs font-medium">+12% vs período anterior</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                ${filteredData.appointments.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
              </h3>
              <p className="text-gray-600 text-sm">Ingresos del período</p>
              <p className="text-green-600 text-xs font-medium">+8% vs período anterior</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">23</h3>
              <p className="text-gray-600 text-sm">Pacientes nuevos</p>
              <p className="text-green-600 text-xs font-medium">+15% vs período anterior</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">87%</h3>
              <p className="text-gray-600 text-sm">Tasa de ocupación</p>
              <p className="text-green-600 text-xs font-medium">+3% vs período anterior</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Trends */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Tendencia de Citas e Ingresos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData.appointments}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="appointments" fill="#9333EA" name="Citas" />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#EC4899" strokeWidth={3} name="Ingresos" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Service Distribution */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Distribución de Servicios</h2>
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={filteredData.services}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {filteredData.services.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {filteredData.services.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: service.color }}
                    />
                    <span className="text-sm font-medium text-gray-900">{service.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{service.value}%</div>
                    <div className="text-xs text-gray-500">${service.revenue.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dentist Performance (Admin only) */}
      {user?.role === 'admin' && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Rendimiento por Odontólogo</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Odontólogo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Citas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ingresos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Satisfacción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Promedio por cita
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.dentists.map((dentist, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-medium text-sm">
                            {dentist.name.split(' ')[1]?.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{dentist.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dentist.appointments}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${dentist.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{dentist.satisfaction}</span>
                        <div className="ml-2 flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < Math.floor(dentist.satisfaction) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${Math.round(dentist.revenue / dentist.appointments).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cancellation Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Razones de Cancelación</h2>
          <div className="space-y-4">
            {cancellationReasons.map((reason, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">{reason.reason}</span>
                    <span className="text-sm text-gray-600">{reason.count} casos</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                      style={{ width: `${reason.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium text-gray-900">{reason.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Horarios Más Solicitados</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="appointments" fill="#EC4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;