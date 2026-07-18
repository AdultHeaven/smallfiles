// app/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Check,
  Upload,
  Shield,
  Zap,
  Sparkles,
  HelpCircle,
  HardDrive,
  CheckCircle2,
  ArrowRight,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  Infinity,
  Link2,
  Play,
  UserMinus
} from 'lucide-react';

const STATIC_PLANS = [
  {
    id: 'free',
    name: 'Free',
    slug: 'free',
    price: 0,
    storage: '5 GB',
    storageLimit: 5368709120,
    maxFileSize: '150 MB',
    maxFileLimit: 157286400,
    uploads: '50 uploads / day',
    desc: 'Perfect for simple sharing and temporary file transfers.',
    features: [
      { text: 'Drag & Drop uploads' },
      { text: 'File sharing links' },
      { text: 'Direct link downloads' },
      { text: 'Mobile friendly client' },
      { text: 'Basic upload analytics' },
      { text: 'Guest download support' },
      { text: 'Basic download speeds' },
      { text: 'Supported by advertisements' },
      { text: 'Community-only support' }
    ],
    cta: 'Start for Free'
  },
  {
    id: 'starter',
    name: 'Starter',
    slug: 'starter',
    price: 1.49,
    storage: '25 GB',
    storageLimit: 26843545600,
    maxFileSize: '2 GB',
    maxFileLimit: 2147483648,
    uploads: '50 uploads / day',
    desc: 'Great for personal cloud storage and basic sharing settings.',
    features: [
      { text: 'Everything in Free plus:', header: true },
      { text: 'No advertisements' },
      { text: 'Faster download speeds' },
      { text: 'Priority upload processing' },
      { text: 'Custom folder organization' },
      { text: 'In-browser file previews' },
      { text: 'Password-protected links' },
      { text: 'Custom link expiration dates' },
      { text: 'Basic download analytics' },
      { text: 'Priority email support' }
    ],
    cta: 'Get Started'
  },
  {
    id: 'pro',
    name: 'Pro',
    slug: 'pro',
    price: 4.99,
    storage: '100 GB',
    storageLimit: 107374182400,
    maxFileSize: '2 GB',
    maxFileLimit: 2147483648,
    uploads: '50 uploads / day',
    desc: 'For creators and power users requiring larger security settings.',
    features: [
      { text: 'Everything in Starter plus:', header: true },
      { text: 'Highest download speeds' },
      { text: 'Advanced analytics metrics' },
      { text: 'Custom sharing domains' },
      { text: 'Detailed download history' },
      { text: 'Bulk dashboard uploads' },
      { text: 'Bulk dashboard file deletion' },
      { text: '24/7 Priority support access' },
      { text: 'Early access to new features' }
    ],
    cta: 'Upgrade now',
    popular: true
  },
  {
    id: 'elite',
    name: 'Elite',
    slug: 'elite',
    price: 19.99,
    storage: '500 GB',
    storageLimit: 536870912000,
    maxFileSize: '2 GB',
    maxFileLimit: 2147483648,
    uploads: '50 uploads / day',
    desc: '50 daily uploads, huge capacity, and premium speed tiers.',
    features: [
      { text: 'Everything in Pro plus:', header: true },
      { text: 'Premium network performance' },
      { text: 'Highest priority support queue' },
      { text: 'Advanced file management tools' },
      { text: 'Future premium features included' }
    ],
    cta: 'Upgrade now',
    elite: true
  }
];

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const faqs = [
    {
      q: 'What is the storage space limit on the Free plan?',
      a: 'The Free plan includes 5 GB of secure cloud storage. This is completely free and automatically activated upon registration.',
    },
    {
      q: 'What is the maximum file size I can share?',
      a: 'You can upload files up to 150 MB each. Need to share larger files? We are launching a premium Pro plan (coming soon) supporting uploads up to 2 GB per file.',
    },
    {
      q: 'Does WalkFiles automatically delete inactive uploads?',
      a: 'No, files are kept forever on all plans, including the Free plan, as long as they comply with our Terms of Service.',
    },
    {
      q: 'Are my file uploads private?',
      a: 'Absolutely. Every file upload is linked to your secure user profile. We enforce cryptographic owner authorization access, meaning only you can manage your files, and public sharing links are only generated if you explicitly request them.',
    },
    {
      q: 'How does WalkFiles manage direct uploads?',
      a: 'WalkFiles uses direct browser uploads. We generate a secure single-use key on the server, allowing your web client to stream files straight to our high-performance object storage cluster. This ensures maximum speeds and minimal transit lag.',
    },
  ];

  const features = [
    {
      icon: <Zap size={20} />,
      title: 'Direct Cloud Uploads',
      desc: 'Bypass slow intermediary servers. Your browser streams uploads directly to our global storage nodes using secure cryptographic authentication keys.',
      color: 'var(--accent-color)'
    },
    {
      icon: <Shield size={20} />,
      title: 'Granular Privacy Vaults',
      desc: 'Isolated account authorization boundaries. No unauthorized access. Every single file is strictly mapped and secured under owner-only rules.',
      color: 'var(--success-color)'
    },
    {
      icon: <Clock size={20} />,
      title: 'Permanent Storage',
      desc: 'Files are kept forever on all plans. No automatic deletion or inactive cleanup rules for your uploads.',
      color: 'var(--warning-color)'
    },
    {
      icon: <Layers size={20} />,
      title: 'Sleek Video & Media Previews',
      desc: 'Play shared video, audio, or preview image folders directly in the browser with full speed and playback control.',
      color: '#a855f7'
    },
    {
      icon: <Infinity size={20} />,
      title: 'Zero File Count Limits',
      desc: 'Upload as many files as you want. We only enforce total storage capacity, never limiting how many files you can own.',
      color: '#ec4899'
    },
    {
      icon: <Link2 size={20} />,
      title: 'Instant Sharing Links',
      desc: 'One-click clipboard links generated instantly on upload completion. Share folders and files immediately.',
      color: '#14b8a6'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      {/* Header Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section style={{
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '120px 24px 40px 24px',
        display: 'grid',
        gridTemplateColumns: '7fr 5fr',
        gap: '32px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }} className="animate-fade-in hero-container">
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px', textAlign: 'left' }}>
          {/* Floating canopy lights info pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(8px)',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            fontWeight: 600
          }}>
            <Sparkles size={14} style={{ color: '#3ecf8e' }} />
            <span>WalkFiles Early Access Launch v2.0</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            color: '#ffffff',
            fontFamily: 'var(--font-display)',
            margin: 0
          }}>
            Upload in seconds.<br />
            <span style={{
              background: 'linear-gradient(135deg, #10b981 0%, #3ecf8e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Share with confidence.</span>
          </h1>

          <p className="hero-subtitle">
            The premier high-speed Pixeldrain and Gofile alternative. Securely host, transfer, and share files or folders up to 5 GB completely free. Includes native media previews and zero download limits.
          </p>

          <div className="hero-cta-group">
            <Link href="/register" className="sb-btn-primary">
              Start Uploading Free
            </Link>
            <Link href="/pricing" className="sb-btn-secondary">
              View Plans
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', paddingTop: '0px' }} className="hero-right-col">
          {/* Relatable Comparison Widget */}
          <div style={{
            backgroundColor: 'rgba(23, 23, 25, 0.45)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            width: '100%',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', display: 'block' }}>
                Why users choose WalkFiles
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'left', display: 'block' }}>How we fix traditional file sharing frustrations</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              {/* Row 1 */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', paddingBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.03)', textAlign: 'left' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  color: '#10b981',
                  flexShrink: 0,
                  border: '1px solid rgba(16, 185, 129, 0.15)'
                }}>
                  <Zap size={14} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h5 style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff', margin: '0 0 4px 0', textAlign: 'left' }}>Super Fast Downloads</h5>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0, textAlign: 'left' }}>
                    No slow downloads, annoying pop-up ads, or countdown timers. Your friends get their files immediately at full speed.
                  </p>
                </div>
              </div>

              {/* Row 2 */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', paddingBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.03)', textAlign: 'left' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(59, 130, 246, 0.08)',
                  color: '#3b82f6',
                  flexShrink: 0,
                  border: '1px solid rgba(59, 130, 246, 0.15)'
                }}>
                  <UserMinus size={14} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h5 style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff', margin: '0 0 4px 0', textAlign: 'left' }}>No Account Needed</h5>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0, textAlign: 'left' }}>
                    Keep it simple. Send sharing links to anyone, and they can view or download files without having to sign up.
                  </p>
                </div>
              </div>

              {/* Row 3 */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', textAlign: 'left' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(168, 85, 247, 0.08)',
                  color: '#a855f7',
                  flexShrink: 0,
                  border: '1px solid rgba(168, 85, 247, 0.15)'
                }}>
                  <Play size={12} style={{ marginLeft: '1px' }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h5 style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff', margin: '0 0 4px 0', textAlign: 'left' }}>Play Media Instantly</h5>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0, textAlign: 'left' }}>
                    Watch shared videos, listen to audio files, or view photo galleries directly in the browser without having to download them first.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Overhaul */}
      <section style={{ borderTop: '1px solid var(--border-color)', padding: '40px 0 60px 0' }}>
        <div className="bento-grid">
          {/* Card 1: Double Wide - Direct Uploads */}
          <div className="bento-card bento-card-large">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', borderRadius: '6px', backgroundColor: '#121214', border: '1px solid rgba(255,255,255,0.03)', color: '#3ecf8e' }}>
                <Upload size={18} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>Lightning-Fast Direct Uploads</h3>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              Bypass slow intermediate proxy servers. Stream uploads directly to our fast edge nodes using secure cryptographic keys.
            </p>

            {/* Interactive Mock Uploader Showcase inside Card 1 */}
            <div style={{
              marginTop: '10px',
              padding: '16px',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.03)',
              borderRadius: '8px'
            }}>
              <div
                onClick={() => setShowAuthModal(true)}
                onDragOver={(e) => { e.preventDefault(); }}
                onDrop={(e) => { e.preventDefault(); setShowAuthModal(true); }}
                style={{
                  border: '1px dashed rgba(255, 255, 255, 0.08)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '24px 16px',
                  textAlign: 'center',
                  backgroundColor: 'rgba(3, 3, 3, 0.2)',
                  marginBottom: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <Upload size={24} style={{ color: 'var(--text-muted)' }} />
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>Drag files here to upload</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Files up to 25MB on the free tier</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  padding: '10px',
                  backgroundColor: 'rgba(255,255,255,0.01)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span style={{ fontWeight: 600 }}>presentation_deck.pdf</span>
                    <span style={{ color: 'var(--text-muted)' }}>7.4 MB/s • 2s left</span>
                  </div>
                  <div className="progress-container" style={{ height: '3px' }}>
                    <div className="progress-fill" style={{ width: '74%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: 'auto', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={12} className="sb-green-text" /> Up to 5 GB free
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={12} className="sb-green-text" /> Cryptographic keys
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={12} className="sb-green-text" /> Speed-unlimited
              </span>
            </div>
          </div>

          {/* Card 2: Standard - Owner Privacy */}
          <div className="bento-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', borderRadius: '6px', backgroundColor: '#121214', border: '1px solid rgba(255,255,255,0.03)', color: '#3ecf8e' }}>
                <Shield size={18} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>Granular Link Security</h3>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              File access, retention periods, and transfer logs belong strictly to you, isolated by profile authorization by default.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>File Privacy:</span>
                <span style={{ fontSize: '0.65rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#3ecf8e', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(16,185,129,0.2)', fontWeight: 600 }}>🔒 Owner-Only</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Public Link Status:</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Inactive by Default</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Key Access Control:</span>
                <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: '#3ecf8e', fontWeight: 600 }}>Active (AES-256)</span>
              </div>
            </div>
          </div>

          {/* Card 3: Standard - Instant Sharing */}
          <div className="bento-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', borderRadius: '6px', backgroundColor: '#121214', border: '1px solid rgba(255,255,255,0.03)', color: '#8b5cf6' }}>
                <Link2 size={18} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>Instant Sharing</h3>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              Generate links in a single tap. Clipboard-ready pre-signed sharing paths are created instantly on upload completion.
            </p>

            <div className="visual-upload-mock" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'auto' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Shareable path generated:</span>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <input readOnly value="https://walkfiles.com/file/a8df9..." style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '4px 8px', fontSize: '0.65rem', color: '#e4e4e7' }} />
                <button style={{ fontSize: '0.65rem', padding: '4px 8px', backgroundColor: '#3ecf8e', border: 'none', borderRadius: '4px', color: '#0c0c0d', fontWeight: 600, cursor: 'pointer' }}>Copy</button>
              </div>
            </div>
          </div>

          {/* Card 4: Standard - Media Previews */}
          <div className="bento-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', borderRadius: '6px', backgroundColor: '#121214', border: '1px solid rgba(255,255,255,0.03)', color: '#ec4899' }}>
                <Layers size={18} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>Media Previews</h3>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              Stream video, play audio, and view high-resolution image galleries natively in the browser without forced downloads.
            </p>

            <div style={{ display: 'flex', gap: '6px', marginTop: 'auto' }}>
              <div style={{ width: '100%', height: '40px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                🎥 Video Player
              </div>
              <div style={{ width: '100%', height: '40px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                🖼️ Gallery
              </div>
            </div>
          </div>

          <div className="bento-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', borderRadius: '6px', backgroundColor: '#121214', border: '1px solid rgba(255,255,255,0.03)', color: '#f59e0b' }}>
                <Clock size={18} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>Permanent Retention</h3>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              Files are kept online forever on all plans. We do not automatically expire or delete your inactive uploads.
            </p>

            <div className="visual-upload-mock" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
              <span>File status:</span>
              <span className="sb-green-text" style={{ fontWeight: 600 }}>Permanent Storage</span>
            </div>
          </div>

          {/* Card 6: Standard - Zero Limits */}
          <div className="bento-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', borderRadius: '6px', backgroundColor: '#121214', border: '1px solid rgba(255,255,255,0.03)', color: '#e4e4e7' }}>
                <Infinity size={18} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>Unlimited Uploads</h3>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              No arbitrary caps on document count. Upload and manage as many separate files as your storage tier allows.
            </p>

            <div className="visual-upload-mock" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
              <span>Total files owned:</span>
              <span className="sb-green-text" style={{ fontWeight: 600 }}>∞ Unlimited</span>
            </div>
          </div>

          {/* Card 7: Double Wide (Bento) - REST Developer API */}
          <div className="bento-card bento-card-large">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', borderRadius: '6px', backgroundColor: '#121214', border: '1px solid rgba(255,255,255,0.03)', color: '#14b8a6' }}>
                <HardDrive size={18} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>Developer API Integration</h3>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              Automate your workflows. Upload and query files programmatically using standard cURL requests or custom scripting interfaces.
            </p>

            <div className="terminal-code" style={{ marginTop: 'auto' }}>
              <span className="sb-purple-text">curl</span> -X POST https://walkfiles.com/api/upload \<br />
              &nbsp;&nbsp;-H <span className="sb-green-text">"Authorization: Bearer wk_key_2aef7..."</span> \<br />
              &nbsp;&nbsp;-F <span className="sb-blue-text">"file=@my_database.backup"</span>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Pricing section */}
      <section style={{ padding: '80px 24px', backgroundColor: 'rgba(255, 255, 255, 0.01)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <h2 style={{
              fontSize: '2.1rem',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '16px'
            }}>
              Pricing plans designed to scale
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.4
            }}>
              Start storing files for free, share links instantly, and upgrade your storage tier as you grow
            </p>
          </div>

          <div className="pricing-grid">
            {STATIC_PLANS.map((plan) => {
              const isPro = plan.popular;
              const isElite = plan.elite;

              return (
                <div
                  key={plan.id}
                  className="bento-card"
                  style={{
                    position: 'relative',
                    gridColumn: 'auto',
                    overflow: 'visible',
                    border: isPro
                      ? '1px solid #3ecf8e'
                      : '1px solid var(--border-color)',
                    boxShadow: isPro ? '0 0 20px rgba(62, 207, 142, 0.1)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '24px',
                    gap: '20px',
                    height: '100%',
                    backgroundColor: 'rgba(23, 23, 25, 0.65)',
                    backdropFilter: 'blur(8px)',
                    textAlign: 'left'
                  }}
                >
                  {/* Badges */}
                  {isPro && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '16px',
                      backgroundColor: '#171719',
                      border: '1px solid #3ecf8e',
                      color: '#3ecf8e',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      letterSpacing: '0.05em',
                      zIndex: 10
                    }}>
                      Most Popular
                    </div>
                  )}

                  {isElite && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '16px',
                      backgroundColor: '#171719',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      color: '#a78bfa',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      letterSpacing: '0.05em',
                      zIndex: 10
                    }}>
                      Best Value
                    </div>
                  )}

                  {/* Plan Header Details */}
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: '0 0 4px 0' }}>{plan.name}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: 0, minHeight: '36px', lineHeight: 1.4 }}>
                      {plan.desc}
                    </p>
                  </div>

                  {/* Action CTA Button */}
                  <Link
                    href={`/register?plan=${plan.id}`}
                    className={isPro ? "sb-pricing-btn-pro" : "sb-pricing-btn-standard"}
                    style={{
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    {plan.price === 0 ? 'Start for Free' : 'Get Started'}
                  </Link>

                  {/* Price Display */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>From</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '2px' }}>
                      <span style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>
                        ${plan.price}
                      </span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>/ month</span>
                    </div>
                  </div>

                  {/* Plan limits block */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#e4e4e7', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Storage:</span>
                      <span style={{ fontWeight: 600 }}>{plan.storage}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Max File Size:</span>
                      <span style={{ fontWeight: 600 }}>{plan.maxFileSize}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Daily Uploads:</span>
                      <span style={{ fontWeight: 600 }}>{plan.uploads}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', margin: 0, padding: 0 }}>
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          fontSize: '0.75rem',
                          color: feature.header ? 'var(--text-primary)' : 'var(--text-secondary)',
                          fontWeight: feature.header ? 600 : 400,
                          marginTop: feature.header && idx > 0 ? '12px' : '0'
                        }}
                      >
                        {feature.header ? (
                          <div style={{ width: '14px', flexShrink: 0 }} />
                        ) : (
                          <Check size={14} style={{ color: '#3ecf8e', flexShrink: 0, marginTop: '2px' }} />
                        )}
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Accordions */}
      <section style={{ padding: '80px 24px', maxWidth: '720px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '12px' }}>Frequently Asked Questions</h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px', fontSize: '0.9rem' }}>Everything you need to know about files retention and safety.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="card"
                style={{
                  padding: '18px 24px',
                  cursor: 'pointer',
                  borderColor: isOpen ? 'rgba(255,255,255,0.15)' : undefined
                }}
                onClick={() => setActiveFaq(isOpen ? null : index)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <HelpCircle size={16} style={{ color: 'var(--text-muted)' }} />
                    {faq.q}
                  </h3>
                  {isOpen ? <ChevronUp size={16} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />}
                </div>
                {isOpen && (
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    paddingLeft: '24px',
                    marginTop: '12px',
                    lineHeight: 1.6,
                    borderTop: '1px solid rgba(255,255,255,0.03)',
                    paddingTop: '12px',
                    animation: 'fadeIn 0.2s ease-out'
                  }}>
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Auth Redirect Modal for Mock Uploader */}
      {showAuthModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px'
        }} onClick={() => setShowAuthModal(false)}>
          <div
            className="card animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '440px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '20px',
              padding: '32px 24px',
              borderColor: 'rgba(255, 255, 255, 0.08)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              padding: '12px',
              borderRadius: '50%',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              color: 'var(--accent-color)',
              display: 'inline-flex'
            }}>
              <Shield size={24} />
            </div>

            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                Create a Free Account
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                To upload files and manage your shared links, please sign up or log in. It takes less than 30 seconds and includes 5 GB of free storage.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginTop: '8px' }}>
              <Link href="/register" className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none' }}>
                <span>Sign Up Free</span>
                <ArrowRight size={14} />
              </Link>
              <Link href="/login" className="btn btn-secondary" style={{ width: '100%', textDecoration: 'none' }}>
                Log In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
