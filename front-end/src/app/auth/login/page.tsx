'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { LoginForm } from '@/components/auth';

export default function LoginPage() {
  const { login, error, isLoading } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (err) {
      // Error is handled by useAuth hook
      console.error('Login error:', err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Login</h1>
      
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />

      <div className="mt-6 text-center text-sm text-gray-400">
        <p>
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
            Register here
          </Link>
        </p>
        <p className="mt-3">
          <Link href="/reset-password" className="text-blue-400 hover:text-blue-300 font-medium">
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  );
}
