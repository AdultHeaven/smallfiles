// app/contact/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      <title>Contact WalkFiles Support Team — Cloud Storage Help</title>
      <meta name="description" content="Need assistance, have feedback, or want to report issues with your WalkFiles account? Contact our engineering and support team." />
      <Navbar />

      <main style={{ flexGrow: 1, padding: '80px 24px 100px 24px', maxWidth: '800px', margin: '0 auto', width: '100%' }} className="animate-fade-in">
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px' }}>Contact Us</h1>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '32px' }}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Have a question, feedback, or need assistance with your WalkFiles account? We're here to help. Reach out to our engineering and support team.
          </p>

          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            📧 Email us at: <a href="mailto:support@walkfiles.com" style={{ color: 'var(--accent-color)', fontWeight: 600 }}>support@walkfiles.com</a>
          </p>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            We typically respond within 24–48 hours on business days.
          </p>

          <Link href="/" className="btn btn-secondary" style={{ alignSelf: 'flex-start', marginTop: '24px' }}>
            ← Back to Home
          </Link>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '24px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        © {new Date().getFullYear()} WalkFiles. Cloud sharing made simple.
      </footer>
    </div>
  );
}
