'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export default function DashboardLoading() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '16px',
      color: 'var(--text-secondary)'
    }}>
      {/* Top Loading Bar simulation */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: 'linear-gradient(90deg, var(--accent-color) 0%, #8b5cf6 50%, var(--accent-color) 100%)',
        backgroundSize: '200% 100%',
        animation: 'loading-bar-anim 1.5s infinite linear',
        zIndex: 9999,
      }} />

      <Loader2 size={36} className="animate-spin" style={{ color: 'var(--accent-color)' }} />
      <span style={{ fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.02em', animation: 'pulse 1.5s infinite' }}>
        Loading dashboard...
      </span>

      <style jsx global>{`
        @keyframes loading-bar-anim {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
