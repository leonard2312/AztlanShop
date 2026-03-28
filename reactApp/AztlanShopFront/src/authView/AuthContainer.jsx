import React, { useState } from 'react';
import { Mail, Lock, User, Globe } from 'lucide-react';
import './AuthContainer.css';

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("Datos para Login Mutation:", data);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("Datos para Register Mutation:", data);
  };

  const handleGoogleAuth = () => {
    console.log("Iniciando OAuth con Google...");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative min-h-[550px]">
        <div className="flex p-2 bg-gray-50 border-b">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${isLogin ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
          >
            Iniciar Sesión
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${!isLogin ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
          >
            Registrarse
          </button>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin ? 'Ingresa tus credenciales para acceder' : 'Completa los datos para empezar'}
            </p>
          </div>

          <div className="relative">
            <form 
              onSubmit={isLogin ? handleLogin : handleRegister}
              className="space-y-4 transition-all duration-500 ease-in-out"
            >
              {!isLogin && (
                <div className="animate-fadeIn">
                  <label className="block text-sm font-medium text-gray-700">Usuario</label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                    <input 
                      name="username"
                      type="text" 
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Ej. leonard_dev"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                  <input 
                    name="email"
                    type="email" 
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                  <input 
                    name="password"
                    type="password" 
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors shadow-lg shadow-blue-200"
              >
                {isLogin ? 'Entrar' : 'Registrar Cuenta'}
              </button>
            </form>

            <div className="my-6 flex items-center justify-center space-x-2">
              <span className="h-[1px] w-full bg-gray-200"></span>
              <span className="text-gray-400 text-xs uppercase">O</span>
              <span className="h-[1px] w-full bg-gray-200"></span>
            </div>

            {/* Botón de Google */}
            <button 
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
            >
              <Globe className="text-red-500 size-5" />
              Continuar con Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;