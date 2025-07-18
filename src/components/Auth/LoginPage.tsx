import React, { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (!success) {
      setError('Credenciales inválidas. Por favor, intente nuevamente.');
    }
  };

  const demoUsers = [
    { email: 'admin@clinica.com', role: 'Administrador', password: 'demo123' },
    { email: 'maria@clinica.com', role: 'Odontóloga', password: 'demo123' },
    { email: 'ana@clinica.com', role: 'Auxiliar', password: 'demo123' },
    { email: 'carlos@paciente.com', role: 'Paciente', password: 'demo123' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6">
            <img 
              src="/Consultorio Yadira.png" 
              alt="Consultorio Yadira" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Consultorio Yadira
          </h1>
          <p className="text-gray-600">
            Sistema Integral de Gestión Odontológica
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="usuario@clinica.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Demo Users */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              {showDemo ? 'Ocultar' : 'Ver'} usuarios de demostración
            </button>

            {showDemo && (
              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-500 mb-3">
                  Usuarios disponibles (contraseña: demo123):
                </p>
                {demoUsers.map((user, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setEmail(user.email);
                      setPassword(user.password);
                    }}
                    className="w-full text-left p-2 bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors duration-200 border hover:border-purple-200"
                  >
                    <div className="text-sm font-medium text-gray-900">{user.role}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 Consultorio Yadira. Sistema con facturación electrónica DIAN.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;