// components/Sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, UploadCloud, FolderClosed, Settings, LogOut, Sparkles } from 'lucide-react';
import { createClient } from '../lib/supabase/client';

interface SidebarProps {
  storageUsed: number; // in bytes
  storageLimit: number; // in bytes
  planId?: string;
}

export default function Sidebar({ storageUsed, storageLimit, planId = 'free' }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Upload Files', path: '/dashboard/upload', icon: UploadCloud },
    { name: 'My Files', path: '/dashboard/files', icon: FolderClosed },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const percentUsed = Math.min(100, Math.round((storageUsed / storageLimit) * 100)) || 0;

  return (
    <>
      <aside className="sidebar">
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', textDecoration: 'none' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#logo-gradient-sidebar)" />
            <path d="M2 17L12 22L22 17" stroke="url(#logo-gradient-sidebar)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="url(#logo-gradient-sidebar)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
            <defs>
              <linearGradient id="logo-gradient-sidebar" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <span style={{
            fontWeight: 800,
            fontSize: '1.25rem',
            letterSpacing: '-0.04em',
            fontFamily: 'var(--font-display)',
            background: 'linear-gradient(135deg, #ffffff 0%, #d4d4d8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            WalkFiles
          </span>
        </Link>

        <nav style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <ul className="sidebar-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="sidebar-footer">
            {/* Upgrade Plan Callout Card */}
            {planId.toLowerCase() !== 'elite' && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.15)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '20px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '60px',
                  height: '60px',
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                }} />
                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-display)' }}>
                  <Sparkles size={13} style={{ color: '#a78bfa' }} />
                  Upgrade Plan
                </h4>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '10px', lineHeight: 1.3 }}>
                  Unlock larger limits & faster downloads.
                </p>
                <Link href="/pricing" className="btn btn-primary" style={{ width: '100%', padding: '6px 12px', fontSize: '0.7rem', textDecoration: 'none', borderRadius: 'var(--radius-sm)' }}>
                  Upgrade Now
                </Link>
              </div>
            )}

            {/* Storage Capacity Indicator */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                <span>Storage Used</span>
                <span>{percentUsed}%</span>
              </div>
              <div className="progress-container" style={{ height: '6px', marginBottom: '8px', backgroundColor: 'rgba(255,255,255,0.03)' }}>
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${percentUsed}%`,
                    boxShadow: percentUsed > 0 ? '0 0 8px rgba(59, 130, 246, 0.4)' : undefined
                  }}
                ></div>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {formatSize(storageUsed)} of {formatSize(storageLimit)}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 16px', gap: '12px' }}
            >
              <LogOut size={18} />
              <span>Log out</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <div className="mobile-bottom-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          const getShortLabel = (n: string) => {
            if (n === 'Upload Files') return 'Upload';
            if (n === 'My Files') return 'Files';
            return n;
          };

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>{getShortLabel(item.name)}</span>
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="mobile-nav-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, height: '100%' }}
        >
          <LogOut size={18} style={{ color: 'var(--error-color)' }} />
          <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--error-color)' }}>Exit</span>
        </button>
      </div>
    </>
  );
}
