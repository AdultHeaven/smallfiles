'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  Mail, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronLeft, 
  Copyright,
  ExternalLink
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function DmcaPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      {/* Header */}
      <Navbar isMinimal={true} />

      <main style={{ flexGrow: 1, padding: '60px 24px 100px 24px', maxWidth: '800px', margin: '0 auto', width: '100%' }} className="animate-fade-in">
        
        {/* Breadcrumb / Back Button */}
        <Link href="/" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)', marginBottom: '32px', textDecoration: 'none' }}>
          <ChevronLeft size={14} />
          <span>Back to Home</span>
        </Link>

        {/* Title Section */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '48px', 
            height: '48px', 
            borderRadius: '50%', 
            backgroundColor: 'rgba(99, 102, 241, 0.08)', 
            color: 'var(--accent-color)',
            marginBottom: '16px',
            border: '1px solid rgba(99, 102, 241, 0.15)'
          }}>
            <ShieldAlert size={24} />
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>
            DMCA Takedown Policy
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.5 }}>
            Intellectual property compliance, copyright protection, and reporting procedures for WalkFiles.
          </p>
        </div>

        {/* Main Content Box */}
        <div className="card shadow-premium" style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '40px' }}>
          
          {/* Paragraph Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
              At <strong>WalkFiles</strong>, we respect the intellectual property rights of creators and copyright holders. Our cloud storage and file transfer platform allows users to share content seamlessly, and we expect all users to comply with copyright laws.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
              Under the Digital Millennium Copyright Act (DMCA), we respond promptly to valid notices of alleged copyright infringement. If you believe your copyrighted material is being distributed without authorization, please submit a formal notice as detailed below.
            </p>
          </div>

          {/* Submission Info Box */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.01)', 
            border: '1px solid var(--border-color)', 
            borderRadius: 'var(--radius-lg)', 
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: 'var(--accent-color)', display: 'flex' }}><Mail size={20} /></div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Submit Your Takedown Notice</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              All formal takedown requests must be sent directly to our designated copyright agent via email. Please make sure to include all statutory requirements listed below for prompt processing.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Email Agent:</span>
              <a 
                href="mailto:copyright@walkfiles.com" 
                className="mailto-badge"
              >
                <span>copyright@walkfiles.com</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Required Info Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ color: 'var(--warning-color)', display: 'flex' }}><FileText size={18} /></div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>DMCA Notice Requirements</h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
              {[
                { title: 'Contact Information', desc: 'Your full legal name, physical mailing address, phone number, and professional email address.' },
                { title: 'Involved URLs', desc: 'Exact WalkFiles sharing URLs (e.g., https://walkfiles.com/f/...) hosting the alleged infringing material.' },
                { title: 'Copyright Details', desc: 'A description and link to the original copyrighted work you claim has been infringed.' },
                { title: 'Good Faith Belief', desc: 'A statement stating that you have a good faith belief that use of the material is not authorized.' },
                { title: 'Perjury Statement', desc: 'A statement, made under penalty of perjury, that the information in the notice is completely accurate and you are the copyright holder or authorized to act on their behalf.' },
                { title: 'Signature', desc: 'An electronic or physical signature of the copyright owner or their authorized legal agent.' },
              ].map((item, idx) => (
                <div key={idx} style={{ 
                  display: 'flex', 
                  gap: '14px', 
                  padding: '16px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.01)', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid rgba(255,255,255,0.02)'
                }}>
                  <div style={{ color: 'var(--success-color)', display: 'flex', marginTop: '2px' }}><CheckCircle2 size={16} /></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Warning Notice */}
          <div style={{ 
            display: 'flex', 
            gap: '14px', 
            padding: '16px', 
            backgroundColor: 'rgba(239, 68, 68, 0.03)', 
            border: '1px solid rgba(239, 68, 68, 0.1)', 
            borderRadius: 'var(--radius-md)',
            alignItems: 'flex-start'
          }}>
            <div style={{ color: 'var(--error-color)', display: 'flex', marginTop: '2px' }}><AlertTriangle size={16} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--error-color)' }}>Important Legal Warning</span>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Please be aware that under Section 512(f) of the DMCA, any person who knowingly materially misrepresents that material or activity is infringing may be subject to liability for damages, including legal fees. Abuse of this mechanism may result in civil action or termination of your account.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '24px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        © {new Date().getFullYear()} WalkFiles. Cloud sharing made simple.
      </footer>

      {/* Embedded Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .mailto-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background-color: rgba(99, 102, 241, 0.06);
          border: 1px solid rgba(99, 102, 241, 0.15);
          color: var(--accent-color);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          transition: background-color 0.2s, border-color 0.2s;
        }
        .mailto-badge:hover {
          background-color: rgba(99, 102, 241, 0.1);
          border-color: rgba(99, 102, 241, 0.25);
        }
      `}} />
    </div>
  );
}
