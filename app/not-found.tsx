// app/not-found.tsx
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      <Navbar />

      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center', gap: '16px' }} className="animate-fade-in">
        <h1 style={{ fontSize: '6rem', fontWeight: 900, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>
          404
        </h1>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', marginBottom: '16px' }}>
          The file link might have expired, or the page you are looking for has been moved or deleted.
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/" className="btn btn-primary">
            Go to Homepage
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Contact Support
          </Link>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '24px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        © {new Date().getFullYear()} WalkFiles. Cloud sharing made simple.
      </footer>
    </div>
  );
}
