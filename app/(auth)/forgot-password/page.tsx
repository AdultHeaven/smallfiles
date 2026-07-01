// app/(auth)/forgot-password/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../../lib/supabase/client';

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/dashboard/settings`,
      });

      if (resetError) {
        setError(resetError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleReset}>
      <h2 style={{ marginBottom: '8px', fontWeight: 700 }}>Reset Password</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '24px' }}>
        Enter your email to receive a password reset link.
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

      {success ? (
        <div style={{
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid var(--success-color)',
          color: 'var(--success-color)',
          padding: '12px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.875rem',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          Password reset link sent! Check your inbox.
        </div>
      ) : (
        <>
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

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }} disabled={loading}>
            {loading ? 'Sending link...' : 'Send Reset Link'}
          </button>
        </>
      )}

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        Back to{' '}
        <Link href="/login" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
          Log in
        </Link>
      </p>
    </form>
  );
}
