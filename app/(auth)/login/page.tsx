// app/(auth)/login/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2 style={{ marginBottom: '8px', fontWeight: 700 }}>Welcome Back</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '24px' }}>
        Log in to manage your WalkFiles account.
      </p>

      {error && (
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid var(--error-color)',
          color: 'var(--error-color)',
          padding: '12px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.875rem',
          marginBottom: '16px'
        }}>
          {error}
        </div>
      )}

      <div className="form-group">
        <label className="form-label" htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          className="form-input"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label className="form-label" htmlFor="password">Password</label>
          <Link href="/forgot-password" style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          className="form-input"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="sb-pricing-btn-pro" style={{ width: '100%', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} disabled={loading}>
        {loading ? 'Logging in...' : 'Log in'}
      </button>

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        Don't have an account?{' '}
        <Link href="/register" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
          Sign up
        </Link>
      </p>
    </form>
  );
}
