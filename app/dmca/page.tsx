import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
export default function DmcaPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      <Navbar />

      <main style={{ flexGrow: 1, padding: '80px 24px 100px 24px', maxWidth: '800px', margin: '0 auto', width: '100%' }} className="animate-fade-in">
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px' }}>DMCA Takedown Policy</h1>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '32px' }}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            At <strong>WalkFiles</strong>, we respect intellectual property rights and take copyright infringement seriously. Our platform allows registered users to upload and share content, and we expect all users to comply with copyright laws.
          </p>

          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            If you believe any file hosted on WalkFiles infringes upon your copyright, you may submit a takedown request. We will review and act upon all valid DMCA notices promptly.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '16px' }}>📧 Submit Your Request</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Please email your detailed takedown notice to: <a href="mailto:copyright@walkfiles.com" style={{ color: 'var(--accent-color)' }}>copyright@walkfiles.com</a>
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '16px' }}>📝 Required Information</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Your full legal name, physical address, and contact information.</li>
            <li>Specific URLs of the WalkFiles download links containing the alleged infringing content.</li>
            <li>A detailed description of the copyrighted work that has been infringed.</li>
            <li>A good faith statement asserting that the use of the material is not authorized by the copyright owner.</li>
            <li>A declaration, under penalty of perjury, that the information in the notice is accurate.</li>
            <li>An electronic or physical signature of the copyright owner or authorized representative.</li>
          </ul>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '16px' }}>
            Please note that submitting false or malicious takedown requests may result in civil liability or account termination.
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
