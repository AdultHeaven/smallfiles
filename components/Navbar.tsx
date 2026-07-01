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
    <header className="nav-header">
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#logo-gradient)" />
            <path d="M2 17L12 22L22 17" stroke="url(#logo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="url(#logo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
            <defs>
              <linearGradient id="logo-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <span style={{
            fontWeight: 800,
            fontSize: '1.2rem',
            letterSpacing: '-0.04em',
            fontFamily: 'var(--font-display)',
            background: 'linear-gradient(135deg, #ffffff 0%, #d4d4d8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            WalkFiles
          </span>
        </Link>

        {/* Desktop Menu */}
        {isMinimal ? (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }} className="desktop-menu">
            <Link href="/features" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)', transition: 'color 0.2s ease' }} className="nav-hover-link">Features</Link>
            {isLoggedIn === null ? (
              <div style={{ width: '80px', height: '36px' }}></div> // Skeleton placeholder
            ) : (
              <Link href={isLoggedIn ? "/dashboard" : "/register"} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                {isLoggedIn ? "Go to Dashboard" : "Upload Files"}
              </Link>
            )}
          </nav>
        ) : (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-menu">
            <Link href="/features" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)', transition: 'color 0.2s ease' }} className="nav-hover-link">Features</Link>
            <Link href="/pricing" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)', transition: 'color 0.2s ease' }} className="nav-hover-link">Pricing</Link>
            <Link href="/dmca" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)', transition: 'color 0.2s ease' }} className="nav-hover-link">DMCA</Link>
            <Link href="/contact" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)', transition: 'color 0.2s ease' }} className="nav-hover-link">Contact</Link>

            {isLoggedIn === null ? (
              <div style={{ width: '80px', height: '36px' }}></div> // Skeleton placeholder
            ) : isLoggedIn ? (
              <Link href="/dashboard" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                Go to Dashboard
              </Link>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <Link href="/login" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', transition: 'color 0.2s ease' }} className="nav-hover-link">
                  Log in
                </Link>
                <Link href="/register" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                  Sign up
                </Link>
              </div>
            )}
          </nav>
        )}

        {/* Mobile Action Button (conversion focus) */}
        <Link 
          href={isLoggedIn ? "/dashboard" : "/register"} 
          className="mobile-cta-btn btn btn-primary"
          style={{ 
            padding: '6px 14px', 
            fontSize: '0.75rem', 
            textDecoration: 'none',
            display: 'none'
          }}
        >
          {isLoggedIn ? "Dashboard" : "Upload Files"}
        </Link>
      </div>

      <style jsx global>{`
        .nav-hover-link:hover {
          color: var(--text-primary) !important;
        }
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-cta-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
