// app/contact/page.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MessageSquare, LifeBuoy, ShieldAlert, CheckCircle, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    // Simulate API submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      <title>Contact WalkFiles Support Team — Customer Service</title>
      <meta name="description" content="Reach out to WalkFiles for general assistance, enterprise queries, account billing help, or to file abuse and DMCA reports." />
      <Navbar />

      <main className="info-page-main" style={{ maxWidth: '1120px' }}>
        {/* Header Section */}
        <div className="info-page-header animate-fade-in">
          <h1 className="info-page-title">
            We're here to help
          </h1>
          <p className="info-page-subtitle">
            Get in touch with our team for account support, enterprise sales, or technical questions.
          </p>
        </div>

        {/* Content Columns */}
        <div className="contact-grid">
          {/* Left Column: Contact Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Card 1: Technical & General Support */}
            <div className="contact-card">
              <div style={{ padding: '10px', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', color: '#3ecf8e', flexShrink: 0, height: '44px', width: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LifeBuoy size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', margin: '0 0 6px 0' }}>Help Center & FAQs</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.4, margin: '0 0 10px 0' }}>
                  Find instant answers to common questions about storage quotas, direct uploads, and subscription details.
                </p>
                <a href="/pricing" style={{ color: '#3ecf8e', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none' }}>View Help & FAQs →</a>
              </div>
            </div>

            {/* Card 2: Enterprise Inquiries */}
            <div className="contact-card">
              <div style={{ padding: '10px', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', color: '#3ecf8e', flexShrink: 0, height: '44px', width: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageSquare size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', margin: '0 0 6px 0' }}>Enterprise Storage Sales</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.4, margin: '0 0 10px 0' }}>
                  Looking for custom storage quotas, dedicated pipelines, or priority business support plans?
                </p>
                <a href="mailto:sales@walkfiles.com" style={{ color: '#3ecf8e', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none' }}>Email Enterprise Sales →</a>
              </div>
            </div>

            {/* Card 3: Abuse & DMCA */}
            <div className="contact-card">
              <div style={{ padding: '10px', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', color: '#a78bfa', flexShrink: 0, height: '44px', width: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldAlert size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', margin: '0 0 6px 0' }}>Abuse & DMCA Takedown</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.4, margin: '0 0 10px 0' }}>
                  Need to submit an infringement report or alert us to unauthorized content shares?
                </p>
                <a href="/dmca" style={{ color: '#a78bfa', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none' }}>File Takedown Report →</a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-card">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }} className="animate-fade-in">
                <div style={{ color: '#3ecf8e' }}>
                  <CheckCircle size={48} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>Message sent successfully!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0, maxWidth: '320px' }}>
                  Thank you for reaching out. A support coordinator will follow up at your email address within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="sb-pricing-btn-standard"
                  style={{ width: 'auto', padding: '0 20px', marginTop: '10px' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>Send a Message</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="name" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="email" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="subject" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Subject / Topic</label>
                  <select
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={{
                      backgroundColor: '#171719',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Account & Billing</option>
                    <option value="enterprise">Enterprise Sales</option>
                    <option value="dmca">DMCA / Abuse Report</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="message" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Message Details</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '100px'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="sb-pricing-btn-pro"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    height: '42px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginTop: '6px'
                  }}
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      <Mail size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
