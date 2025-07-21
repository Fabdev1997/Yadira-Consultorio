import React, { useState } from 'react';
import { X, Upload, Save, FileText, DollarSign, Calendar } from 'lucide-react';

interface InvoiceUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: any) => void;
  pendingInvoices: any[];
}

const InvoiceUploadModal: React.FC<InvoiceUploadModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  pendingInvoices 
}) => {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    supplier: '',
    description: '',
    amount: 0,
    dueDate: '',
    paymentMethod: 'Transferencia',
    category: 'Proveedores',
    paymentDate: new Date().toISOString().split('T')[0]
  });

  const [selectedPendingInvoice, setSelectedPendingInvoice] = useState('');

  if (!isOpen) return null;

  const paymentMethods = [
    'Efectivo',
    'Transferencia',
    'Tarjeta',
    'Cheque',
    'Nequi',
    'DaviPlata'
  ];

  const categories = [
    'Proveedores',
    'Insumos Médicos',
    'Servicios Públicos',
    'Mantenimiento',
    'Alquiler',
    'Seguros',
    'Otros Gastos'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    // Reset form
    setFormData({
      invoiceNumber: '',
      supplier: '',
      description: '',
      amount: 0,
      dueDate: '',
      paymentMethod: 'Transferencia',
      category: 'Proveedores',
      paymentDate: new Date().toISOString().split('T')[0]
    });
    setSelectedPendingInvoice('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSelectPendingInvoice = (invoiceId: string) => {
    const invoice = pendingInvoices.find(inv => inv.id === invoiceId);
    if (invoice) {
      setFormData(prev => ({
        ...prev,
        invoiceNumber: invoice.id,
        supplier: invoice.supplier,
        description: invoice.description,
        amount: invoice.amount,
        dueDate: invoice.dueDate
      }));
      setSelectedPendingInvoice(invoiceId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Registrar Pago de Factura</h2>
            <p className="text-gray-600">Cargar y registrar facturas de proveedores</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Pending Invoices Selection */}
          {pendingInvoices.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Facturas Pendientes (Opcional)
              </label>
              <div className="space-y-2">
                {pendingInvoices.map((invoice) => (
                  <button
                    key={invoice.id}
                    type="button"
                    onClick={() => handleSelectPendingInvoice(invoice.id)}
                    className={`w-full p-3 border rounded-lg text-left transition-colors ${
                      selectedPendingInvoice === invoice.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">{invoice.supplier}</div>
                        <div className="text-sm text-gray-600">{invoice.description}</div>
                        <div className="text-xs text-gray-500">Vence: {new Date(invoice.dueDate).toLocaleDateString('es-CO')}</div>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        ${invoice.amount.toLocaleString()}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-3 text-center">
                <span className="text-sm text-gray-500">O registra una nueva factura manualmente:</span>
              </div>
            </div>
          )}

          {/* Invoice Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Información de la Factura
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Factura *
                </label>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ej: FACT-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proveedor *
                </label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Nombre del proveedor"
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Vencimiento
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Descripción detallada de los productos o servicios"
            />
          </div>

          {/* Payment Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Información del Pago
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Fecha de Pago *
                </label>
                <input
                  type="date"
                  name="paymentDate"
                  value={formData.paymentDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
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
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Upload className="w-4 h-4 inline mr-2" />
              Adjuntar Factura (Opcional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Arrastra y suelta la factura aquí, o{' '}
                <button type="button" className="text-purple-600 hover:text-purple-700 font-medium">
                  selecciona un archivo
                </button>
              </p>
              <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG hasta 10MB</p>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-2">Resumen del Gasto</h3>
            <div className="text-sm text-red-800 space-y-1">
              <p><strong>Proveedor:</strong> {formData.supplier || 'No especificado'}</p>
              <p><strong>Monto:</strong> ${formData.amount.toLocaleString()}</p>
              <p><strong>Categoría:</strong> {formData.category}</p>
              <p><strong>Método de pago:</strong> {formData.paymentMethod}</p>
              <p><strong>Fecha de pago:</strong> {formData.paymentDate ? new Date(formData.paymentDate).toLocaleDateString('es-CO') : 'No especificada'}</p>
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
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Registrar Pago
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceUploadModal;