'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: Implement password reset with auth service
      console.log('Reset password request for:', email);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Reset Password</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-gray-400 text-sm mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none"
              required
            />
          </div>

          {error && <div className="text-red-400 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <div className="text-5xl mb-4 text-green-400">✓</div>
          <p className="text-gray-300 mb-6">
            Check your email for a password reset link. The link expires in 24 hours.
          </p>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-400">
        <Link href="/login" className="text-blue-400 hover:text-blue-300">
          Back to Login
        </Link>
      </div>
    </div>
  );
}
