// app/pricing/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Check, ShieldAlert } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      desc: 'Perfect for small files and personal sharing.',
      price: 'Free',
      period: 'lifetime',
      features: [
        '1 GB Storage space',
        '25 MB Maximum file size limit',
        '50 uploads per day limit',
        'Public share links only',
        'Standard download speed',
        'Supported by advertisements',
        'Files inactive for 90 days may be automatically removed',
        'Mobile friendly interface',
        'Community support'
      ],
      cta: 'Sign Up Free',
      link: '/register',
      popular: false,
    },
    {
      name: 'Pro (Coming Soon)',
      desc: 'For power users needing robust cloud space.',
      price: '$4.99',
      period: 'month',
      features: [
        '25 GB Storage space',
        '2 GB Maximum file size limit',
        'Unlimited daily uploads',
        'High-speed downloads',
        'No advertisements (No Ads)',
        'Password-protected sharing',
        'Custom expiration dates',
        'Download analytics & history',
        'Files are never automatically deleted while subscription is active',
        'QR code sharing',
        'Priority support'
      ],
      cta: 'Coming Soon',
      link: '#',
      popular: true,
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      <title>Pricing Plans — WalkFiles Cloud Sharing & Storage</title>
      <meta name="description" content="View free lifetime and Pro hosting plan options. Start with 1 GB of free cloud space, or scale up for unlimited uploads, high-speed downloads, and zero ads." />
      <Navbar />

      <main style={{ flexGrow: 1, padding: '80px 24px 100px 24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }} className="animate-fade-in">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px' }}>Simple plans, transparent limits</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
            Choose the best plan for your storage needs. Get started in less than a minute.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'start' }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="card"
              style={{
                position: 'relative',
                border: plan.popular ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                padding: '32px'
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  right: '24px',
                  backgroundColor: 'var(--accent-color)',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: '9999px'
                }}>
                  POPULAR
                </div>
              )}

              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>{plan.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', minHeight: '40px' }}>{plan.desc}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '3rem', fontWeight: 800 }}>{plan.price}</span>
                {plan.price !== 'Free' && (
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>/{plan.period}</span>
                )}
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', margin: '8px 0' }}>
                {plan.features.map((feature) => (
                  <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                    <Check size={16} style={{ color: 'var(--success-color)', flexShrink: 0 }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.link}
                className={`btn ${plan.popular ? 'btn-secondary' : 'btn-primary'}`}
                style={{ width: '100%', marginTop: 'auto', pointerEvents: plan.link === '#' ? 'none' : 'auto', opacity: plan.link === '#' ? 0.6 : 1 }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '24px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        © {new Date().getFullYear()} WalkFiles. Cloud sharing made simple.
      </footer>
    </div>
  );
}
