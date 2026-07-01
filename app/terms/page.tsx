import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      <Navbar />

      <main style={{ flexGrow: 1, padding: '80px 24px 100px 24px', maxWidth: '800px', margin: '0 auto', width: '100%' }} className="animate-fade-in">
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px' }}>Terms of Service</h1>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '32px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          <p>
            By accessing or using the <strong>WalkFiles</strong> platform, you agree to comply with and be bound by the following Terms of Service.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '16px' }}>1. Allowed Usage</h2>
          <p>
            WalkFiles provides cloud storage and link-sharing services. You must not upload any malicious code (malware, viruses), copyrighted material without permission, or files violating local or international regulations.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '16px' }}>2. Account Responsibility</h2>
          <p>
            You are responsible for keeping your login credentials confidential. WalkFiles is not liable for data loss or breach resulting from unauthorized account access.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '16px' }}>3. Service Availability</h2>
          <p>
            WalkFiles is provided on an "as is" and "as available" basis. We reserve the right to limit storage allocations, delete accounts violating terms, or suspend service at any time without liability.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '16px' }}>4. Termination</h2>
          <p>
            We reserves the right to terminate accounts, remove infringing links, or ban IPs in response to abuse reports, DMCA notices, or terms violations.
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
