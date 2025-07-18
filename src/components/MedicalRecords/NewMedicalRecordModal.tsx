import React, { useState } from 'react';
import { X, Save, User, Stethoscope, FileText, Calendar, Heart, Thermometer } from 'lucide-react';

interface NewMedicalRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: any) => void;
  patients: any[];
  dentists: any[];
}

const NewMedicalRecordModal: React.FC<NewMedicalRecordModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  patients, 
  dentists 
}) => {
  const [formData, setFormData] = useState({
    patientId: '',
    dentistId: '',
    diagnosis: '',
    treatment: '',
    notes: '',
    nextAppointment: '',
    medications: [''],
    vitalSigns: {
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      oxygenSaturation: '',
      weight: '',
      height: ''
    },
    symptoms: '',
    allergies: '',
    previousTreatments: '',
    recommendations: '',
    attachments: []
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recordData = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      history: [{
        version: 1,
        date: new Date().toISOString(),
        action: 'created',
        changes: 'Historia clínica creada',
        userId: 'current-user-id'
      }]
    };
    onSave(recordData);
    onClose();
    // Reset form
    setFormData({
      patientId: '',
      dentistId: '',
      diagnosis: '',
      treatment: '',
      notes: '',
      nextAppointment: '',
      medications: [''],
      vitalSigns: {
        bloodPressure: '',
        heartRate: '',
        temperature: '',
        oxygenSaturation: '',
        weight: '',
        height: ''
      },
      symptoms: '',
      allergies: '',
      previousTreatments: '',
      recommendations: '',
      attachments: []
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('vitalSigns.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        vitalSigns: {
          ...prev.vitalSigns,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addMedication = () => {
    setFormData(prev => ({
      ...prev,
      medications: [...prev.medications, '']
    }));
  };

  const updateMedication = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.map((med, i) => i === index ? value : med)
    }));
  };

  const removeMedication = (index: number) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Nueva Historia Clínica</h2>
            <p className="text-gray-600">Crear registro médico completo del paciente</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600" />
              Información Básica
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paciente *
                </label>
                <select
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Seleccionar paciente</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Odontólogo *
                </label>
                <select
                  name="dentistId"
                  value={formData.dentistId}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Seleccionar odontólogo</option>
                  {dentists.map((dentist) => (
                    <option key={dentist.id} value={dentist.id}>
                      {dentist.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Vital Signs */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-pink-600" />
              Signos Vitales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Presión Arterial
                </label>
                <input
                  type="text"
                  name="vitalSigns.bloodPressure"
                  value={formData.vitalSigns.bloodPressure}
                  onChange={handleChange}
                  placeholder="120/80"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frecuencia Cardíaca (bpm)
                </label>
                <input
                  type="number"
                  name="vitalSigns.heartRate"
                  value={formData.vitalSigns.heartRate}
                  onChange={handleChange}
                  placeholder="72"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperatura (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="vitalSigns.temperature"
                  value={formData.vitalSigns.temperature}
                  onChange={handleChange}
                  placeholder="36.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Saturación de Oxígeno (%)
                </label>
                <input
                  type="number"
                  name="vitalSigns.oxygenSaturation"
                  value={formData.vitalSigns.oxygenSaturation}
                  onChange={handleChange}
                  placeholder="98"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="vitalSigns.weight"
                  value={formData.vitalSigns.weight}
                  onChange={handleChange}
                  placeholder="70"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Altura (cm)
                </label>
                <input
                  type="number"
                  name="vitalSigns.height"
                  value={formData.vitalSigns.height}
                  onChange={handleChange}
                  placeholder="170"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-purple-600" />
              Información Médica
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Síntomas Principales
                </label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describa los síntomas principales del paciente"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alergias Conocidas
                </label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Alergias a medicamentos, materiales, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diagnóstico *
                </label>
                <textarea
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Diagnóstico detallado del paciente"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tratamientos Previos
                </label>
                <textarea
                  name="previousTreatments"
                  value={formData.previousTreatments}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Tratamientos odontológicos previos"
                />
              </div>
            </div>
          </div>

          {/* Treatment */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-600" />
              Tratamiento y Plan
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tratamiento Realizado *
                </label>
                <textarea
                  name="treatment"
                  value={formData.treatment}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Descripción detallada del tratamiento realizado"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observaciones y Notas
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Observaciones adicionales, evolución del paciente, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recomendaciones
                </label>
                <textarea
                  name="recommendations"
                  value={formData.recommendations}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Recomendaciones para el cuidado en casa"
                />
              </div>
            </div>
          </div>

          {/* Medications */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Medicamentos Prescritos
            </h3>
            <div className="space-y-3">
              {formData.medications.map((medication, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={medication}
                    onChange={(e) => updateMedication(index, e.target.value)}
                    placeholder="Medicamento, dosis y frecuencia"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {formData.medications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMedication(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addMedication}
                className="text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                + Agregar medicamento
              </button>
            </div>
          </div>

          {/* Next Appointment */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-pink-600" />
              Seguimiento
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Próxima Cita (Opcional)
              </label>
              <input
                type="datetime-local"
                name="nextAppointment"
                value={formData.nextAppointment}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Guardar Historia Clínica
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMedicalRecordModal;