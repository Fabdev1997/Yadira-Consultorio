import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, Download, Eye, Send, DollarSign, CheckCircle, Clock, AlertTriangle, Printer } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import InvoiceDetailModal from './InvoiceDetailModal';
import NewInvoiceModal from './NewInvoiceModal';

const InvoicesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showInvoiceDetail, setShowInvoiceDetail] = useState(false);
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [invoices, setInvoices] = useState([
    {
      id: 'FE-2024-001',
      patient: 'Ana García Martínez',
      dentist: 'Dr. González',
      date: '2024-01-15',
      dueDate: '2024-01-30',
      services: ['Limpieza dental', 'Aplicación de flúor'],
      subtotal: 180000,
      tax: 34200,
      total: 214200,
      status: 'paid',
      dianStatus: 'validated'
    },
    {
      id: 'FE-2024-002',
      patient: 'Carlos López Rodríguez',
      dentist: 'Dr. Martínez',
      date: '2024-01-14',
      dueDate: '2024-01-29',
      services: ['Ortodoncia - Ajuste'],
      subtotal: 250000,
      tax: 47500,
      total: 297500,
      status: 'issued',
      dianStatus: 'pending'
    },
    {
      id: 'FE-2024-003',
      patient: 'María Rodríguez Silva',
      dentist: 'Dr. González',
      date: '2024-01-13',
      dueDate: '2024-01-28',
      services: ['Endodoncia', 'Corona dental'],
      subtotal: 850000,
      tax: 161500,
      total: 1011500,
      status: 'draft',
      dianStatus: 'not_sent'
    },
    {
      id: 'FE-2024-004',
      patient: 'Juan Pérez González',
      dentist: 'Dr. López',
      date: '2024-01-12',
      dueDate: '2024-01-27',
      services: ['Extracción simple', 'Medicamentos'],
      subtotal: 120000,
      tax: 22800,
      total: 142800,
      status: 'issued',
      dianStatus: 'validated'
    }
  ]);

  const { user } = useAuth();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'issued':
        return <Clock className="w-4 h-4 text-purple-600" />;
      case 'draft':
        return <FileText className="w-4 h-4 text-gray-600" />;
      case 'cancelled':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'issued':
        return 'bg-purple-100 text-purple-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pagada';
      case 'issued':
        return 'Emitida';
      case 'draft':
        return 'Borrador';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const getDianStatusColor = (status: string) => {
    switch (status) {
      case 'validated':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDianStatusText = (status: string) => {
    switch (status) {
      case 'validated':
        return 'Validada DIAN';
      case 'pending':
        return 'Pendiente DIAN';
      case 'error':
        return 'Error DIAN';
      default:
        return 'No enviada';
    }
  };

  // Filter invoices based on search and status
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalStats = {
    totalInvoices: invoices.length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.total, 0),
    paidAmount: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0),
    pendingAmount: invoices.filter(inv => inv.status === 'issued').reduce((sum, inv) => sum + inv.total, 0),
  };

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetail(true);
  };

  const handleDownloadPDF = (invoice: any) => {
    // Simulate PDF download
    const element = document.createElement('a');
    const file = new Blob([`Factura ${invoice.id}\nPaciente: ${invoice.patient}\nTotal: $${invoice.total.toLocaleString()}`], 
      { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `factura-${invoice.id}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadXML = (invoice: any) => {
    // Simulate XML download
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice>
  <ID>${invoice.id}</ID>
  <Patient>${invoice.patient}</Patient>
  <Total>${invoice.total}</Total>
  <Status>${invoice.status}</Status>
</Invoice>`;
    const element = document.createElement('a');
    const file = new Blob([xmlContent], { type: 'application/xml' });
    element.href = URL.createObjectURL(file);
    element.download = `factura-${invoice.id}.xml`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = (invoice: any) => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Factura ${invoice.id}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .invoice-details { margin-bottom: 20px; }
              .total { font-weight: bold; font-size: 18px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Consultorio Yadira</h1>
              <h2>Factura ${invoice.id}</h2>
            </div>
            <div class="invoice-details">
              <p><strong>Paciente:</strong> ${invoice.patient}</p>
              <p><strong>Fecha:</strong> ${new Date(invoice.date).toLocaleDateString('es-CO')}</p>
              <p><strong>Servicios:</strong> ${invoice.services.join(', ')}</p>
              <p><strong>Subtotal:</strong> $${invoice.subtotal.toLocaleString()}</p>
              <p><strong>IVA:</strong> $${invoice.tax.toLocaleString()}</p>
              <p class="total"><strong>Total:</strong> $${invoice.total.toLocaleString()}</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleSendEmail = (invoice: any) => {
    // Simulate email sending
    alert(`Enviando factura ${invoice.id} por email a ${invoice.patient}`);
  };

  const handleSaveInvoice = (invoiceData: any) => {
    const newInvoice = {
      id: `FE-2024-${String(invoices.length + 1).padStart(3, '0')}`,
      patient: invoiceData.patientId, // In real app, would lookup patient name
      dentist: invoiceData.dentistId, // In real app, would lookup dentist name
      date: invoiceData.issueDate,
      dueDate: invoiceData.dueDate,
      services: invoiceData.services.map((s: any) => s.name),
      subtotal: invoiceData.subtotal,
      tax: invoiceData.tax,
      total: invoiceData.total,
      status: invoiceData.status,
      dianStatus: 'not_sent'
    };
    setInvoices(prev => [...prev, newInvoice]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.role === 'patient' ? 'Mis Facturas' : 'Facturación Electrónica'}
          </h1>
          <p className="text-gray-600 mt-1">
            {user?.role === 'patient' 
              ? 'Consulta y descarga tus facturas DIAN'
              : 'Sistema de facturación electrónica con validación DIAN'
            }
          </p>
        </div>
        {user?.role !== 'patient' && (
          <button 
            onClick={() => setShowNewInvoice(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nueva Factura
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{totalStats.totalInvoices}</h3>
              <p className="text-gray-600 text-sm">Total Facturas</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                ${totalStats.totalAmount.toLocaleString()}
              </h3>
              <p className="text-gray-600 text-sm">Facturación Total</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                ${totalStats.paidAmount.toLocaleString()}
              </h3>
              <p className="text-gray-600 text-sm">Facturas Pagadas</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-50 rounded-lg">
              <Clock className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                ${totalStats.pendingAmount.toLocaleString()}
              </h3>
              <p className="text-gray-600 text-sm">Por Cobrar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por número de factura, paciente o servicio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="draft">Borradores</option>
              <option value="issued">Emitidas</option>
              <option value="paid">Pagadas</option>
              <option value="cancelled">Canceladas</option>
            </select>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Lista de Facturas</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Factura
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Servicios
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DIAN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(invoice.date).toLocaleDateString('es-CO')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{invoice.patient}</div>
                      {user?.role !== 'patient' && (
                        <div className="text-sm text-gray-500">por {invoice.dentist}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {invoice.services.slice(0, 2).map((service, idx) => (
                        <div key={idx}>{service}</div>
                      ))}
                      {invoice.services.length > 2 && (
                        <div className="text-gray-500 text-xs">
                          +{invoice.services.length - 2} más...
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="font-bold">${invoice.total.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">
                        Subtotal: ${invoice.subtotal.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        IVA: ${invoice.tax.toLocaleString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full items-center gap-1 ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      {getStatusText(invoice.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getDianStatusColor(invoice.dianStatus)}`}>
                      {getDianStatusText(invoice.dianStatus)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleViewInvoice(invoice)}
                        className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors" 
                        title="Ver factura"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDownloadPDF(invoice)}
                        className="p-2 text-pink-600 hover:text-pink-900 hover:bg-pink-50 rounded-lg transition-colors" 
                        title="Descargar PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDownloadXML(invoice)}
                        className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors" 
                        title="Descargar XML"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handlePrint(invoice)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors" 
                        title="Imprimir"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      {user?.role !== 'patient' && invoice.status !== 'paid' && (
                        <button 
                          onClick={() => handleSendEmail(invoice)}
                          className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors" 
                          title="Enviar por email"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DIAN Compliance Notice */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-purple-600 mt-1" />
          <div>
            <h3 className="font-semibold text-purple-900 mb-2">Facturación Electrónica DIAN</h3>
            <p className="text-purple-800 text-sm mb-3">
              Sistema cumple con la Resolución 000042 de 2020 de la DIAN. Todas las facturas incluyen:
            </p>
            <ul className="text-purple-700 text-sm space-y-1">
              <li>• Numeración autorizada por la DIAN</li>
              <li>• Representación gráfica (PDF) y archivo XML</li>
              <li>• Firma digital electrónica</li>
              <li>• Validación en tiempo real ante la DIAN</li>
              <li>• Trazabilidad completa del documento</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      <InvoiceDetailModal
        invoice={selectedInvoice}
        isOpen={showInvoiceDetail}
        onClose={() => setShowInvoiceDetail(false)}
      />

      {/* New Invoice Modal */}
      <NewInvoiceModal
        isOpen={showNewInvoice}
        onClose={() => setShowNewInvoice(false)}
        onSave={handleSaveInvoice}
      />
    </div>
  );
};

export default InvoicesPage;