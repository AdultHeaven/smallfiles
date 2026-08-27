// components/LandingContent.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { 
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
  Link2
} from 'lucide-react';

export default function LandingContent() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const faqs = [
    {
      q: 'What is the storage space limit on the Free plan?',
      a: 'The Free plan includes 50 GB of secure cloud storage. This is completely free and automatically activated upon registration.',
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
      a: 'Absolutely. Every file upload is linked to your secure user account. Our database enforces Row-Level Security (RLS), meaning only you can manage your files, and public sharing links are only generated if you explicitly request them.',
    },
    {
      q: 'How does WalkFiles manage direct cloud uploads?',
      a: 'WalkFiles uses direct browser uploads. We generate a secure pre-signed URL on the server, allowing your browser to transfer files straight to encrypted cloud object storage. This ensures maximum upload speeds and minimal transit lag.',
    },
  ];

  const features = [
    {
      icon: <Zap size={20} />,
      title: 'Direct Browser Uploads',
      desc: 'Bypass slow server proxies. Your browser uploads directly to secure object storage using military-grade HTTPS presigned authentication.',
      color: 'var(--accent-color)'
    },
    {
      icon: <Shield size={20} />,
      title: 'Security & Row-Level Privacy',
      desc: 'Powered by Supabase RLS. No anonymous access. Every file is strictly authorized and securely mapped to its owner.',
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
        padding: '120px 24px 80px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }} className="animate-fade-in">
        
        {/* Floating canopy lights info pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '9999px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(8px)',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          fontWeight: 600,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)'
        }}>
          <Sparkles size={14} style={{ color: '#60a5fa' }} />
          <span>WalkFiles Early Access Launch v2.0</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.04em',
          background: 'linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: 'var(--font-display)'
        }}>
          Cloud sharing built for speed & trust.
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          lineHeight: 1.6,
          fontWeight: 400
        }}>
          Direct browser uploads, native media previews, and smart retention. Save and share files securely up to 50 GB.
        </p>

        <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/register" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Start Uploading Free</span>
            <ArrowRight size={16} />
          </Link>
          <Link href="/pricing" className="btn btn-secondary" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
            View Plans
          </Link>
        </div>
      </section>

      {/* Interactive Mock Uploader Showcase */}
      <section style={{ padding: '0 24px 80px 24px', display: 'flex', justifyContent: 'center' }}>
        <div className="card" style={{
          width: '100%',
          maxWidth: '680px',
          padding: '24px',
          backgroundColor: 'rgba(15, 15, 17, 0.45)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0px 30px 60px rgba(0, 0, 0, 0.6)'
        }}>
          {/* Mock Dropzone area - Intercepts upload action to prompt registration */}
          <div 
            onClick={() => setShowAuthModal(true)}
            onDragOver={(e) => { e.preventDefault(); }}
            onDrop={(e) => { e.preventDefault(); setShowAuthModal(true); }}
            style={{
              border: '1px dashed rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-md)',
              padding: '40px 20px',
              textAlign: 'center',
              backgroundColor: 'rgba(3, 3, 3, 0.4)',
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'border-color 0.2s ease, background-color 0.2s ease'
            }}
            className="mock-dropzone"
          >
            <Upload size={32} style={{ color: 'var(--text-muted)' }} />
            <div>
              <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Drag files here to upload</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Files up to 25MB on the free tier</p>
            </div>
          </div>

          {/* Mock files in upload */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              padding: '12px',
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ fontWeight: 600 }}>presentation_deck.pdf</span>
                <span style={{ color: 'var(--text-muted)' }}>7.4 MB/s • 2s left</span>
              </div>
              <div className="progress-container" style={{ height: '4px' }}>
                <div className="progress-fill" style={{ width: '74%' }}></div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 600, color: 'var(--success-color)' }}>family_photo.jpeg</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1.2 MB</span>
              </div>
              <span style={{ color: 'var(--success-color)', fontWeight: 600 }}>Complete</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="features-grid" style={{ borderTop: '1px solid var(--border-color)' }}>
        {features.map((feat, i) => (
          <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-app)',
              color: feat.color,
              alignSelf: 'flex-start',
              border: '1px solid rgba(255, 255, 255, 0.03)'
            }}>
              {feat.icon}
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{feat.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* Simple Pricing section */}
      <section style={{ padding: '80px 24px', backgroundColor: 'rgba(255, 255, 255, 0.01)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>Pricing designed to scale</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '0.95rem' }}>Start with 50 GB storage free, then upgrade to premium features when you need more room.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '800px', margin: '0 auto', textAlign: 'left', alignItems: 'start' }}>
            {/* Free Card */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Free</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Perfect for basic personal sharing.</p>
              </div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800 }}>
                $0<span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}> / lifetime</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--success-color)' }} />
                  <span>50 GB Storage space</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--success-color)' }} />
                  <span>150 MB Maximum file size</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--success-color)' }} />
                  <span>50 uploads per day</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--success-color)' }} />
                  <span>Permanent file storage</span>
                </li>
              </ul>
              <Link href="/register" className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>
                Get Started Free
              </Link>
            </div>

            {/* Pro Card */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid var(--accent-color)', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                right: '20px',
                backgroundColor: 'var(--accent-color)',
                color: '#ffffff',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '9999px'
              }}>
                POPULAR
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Pro (Coming Soon)</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>For users needing high-speed storage.</p>
              </div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800 }}>
                $4.99<span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}> / month</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--success-color)' }} />
                  <span>25 GB Storage space</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--success-color)' }} />
                  <span>2 GB Maximum file size</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--success-color)' }} />
                  <span>50 daily uploads</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--success-color)' }} />
                  <span>No automated file deletion</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--success-color)' }} />
                  <span>Ad-Free experience</span>
                </li>
              </ul>
              <button disabled className="btn btn-primary" style={{ width: '100%', marginTop: 'auto' }}>
                Coming Soon
              </button>
            </div>
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
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-color)',
        padding: '50px 24px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div>
            <span className="logo">WalkFiles</span>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>
              Premium file sharing made simple.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '24px', fontSize: '0.85rem' }}>
            <Link href="/privacy" style={{ color: 'var(--text-secondary)' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: 'var(--text-secondary)' }}>Terms of Service</Link>
            <Link href="/dmca" style={{ color: 'var(--text-secondary)' }}>DMCA Policy</Link>
            <Link href="/contact" style={{ color: 'var(--text-secondary)' }}>Contact Us</Link>
          </div>
        </div>
      </footer>

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
                To upload files and manage your shared links, please sign up or log in. It takes less than 30 seconds and includes 50 GB of free storage.
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
