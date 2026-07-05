// app/(auth)/layout.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Lock, Zap, Database, Sparkles } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-app)',
      width: '100%',
      overflowX: 'hidden'
    }}>
      {/* Left Column: Auth Forms (45% width on desktop) */}
      <div style={{
        flex: '1 1 45%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 24px',
        minHeight: '100vh',
        boxSizing: 'border-box',
        zIndex: 5
      }}>
        {/* Inner container to align Logo, Form, and Footer vertically */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          minHeight: '520px',
          maxHeight: '680px',
          width: '100%',
          maxWidth: '340px',
          boxSizing: 'border-box'
        }}>
          {/* Top: Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#logo-gradient-auth)" />
                <path d="M2 17L12 22L22 17" stroke="url(#logo-gradient-auth)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="url(#logo-gradient-auth)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
                <defs>
                  <linearGradient id="logo-gradient-auth" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#10b981" />
                    <stop offset="1" stopColor="#3ecf8e" />
                  </linearGradient>
                </defs>
              </svg>
              <span style={{
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '-0.03em',
                fontFamily: 'var(--font-sans)',
                color: '#ffffff'
              }}>
                walkfiles
              </span>
            </Link>
          </div>

          {/* Center: Children Form */}
          <div style={{ width: '100%' }}>
            {children}
          </div>

          {/* Bottom: Legal */}
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
            By continuing, you agree to WalkFiles's{' '}
            <Link href="/dmca" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Terms of Service</Link>{' '}
            and{' '}
            <Link href="/dmca" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Privacy Policy</Link>,{' '}
            and to receive periodic updates.
          </div>
        </div>
      </div>

      {/* Right Column: Premium Quote/Branding (55% width, hidden on mobile/tablet) */}
      <div className="auth-right-panel" style={{
        flex: '1 1 55%',
        backgroundColor: '#09090b',
        borderLeft: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '40px',
        position: 'relative',
        boxSizing: 'border-box'
      }}>
        {/* Top Right Actions */}
        <div style={{ alignSelf: 'flex-end' }}>
          <Link
            href="/pricing"
            style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              padding: '6px 14px',
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
            className="nav-hover-link"
          >
            View Pricing
          </Link>
        </div>

        {/* Center: Brand Highlights */}
        <div style={{
          maxWidth: '480px',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
            Cloud sharing, built for speed and security
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Feature 1 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ color: '#3ecf8e', marginTop: '3px' }}>
                <Zap size={18} />
              </div>
              <div>
                <h5 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff', margin: '0 0 4px 0' }}>Direct Cloud Uploads</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                  Bypass intermediate server bottleneck layers. Streams file packets directly from your client browser to secure storage.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ color: '#3ecf8e', marginTop: '3px' }}>
                <Lock size={18} />
              </div>
              <div>
                <h5 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff', margin: '0 0 4px 0' }}>Granular Access Security</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                  Account-isolated storage limits, customizable link expiration dates, and password-protected sharing access controls.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ color: '#3ecf8e', marginTop: '3px' }}>
                <Database size={18} />
              </div>
              <div>
                <h5 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff', margin: '0 0 4px 0' }}>Zero Egress Downlink Caps</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                  Share download links freely with teammates or clients without encountering bandwidth limits or surprise egress bills.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ color: '#3ecf8e', marginTop: '3px' }}>
                <Sparkles size={18} />
              </div>
              <div>
                <h5 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff', margin: '0 0 4px 0' }}>Native Media Previews</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                  Play videos, preview image collections, and stream audio files directly in the browser without requiring forced client downloads.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Left Status Action */}
        <div style={{ alignSelf: 'flex-start' }}>
          <Link href="/status" style={{
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
            cursor: 'pointer'
          }} className="nav-hover-link">
            <span style={{ width: '6px', height: '6px', backgroundColor: '#3ecf8e', borderRadius: '50%' }}></span>
            All systems operational
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 992px) {
          .auth-right-panel {
            display: none !important;
          }
          div[style*="flex: 1 1 45%"] {
            flex: 1 1 100% !important;
            padding: 40px 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
