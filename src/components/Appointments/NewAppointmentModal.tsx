import React, { useState } from 'react';
import { X, Calendar, Clock, User, Stethoscope, Save } from 'lucide-react';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (appointment: any) => void;
  selectedDate?: Date;
  selectedTime?: string;
}

const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  selectedDate,
  selectedTime 
}) => {
  const [formData, setFormData] = useState({
    patientId: '',
    dentistId: '',
    date: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
    time: selectedTime || '',
    service: '',
    duration: '60',
    notes: '',
    cost: 0
  });

  const mockPatients = [
    { id: '1', name: 'Carlos Pérez González', phone: '+57 300 123 4567', email: 'carlos@email.com' },
    { id: '2', name: 'Ana García Martínez', phone: '+57 301 234 5678', email: 'ana@email.com' },
    { id: '3', name: 'María Rodríguez Silva', phone: '+57 302 345 6789', email: 'maria@email.com' },
    { id: '4', name: 'Juan López Hernández', phone: '+57 303 456 7890', email: 'juan@email.com' },
  ];

  const mockDentists = [
    { id: '1', name: 'Dr. María González', specialization: 'Ortodoncia' },
    { id: '2', name: 'Dr. Carlos Martínez', specialization: 'Endodoncia' },
    { id: '3', name: 'Dr. Juan López', specialization: 'Cirugía Oral' },
    { id: '4', name: 'Dr. Ana Rodríguez', specialization: 'Odontopediatría' },
  ];

  const services = [
    { name: 'Consulta General', price: 80000, duration: 30 },
    { name: 'Limpieza Dental', price: 150000, duration: 60 },
    { name: 'Obturación Simple', price: 200000, duration: 45 },
    { name: 'Extracción Simple', price: 120000, duration: 30 },
    { name: 'Endodoncia', price: 500000, duration: 120 },
    { name: 'Ortodoncia - Control', price: 80000, duration: 30 },
    { name: 'Blanqueamiento Dental', price: 300000, duration: 90 },
    { name: 'Cirugía de Cordales', price: 450000, duration: 90 },
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  if (!isOpen) return null;

  const handleClose = () => {
    // Reset form data
    setFormData({
      patientId: '',
      dentistId: '',
      date: '',
      time: '',
      service: '',
      duration: '60',
      notes: '',
      cost: 0
    });
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedPatient = mockPatients.find(p => p.id === formData.patientId);
    const selectedDentist = mockDentists.find(d => d.id === formData.dentistId);
    
    const appointmentData = {
      id: Math.random().toString(36).substr(2, 9),
      patient: selectedPatient?.name || '',
      dentist: selectedDentist?.name || '',
      phone: selectedPatient?.phone || '',
      email: selectedPatient?.email || '',
      date: new Date(`${formData.date}T${formData.time}:00`),
      time: formData.time,
      service: formData.service,
      duration: `${formData.duration}min`,
      status: 'scheduled',
      notes: formData.notes,
      cost: formData.cost,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    onSave(appointmentData);
    handleClose();
  };

  const handleServiceChange = (serviceName: string) => {
    const service = services.find(s => s.name === serviceName);
    if (service) {
      setFormData(prev => ({
        ...prev,
        service: serviceName,
        duration: service.duration.toString(),
        cost: service.price
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Nueva Cita</h2>
            <p className="text-gray-600">Programar nueva cita médica</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Patient and Dentist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Paciente *
              </label>
              <select
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Seleccionar paciente</option>
                {mockPatients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Stethoscope className="w-4 h-4 inline mr-2" />
                Odontólogo *
              </label>
              <select
                value={formData.dentistId}
                onChange={(e) => setFormData({ ...formData, dentistId: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Seleccionar odontólogo</option>
                {mockDentists.map((dentist) => (
                  <option key={dentist.id} value={dentist.id}>
                    {dentist.name} - {dentist.specialization}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Fecha *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Hora *
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Seleccionar hora</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Servicio *
            </label>
            <select
              value={formData.service}
              onChange={(e) => handleServiceChange(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Seleccionar servicio</option>
              {services.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.name} - ${service.price.toLocaleString()} ({service.duration} min)
                </option>
              ))}
            </select>
          </div>

          {/* Duration and Cost */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duración (minutos)
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                min="15"
                max="240"
                step="15"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Costo
              </label>
              <input
                type="number"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: parseInt(e.target.value) })}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observaciones
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Observaciones adicionales sobre la cita"
            />
          </div>

          {/* Summary */}
          {formData.service && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Resumen de la Cita</h3>
              <div className="text-sm text-purple-800 space-y-1">
                <p><strong>Servicio:</strong> {formData.service}</p>
                <p><strong>Duración:</strong> {formData.duration} minutos</p>
                <p><strong>Costo:</strong> ${formData.cost.toLocaleString()}</p>
                {formData.date && formData.time && (
                  <p><strong>Fecha y hora:</strong> {new Date(`${formData.date}T${formData.time}`).toLocaleString('es-CO')}</p>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Programar Cita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAppointmentModal;