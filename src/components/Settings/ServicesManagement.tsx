import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, DollarSign } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  isActive: boolean;
}

const ServicesManagement: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
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

  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showNewService, setShowNewService] = useState(false);
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    name: '',
    category: 'Odontología General',
    price: 0,
    description: '',
    isActive: true
  });

  const categories = [
    'Odontología General',
    'Ortodoncia',
    'Odontopediatría',
    'Endodoncia',
    'Periodoncia',
    'Cirugía Oral',
    'Rehabilitación Oral',
    'Diseño de Sonrisas',
    'Implantes Dentales'
  ];

  const handleEditService = (service: Service) => {
    setEditingService({ ...service });
  };

  const handleSaveEdit = () => {
    if (editingService) {
      setServices(prev => prev.map(service => 
        service.id === editingService.id ? editingService : service
      ));
      setEditingService(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingService(null);
  };

  const handleAddService = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setServices(prev => [...prev, { ...newService, id }]);
    setNewService({
      name: '',
      category: 'Odontología General',
      price: 0,
      description: '',
      isActive: true
    });
    setShowNewService(false);
  };

  const handleDeleteService = (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar este servicio?')) {
      setServices(prev => prev.filter(service => service.id !== id));
    }
  };

  const toggleServiceStatus = (id: string) => {
    setServices(prev => prev.map(service => 
      service.id === id ? { ...service, isActive: !service.isActive } : service
    ));
  };

  const groupedServices = categories.reduce((acc, category) => {
    acc[category] = services.filter(service => service.category === category);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Gestión de Servicios</h3>
          <p className="text-gray-600">Administra los servicios y precios de la clínica</p>
        </div>
        <button
          onClick={() => setShowNewService(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nuevo Servicio
        </button>
      </div>

      {/* Services by Category */}
      <div className="space-y-6">
        {categories.map(category => (
          <div key={category} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">{category}</h4>
              <p className="text-sm text-gray-600">{groupedServices[category]?.length || 0} servicios</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {groupedServices[category]?.map(service => (
                  <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      {editingService?.id === service.id ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <input
                              type="text"
                              value={editingService.name}
                              onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              placeholder="Nombre del servicio"
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              value={editingService.price}
                              onChange={(e) => setEditingService({ ...editingService, price: parseInt(e.target.value) })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              placeholder="Precio"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={editingService.description}
                              onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              placeholder="Descripción"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h5 className="font-medium text-gray-900">{service.name}</h5>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-bold text-green-600">${service.price.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              service.isActive 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {service.isActive ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {editingService?.id === service.id ? (
                        <>
                          <button
                            onClick={handleSaveEdit}
                            className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => toggleServiceStatus(service.id)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                              service.isActive
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {service.isActive ? 'Desactivar' : 'Activar'}
                          </button>
                          <button
                            onClick={() => handleEditService(service)}
                            className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                
                {(!groupedServices[category] || groupedServices[category].length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    No hay servicios en esta categoría
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Service Modal */}
      {showNewService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nuevo Servicio</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Nombre del servicio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                <select
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
                <input
                  type="number"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Precio en pesos"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <textarea
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="Descripción del servicio"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowNewService(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddService}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors"
              >
                Agregar Servicio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManagement;