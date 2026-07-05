// app/features/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Zap, Shield, HardDrive, Share2, UploadCloud, RefreshCw } from 'lucide-react';

export default function FeaturesPage() {
  const items = [
    {
      icon: UploadCloud,
      title: 'High-Speed Direct Uploads',
      desc: 'Bypasses slow proxy servers to stream uploads directly from your local browser to secure cloud storage nodes. This means faster upload speeds, minimal latency, and zero transfer buffering.',
      color: 'var(--accent-color)',
    },
    {
      icon: Shield,
      title: 'Isolated Privacy Vaults',
      desc: 'Secured via robust account authorization mapping. Only you can view, share, or delete your files, keeping them completely private and safe from unauthorized access.',
      color: 'var(--success-color)',
    },
    {
      icon: Zap,
      title: 'Lightning Fast Downloads',
      desc: 'Utilizes high-speed content delivery routing to serve files directly. Downloads start immediately without waiting in queues or solving CAPTCHAs.',
      color: 'var(--warning-color)',
    },
    {
      icon: HardDrive,
      title: 'Storage & Plan Controls',
      desc: 'Clear visual metrics showing active storage usage, remaining quota capacity, total file count, and daily upload limits.',
      color: '#ec4899',
    },
    {
      icon: Share2,
      title: 'Instant Share URL & QR Code',
      desc: 'Generate public download landing page links or scan the custom-generated QR code to instantly access and transfer files to your mobile device.',
      color: '#8b5cf6',
    },
    {
      icon: RefreshCw,
      title: 'Flexible Storage Management',
      desc: 'Rename documents directly on the cloud or delete them to immediately free up space on your personal storage quota allocation.',
      color: '#06b6d4',
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      <title>WalkFiles Features — Optimized Cloud Sharing Infrastructure</title>
      <meta name="description" content="Discover how WalkFiles leverages direct browser streaming uploads, high-speed routing networks, and isolated privacy protocols to deliver private file sharing." />
      <Navbar />

      <main style={{ flexGrow: 1, padding: '80px 24px 100px 24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }} className="animate-fade-in">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px' }}>Engineered for speed and security</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            WalkFiles is optimized to provide a seamless, premium file hosting and sharing experience.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '28px' }}>
                <div style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-app)',
                  color: item.color,
                  alignSelf: 'flex-start'
                }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
