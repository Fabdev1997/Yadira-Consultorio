import React, { useState } from 'react';
import { Package, Plus, Search, Filter, AlertTriangle, TrendingDown, TrendingUp, Edit, Trash2, Save, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  supplier: string;
  expirationDate?: string;
  lastRestocked: string;
  location: string;
  unit: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'expired';
}

const InventoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewItem, setShowNewItem] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const { user } = useAuth();

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Anestesia Lidocaína 2%',
      category: 'Medicamentos',
      currentStock: 25,
      minStock: 10,
      maxStock: 50,
      unitPrice: 15000,
      supplier: 'Laboratorios ABC',
      expirationDate: '2024-12-31',
      lastRestocked: '2024-01-10',
      location: 'Refrigerador A1',
      unit: 'Ampolla',
      status: 'in_stock'
    },
    {
      id: '2',
      name: 'Resina Compuesta A2',
      category: 'Materiales Dentales',
      currentStock: 5,
      minStock: 8,
      maxStock: 20,
      unitPrice: 85000,
      supplier: 'Dental Supply Co.',
      lastRestocked: '2024-01-05',
      location: 'Estante B2',
      unit: 'Jeringa',
      status: 'low_stock'
    },
    {
      id: '3',
      name: 'Guantes Nitrilo Talla M',
      category: 'Equipos de Protección',
      currentStock: 0,
      minStock: 20,
      maxStock: 100,
      unitPrice: 45000,
      supplier: 'Medical Supplies Ltd',
      lastRestocked: '2023-12-20',
      location: 'Almacén C1',
      unit: 'Caja (100 unidades)',
      status: 'out_of_stock'
    },
    {
      id: '4',
      name: 'Brackets Metálicos',
      category: 'Ortodoncia',
      currentStock: 15,
      minStock: 5,
      maxStock: 30,
      unitPrice: 120000,
      supplier: 'Ortho Materials Inc',
      lastRestocked: '2024-01-08',
      location: 'Estante D1',
      unit: 'Set (20 piezas)',
      status: 'in_stock'
    },
    {
      id: '5',
      name: 'Amalgama Dental',
      category: 'Materiales Dentales',
      currentStock: 3,
      minStock: 5,
      maxStock: 15,
      unitPrice: 95000,
      supplier: 'Dental Supply Co.',
      expirationDate: '2024-02-15',
      lastRestocked: '2023-11-15',
      location: 'Estante B1',
      unit: 'Cápsula',
      status: 'low_stock'
    }
  ]);

  const [newItem, setNewItem] = useState<Omit<InventoryItem, 'id' | 'status'>>({
    name: '',
    category: 'Medicamentos',
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    unitPrice: 0,
    supplier: '',
    expirationDate: '',
    lastRestocked: new Date().toISOString().split('T')[0],
    location: '',
    unit: ''
  });

  const categories = [
    'Medicamentos',
    'Materiales Dentales',
    'Equipos de Protección',
    'Ortodoncia',
    'Instrumentos',
    'Limpieza y Desinfección',
    'Consumibles'
  ];

  const getItemStatus = (item: InventoryItem): InventoryItem['status'] => {
    if (item.currentStock === 0) return 'out_of_stock';
    if (item.currentStock <= item.minStock) return 'low_stock';
    if (item.expirationDate && new Date(item.expirationDate) < new Date()) return 'expired';
    return 'in_stock';
  };

  const getStatusColor = (status: InventoryItem['status']) => {
    switch (status) {
      case 'in_stock':
        return 'bg-green-100 text-green-700';
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-700';
      case 'out_of_stock':
        return 'bg-red-100 text-red-700';
      case 'expired':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: InventoryItem['status']) => {
    switch (status) {
      case 'in_stock':
        return 'En Stock';
      case 'low_stock':
        return 'Stock Bajo';
      case 'out_of_stock':
        return 'Agotado';
      case 'expired':
        return 'Vencido';
      default:
        return status;
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || getItemStatus(item) === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddItem = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const status = getItemStatus({ ...newItem, id, status: 'in_stock' } as InventoryItem);
    setInventory(prev => [...prev, { ...newItem, id, status }]);
    setNewItem({
      name: '',
      category: 'Medicamentos',
      currentStock: 0,
      minStock: 0,
      maxStock: 0,
      unitPrice: 0,
      supplier: '',
      expirationDate: '',
      lastRestocked: new Date().toISOString().split('T')[0],
      location: '',
      unit: ''
    });
    setShowNewItem(false);
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem({ ...item });
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      const status = getItemStatus(editingItem);
      setInventory(prev => prev.map(item => 
        item.id === editingItem.id ? { ...editingItem, status } : item
      ));
      setEditingItem(null);
    }
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar este artículo?')) {
      setInventory(prev => prev.filter(item => item.id !== id));
    }
  };

  const stats = {
    totalItems: inventory.length,
    lowStock: inventory.filter(item => getItemStatus(item) === 'low_stock').length,
    outOfStock: inventory.filter(item => getItemStatus(item) === 'out_of_stock').length,
    expired: inventory.filter(item => getItemStatus(item) === 'expired').length,
    totalValue: inventory.reduce((sum, item) => sum + (item.currentStock * item.unitPrice), 0)
  };

  const canEdit = user?.role === 'admin' || user?.role === 'assistant';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventario de Insumos</h1>
          <p className="text-gray-600 mt-1">
            Gestión completa del inventario de materiales y medicamentos
          </p>
        </div>
        {canEdit && (
          <button
            onClick={() => setShowNewItem(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nuevo Artículo
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalItems}</h3>
              <p className="text-gray-600 text-sm">Total Artículos</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <TrendingDown className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.lowStock}</h3>
              <p className="text-gray-600 text-sm">Stock Bajo</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.outOfStock}</h3>
              <p className="text-gray-600 text-sm">Agotados</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.expired}</h3>
              <p className="text-gray-600 text-sm">Vencidos</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                ${stats.totalValue.toLocaleString()}
              </h3>
              <p className="text-gray-600 text-sm">Valor Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o proveedor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="in_stock">En Stock</option>
              <option value="low_stock">Stock Bajo</option>
              <option value="out_of_stock">Agotado</option>
              <option value="expired">Vencido</option>
            </select>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Lista de Inventario</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Artículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proveedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => {
                const status = getItemStatus(item);
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.category} - {item.location}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="font-bold">{item.currentStock} {item.unit}</div>
                        <div className="text-xs text-gray-500">
                          Min: {item.minStock} | Max: {item.maxStock}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="font-medium">${item.unitPrice.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">
                          Total: ${(item.currentStock * item.unitPrice).toLocaleString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.supplier}</div>
                      <div className="text-sm text-gray-500">
                        Último: {new Date(item.lastRestocked).toLocaleDateString('es-CO')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}>
                        {getStatusText(status)}
                      </span>
                      {item.expirationDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          Vence: {new Date(item.expirationDate).toLocaleDateString('es-CO')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        {canEdit && (
                          <>
                            <button
                              onClick={() => handleEditItem(item)}
                              className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Item Modal */}
      {showNewItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nuevo Artículo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre del artículo"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Stock actual"
                value={newItem.currentStock}
                onChange={(e) => setNewItem({ ...newItem, currentStock: parseInt(e.target.value) })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                placeholder="Stock mínimo"
                value={newItem.minStock}
                onChange={(e) => setNewItem({ ...newItem, minStock: parseInt(e.target.value) })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                placeholder="Stock máximo"
                value={newItem.maxStock}
                onChange={(e) => setNewItem({ ...newItem, maxStock: parseInt(e.target.value) })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                placeholder="Precio unitario"
                value={newItem.unitPrice}
                onChange={(e) => setNewItem({ ...newItem, unitPrice: parseInt(e.target.value) })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Proveedor"
                value={newItem.supplier}
                onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Unidad (ej: Caja, Ampolla)"
                value={newItem.unit}
                onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Ubicación"
                value={newItem.location}
                onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="date"
                placeholder="Fecha de vencimiento"
                value={newItem.expirationDate}
                onChange={(e) => setNewItem({ ...newItem, expirationDate: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowNewItem(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors"
              >
                Agregar Artículo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Editar Artículo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <select
                value={editingItem.category}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <input
                type="number"
                value={editingItem.currentStock}
                onChange={(e) => setEditingItem({ ...editingItem, currentStock: parseInt(e.target.value) })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                value={editingItem.minStock}
                onChange={(e) => setEditingItem({ ...editingItem, minStock: parseInt(e.target.value) })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                value={editingItem.maxStock}
                onChange={(e) => setEditingItem({ ...editingItem, maxStock: parseInt(e.target.value) })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                value={editingItem.unitPrice}
                onChange={(e) => setEditingItem({ ...editingItem, unitPrice: parseInt(e.target.value) })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={editingItem.supplier}
                onChange={(e) => setEditingItem({ ...editingItem, supplier: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={editingItem.unit}
                onChange={(e) => setEditingItem({ ...editingItem, unit: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={editingItem.location}
                onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="date"
                value={editingItem.expirationDate || ''}
                onChange={(e) => setEditingItem({ ...editingItem, expirationDate: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;