// app/dashboard/settings/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '../../../lib/supabase/client';
import { Shield, KeyRound, CheckCircle2, Loader2, HardDrive, FileClock } from 'lucide-react';

interface ProfileDetails {
  email: string;
  storage_used: number;
  plan_id: string;
  plan: {
    name: string;
    storage_limit: number;
    max_file_size: number;
    daily_upload_limit: number;
    retention_days: number | null;
  };
}

export default function SettingsPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<ProfileDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Password reset states
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch detailed profile via repositories fallback or API
        const res = await fetch(`/api/files`); // Can reuse endpoints or request profile data
        const profileRes = await fetch(`/api/profile`);
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
        }
      }
      setLoading(false);
    }
    loadProfile();
  }, [supabase]);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setResetLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess(true);
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to update password.');
    } finally {
      setResetLoading(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>Settings</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your profile limits and security settings.</p>
      </div>

       {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
          {/* Skeleton Plan Details Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="skeleton" style={{ width: '20px', height: '20px' }} />
              <div className="skeleton" style={{ width: '180px', height: '20px' }} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '8px' }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="skeleton" style={{ width: '100px', height: '14px' }} />
                  <div className="skeleton" style={{ width: '140px', height: '22px' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Skeleton Update Password Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', opacity: 0.6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="skeleton" style={{ width: '20px', height: '20px' }} />
              <div className="skeleton" style={{ width: '150px', height: '20px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="skeleton" style={{ width: '100%', height: '40px', borderRadius: 'var(--radius-md)' }} />
              <div className="skeleton" style={{ width: '100%', height: '40px', borderRadius: 'var(--radius-md)' }} />
              <div className="skeleton" style={{ width: '120px', height: '36px', borderRadius: 'var(--radius-md)' }} />
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Plan Info Card */}
          {profile && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Shield size={20} style={{ color: 'var(--accent-color)' }} />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Plan & Storage Details</h2>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '8px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Current Plan</span>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '4px', marginBottom: 0 }}>{profile.plan.name}</p>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {profile.plan_id.toLowerCase() !== 'elite' && (
                      <Link 
                        href="/pricing" 
                        className="btn btn-primary"
                        style={{ 
                          fontSize: '0.7rem', 
                          padding: '6px 12px',
                          textDecoration: 'none',
                          borderRadius: 'var(--radius-sm)'
                        }}
                      >
                        Upgrade Plan
                      </Link>
                    )}
                    {profile.plan_id.toLowerCase() !== 'free' && (
                      <a 
                        href={process.env.NEXT_PUBLIC_POLAR_PORTAL_URL || 'https://polar.sh/walkfiles/portal'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        style={{ 
                          fontSize: '0.7rem', 
                          padding: '6px 12px',
                          borderColor: 'rgba(244, 63, 94, 0.2)',
                          color: 'var(--error-color)',
                          borderRadius: 'var(--radius-sm)'
                        }}
                      >
                        Cancel Plan
                      </a>
                    )}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Storage Used</span>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '4px' }}>
                    {formatSize(profile.storage_used)} / {formatSize(profile.plan.storage_limit)}
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Max File Size</span>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '4px' }}>
                    {formatSize(profile.plan.max_file_size)}
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Daily Upload Limit</span>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '4px' }}>
                    {profile.plan.daily_upload_limit} uploads
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Change Password Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <KeyRound size={20} style={{ color: 'var(--text-secondary)' }} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Update Password</h2>
            </div>

            {error && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid var(--error-color)',
                color: 'var(--error-color)',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.875rem'
              }}>
                {error}
              </div>
            )}

            {success && (
              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid var(--success-color)',
                color: 'var(--success-color)',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={16} />
                <span>Password updated successfully!</span>
              </div>
            )}

            <form onSubmit={handlePasswordUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }} disabled={resetLoading}>
                {resetLoading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
