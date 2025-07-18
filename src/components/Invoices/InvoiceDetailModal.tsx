import React, { useState } from 'react';
import { X, Download, Send, Printer, FileText, CheckCircle, CreditCard, Smartphone } from 'lucide-react';

interface Invoice {
  id: string;
  patient: string;
  dentist: string;
  date: string;
  dueDate: string;
  services: string[];
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  dianStatus: string;
}

interface InvoiceDetailModalProps {
  invoice: Invoice;
  isOpen: boolean;
  onClose: () => void;
}

const InvoiceDetailModal: React.FC<InvoiceDetailModalProps> = ({ invoice, isOpen, onClose }) => {
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  if (!isOpen || !invoice) return null;

  const serviceDetails = [
    { name: 'Limpieza dental profunda', quantity: 1, unitPrice: 150000, total: 150000 },
    { name: 'Aplicación de flúor', quantity: 1, unitPrice: 30000, total: 30000 },
  ];

  const handleDownloadPDF = () => {
    // Create a more detailed PDF content
    const pdfContent = `
CONSULTORIO YADIRA
NIT: 900.123.456-7
Calle 123 #45-67, Bogotá, Colombia
Tel: +57 (1) 234-5678
Email: contacto@consultorioyadira.com

FACTURA ELECTRÓNICA DIAN
Factura No: ${invoice.id}
Resolución DIAN: 18764000001234
Fecha de Resolución: 01/01/2024
Rango Autorizado: 1 - 5000

DATOS DEL CLIENTE:
Nombre: ${invoice.patient}
CC: 1.234.567.890
Dirección: Calle 456 #78-90, Bogotá
Teléfono: +57 300 123 4567

ATENDIDO POR:
${invoice.dentist}
Registro Profesional: COL12345

FECHA DE EMISIÓN: ${new Date(invoice.date).toLocaleDateString('es-CO')}
FECHA DE VENCIMIENTO: ${new Date(invoice.dueDate).toLocaleDateString('es-CO')}

SERVICIOS PRESTADOS:
${serviceDetails.map(service => 
  `${service.name} - Cant: ${service.quantity} - Valor Unit: $${service.unitPrice.toLocaleString()} - Total: $${service.total.toLocaleString()}`
).join('\n')}

SUBTOTAL: $${invoice.subtotal.toLocaleString()}
IVA (19%): $${invoice.tax.toLocaleString()}
TOTAL A PAGAR: $${invoice.total.toLocaleString()}

ESTADO DIAN: Validada
UUID: 12345678-1234-1234-1234-123456789012
Fecha de validación: ${new Date().toLocaleDateString('es-CO')} ${new Date().toLocaleTimeString('es-CO')}

Esta factura fue generada electrónicamente y cumple con los requisitos de la DIAN.
    `;

    const element = document.createElement('a');
    const file = new Blob([pdfContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `factura-${invoice.id}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadXML = () => {
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
  <ID>${invoice.id}</ID>
  <IssueDate>${invoice.date}</IssueDate>
  <DueDate>${invoice.dueDate}</DueDate>
  <AccountingSupplierParty>
    <Party>
      <PartyName>
        <Name>Consultorio Yadira</Name>
      </PartyName>
      <PartyTaxScheme>
        <CompanyID>900123456</CompanyID>
        <TaxScheme>
          <ID>01</ID>
          <Name>IVA</Name>
        </TaxScheme>
      </PartyTaxScheme>
    </Party>
  </AccountingSupplierParty>
  <AccountingCustomerParty>
    <Party>
      <PartyName>
        <Name>${invoice.patient}</Name>
      </PartyName>
    </Party>
  </AccountingCustomerParty>
  <LegalMonetaryTotal>
    <LineExtensionAmount currencyID="COP">${invoice.subtotal}</LineExtensionAmount>
    <TaxExclusiveAmount currencyID="COP">${invoice.subtotal}</TaxExclusiveAmount>
    <TaxInclusiveAmount currencyID="COP">${invoice.total}</TaxInclusiveAmount>
    <PayableAmount currencyID="COP">${invoice.total}</PayableAmount>
  </LegalMonetaryTotal>
</Invoice>`;

    const element = document.createElement('a');
    const file = new Blob([xmlContent], { type: 'application/xml' });
    element.href = URL.createObjectURL(file);
    element.download = `factura-${invoice.id}.xml`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Factura ${invoice.id}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                margin: 20px; 
                line-height: 1.4;
              }
              .header { 
                text-align: center; 
                margin-bottom: 30px; 
                border-bottom: 2px solid #333;
                padding-bottom: 20px;
              }
              .logo {
                font-size: 24px;
                font-weight: bold;
                color: #7C3AED;
                margin-bottom: 10px;
              }
              .company-info {
                font-size: 12px;
                color: #666;
              }
              .invoice-info {
                background: #f5f5f5;
                padding: 15px;
                margin: 20px 0;
                border-radius: 5px;
              }
              .customer-info {
                display: flex;
                justify-content: space-between;
                margin: 20px 0;
              }
              .services-table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
              }
              .services-table th,
              .services-table td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
              }
              .services-table th {
                background-color: #f2f2f2;
              }
              .totals {
                float: right;
                width: 300px;
                margin-top: 20px;
              }
              .total-line {
                display: flex;
                justify-content: space-between;
                padding: 5px 0;
              }
              .total-final {
                border-top: 2px solid #333;
                font-weight: bold;
                font-size: 18px;
                color: #7C3AED;
              }
              .dian-info {
                background: #e8f5e8;
                border: 1px solid #4CAF50;
                padding: 15px;
                margin: 20px 0;
                border-radius: 5px;
              }
              .footer {
                text-align: center;
                margin-top: 40px;
                font-size: 12px;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">CONSULTORIO YADIRA</div>
              <div class="company-info">
                NIT: 900.123.456-7<br>
                Calle 123 #45-67, Bogotá, Colombia<br>
                Tel: +57 (1) 234-5678 | Email: contacto@consultorioyadira.com
              </div>
            </div>

            <div class="invoice-info">
              <h2>FACTURA ELECTRÓNICA DIAN</h2>
              <strong>Factura No:</strong> ${invoice.id}<br>
              <strong>Resolución DIAN:</strong> 18764000001234<br>
              <strong>Fecha de Emisión:</strong> ${new Date(invoice.date).toLocaleDateString('es-CO')}<br>
              <strong>Fecha de Vencimiento:</strong> ${new Date(invoice.dueDate).toLocaleDateString('es-CO')}
            </div>

            <div class="customer-info">
              <div>
                <h3>FACTURAR A:</h3>
                <strong>${invoice.patient}</strong><br>
                CC: 1.234.567.890<br>
                Calle 456 #78-90, Bogotá<br>
                Tel: +57 300 123 4567
              </div>
              <div>
                <h3>ATENDIDO POR:</h3>
                <strong>${invoice.dentist}</strong><br>
                Registro Profesional: COL12345<br>
                Especialidad: Odontología General
              </div>
            </div>

            <table class="services-table">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Cant.</th>
                  <th>Valor Unit.</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${serviceDetails.map(service => `
                  <tr>
                    <td>${service.name}</td>
                    <td>${service.quantity}</td>
                    <td>$${service.unitPrice.toLocaleString()}</td>
                    <td>$${service.total.toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="totals">
              <div class="total-line">
                <span>Subtotal:</span>
                <span>$${invoice.subtotal.toLocaleString()}</span>
              </div>
              <div class="total-line">
                <span>IVA (19%):</span>
                <span>$${invoice.tax.toLocaleString()}</span>
              </div>
              <div class="total-line total-final">
                <span>TOTAL:</span>
                <span>$${invoice.total.toLocaleString()}</span>
              </div>
            </div>

            <div style="clear: both;"></div>

            <div class="dian-info">
              <strong>✓ FACTURA VALIDADA POR LA DIAN</strong><br>
              UUID: 12345678-1234-1234-1234-123456789012<br>
              Fecha de validación: ${new Date().toLocaleDateString('es-CO')} ${new Date().toLocaleTimeString('es-CO')}
            </div>

            <div class="footer">
              Esta factura fue generada electrónicamente y cumple con los requisitos de la DIAN.<br>
              © 2024 Consultorio Yadira - Sistema con facturación electrónica DIAN
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleSendEmail = () => {
    alert(`Enviando factura ${invoice.id} por email a ${invoice.patient}`);
  };

  const handlePayment = (method: string) => {
    setSelectedPaymentMethod(method);
    
    if (method === 'nequi') {
      alert(`Redirigiendo a Nequi para pagar $${invoice.total.toLocaleString()}`);
      // In real app: window.location.href = nequiPaymentUrl;
    } else if (method === 'daviplata') {
      alert(`Redirigiendo a DaviPlata para pagar $${invoice.total.toLocaleString()}`);
      // In real app: window.location.href = daviplataPaymentUrl;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Factura {invoice.id}</h2>
            <p className="text-gray-600">Factura Electrónica DIAN</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Invoice Content */}
        <div className="p-6">
          {/* Company Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <img 
                  src="/Consultorio Yadira.png" 
                  alt="Consultorio Yadira" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Consultorio Yadira</h3>
                <p className="text-gray-600">NIT: 900.123.456-7</p>
                <p className="text-gray-600">Calle 123 #45-67, Bogotá, Colombia</p>
                <p className="text-gray-600">Tel: +57 (1) 234-5678</p>
                <p className="text-gray-600">Email: contacto@consultorioyadira.com</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg mb-2">
                <span className="font-bold">FACTURA ELECTRÓNICA</span>
              </div>
              <p className="text-sm text-gray-600">Resolución DIAN: 18764000001234</p>
              <p className="text-sm text-gray-600">Fecha: {new Date().toLocaleDateString('es-CO')}</p>
              <p className="text-sm text-gray-600">Rango: 1 - 5000</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Facturar a:</h4>
              <p className="font-medium text-gray-900">{invoice.patient}</p>
              <p className="text-gray-600">CC: 1.234.567.890</p>
              <p className="text-gray-600">Calle 456 #78-90, Bogotá</p>
              <p className="text-gray-600">Tel: +57 300 123 4567</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Atendido por:</h4>
              <p className="font-medium text-gray-900">{invoice.dentist}</p>
              <p className="text-gray-600">Registro Profesional: COL12345</p>
              <p className="text-gray-600">Especialidad: Odontología General</p>
            </div>
          </div>

          {/* Services Table */}
          <div className="mb-8">
            <h4 className="font-semibold text-gray-900 mb-4">Servicios Prestados</h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Descripción</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Cant.</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Valor Unit.</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {serviceDetails.map((service, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900">{service.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-center">{service.quantity}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        ${service.unitPrice.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                        ${service.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-80">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${invoice.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IVA (19%):</span>
                  <span className="font-medium">${invoice.tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-purple-600">${invoice.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DIAN Status */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">Factura Validada por la DIAN</span>
            </div>
            <p className="text-green-700 text-sm mt-1">
              UUID: 12345678-1234-1234-1234-123456789012
            </p>
            <p className="text-green-700 text-sm">
              Fecha de validación: {new Date().toLocaleDateString('es-CO')} {new Date().toLocaleTimeString('es-CO')}
            </p>
          </div>

          {/* Payment Status */}
          {invoice.status === 'issued' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-yellow-900 mb-3">Estado de Pago: Pendiente</h4>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Opciones de Pago
                </button>
              </div>

              {showPaymentOptions && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => handlePayment('nequi')}
                    className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Smartphone className="w-8 h-8 text-purple-600" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Nequi</div>
                      <div className="text-sm text-gray-600">Pago móvil instantáneo</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handlePayment('daviplata')}
                    className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Smartphone className="w-8 h-8 text-red-600" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">DaviPlata</div>
                      <div className="text-sm text-gray-600">Billetera digital</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Payment Info */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">Información de Pago</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-purple-700">Fecha de vencimiento: {new Date(invoice.dueDate).toLocaleDateString('es-CO')}</p>
                <p className="text-purple-700">Método de pago: {invoice.status === 'paid' ? 'Efectivo' : 'Pendiente'}</p>
              </div>
              <div>
                <p className="text-purple-700">Estado: {invoice.status === 'paid' ? 'Pagada' : 'Pendiente'}</p>
                {invoice.status === 'paid' && (
                  <p className="text-purple-700">Fecha de pago: {new Date(invoice.date).toLocaleDateString('es-CO')}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Descargar PDF
            </button>
            <button 
              onClick={handleDownloadXML}
              className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FileText className="w-4 h-4" />
              Descargar XML
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </button>
            <button 
              onClick={handleSendEmail}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
              Enviar por Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailModal;