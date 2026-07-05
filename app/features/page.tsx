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

      <main className="info-page-main">
        <div className="info-page-header animate-fade-in">
          <h1 className="info-page-title">Engineered for speed and security</h1>
          <p className="info-page-subtitle">
            WalkFiles is optimized to provide a seamless, premium file hosting and sharing experience.
          </p>
        </div>

        <div className="info-grid">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="info-card">
                <div className="info-card-header">
                  <div className="info-card-icon" style={{ color: item.color }}>
                    <Icon size={18} />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', margin: 0, lineHeight: 1.3 }}>{item.title}</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
