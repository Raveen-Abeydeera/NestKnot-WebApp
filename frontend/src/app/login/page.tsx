'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { login } from '@/lib/api';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login: authenticate } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await login(email, password);
      authenticate(data.token, data.email);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-xl w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px] bg-surface-container-lowest p-md md:p-lg rounded-2xl shadow-lg border border-outline-variant/30"
      >
        <h1 className="font-headline-md text-primary text-center mb-sm">Welcome Back</h1>
        <p className="font-body-md text-on-surface-variant text-center mb-lg">
          Log in to manage your service requests.
        </p>

        {error && (
          <div className="bg-error-container text-on-error-container p-sm rounded-lg flex items-center gap-sm mb-lg text-label-md">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-lg">
          <div className="space-y-xs">
            <label className="font-label-md text-on-surface">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-[40px] pr-sm py-sm bg-surface-container rounded-lg border border-outline focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-on-surface"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-xs">
            <label className="font-label-md text-on-surface">Password</label>
            <div className="relative">
              <Lock className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-[40px] pr-sm py-sm bg-surface-container rounded-lg border border-outline focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-on-surface"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-on-primary py-sm rounded-lg font-title-md hover:opacity-90 transition-opacity shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="font-body-sm text-center text-on-surface-variant mt-lg">
          Don't have an account?{' '}
          <Link href="/register" className="text-primary font-bold hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
