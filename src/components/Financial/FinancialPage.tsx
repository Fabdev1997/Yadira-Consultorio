import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Banknote, PieChart, BarChart3, Calendar, Download, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../../context/AuthContext';

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

interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  pendingPayments: number;
  cashFlow: number;
}

const FinancialPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('month');
  const [transactionType, setTransactionType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { user } = useAuth();

  // Only accessible by admin
  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Acceso Restringido</h3>
          <p className="text-gray-600">Solo los administradores pueden acceder a la gestión financiera.</p>
        </div>
      </div>
    );
  }

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-01-15',
      type: 'income',
      category: 'Servicios Odontológicos',
      description: 'Limpieza dental - Ana García',
      amount: 150000,
      paymentMethod: 'Efectivo'
    },
    {
      id: '2',
      date: '2024-01-15',
      type: 'income',
      category: 'Servicios Odontológicos',
      description: 'Ortodoncia - Carlos López',
      amount: 250000,
      paymentMethod: 'Tarjeta'
    },
    {
      id: '3',
      date: '2024-01-14',
      type: 'expense',
      category: 'Insumos Médicos',
      description: 'Compra de anestesia y resinas',
      amount: 85000,
      paymentMethod: 'Transferencia'
    },
    {
      id: '4',
      date: '2024-01-14',
      type: 'expense',
      category: 'Servicios Públicos',
      description: 'Factura de electricidad',
      amount: 120000,
      paymentMethod: 'Débito Automático'
    },
    {
      id: '5',
      date: '2024-01-13',
      type: 'income',
      category: 'Servicios Odontológicos',
      description: 'Endodoncia - María Rodríguez',
      amount: 500000,
      paymentMethod: 'Nequi'
    },
    {
      id: '6',
      date: '2024-01-12',
      type: 'expense',
      category: 'Nómina',
      description: 'Salario Dr. González',
      amount: 2500000,
      paymentMethod: 'Transferencia'
    },
    {
      id: '7',
      date: '2024-01-12',
      type: 'expense',
      category: 'Mantenimiento',
      description: 'Mantenimiento equipo de rayos X',
      amount: 350000,
      paymentMethod: 'Efectivo'
    },
    {
      id: '8',
      date: '2024-01-11',
      type: 'income',
      category: 'Servicios Odontológicos',
      description: 'Blanqueamiento dental - Juan Pérez',
      amount: 300000,
      paymentMethod: 'DaviPlata'
    }
  ]);

  const monthlyData = [
    { month: 'Ene', income: 4500000, expenses: 3200000, profit: 1300000 },
    { month: 'Feb', income: 5200000, expenses: 3800000, profit: 1400000 },
    { month: 'Mar', income: 4800000, expenses: 3500000, profit: 1300000 },
    { month: 'Abr', income: 6100000, expenses: 4200000, profit: 1900000 },
    { month: 'May', income: 5500000, expenses: 3900000, profit: 1600000 },
    { month: 'Jun', income: 6700000, expenses: 4500000, profit: 2200000 }
  ];

  const expenseCategories = [
    { name: 'Nómina', value: 45, amount: 4500000, color: '#9333EA' },
    { name: 'Insumos Médicos', value: 25, amount: 2500000, color: '#EC4899' },
    { name: 'Servicios Públicos', value: 12, amount: 1200000, color: '#F59E0B' },
    { name: 'Mantenimiento', value: 10, amount: 1000000, color: '#EF4444' },
    { name: 'Otros', value: 8, amount: 800000, color: '#8B5CF6' }
  ];

  const paymentMethods = [
    { method: 'Efectivo', amount: 2850000, percentage: 35 },
    { method: 'Tarjeta', amount: 2280000, percentage: 28 },
    { method: 'Transferencia', amount: 1620000, percentage: 20 },
    { method: 'Nequi', amount: 810000, percentage: 10 },
    { method: 'DaviPlata', amount: 570000, percentage: 7 }
  ];

  const summary: FinancialSummary = {
    totalIncome: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    totalExpenses: transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
    netProfit: 0,
    pendingPayments: 1250000,
    cashFlow: 8130000
  };
  summary.netProfit = summary.totalIncome - summary.totalExpenses;

  const categories = [
    'Servicios Odontológicos',
    'Insumos Médicos',
    'Nómina',
    'Servicios Públicos',
    'Mantenimiento',
    'Marketing',
    'Otros'
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = transactionType === 'all' || transaction.type === transactionType;
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
    return matchesType && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión Financiera</h1>
          <p className="text-gray-600 mt-1">
            Control completo de ingresos, gastos y flujo de caja
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar Reporte
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                ${summary.totalIncome.toLocaleString()}
              </h3>
              <p className="text-gray-600 text-sm">Ingresos Totales</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-50 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                ${summary.totalExpenses.toLocaleString()}
              </h3>
              <p className="text-gray-600 text-sm">Gastos Totales</p>
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
                ${summary.netProfit.toLocaleString()}
              </h3>
              <p className="text-gray-600 text-sm">Utilidad Neta</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <CreditCard className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                ${summary.pendingPayments.toLocaleString()}
              </h3>
              <p className="text-gray-600 text-sm">Por Cobrar</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-50 rounded-lg">
              <Banknote className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                ${summary.cashFlow.toLocaleString()}
              </h3>
              <p className="text-gray-600 text-sm">Flujo de Caja</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="quarter">Este trimestre</option>
            <option value="year">Este año</option>
          </select>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Todos los movimientos</option>
            <option value="income">Solo ingresos</option>
            <option value="expense">Solo gastos</option>
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Todas las categorías</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Tendencias Mensuales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
              <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} name="Ingresos" />
              <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} name="Gastos" />
              <Line type="monotone" dataKey="profit" stroke="#9333EA" strokeWidth={3} name="Utilidad" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Distribution */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Distribución de Gastos</h2>
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {expenseCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{category.value}%</div>
                    <div className="text-xs text-gray-500">${category.amount.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Métodos de Pago</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {paymentMethods.map((method, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">{method.method}</span>
                <span className="text-sm text-gray-600">{method.percentage}%</span>
              </div>
              <div className="text-lg font-bold text-purple-600">
                ${method.amount.toLocaleString()}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                  style={{ width: `${method.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Transacciones Recientes</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Método de Pago
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString('es-CO')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-700">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-bold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialPage;