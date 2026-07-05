// components/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="rich-footer">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-col" style={{ gap: '12px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#footer-logo-gradient)" />
              <path d="M2 17L12 22L22 17" stroke="url(#footer-logo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="url(#footer-logo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
              <defs>
                <linearGradient id="footer-logo-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#10b981" />
                  <stop offset="1" stopColor="#3ecf8e" />
                </linearGradient>
              </defs>
            </svg>
            <span className="sb-logo-text" style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff' }}>
              walkfiles
            </span>
          </Link>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: 1.5, margin: '8px 0 0 0' }}>
            High-speed cloud storage and secure sharing endpoints. Direct-to-cloud transfers with uncapped speeds.
          </p>
        </div>

        {/* Column 2: Product */}
        <div className="footer-col">
          <h4>Product</h4>
          <ul>
            <li><Link href="/" className="footer-link">Features</Link></li>
            <li><Link href="/pricing" className="footer-link">Pricing Plans</Link></li>
            <li><Link href="/pricing" className="footer-link">Storage Limits</Link></li>
            <li><Link href="/" className="footer-link">Pre-Signed Speed</Link></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><Link href="/pricing" className="footer-link">FAQ & Help</Link></li>
            <li><Link href="/contact" className="footer-link">Abuse Report</Link></li>
            <li><Link href="/contact" className="footer-link">Support Queue</Link></li>
            <li><Link href="/dmca" className="footer-link">API Reference</Link></li>
          </ul>
        </div>

        {/* Column 4: Legal */}
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><Link href="/dmca" className="footer-link">DMCA Policy</Link></li>
            <li><Link href="/dmca" className="footer-link">Terms of Service</Link></li>
            <li><Link href="/dmca" className="footer-link">Privacy Policy</Link></li>
            <li><Link href="/dmca" className="footer-link">GDPR Compliance</Link></li>
          </ul>
        </div>

        {/* Column 5: Company */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link href="/" className="footer-link">About Us</Link></li>
            <li><Link href="/contact" className="footer-link">Contact Sales</Link></li>
            <li><Link href="/status" className="footer-link">Status Page</Link></li>
            <li><Link href="/" className="footer-link">Official Blog</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} WalkFiles Inc. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link href="/dmca" className="footer-link" style={{ fontSize: '0.7rem' }}>Terms</Link>
          <Link href="/dmca" className="footer-link" style={{ fontSize: '0.7rem' }}>Privacy</Link>
          <Link href="/contact" className="footer-link" style={{ fontSize: '0.7rem' }}>Contact</Link>
        </div>
      </div>
    </footer>
  );
}
