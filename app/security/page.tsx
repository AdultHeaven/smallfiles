// app/security/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Lock, EyeOff, Key, Zap, RefreshCw } from 'lucide-react';

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'Direct-to-Cloud Stream Encryption',
      desc: 'Bypass insecure buffer proxies. Files are streamed straight from your local client browser to high-performance storage vaults using military-grade SSL/TLS transport keys.',
      color: '#3ecf8e'
    },
    {
      icon: Shield,
      title: 'Isolated Profile Vaults',
      desc: 'Your storage layout is strictly private. File metadata mappings are locked behind secure cryptographic authentication barriers. No public search engines can index your files.',
      color: '#10b981'
    },
    {
      icon: Key,
      title: 'Access Control & Passwords',
      desc: 'Enforce sharing rules. WalkFiles supports custom user passwords and end-to-end download link hashes to ensure sensitive documents are only visible to authorized recipients.',
      color: '#3ecf8e'
    },
    {
      icon: EyeOff,
      title: 'Zero Intermediate Server Storage',
      desc: 'We never cache or mirror file contents in transit. Once a direct upload begins, it is immediately finalized in our secure storage architecture without leaving fragments.',
      color: '#10b981'
    },
    {
      icon: RefreshCw,
      title: 'Auto-Expiring Shares',
      desc: 'Clean up security footprints automatically. Free tier shares automatically clean up after 90 consecutive days of inactivity, while paid tiers support custom expiration limits.',
      color: '#3ecf8e'
    },
    {
      icon: Zap,
      title: 'Uncapped Direct Transfers',
      desc: 'No artificial speed throttle limits or transit waiting rooms. Downloads stream directly to clients with full available network speed and performance.',
      color: '#10b981'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      <title>Security & Privacy Protection — WalkFiles</title>
      <meta name="description" content="Discover WalkFiles direct cloud encryption, isolated account security systems, link passwords, and auto-expiration features." />
      <Navbar />

      <main style={{ flexGrow: 1, padding: '80px 24px 100px 24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }} className="animate-fade-in">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.02em', color: '#ffffff' }}>
            Enterprise-grade security by default
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.4 }}>
            We design every upload pathway to keep your documents, folders, and shared media fully secure.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          {securityFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '28px', backgroundColor: 'rgba(23, 23, 25, 0.4)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                <div style={{
                  padding: '12px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)',
                  color: item.color,
                  alignSelf: 'flex-start'
                }}>
                  <Icon size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
