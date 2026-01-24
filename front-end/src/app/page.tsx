'use client';
import { useForm } from 'react-hook-form';
import { useTheme } from '@/contexts/theme-context';
import { useState } from 'react';

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    console.log('Login data:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 transition-all duration-500">
      {/* Theme Toggle - Top Right */}
      

      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Hero Content */}
          <div className="space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-left duration-700">
            {/* Logo */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl shadow-lg dark:shadow-purple-500/30 transition-all duration-300" />
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white transition-colors duration-300">
                SYNAPSE
              </h1>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight transition-colors duration-300">
                Apprendre n'a jamais été aussi <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">simple</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 transition-colors duration-300">
                Plateforme d'apprentissage interactive avec QCMs, gamification et suivi de progression en temps réel
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">QCMs Interactifs</span>
              </div>
              
              <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">Suivi Progression</span>
              </div>
              
              <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">Gamification</span>
              </div>
              
              <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">Collaboration</span>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-right duration-700">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl dark:shadow-purple-900/20 p-8 transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Connexion
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Accédez à votre espace d'apprentissage
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email requis',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email invalide'
                      }
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                    placeholder="votre@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400 animate-in fade-in slide-in-from-top duration-200">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    type="password"
                    {...register('password', {
                      required: 'Mot de passe requis',
                      minLength: {
                        value: 6,
                        message: 'Minimum 6 caractères'
                      }
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400 animate-in fade-in slide-in-from-top duration-200">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      {...register('rememberMe')}
                      className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 transition-all duration-300"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      Se souvenir de moi
                    </span>
                  </label>
                  <a href="#" className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-300">
                    Mot de passe oublié ?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connexion...
                    </span>
                  ) : (
                    'Se connecter'
                  )}
                </button>

                {/* Sign Up Link */}
                <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Pas encore de compte ?{' '}
                    <a href="#" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors duration-300">
                      S'inscrire gratuitement
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
