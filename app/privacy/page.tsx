import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';


export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      <Navbar />

      <main style={{ flexGrow: 1, padding: '80px 24px 100px 24px', maxWidth: '800px', margin: '0 auto', width: '100%' }} className="animate-fade-in">
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px' }}>Privacy Policy</h1>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '32px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          <p>
            At <strong>WalkFiles</strong>, protecting your privacy is our top priority. This Privacy Policy details the types of information we collect, how we store and secure it, and your rights as a user.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '16px' }}>1. Information We Collect</h2>
          <p>
            When you register, we collect your email address. During file uploads, we collect file metadata (name, size, MIME type). Files are uploaded directly from your browser to secure cloud object storage via encrypted HTTPS.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '16px' }}>2. Data Storage & Security</h2>
          <p>
            User database records and sessions are powered securely by Supabase. WalkFiles does not log or inspect file contents. Only metadata required to serve download links is stored in our database.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '16px' }}>3. Cookies & Tracking</h2>
          <p>
            We use essential session cookies through Supabase to keep you authenticated. We do not use tracking or advertising cookies.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '16px' }}>4. Data Deletion</h2>
          <p>
            You can delete any of your files at any time via the WalkFiles dashboard. Deleting a file instantly removes its database metadata and purges it from our secure cloud storage.
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
