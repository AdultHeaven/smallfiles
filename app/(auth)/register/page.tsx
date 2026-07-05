// app/(auth)/register/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../../lib/supabase/client';

export default function RegisterPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '12px' }}>Verify Your Email</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px' }}>
          We've sent a verification link to <strong>{email}</strong>. Please check your inbox (and spam folder) to complete registration.
        </p>
        <Link href="/login" className="sb-pricing-btn-pro" style={{ width: '100%', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleRegister}>
      <h2 style={{ marginBottom: '8px', fontWeight: 700 }}>Get Started</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '24px' }}>
        Create your free WalkFiles account.
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
        <label className="form-label" htmlFor="password">Password</label>
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

      <div className="form-group">
        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          className="form-input"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="sb-pricing-btn-pro" style={{ width: '100%', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} disabled={loading}>
        {loading ? 'Creating account...' : 'Create Account'}
      </button>

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        Already have an account?{' '}
        <Link href="/login" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
          Log in
        </Link>
      </p>
    </form>
  );
}
