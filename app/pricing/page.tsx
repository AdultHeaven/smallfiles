// app/pricing/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Loader2, Sparkles, AlertCircle, Database, Server, Zap, Cpu } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface PlanDetails {
  id: string;
  name: string;
  slug: string;
  price: number;
  storage: string;
  storageLimit: number;
  maxFileSize: string;
  maxFileLimit: number;
  uploads: string;
  desc: string;
  features: { text: string; header?: boolean }[];
  cta: string;
  popular?: boolean;
  elite?: boolean;
}

const STATIC_PLANS: PlanDetails[] = [
  {
    id: 'free',
    name: 'Free',
    slug: 'free',
    price: 0,
    storage: '50 GB',
    storageLimit: 53687091200,
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
    cta: 'Upgrade now'
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
    desc: '50 daily uploads, huge cloud storage capacity, and premium speed tiers.',
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

export default function PricingPage() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updatingPlanId, setUpdatingPlanId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [sliderValue, setSliderValue] = useState(100);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCalcTab, setActiveCalcTab] = useState<'free' | 'starter' | 'pro' | 'elite'>('pro');

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch auth user
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        setUser(currentUser);

        if (currentUser) {
          // Fetch profile details
          const profileRes = await fetch('/api/profile');
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            setProfile(profileData);
          }
        }
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handlePlanChange = async (targetPlanId: string) => {
    if (!user) {
      window.location.href = `/register?redirect=/pricing`;
      return;
    }

    setUpdatingPlanId(targetPlanId);
    setMessage(null);

    try {
      // If switching to a paid plan, initiate Polar Checkout
      if (targetPlanId !== 'free') {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planId: targetPlanId })
        });

        const data = await res.json();

        if (res.ok && data.url) {
          // Redirect the user to the Polar checkout page
          window.location.href = data.url;
          return;
        } else {
          setMessage({
            type: 'error',
            text: data.error || 'Failed to initiate checkout. Please try again.'
          });
        }
      } else {
        // If switching to free, use the profile API directly for now
        const res = await fetch('/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planId: targetPlanId })
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setMessage({ type: 'success', text: data.message });
          setProfile(data.profile);
        } else {
          setMessage({
            type: 'error',
            text: data.error || 'Failed to update plan. Please try again.'
          });
        }
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'A network error occurred. Please try again.' });
    } finally {
      setUpdatingPlanId(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      <title>Pricing Plans - WalkFiles</title>
      <meta name="description" content="Choose the perfect hosting plan for WalkFiles. Expand your limits and unlock high-speed sharing instantly." />
      <Navbar />

      <main style={{ flexGrow: 1, padding: '80px 24px 100px 24px', maxWidth: '1180px', margin: '0 auto', width: '100%' }}>
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }} className="animate-fade-in">
          <h1 style={{
            fontSize: '2.1rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            marginBottom: '12px'
          }}>
            Predictable pricing, designed to scale
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.4
          }}>
            Start storing files for free, share links instantly, and upgrade your storage tier as you grow
          </p>
        </div>

        {/* Global Toast Message */}
        {message && (
          <div style={{
            maxWidth: '600px',
            margin: '0 auto 40px auto',
            padding: '12px 18px',
            borderRadius: '6px',
            backgroundColor: message.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: message.type === 'success' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
            color: message.type === 'success' ? '#10b981' : '#f87171',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.85rem'
          }}>
            {message.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
            <span>{message.text}</span>
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {STATIC_PLANS.map((plan) => {
            const isCurrent = profile && profile.plan_id === plan.id;
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

                {/* Action CTA Button - Above Price (Supabase Design) */}
                {isCurrent ? (
                  <div style={{
                    width: '100%',
                    height: '38px',
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#10b981',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <Check size={14} />
                    Current Plan
                  </div>
                ) : (
                  <button
                    onClick={() => handlePlanChange(plan.id)}
                    disabled={updatingPlanId !== null}
                    className={isPro ? "sb-pricing-btn-pro" : "sb-pricing-btn-standard"}
                    style={{
                      opacity: updatingPlanId !== null ? 0.7 : 1,
                      cursor: updatingPlanId !== null ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {updatingPlanId === plan.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      user ? (
                        plan.price === 0 ? 'Downgrade to Free' : `Upgrade to ${plan.name}`
                      ) : (
                        plan.price === 0 ? 'Start for Free' : 'Get Started'
                      )
                    )}
                  </button>
                )}

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

        {/* WalkFiles Performance & Cost Estimator Section */}
        <div style={{ marginTop: '90px', borderTop: '1px solid var(--border-color)', paddingTop: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }} className="animate-fade-in">
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '12px'
            }}>
              Designed for performance and scale
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.4
            }}>
              Granular access security, high-speed upload links, and completely unlimited sharing pipelines
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'start',
            marginTop: '30px'
          }} className="hero-container">
            {/* Left Column: Choose Your Plan & Feature Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  1. Choose your plan
                </span>
                
                {/* Plan Toggle Tabs (Pills) */}
                <div style={{
                  display: 'flex',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '20px',
                  padding: '3px',
                  marginTop: '12px',
                  maxWidth: '320px'
                }}>
                  {(['free', 'starter', 'pro', 'elite'] as const).map((tab) => {
                    const isActive = activeCalcTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveCalcTab(tab);
                          // Sync slider to typical values of that plan!
                          if (tab === 'free') setSliderValue(1);
                          if (tab === 'starter') setSliderValue(25);
                          if (tab === 'pro') setSliderValue(100);
                          if (tab === 'elite') setSliderValue(500);
                        }}
                        style={{
                          flex: 1,
                          border: 'none',
                          background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'none',
                          color: isActive ? '#ffffff' : 'var(--text-secondary)',
                          fontSize: '0.75rem',
                          fontWeight: isActive ? 600 : 500,
                          padding: '6px 12px',
                          borderRadius: '16px',
                          cursor: 'pointer',
                          textTransform: 'capitalize',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Plan Preview Detail Box */}
              {(() => {
                const previewMap = {
                  free: {
                    name: 'Free',
                    price: '$0',
                    desc: 'Perfect for simple sharing and temporary file transfers.',
                    color: '#3b82f6',
                    features: [
                      '50 GB Total Storage limit',
                      '150 MB Maximum File Size',
                      '50 Uploads daily limit',
                      'Public share links',
                      'Basic download speeds'
                    ]
                  },
                  starter: {
                    name: 'Starter',
                    price: '$1.49',
                    desc: 'Great for personal cloud storage and basic sharing settings.',
                    color: '#a855f7',
                    features: [
                      '25 GB Total Storage limit',
                      '2 GB Maximum File Size',
                      '50 Uploads daily limit',
                      'Faster download speeds',
                      'Password-protected sharing'
                    ]
                  },
                  pro: {
                    name: 'Pro',
                    price: '$4.99',
                    desc: 'For creators and power users requiring larger security settings.',
                    color: '#3ecf8e',
                    features: [
                      '100 GB Total Storage limit',
                      '2 GB Maximum File Size',
                      '50 Uploads daily limit',
                      'Highest download speeds',
                      'Advanced analytics dashboard'
                    ]
                  },
                  elite: {
                    name: 'Elite',
                    price: '$19.99',
                    desc: '50 daily uploads, huge capacity, and premium speed tiers.',
                    color: '#a78bfa',
                    features: [
                      '500 GB Total Storage limit',
                      '2 GB Maximum File Size',
                      '50 Uploads daily limit',
                      'Premium network performance',
                      'Highest priority support queue'
                    ]
                  }
                };

                const preview = previewMap[activeCalcTab];

                return (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    animation: 'fadeIn 0.2s ease-in-out'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                          {preview.name}
                        </h3>
                        <span style={{
                          color: preview.color,
                          borderColor: preview.color,
                          border: `1px solid ${preview.color}`,
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '4px',
                          textTransform: 'uppercase'
                        }}>
                          Active limits
                        </span>
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
                        {preview.price} <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-secondary)' }}>/ month</span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '8px', lineHeight: 1.4, margin: '8px 0 0 0' }}>
                        {preview.desc}
                      </p>
                    </div>

                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0, padding: 0 }}>
                      {preview.features.map((feat, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          <Check size={13} style={{ color: preview.color, flexShrink: 0 }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}
            </div>

            {/* Right Column: Calculator Widget */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  2. Configure storage for your files
                </span>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '6px 0 0 0' }}>
                  Adjust total storage to see estimate costs and matching tiers.
                </p>
              </div>

              <div className="bento-card" style={{ padding: '32px', backgroundColor: 'rgba(23, 23, 25, 0.65)', border: '1px solid var(--border-color)', borderRadius: '6px', gridColumn: 'auto', overflow: 'visible', width: '100%' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', margin: '0 0 6px 0' }}>Interactive Storage Estimator</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: '0 0 20px 0', lineHeight: 1.4 }}>
                Adjust the sliding range to estimate your required storage size and discover the recommended subscription plans.
              </p>

              {/* Slider Input */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Storage Limit:</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#3ecf8e' }}>
                    {sliderValue > 500 ? '500+ GB' : `${sliderValue} GB`}
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="520"
                  step="1"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: '#3ecf8e',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>50 GB</span>
                  <span>100 GB</span>
                  <span>250 GB</span>
                  <span>500 GB</span>
                </div>
              </div>

              {/* Bill Details Panel */}
              {(() => {
                const getCalculatorPlan = (val: number) => {
                  if (val <= 50) return { name: 'Free', price: 0, color: '#3b82f6' };
                  if (val <= 100) return { name: 'Pro', price: 4.99, color: '#3ecf8e' };
                  if (val <= 500) return { name: 'Elite', price: 19.99, color: '#a78bfa' };
                  return { name: 'Enterprise', price: null, color: '#f4f4f5' };
                };
                const calcPlan = getCalculatorPlan(sliderValue);

                return (
                  <div style={{
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    borderRadius: '4px',
                    padding: '16px',
                    border: '1px solid rgba(255,255,255,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Recommended Tier:</span>
                      <span style={{
                        color: calcPlan.color,
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        padding: '2px 8px',
                        backgroundColor: 'rgba(255,255,255,0.02)',
                        border: `1px solid ${calcPlan.color}`,
                        borderRadius: '4px'
                      }}>
                        {calcPlan.name}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Monthly Plan Price:</span>
                      <span style={{ fontWeight: 600, color: '#ffffff' }}>
                        {calcPlan.price !== null ? `$${calcPlan.price.toFixed(2)}` : 'Contact for Quote'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Egress Bandwidth:</span>
                      <span style={{ fontWeight: 600, color: '#3ecf8e' }}>$0.00 (Always Free)</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Sharing API Queries:</span>
                      <span style={{ fontWeight: 600, color: '#ffffff' }}>Unlimited</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', fontWeight: 700, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px', marginTop: '2px' }}>
                      <span style={{ color: '#ffffff' }}>Estimated Total:</span>
                      <span style={{ color: '#3ecf8e', fontSize: '1.1rem' }}>
                        {calcPlan.price !== null ? `$${calcPlan.price.toFixed(2)}/mo` : 'Custom Quote'}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

        {/* FAQ Section */}
        <div style={{ marginTop: '90px', borderTop: '1px solid var(--border-color)', paddingTop: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Have questions about our plans? We have answers.
            </p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                q: "Can I upgrade or downgrade my plan at any time?",
                a: "Yes! You can switch plans instantly from your dashboard profile settings. Upgrades take effect immediately. Downgrades are permitted as long as your active storage usage is within the limits of the new plan."
              },
              {
                q: "What happens if I exceed my storage limit?",
                a: "If you reach your plan storage quota, further file uploads will be paused. Existing files will remain fully active and downloadable, so you will never lose access to your data. Simply free up space or upgrade to resume uploads."
              },
              {
                q: "Are there any hidden egress download fees?",
                a: "Never. WalkFiles has unlimited egress bandwidth across all plans (Free and Paid). You and your downloaders can request files as many times as needed without encountering hidden transfer rates."
              },
              {
                q: "How secure are my shared file links?",
                a: "We prioritize security. Shared links are completely private by default and protected by unique cryptographically secure keys. Paid plans can also set password protection and custom link expiration time frames."
              },
              {
                q: "What is the file size upload limit?",
                a: "Free users can upload files up to 150 MB. Starter, Pro, and Elite subscribers enjoy a generous 2 GB file size limit, perfect for sending large media archives, software projects, and high-definition video collections."
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(23, 23, 25, 0.4)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '18px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      fontWeight: 600
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      fontSize: '1.2rem',
                      color: 'var(--text-secondary)'
                    }}>+</span>
                  </button>
                  {isOpen && (
                    <div style={{
                      padding: '0 24px 18px 24px',
                      color: 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      lineHeight: 1.5,
                      borderTop: '1px solid rgba(255,255,255,0.02)',
                      paddingTop: '12px'
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Enterprise CTA Banner */}
        <div style={{
          marginTop: '80px',
          marginBottom: '20px',
          padding: '40px',
          background: 'radial-gradient(circle at top left, rgba(62, 207, 142, 0.08), rgba(0,0,0,0))',
          border: '1px solid rgba(62, 207, 142, 0.25)',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }} className="hero-container">
          <div style={{ flex: '1 1 500px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              Need a custom storage environment?
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              We provide custom dedicated storage volumes, private transfer nodes, SLA metrics, and priority migration support. Contact our sales team to build your layout.
            </p>
          </div>
          <div>
            <a
              href="mailto:enterprise@walkfiles.com?subject=Enterprise Storage Inquiry"
              className="sb-pricing-btn-pro"
              style={{
                display: 'inline-flex',
                padding: '0 28px',
                height: '42px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#3ecf8e',
                color: '#000000',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Contact Sales
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
