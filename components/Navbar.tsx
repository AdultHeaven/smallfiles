// components/Navbar.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '../lib/supabase/client';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  isMinimal?: boolean;
}

export default function Navbar({ isMinimal = false }: NavbarProps) {
  const supabase = createClient();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <header className="nav-header" style={{ padding: '0' }}>
      <div style={{
        maxWidth: '1120px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        padding: '0 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px', height: '100%' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '100%' }} onClick={() => setMobileMenuOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#logo-gradient)" />
              <path d="M2 17L12 22L22 17" stroke="url(#logo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="url(#logo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
              <defs>
                <linearGradient id="logo-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#10b981" />
                  <stop offset="1" stopColor="#3ecf8e" />
                </linearGradient>
              </defs>
            </svg>
            <span className="sb-logo-text">
              walkfiles
            </span>
          </Link>

          {/* Desktop Nav Links (inside flex next to logo) */}
          {!isMinimal && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '100%' }} className="desktop-menu">
              <Link href="/features" className="sb-nav-link">
                Product
              </Link>
              <Link href="/pricing" className="sb-nav-link">
                Pricing
              </Link>
              <Link href="/security" className="sb-nav-link">
                Security
              </Link>
              <Link href="/contact" className="sb-nav-link">
                Contact
              </Link>
            </div>
          )}
        </div>

        {/* Right Side Tools (Desktop & Mobile hamburger align here) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {isMinimal ? (
            <nav style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="desktop-menu">
              <Link href="/features" className="sb-nav-link">
                Product
              </Link>
              {isLoggedIn === null ? (
                <div style={{ width: '80px', height: '28px' }}></div>
              ) : (
                <Link href={isLoggedIn ? "/dashboard" : "/register"} className="sb-btn-blue">
                  {isLoggedIn ? "Dashboard" : "Upload"}
                </Link>
              )}
            </nav>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="desktop-menu">
              {isLoggedIn === null ? (
                <div style={{ width: '100px', height: '28px' }}></div>
              ) : isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="sb-btn-blue">
                    Dashboard
                  </Link>
                  <Link href="/dashboard/settings" className="sb-avatar-btn">
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </Link>
                </>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Link href="/login" className="sb-login-link">
                    Log in
                  </Link>
                  <Link href="/register" className="sb-btn-blue">
                    Sign up
                  </Link>
                  <Link href="/login" className="sb-avatar-btn">
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile Hamburger toggle button */}
          {!isMinimal && (
            <button
              className="hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              style={{ padding: '6px' }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>

        {/* Mobile Minimal Mode Action Button */}
        {isMinimal && (
          <Link
            href={isLoggedIn ? "/dashboard" : "/register"}
            className="mobile-cta-btn sb-btn-blue"
            style={{
              display: 'none',
              height: '30px',
              padding: '0 12px'
            }}
          >
            {isLoggedIn ? "Dashboard" : "Upload"}
          </Link>
        )}
      </div>

      {/* Glassmorphic Mobile Menu Overlay */}
      {!isMinimal && (
        <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
          <Link href="/features" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Product</Link>
          <Link href="/pricing" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          <Link href="/security" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Security</Link>
          <Link href="/contact" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'auto' }}>
            {isLoggedIn === null ? (
              <div className="skeleton" style={{ height: '40px', width: '100%' }}></div>
            ) : isLoggedIn ? (
              <Link
                href="/dashboard"
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="btn btn-secondary"
                  style={{ width: '100%', padding: '12px', textAlign: 'center' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up free
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .nav-hover-link:hover {
          color: var(--text-primary) !important;
        }
        .mobile-cta-btn {
          display: none !important;
        }
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-cta-btn {
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
}

