import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Calculator } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  isActive: boolean;
}

interface InvoiceService {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface NewInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: any) => void;
}

const NewInvoiceModal: React.FC<NewInvoiceModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    dentistId: '',
    dueDate: '',
    services: [{ name: '', quantity: 1, unitPrice: 0, total: 0 }] as InvoiceService[]
  });

  // Mock services data - in real app this would come from settings/database
  const [availableServices] = useState<Service[]>([
    // Odontología General
    { id: '1', name: 'Consulta General', category: 'Odontología General', price: 80000, description: 'Consulta y revisión general', isActive: true },
    { id: '2', name: 'Limpieza Dental', category: 'Odontología General', price: 150000, description: 'Profilaxis dental completa', isActive: true },
    { id: '3', name: 'Obturación Simple', category: 'Odontología General', price: 200000, description: 'Obturación con resina compuesta', isActive: true },
    { id: '4', name: 'Extracción Simple', category: 'Odontología General', price: 120000, description: 'Extracción dental simple', isActive: true },
    
    // Ortodoncia
    { id: '5', name: 'Consulta Ortodoncia', category: 'Ortodoncia', price: 100000, description: 'Evaluación ortodóntica inicial', isActive: true },
    { id: '6', name: 'Brackets Metálicos', category: 'Ortodoncia', price: 2500000, description: 'Tratamiento completo con brackets metálicos', isActive: true },
    { id: '7', name: 'Brackets Estéticos', category: 'Ortodoncia', price: 3500000, description: 'Tratamiento completo con brackets estéticos', isActive: true },
    { id: '8', name: 'Reposición de Bracket', category: 'Ortodoncia', price: 50000, description: 'Reposición de bracket individual', isActive: true },
    { id: '9', name: 'Control Ortodóntico', category: 'Ortodoncia', price: 80000, description: 'Control mensual de ortodoncia', isActive: true },
    
    // Odontopediatría
    { id: '10', name: 'Consulta Pediátrica', category: 'Odontopediatría', price: 90000, description: 'Consulta odontológica para niños', isActive: true },
    { id: '11', name: 'Sellantes', category: 'Odontopediatría', price: 60000, description: 'Sellantes de fosas y fisuras', isActive: true },
    { id: '12', name: 'Aplicación de Flúor', category: 'Odontopediatría', price: 40000, description: 'Aplicación tópica de flúor', isActive: true },
    
    // Endodoncia
    { id: '13', name: 'Endodoncia Unirradicular', category: 'Endodoncia', price: 400000, description: 'Tratamiento de conducto en diente unirradicular', isActive: true },
    { id: '14', name: 'Endodoncia Birradicular', category: 'Endodoncia', price: 500000, description: 'Tratamiento de conducto en diente birradicular', isActive: true },
    { id: '15', name: 'Endodoncia Multirradicular', category: 'Endodoncia', price: 600000, description: 'Tratamiento de conducto en diente multirradicular', isActive: true },
    
    // Periodoncia
    { id: '16', name: 'Raspaje y Alisado', category: 'Periodoncia', price: 250000, description: 'Raspaje y alisado radicular por cuadrante', isActive: true },
    { id: '17', name: 'Cirugía Periodontal', category: 'Periodoncia', price: 800000, description: 'Cirugía periodontal regenerativa', isActive: true },
    
    // Cirugía Oral
    { id: '18', name: 'Extracción Quirúrgica', category: 'Cirugía Oral', price: 300000, description: 'Extracción quirúrgica compleja', isActive: true },
    { id: '19', name: 'Cirugía de Cordales', category: 'Cirugía Oral', price: 450000, description: 'Extracción de terceros molares', isActive: true },
    { id: '20', name: 'Biopsia Oral', category: 'Cirugía Oral', price: 350000, description: 'Biopsia de tejidos orales', isActive: true },
    
    // Rehabilitación Oral
    { id: '21', name: 'Corona Porcelana', category: 'Rehabilitación Oral', price: 800000, description: 'Corona de porcelana sobre metal', isActive: true },
    { id: '22', name: 'Corona Zirconio', category: 'Rehabilitación Oral', price: 1200000, description: 'Corona de zirconio', isActive: true },
    { id: '23', name: 'Prótesis Parcial', category: 'Rehabilitación Oral', price: 1500000, description: 'Prótesis parcial removible', isActive: true },
    { id: '24', name: 'Prótesis Total', category: 'Rehabilitación Oral', price: 2000000, description: 'Prótesis total superior o inferior', isActive: true },
    
    // Diseño de Sonrisas
    { id: '25', name: 'Carillas de Porcelana', category: 'Diseño de Sonrisas', price: 900000, description: 'Carilla de porcelana por diente', isActive: true },
    { id: '26', name: 'Blanqueamiento Dental', category: 'Diseño de Sonrisas', price: 300000, description: 'Blanqueamiento dental profesional', isActive: true },
    { id: '27', name: 'Diseño Digital de Sonrisa', category: 'Diseño de Sonrisas', price: 200000, description: 'Diseño digital y planificación', isActive: true },
    
    // Implantes Dentales
    { id: '28', name: 'Implante Dental', category: 'Implantes Dentales', price: 2500000, description: 'Implante dental con corona', isActive: true },
    { id: '29', name: 'Cirugía de Implante', category: 'Implantes Dentales', price: 1800000, description: 'Colocación de implante dental', isActive: true },
    { id: '30', name: 'Corona sobre Implante', category: 'Implantes Dentales', price: 1200000, description: 'Corona sobre implante', isActive: true }
  ]);

  const mockPatients = [
    { id: '1', name: 'Carlos Pérez González' },
    { id: '2', name: 'Ana García Martínez' },
    { id: '3', name: 'María Rodríguez Silva' },
  ];

  const mockDentists = [
    { id: '1', name: 'Dr. María González' },
    { id: '2', name: 'Dr. Carlos Martínez' },
    { id: '3', name: 'Dr. Juan López' },
  ];

  // Recalculate totals whenever services change
  useEffect(() => {
    const updatedServices = formData.services.map(service => ({
      ...service,
      total: service.quantity * service.unitPrice
    }));
    
    if (JSON.stringify(updatedServices) !== JSON.stringify(formData.services)) {
      setFormData(prev => ({
        ...prev,
        services: updatedServices
      }));
    }
  }, [formData.services]);

  // Move the conditional return after all hooks
  if (!isOpen) return null;

  const addService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { name: '', quantity: 1, unitPrice: 0, total: 0 }]
    });
  };

  const removeService = (index: number) => {
    if (formData.services.length > 1) {
      const newServices = formData.services.filter((_, i) => i !== index);
      setFormData({ ...formData, services: newServices });
    }
  };

  const updateService = (index: number, field: keyof InvoiceService, value: any) => {
    const newServices = [...formData.services];
    const updatedService = { ...newServices[index] };
    
    if (field === 'quantity' || field === 'unitPrice') {
      const numValue = parseFloat(value) || 0;
      updatedService[field] = numValue;
      
      // Recalculate total for this service
      if (field === 'quantity') {
        updatedService.total = numValue * updatedService.unitPrice;
      } else if (field === 'unitPrice') {
        updatedService.total = updatedService.quantity * numValue;
      }
    } else {
      updatedService[field] = value;
    }
    
    newServices[index] = updatedService;
    setFormData({ ...formData, services: newServices });
  };

  const selectService = (index: number, serviceName: string) => {
    const service = availableServices.find(s => s.name === serviceName);
    if (service) {
      const newServices = [...formData.services];
      newServices[index] = {
        ...newServices[index],
        name: service.name,
        unitPrice: service.price,
        total: newServices[index].quantity * service.price
      };
      setFormData({ ...formData, services: newServices });
    }
  };

  const calculateSubtotal = (): number => {
    return formData.services.reduce((sum, service) => {
      const serviceTotal = service.quantity * service.unitPrice;
      return sum + serviceTotal;
    }, 0);
  };

  const calculateTax = (): number => {
    const subtotal = calculateSubtotal();
    return Math.round(subtotal * 0.19); // 19% IVA, rounded to nearest peso
  };

  const calculateTotal = (): number => {
    return calculateSubtotal() + calculateTax();
  };

  const handleClose = () => {
    // Reset form
    setFormData({
      patientId: '',
      dentistId: '',
      dueDate: '',
      services: [{ name: '', quantity: 1, unitPrice: 0, total: 0 }]
    });
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least one service has been added
    const validServices = formData.services.filter(service => 
      service.name && service.quantity > 0 && service.unitPrice > 0
    );
    
    if (validServices.length === 0) {
      alert('Debe agregar al menos un servicio válido');
      return;
    }
    
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const total = calculateTotal();
    
    const invoiceData = {
      ...formData,
      services: validServices,
      subtotal,
      tax,
      total,
      issueDate: new Date().toISOString().split('T')[0],
      status: 'draft'
    };
    
    onSave(invoiceData);
    handleClose();
  };

  // Group services by category
  const servicesByCategory = availableServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Nueva Factura</h2>
            <p className="text-gray-600">Crear factura electrónica DIAN</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    {dentist.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Vencimiento *
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Servicios</h3>
              <button
                type="button"
                onClick={addService}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Agregar Servicio
              </button>
            </div>

            <div className="space-y-4">
              {formData.services.map((service, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Servicio *
                      </label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={service.name}
                          onChange={(e) => updateService(index, 'name', e.target.value)}
                          placeholder="Nombre del servicio"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        />
                        <select
                          onChange={(e) => selectService(index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        >
                          <option value="">Seleccionar servicio predefinido</option>
                          {Object.entries(servicesByCategory).map(([category, services]) => (
                            <optgroup key={category} label={category}>
                              {services.filter(s => s.isActive).map((s) => (
                                <option key={s.id} value={s.name}>
                                  {s.name} - ${s.price.toLocaleString()}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cantidad *
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={service.quantity}
                        onChange={(e) => updateService(index, 'quantity', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Precio Unitario *
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={service.unitPrice}
                        onChange={(e) => updateService(index, 'unitPrice', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="0"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total
                      </label>
                      <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg">
                        <span className="font-bold text-purple-600">
                          ${(service.quantity * service.unitPrice).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-end">
                      {formData.services.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeService(index)}
                          className="w-full p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mx-auto" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Resumen de Factura</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IVA (19%):</span>
                  <span className="font-medium">${calculateTax().toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-purple-600">${calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Desglose por Servicio:</h4>
                {formData.services.filter(s => s.name && s.quantity > 0 && s.unitPrice > 0).map((service, index) => (
                  <div key={index} className="text-sm">
                    <span className="text-gray-600">{service.name}:</span>
                    <span className="ml-2 font-medium">
                      {service.quantity} × ${service.unitPrice.toLocaleString()} = ${(service.quantity * service.unitPrice).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <h4 className="font-medium text-gray-900 mb-2">Información DIAN:</h4>
                <div className="text-sm space-y-1">
                  <div>Base gravable: ${calculateSubtotal().toLocaleString()}</div>
                  <div>IVA 19%: ${calculateTax().toLocaleString()}</div>
                  <div>Total a pagar: ${calculateTotal().toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

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
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors"
            >
              Crear Factura
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewInvoiceModal;