'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { RegisterForm } from '@/components/auth';

export default function RegisterPage() {
  const { register, error, isLoading } = useAuth();

  const handleRegister = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      await register(email, password, firstName, lastName);
    } catch (err) {
      // Error is handled by useAuth hook
      console.error('Register error:', err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Create Account</h1>

      <RegisterForm onSubmit={handleRegister} isLoading={isLoading} error={error} />

      <div className="mt-6 text-center text-sm text-gray-400">
        <p>
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
