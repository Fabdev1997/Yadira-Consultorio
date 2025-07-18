import React, { useState } from 'react';
import { Clock, Save, Plus, Trash2, Calendar } from 'lucide-react';

interface TimeSlot {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface DentistAvailabilityProps {
  dentistId: string;
  dentistName: string;
}

const DentistAvailability: React.FC<DentistAvailabilityProps> = ({ dentistId, dentistName }) => {
  const [availability, setAvailability] = useState<TimeSlot[]>([
    { id: '1', dayOfWeek: 1, startTime: '08:00', endTime: '12:00', isAvailable: true },
    { id: '2', dayOfWeek: 1, startTime: '14:00', endTime: '18:00', isAvailable: true },
    { id: '3', dayOfWeek: 2, startTime: '08:00', endTime: '12:00', isAvailable: true },
    { id: '4', dayOfWeek: 2, startTime: '14:00', endTime: '18:00', isAvailable: true },
    { id: '5', dayOfWeek: 3, startTime: '08:00', endTime: '12:00', isAvailable: true },
    { id: '6', dayOfWeek: 3, startTime: '14:00', endTime: '18:00', isAvailable: true },
    { id: '7', dayOfWeek: 4, startTime: '08:00', endTime: '12:00', isAvailable: true },
    { id: '8', dayOfWeek: 4, startTime: '14:00', endTime: '18:00', isAvailable: true },
    { id: '9', dayOfWeek: 5, startTime: '08:00', endTime: '12:00', isAvailable: true },
    { id: '10', dayOfWeek: 5, startTime: '14:00', endTime: '18:00', isAvailable: true },
    { id: '11', dayOfWeek: 6, startTime: '08:00', endTime: '12:00', isAvailable: true },
  ]);

  const [newSlot, setNewSlot] = useState({
    dayOfWeek: 1,
    startTime: '08:00',
    endTime: '12:00'
  });

  const daysOfWeek = [
    { value: 1, label: 'Lunes' },
    { value: 2, label: 'Martes' },
    { value: 3, label: 'Miércoles' },
    { value: 4, label: 'Jueves' },
    { value: 5, label: 'Viernes' },
    { value: 6, label: 'Sábado' },
    { value: 0, label: 'Domingo' }
  ];

  const addTimeSlot = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setAvailability(prev => [...prev, {
      id,
      ...newSlot,
      isAvailable: true
    }]);
    setNewSlot({
      dayOfWeek: 1,
      startTime: '08:00',
      endTime: '12:00'
    });
  };

  const removeTimeSlot = (id: string) => {
    setAvailability(prev => prev.filter(slot => slot.id !== id));
  };

  const toggleAvailability = (id: string) => {
    setAvailability(prev => prev.map(slot => 
      slot.id === id ? { ...slot, isAvailable: !slot.isAvailable } : slot
    ));
  };

  const updateTimeSlot = (id: string, field: string, value: any) => {
    setAvailability(prev => prev.map(slot => 
      slot.id === id ? { ...slot, [field]: value } : slot
    ));
  };

  const saveAvailability = () => {
    // In a real app, this would save to the database
    alert('Disponibilidad guardada exitosamente');
  };

  const groupedAvailability = daysOfWeek.reduce((acc, day) => {
    acc[day.value] = availability.filter(slot => slot.dayOfWeek === day.value);
    return acc;
  }, {} as Record<number, TimeSlot[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Disponibilidad</h2>
          <p className="text-gray-600">{dentistName} - Configura tus horarios de atención</p>
        </div>
        <button
          onClick={saveAvailability}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Guardar Cambios
        </button>
      </div>

      {/* Add New Time Slot */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Agregar Nuevo Horario</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Día</label>
            <select
              value={newSlot.dayOfWeek}
              onChange={(e) => setNewSlot({ ...newSlot, dayOfWeek: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {daysOfWeek.map(day => (
                <option key={day.value} value={day.value}>{day.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hora Inicio</label>
            <input
              type="time"
              value={newSlot.startTime}
              onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hora Fin</label>
            <input
              type="time"
              value={newSlot.endTime}
              onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={addTimeSlot}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Agregar
            </button>
          </div>
        </div>
      </div>

      {/* Current Availability */}
      <div className="space-y-4">
        {daysOfWeek.map(day => (
          <div key={day.value} className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              {day.label}
            </h3>
            
            {groupedAvailability[day.value]?.length > 0 ? (
              <div className="space-y-3">
                {groupedAvailability[day.value].map(slot => (
                  <div key={slot.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) => updateTimeSlot(slot.id, 'startTime', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) => updateTimeSlot(slot.id, 'endTime', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleAvailability(slot.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          slot.isAvailable
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        {slot.isAvailable ? 'Disponible' : 'No Disponible'}
                      </button>
                      
                      <button
                        onClick={() => removeTimeSlot(slot.id)}
                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>No hay horarios configurados para este día</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Templates */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-purple-900 mb-4">Plantillas Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => {
              // Set standard weekday schedule
              const standardWeekdays = [1, 2, 3, 4, 5].map(day => [
                { id: Math.random().toString(36).substr(2, 9), dayOfWeek: day, startTime: '08:00', endTime: '12:00', isAvailable: true },
                { id: Math.random().toString(36).substr(2, 9), dayOfWeek: day, startTime: '14:00', endTime: '18:00', isAvailable: true }
              ]).flat();
              setAvailability(standardWeekdays);
            }}
            className="p-4 bg-white border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-left"
          >
            <h4 className="font-medium text-purple-900">Horario Estándar</h4>
            <p className="text-sm text-purple-700">Lun-Vie: 8:00-12:00, 14:00-18:00</p>
          </button>
          
          <button
            onClick={() => {
              // Set extended schedule including Saturday
              const extendedSchedule = [1, 2, 3, 4, 5, 6].map(day => [
                { id: Math.random().toString(36).substr(2, 9), dayOfWeek: day, startTime: '08:00', endTime: '12:00', isAvailable: true },
                { id: Math.random().toString(36).substr(2, 9), dayOfWeek: day, startTime: '14:00', endTime: day === 6 ? '16:00' : '18:00', isAvailable: true }
              ]).flat();
              setAvailability(extendedSchedule);
            }}
            className="p-4 bg-white border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-left"
          >
            <h4 className="font-medium text-purple-900">Horario Extendido</h4>
            <p className="text-sm text-purple-700">Lun-Vie: 8:00-12:00, 14:00-18:00<br/>Sáb: 8:00-12:00, 14:00-16:00</p>
          </button>
          
          <button
            onClick={() => setAvailability([])}
            className="p-4 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-left"
          >
            <h4 className="font-medium text-red-900">Limpiar Todo</h4>
            <p className="text-sm text-red-700">Eliminar todos los horarios</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DentistAvailability;