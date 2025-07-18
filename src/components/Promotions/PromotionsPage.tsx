import React, { useState } from 'react';
import { Tag, Plus, Search, Calendar, Percent, DollarSign, Eye, Edit, Trash2, Save, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

const PromotionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPromotion, setEditingPromotion] = useState<any>(null);
  const [showNewPromotion, setShowNewPromotion] = useState(false);
  const { promotions } = useData();
  const { user } = useAuth();

  const [mockPromotions, setMockPromotions] = useState([
    {
      id: '1',
      name: '20% OFF en Limpieza Dental',
      description: 'Descuento especial para nuevos pacientes en servicios de limpieza e higiene oral',
      discountType: 'percentage',
      discountValue: 20,
      validFrom: '2024-01-01',
      validTo: '2024-01-31',
      isActive: true,
      applicableServices: ['Limpieza dental', 'Aplicación de flúor'],
      usageCount: 45,
      maxUsage: 100
    },
    {
      id: '2',
      name: 'Blanqueamiento Dental 2x1',
      description: 'Promoción especial: paga uno y obtén dos sesiones de blanqueamiento dental',
      discountType: 'percentage',
      discountValue: 50,
      validFrom: '2024-01-15',
      validTo: '2024-02-28',
      isActive: true,
      applicableServices: ['Blanqueamiento dental'],
      usageCount: 23,
      maxUsage: 50
    },
    {
      id: '3',
      name: 'Descuento Ortodoncia',
      description: 'Descuento fijo en tratamiento de ortodoncia para estudiantes universitarios',
      discountType: 'fixed',
      discountValue: 200000,
      validFrom: '2024-01-01',
      validTo: '2024-06-30',
      isActive: true,
      applicableServices: ['Ortodoncia'],
      usageCount: 12,
      maxUsage: 30
    },
    {
      id: '4',
      name: 'Paquete Familiar',
      description: 'Descuento para familias de 4 o más miembros en servicios preventivos',
      discountType: 'percentage',
      discountValue: 15,
      validFrom: '2023-12-01',
      validTo: '2024-01-15',
      isActive: false,
      applicableServices: ['Limpieza dental', 'Revisión general'],
      usageCount: 78,
      maxUsage: 80
    }
  ]);

  const [newPromotion, setNewPromotion] = useState({
    name: '',
    description: '',
    discountType: 'percentage',
    discountValue: 0,
    validFrom: '',
    validTo: '',
    isActive: true,
    applicableServices: [],
    maxUsage: 100
  });

  const activePromotions = mockPromotions.filter(p => p.isActive);
  const totalSavings = mockPromotions.reduce((sum, promo) => {
    const savings = promo.discountType === 'percentage' 
      ? (promo.usageCount * 150000 * promo.discountValue / 100)
      : (promo.usageCount * promo.discountValue);
    return sum + savings;
  }, 0);

  const filteredPromotions = mockPromotions.filter(promotion =>
    promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promotion.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditPromotion = (promotion: any) => {
    setEditingPromotion({ ...promotion });
  };

  const handleSaveEdit = () => {
    setMockPromotions(prev => prev.map(promo => 
      promo.id === editingPromotion.id ? editingPromotion : promo
    ));
    setEditingPromotion(null);
  };

  const handleCancelEdit = () => {
    setEditingPromotion(null);
  };

  const handleDeletePromotion = (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar esta promoción?')) {
      setMockPromotions(prev => prev.filter(promo => promo.id !== id));
    }
  };

  const handleAddPromotion = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setMockPromotions(prev => [...prev, { 
      ...newPromotion, 
      id, 
      usageCount: 0,
      applicableServices: newPromotion.applicableServices || []
    }]);
    setNewPromotion({
      name: '',
      description: '',
      discountType: 'percentage',
      discountValue: 0,
      validFrom: '',
      validTo: '',
      isActive: true,
      applicableServices: [],
      maxUsage: 100
    });
    setShowNewPromotion(false);
  };

  const handleApplyPromotion = (promotion: any) => {
    alert(`Promoción "${promotion.name}" aplicada exitosamente. Descuento: ${
      promotion.discountType === 'percentage' 
        ? `${promotion.discountValue}%` 
        : `$${promotion.discountValue.toLocaleString()}`
    }`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.role === 'patient' ? 'Promociones Disponibles' : 'Gestión de Promociones'}
          </h1>
          <p className="text-gray-600 mt-1">
            {user?.role === 'patient' 
              ? 'Descubre las promociones y descuentos disponibles'
              : 'Administra ofertas especiales y descuentos para servicios'
            }
          </p>
        </div>
        {user?.role === 'admin' && (
          <button 
            onClick={() => setShowNewPromotion(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nueva Promoción
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Tag className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{mockPromotions.length}</h3>
              <p className="text-gray-600 text-sm">Total Promociones</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-50 rounded-lg">
              <Calendar className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{activePromotions.length}</h3>
              <p className="text-gray-600 text-sm">Promociones Activas</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                ${totalSavings.toLocaleString()}
              </h3>
              <p className="text-gray-600 text-sm">Ahorros Generados</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-50 rounded-lg">
              <Percent className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {mockPromotions.reduce((sum, p) => sum + p.usageCount, 0)}
              </h3>
              <p className="text-gray-600 text-sm">Usos Totales</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar promociones por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPromotions.map((promotion) => (
          <div
            key={promotion.id}
            className={`bg-white rounded-xl border-2 overflow-hidden transition-all hover:shadow-lg ${
              promotion.isActive 
                ? 'border-purple-200 bg-gradient-to-br from-white to-purple-50' 
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            {/* Header */}
            <div className={`p-4 ${promotion.isActive ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-400'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-white" />
                  <span className="text-white font-medium text-sm">
                    {promotion.isActive ? 'ACTIVA' : 'INACTIVA'}
                  </span>
                </div>
                <div className="text-white font-bold text-xl">
                  {promotion.discountType === 'percentage' 
                    ? `${promotion.discountValue}%`
                    : `$${promotion.discountValue.toLocaleString()}`
                  }
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {editingPromotion?.id === promotion.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingPromotion.name}
                    onChange={(e) => setEditingPromotion({ ...editingPromotion, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-lg font-bold"
                  />
                  <textarea
                    value={editingPromotion.description}
                    onChange={(e) => setEditingPromotion({ ...editingPromotion, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={editingPromotion.discountValue}
                      onChange={(e) => setEditingPromotion({ ...editingPromotion, discountValue: parseInt(e.target.value) })}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Valor descuento"
                    />
                    <select
                      value={editingPromotion.discountType}
                      onChange={(e) => setEditingPromotion({ ...editingPromotion, discountType: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="percentage">Porcentaje</option>
                      <option value="fixed">Valor fijo</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={editingPromotion.validFrom}
                      onChange={(e) => setEditingPromotion({ ...editingPromotion, validFrom: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <input
                      type="date"
                      value={editingPromotion.validTo}
                      onChange={(e) => setEditingPromotion({ ...editingPromotion, validTo: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <Save className="w-4 h-4" />
                      Guardar
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {promotion.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {promotion.description}
                  </p>

                  {/* Validity */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Válida desde:</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(promotion.validFrom).toLocaleDateString('es-CO')} - {' '}
                      {new Date(promotion.validTo).toLocaleDateString('es-CO')}
                    </div>
                  </div>

                  {/* Applicable Services */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">Servicios aplicables:</div>
                    <div className="flex flex-wrap gap-1">
                      {promotion.applicableServices.slice(0, 2).map((service, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                      {promotion.applicableServices.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{promotion.applicableServices.length - 2} más
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Usage Stats */}
                  {user?.role !== 'patient' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Uso</span>
                        <span>{promotion.usageCount}/{promotion.maxUsage}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                          style={{
                            width: `${(promotion.usageCount / promotion.maxUsage) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    {user?.role === 'patient' ? (
                      <button
                        onClick={() => handleApplyPromotion(promotion)}
                        className={`flex-1 font-medium py-2 px-4 rounded-lg transition-colors ${
                          promotion.isActive
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                            : 'bg-gray-400 text-white cursor-not-allowed'
                        }`}
                        disabled={!promotion.isActive}
                      >
                        {promotion.isActive ? 'Aplicar Promoción' : 'No Disponible'}
                      </button>
                    ) : (
                      <>
                        <button className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-600 font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1">
                          <Eye className="w-4 h-4" />
                          Ver
                        </button>
                        {user?.role === 'admin' && (
                          <>
                            <button 
                              onClick={() => handleEditPromotion(promotion)}
                              className="flex-1 bg-pink-50 hover:bg-pink-100 text-pink-600 font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
                            >
                              <Edit className="w-4 h-4" />
                              Editar
                            </button>
                            <button 
                              onClick={() => handleDeletePromotion(promotion.id)}
                              className="bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-3 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Promotion Modal */}
      {showNewPromotion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nueva Promoción</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={newPromotion.name}
                onChange={(e) => setNewPromotion({ ...newPromotion, name: e.target.value })}
                placeholder="Nombre de la promoción"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <textarea
                value={newPromotion.description}
                onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })}
                placeholder="Descripción"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={newPromotion.discountValue}
                  onChange={(e) => setNewPromotion({ ...newPromotion, discountValue: parseInt(e.target.value) })}
                  placeholder="Valor descuento"
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
                <select
                  value={newPromotion.discountType}
                  onChange={(e) => setNewPromotion({ ...newPromotion, discountType: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="percentage">Porcentaje</option>
                  <option value="fixed">Valor fijo</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={newPromotion.validFrom}
                  onChange={(e) => setNewPromotion({ ...newPromotion, validFrom: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="date"
                  value={newPromotion.validTo}
                  onChange={(e) => setNewPromotion({ ...newPromotion, validTo: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <input
                type="number"
                value={newPromotion.maxUsage}
                onChange={(e) => setNewPromotion({ ...newPromotion, maxUsage: parseInt(e.target.value) })}
                placeholder="Máximo de usos"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowNewPromotion(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddPromotion}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors"
              >
                Crear Promoción
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Patient Info */}
      {user?.role === 'patient' && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Tag className="w-6 h-6 text-purple-600 mt-1" />
            <div>
              <h3 className="font-semibold text-purple-900 mb-2">¿Cómo aplicar las promociones?</h3>
              <ul className="text-purple-800 text-sm space-y-1">
                <li>• Las promociones se aplican automáticamente al agendar una cita</li>
                <li>• Verifica la vigencia antes de solicitar el servicio</li>
                <li>• Algunas promociones tienen límites de uso por paciente</li>
                <li>• Los descuentos se reflejan en la factura final</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionsPage;