import React, { useState, useEffect } from 'react';
import { X, Save, DollarSign, Calendar, FileText } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
  reference?: string;
}

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: any) => void;
  editingTransaction?: Transaction | null;
  categories: string[];
}

const NewTransactionModal: React.FC<NewTransactionModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingTransaction,
  categories 
}) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'expense' as 'income' | 'expense',
    category: '',
    description: '',
    amount: 0,
    paymentMethod: 'Efectivo',
    reference: ''
  });

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        date: editingTransaction.date,
        type: editingTransaction.type,
        category: editingTransaction.category,
        description: editingTransaction.description,
        amount: editingTransaction.amount,
        paymentMethod: editingTransaction.paymentMethod,
        reference: editingTransaction.reference || ''
      });
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        type: 'expense',
        category: '',
        description: '',
        amount: 0,
        paymentMethod: 'Efectivo',
        reference: ''
      });
    }
  }, [editingTransaction, isOpen]);

  if (!isOpen) return null;

  const paymentMethods = [
    'Efectivo',
    'Tarjeta',
    'Transferencia',
    'Nequi',
    'DaviPlata',
    'Débito Automático',
    'Cheque'
  ];

  const incomeCategories = [
    'Servicios Odontológicos',
    'Consultas',
    'Tratamientos Especializados',
    'Productos Dentales',
    'Otros Ingresos'
  ];

  const expenseCategories = [
    'Insumos Médicos',
    'Nómina',
    'Servicios Públicos',
    'Mantenimiento',
    'Marketing',
    'Proveedores',
    'Alquiler',
    'Seguros',
    'Impuestos',
    'Otros Gastos'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {editingTransaction ? 'Editar Transacción' : 'Nueva Transacción'}
            </h2>
            <p className="text-gray-600">
              {editingTransaction ? 'Modificar movimiento financiero' : 'Registrar nuevo ingreso o gasto'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de Transacción *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'income', category: '' }))}
                className={`p-4 border-2 rounded-lg transition-colors ${
                  formData.type === 'income'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <TrendingUp className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Ingreso</div>
                <div className="text-sm text-gray-600">Dinero que entra</div>
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'expense', category: '' }))}
                className={`p-4 border-2 rounded-lg transition-colors ${
                  formData.type === 'expense'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <TrendingDown className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Gasto</div>
                <div className="text-sm text-gray-600">Dinero que sale</div>
              </button>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Fecha *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Monto *
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="0"
                step="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>

          {/* Category and Payment Method */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Seleccionar categoría</option>
                {(formData.type === 'income' ? incomeCategories : expenseCategories).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Método de Pago *
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {paymentMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Descripción *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Descripción detallada de la transacción"
            />
          </div>

          {/* Reference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Referencia (Opcional)
            </label>
            <input
              type="text"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Número de factura, comprobante, etc."
            />
          </div>

          {/* Summary */}
          <div className={`p-4 rounded-lg border-2 ${
            formData.type === 'income' 
              ? 'border-green-200 bg-green-50' 
              : 'border-red-200 bg-red-50'
          }`}>
            <h3 className={`font-semibold mb-2 ${
              formData.type === 'income' ? 'text-green-900' : 'text-red-900'
            }`}>
              Resumen de la Transacción
            </h3>
            <div className={`text-sm space-y-1 ${
              formData.type === 'income' ? 'text-green-800' : 'text-red-800'
            }`}>
              <p><strong>Tipo:</strong> {formData.type === 'income' ? 'Ingreso' : 'Gasto'}</p>
              <p><strong>Monto:</strong> ${formData.amount.toLocaleString()}</p>
              <p><strong>Categoría:</strong> {formData.category || 'No seleccionada'}</p>
              <p><strong>Método:</strong> {formData.paymentMethod}</p>
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
              className={`px-6 py-2 text-white rounded-lg transition-colors flex items-center gap-2 ${
                formData.type === 'income'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                  : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700'
              }`}
            >
              <Save className="w-4 h-4" />
              {editingTransaction ? 'Actualizar' : 'Guardar'} Transacción
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTransactionModal;