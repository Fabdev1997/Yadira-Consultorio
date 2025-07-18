import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, User, X } from 'lucide-react';

interface CalendarViewProps {
  appointments: any[];
  isOpen: boolean;
  onClose: () => void;
  onSelectSlot: (date: Date, time: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ appointments, isOpen, onClose, onSelectSlot }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  // Don't render if not open
  if (!isOpen) return null;

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.toDateString() === date.toDateString();
    });
  };

  const isSlotAvailable = (date: Date, time: string) => {
    const dayAppointments = getAppointmentsForDate(date);
    return !dayAppointments.some(apt => apt.time === time);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleClose = () => {
    // Reset selected date when closing
    setSelectedDate(null);
    onClose();
  };

  const handleSlotSelect = (date: Date, time: string) => {
    onSelectSlot(date, time);
    handleClose(); // Close calendar after selecting slot
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vista de Calendario</h2>
            <p className="text-gray-600">Selecciona fecha y hora para nueva cita</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendar */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  type="button"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-xl font-semibold text-gray-900">
                  {currentDate.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })}
                </h3>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  type="button"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  if (!day) {
                    return <div key={index} className="p-2"></div>;
                  }

                  const isToday = day.toDateString() === new Date().toDateString();
                  const isSelected = selectedDate?.toDateString() === day.toDateString();
                  const dayAppointments = getAppointmentsForDate(day);
                  const isPast = day < new Date(new Date().setHours(0, 0, 0, 0));

                  return (
                    <button
                      key={index}
                      onClick={() => !isPast && setSelectedDate(day)}
                      disabled={isPast}
                      type="button"
                      className={`
                        p-2 text-sm rounded-lg transition-colors relative
                        ${isPast 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'hover:bg-purple-50 cursor-pointer'
                        }
                        ${isToday ? 'bg-purple-100 text-purple-700 font-bold' : ''}
                        ${isSelected ? 'bg-purple-600 text-white' : ''}
                      `}
                    >
                      {day.getDate()}
                      {dayAppointments.length > 0 && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {selectedDate 
                  ? `Horarios disponibles - ${selectedDate.toLocaleDateString('es-CO')}`
                  : 'Selecciona una fecha'
                }
              </h3>

              {selectedDate ? (
                <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {timeSlots.map(time => {
                    const isAvailable = isSlotAvailable(selectedDate, time);
                    return (
                      <button
                        key={time}
                        onClick={() => isAvailable && handleSlotSelect(selectedDate, time)}
                        disabled={!isAvailable}
                        type="button"
                        className={`
                          p-3 rounded-lg border transition-colors text-sm font-medium
                          ${isAvailable
                            ? 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100'
                            : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          }
                        `}
                      >
                        <Clock className="w-4 h-4 mx-auto mb-1" />
                        {time}
                        {!isAvailable && (
                          <div className="text-xs mt-1">Ocupado</div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>Selecciona una fecha en el calendario para ver los horarios disponibles</p>
                </div>
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Leyenda:</h4>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-100 rounded"></div>
                <span>Hoy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-600 rounded"></div>
                <span>Fecha seleccionada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-100 rounded relative">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full"></div>
                </div>
                <span>Día con citas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-50 border border-purple-200 rounded"></div>
                <span>Horario disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
                <span>Horario ocupado</span>
              </div>
            </div>
          </div>

          {/* Close Button at Bottom */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <button
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              type="button"
            >
              Cerrar Calendario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;