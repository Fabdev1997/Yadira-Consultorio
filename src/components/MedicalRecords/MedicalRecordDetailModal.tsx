import React, { useState } from 'react';
import { X, Edit, Download, FileText, Calendar, User, Stethoscope, Heart, Clock, Save, History } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  dentistName: string;
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  nextAppointment?: string;
  attachments: string[];
  medications: string[];
  vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    oxygenSaturation?: string;
    weight?: string;
    height?: string;
  };
  symptoms?: string;
  allergies?: string;
  previousTreatments?: string;
  recommendations?: string;
  version: number;
  history: Array<{
    version: number;
    date: string;
    action: string;
    changes: string;
    userId: string;
  }>;
}

interface MedicalRecordDetailModalProps {
  record: MedicalRecord;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, updates: any) => void;
}

const MedicalRecordDetailModal: React.FC<MedicalRecordDetailModalProps> = ({ 
  record, 
  isOpen, 
  onClose, 
  onUpdate
}) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [editData, setEditData] = useState(record);

  if (!isOpen || !record) return null;

  // Determine if user can edit
  const canEdit = user?.role === 'admin' || user?.role === 'dentist';

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(record);
  };

  const handleSave = () => {
    const updates = {
      ...editData,
      updatedAt: new Date().toISOString(),
      version: record.version + 1,
      history: [
        ...record.history,
        {
          version: record.version + 1,
          date: new Date().toISOString(),
          action: 'updated',
          changes: 'Historia clínica actualizada',
          userId: user?.id || 'current-user-id'
        }
      ]
    };
    onUpdate(record.id, updates);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(record);
  };

  const handleDownload = () => {
    // Create comprehensive PDF content
    const pdfContent = `
CONSULTORIO YADIRA
Historia Clínica Completa

INFORMACIÓN DEL PACIENTE:
Nombre: ${record.patientName}
Fecha de consulta: ${new Date(record.date).toLocaleDateString('es-CO')}
Atendido por: ${record.dentistName}

SIGNOS VITALES:
Presión arterial: ${record.vitalSigns.bloodPressure}
Frecuencia cardíaca: ${record.vitalSigns.heartRate} bpm
Temperatura: ${record.vitalSigns.temperature}°C
${record.vitalSigns.oxygenSaturation ? `Saturación O2: ${record.vitalSigns.oxygenSaturation}%` : ''}
${record.vitalSigns.weight ? `Peso: ${record.vitalSigns.weight} kg` : ''}
${record.vitalSigns.height ? `Altura: ${record.vitalSigns.height} cm` : ''}

INFORMACIÓN CLÍNICA:
Síntomas: ${record.symptoms || 'No especificado'}
Alergias: ${record.allergies || 'No especificado'}
Tratamientos previos: ${record.previousTreatments || 'No especificado'}

DIAGNÓSTICO:
${record.diagnosis}

TRATAMIENTO REALIZADO:
${record.treatment}

OBSERVACIONES:
${record.notes}

RECOMENDACIONES:
${record.recommendations || 'No especificado'}

MEDICAMENTOS PRESCRITOS:
${record.medications.join('\n')}

VERSIÓN: ${record.version}
FECHA DE CREACIÓN: ${new Date(record.history[0]?.date || record.date).toLocaleString('es-CO')}
ÚLTIMA MODIFICACIÓN: ${new Date(record.updatedAt || record.date).toLocaleString('es-CO')}

© 2024 Consultorio Yadira - Historia Clínica Digital
    `;

    const element = document.createElement('a');
    const file = new Blob([pdfContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `historia-clinica-${record.patientName}-${record.date}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('vitalSigns.')) {
      const field = name.split('.')[1];
      setEditData(prev => ({
        ...prev,
        vitalSigns: {
          ...prev.vitalSigns,
          [field]: value
        }
      }));
    } else {
      setEditData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Historia Clínica</h2>
            <p className="text-gray-600">{record.patientName} - {new Date(record.date).toLocaleDateString('es-CO')}</p>
            <p className="text-sm text-gray-500">Versión {record.version} - Última actualización: {new Date(record.updatedAt || record.date).toLocaleString('es-CO')}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors"
              title="Ver historial de versiones"
            >
              <History className="w-5 h-5" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors"
              title="Descargar PDF"
            >
              <Download className="w-5 h-5" />
            </button>
            {canEdit && !isEditing && (
              <button
                onClick={handleEdit}
                className="p-2 text-pink-600 hover:text-pink-900 hover:bg-pink-50 rounded-lg transition-colors"
                title="Editar historia"
              >
                <Edit className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Version History */}
        {showHistory && (
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Historial de Versiones</h3>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {record.history.map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Versión {entry.version}</div>
                    <div className="text-sm text-gray-600">{entry.changes}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(entry.date).toLocaleString('es-CO')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600" />
              Información Básica
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <span className="text-sm font-medium text-gray-600">Paciente:</span>
                <p className="text-gray-900">{record.patientName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Atendido por:</span>
                <p className="text-gray-900">{record.dentistName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Fecha de consulta:</span>
                <p className="text-gray-900">{new Date(record.date).toLocaleDateString('es-CO')}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Hora:</span>
                <p className="text-gray-900">{new Date(record.date).toLocaleTimeString('es-CO')}</p>
              </div>
            </div>
          </div>

          {/* Vital Signs */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-pink-600" />
              Signos Vitales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(record.vitalSigns).map(([key, value]) => {
                if (!value) return null;
                const labels: Record<string, string> = {
                  bloodPressure: 'Presión Arterial',
                  heartRate: 'Frecuencia Cardíaca',
                  temperature: 'Temperatura',
                  oxygenSaturation: 'Saturación O2',
                  weight: 'Peso',
                  height: 'Altura'
                };
                return (
                  <div key={key} className="bg-purple-50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-purple-700">{labels[key]}:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name={`vitalSigns.${key}`}
                        value={editData.vitalSigns[key as keyof typeof editData.vitalSigns] || ''}
                        onChange={handleChange}
                        className="w-full mt-1 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      <p className="text-purple-900 font-medium">{value}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Medical Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600" />
                Información Clínica
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Síntomas</label>
                  {isEditing ? (
                    <textarea
                      name="symptoms"
                      value={editData.symptoms || ''}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{record.symptoms || 'No especificado'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alergias</label>
                  {isEditing ? (
                    <textarea
                      name="allergies"
                      value={editData.allergies || ''}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{record.allergies || 'No especificado'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Diagnóstico</label>
                  {isEditing ? (
                    <textarea
                      name="diagnosis"
                      value={editData.diagnosis}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{record.diagnosis}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-600" />
                Tratamiento y Plan
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tratamiento Realizado</label>
                  {isEditing ? (
                    <textarea
                      name="treatment"
                      value={editData.treatment}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{record.treatment}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Observaciones</label>
                  {isEditing ? (
                    <textarea
                      name="notes"
                      value={editData.notes}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{record.notes}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recomendaciones</label>
                  {isEditing ? (
                    <textarea
                      name="recommendations"
                      value={editData.recommendations || ''}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{record.recommendations || 'No especificado'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Medications */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Medicamentos Prescritos</h4>
            <div className="space-y-2">
              {record.medications.map((med, index) => (
                <div key={index} className="bg-pink-50 px-3 py-2 rounded-lg border border-pink-200">
                  <span className="text-pink-900 font-medium">{med}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Attachments */}
          {record.attachments.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Archivos Adjuntos</h4>
              <div className="flex flex-wrap gap-2">
                {record.attachments.map((file, index) => (
                  <span key={index} className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                    {file}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Next Appointment */}
          {record.nextAppointment && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-900">
                  Próxima cita: {new Date(record.nextAppointment).toLocaleDateString('es-CO')} a las {new Date(record.nextAppointment).toLocaleTimeString('es-CO')}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {isEditing && (
          <div className="border-t border-gray-200 p-6">
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Guardar Cambios
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecordDetailModal;