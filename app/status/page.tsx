// app/status/page.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Activity, ShieldCheck, CheckCircle, Database, Server, Cpu, Cloud } from 'lucide-react';

export default function StatusPage() {
  const [activeTab, setActiveTab] = useState<'uptime' | 'incidents'>('uptime');

  // Mock components data
  const components = [
    { name: 'Web Application (Frontend)', status: 'Operational', uptime: '99.98%', icon: Server },
    { name: 'Direct-to-Cloud Upload Pipeline', status: 'Operational', uptime: '100.00%', icon: Cloud },
    { name: 'Database Infrastructure Services', status: 'Operational', uptime: '99.99%', icon: Database },
    { name: 'File Sharing Link Engine', status: 'Operational', uptime: '100.00%', icon: Cpu },
  ];

  // Helper to generate 30 days of mock uptime bars
  // Mostly green (operational), maybe a yellow bar (partial outage) in the past
  const renderUptimeBars = (compIndex: number) => {
    const bars = [];
    for (let i = 0; i < 30; i++) {
      let color = '#3ecf8e'; // Green
      let title = `Day -${30 - i}: Operational`;

      // Inject one warning bar in Web App for realism
      if (compIndex === 0 && i === 12) {
        color = '#f59e0b'; // Yellow
        title = `Day -${30 - i}: Minor Latency Spikes (Resolved)`;
      }

      bars.push(
        <div
          key={i}
          title={title}
          style={{
            flex: '1',
            height: '24px',
            backgroundColor: color,
            borderRadius: '2px',
            margin: '0 2px',
            opacity: 0.85,
            cursor: 'pointer',
            transition: 'opacity 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
        />
      );
    }
    return bars;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      <title>WalkFiles Service Status — Systems Performance</title>
      <meta name="description" content="Check real-time performance, uptime tracking, and service status of WalkFiles storage infrastructure." />
      <Navbar />

      <main style={{ flexGrow: 1, padding: '80px 24px 100px 24px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        {/* Systems Header Status Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 32px',
          backgroundColor: 'rgba(62, 207, 142, 0.06)',
          border: '1px solid rgba(62, 207, 142, 0.25)',
          borderRadius: '8px',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '16px'
        }} className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ position: 'relative', display: 'flex', height: '12px', width: '12px', flexShrink: 0 }}>
              <span className="pulse-ping"></span>
              <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: '12px', width: '12px', backgroundColor: '#3ecf8e' }}></span>
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>All Systems Operational</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', margin: '4px 0 0 0' }}>
                WalkFiles systems are performing normally. No active outages reported.
              </p>
            </div>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#3ecf8e', fontWeight: 700, padding: '4px 10px', backgroundColor: 'rgba(62,207,142,0.1)', border: '1px solid rgba(62,207,142,0.2)', borderRadius: '4px' }}>
            100% Uptime
          </span>
        </div>

        {/* Tab Toggle */}
        <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-color)', marginBottom: '32px', paddingBottom: '12px' }}>
          <button
            onClick={() => setActiveTab('uptime')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'uptime' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              padding: '4px 8px',
              position: 'relative'
            }}
          >
            Components & Performance
            {activeTab === 'uptime' && (
              <span style={{ position: 'absolute', bottom: '-13px', left: 0, right: 0, height: '2px', backgroundColor: '#3ecf8e' }}></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('incidents')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'incidents' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              padding: '4px 8px',
              position: 'relative'
            }}
          >
            Incident History
            {activeTab === 'incidents' && (
              <span style={{ position: 'absolute', bottom: '-13px', left: 0, right: 0, height: '2px', backgroundColor: '#3ecf8e' }}></span>
            )}
          </button>
        </div>

        {activeTab === 'uptime' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} className="animate-fade-in">
            {/* Component Listings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {components.map((comp, compIdx) => {
                const CompIcon = comp.icon;
                return (
                  <div
                    key={compIdx}
                    className="card"
                    style={{
                      padding: '24px',
                      backgroundColor: 'rgba(23, 23, 25, 0.4)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ color: '#3ecf8e' }}>
                          <CompIcon size={18} />
                        </div>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' }}>{comp.name}</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#3ecf8e', fontWeight: 600, backgroundColor: 'rgba(62,207,142,0.05)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(62,207,142,0.1)' }}>
                        {comp.status}
                      </span>
                    </div>

                    {/* Uptime bars timeline */}
                    <div>
                      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        {renderUptimeBars(compIdx)}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                        <span>30 days ago</span>
                        <span>{comp.uptime} uptime</span>
                        <span>Today</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Performance Metric Graph */}
            <div className="card" style={{ padding: '28px', backgroundColor: 'rgba(23, 23, 25, 0.65)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>System Response Time</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: '2px 0 0 0' }}>Average server latency over the past 24 hours</p>
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#3ecf8e' }}>124 ms</span>
              </div>

              {/* Mock Latency SVG Chart */}
              <div style={{ width: '100%', height: '120px', position: 'relative', marginTop: '10px' }}>
                <svg viewBox="0 0 500 100" width="100%" height="100%" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  
                  {/* Graph Line */}
                  <path
                    d="M0 65 Q 40 45, 80 50 T 160 55 T 240 40 T 320 62 T 400 48 T 480 52 L 500 50"
                    fill="none"
                    stroke="#3ecf8e"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Gradient Fill Under Line */}
                  <path
                    d="M0 65 Q 40 45, 80 50 T 160 55 T 240 40 T 320 62 T 400 48 T 480 52 L 500 50 L 500 100 L 0 100 Z"
                    fill="url(#latency-grad)"
                    opacity="0.12"
                  />

                  <defs>
                    <linearGradient id="latency-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3ecf8e" />
                      <stop offset="100%" stopColor="#3ecf8e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>24 hours ago</span>
                  <span>12 hours ago</span>
                  <span>Now</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
            {/* Incidents Feed */}
            {[
              { date: 'July 5, 2026', desc: 'No incidents reported today.' },
              { date: 'July 4, 2026', desc: 'No incidents reported.' },
              { date: 'July 3, 2026', desc: 'Resolved: Scheduled database index maintenance completed successfully. Outage duration: 0 mins. Latency remained stable.' },
              { date: 'July 2, 2026', desc: 'No incidents reported.' },
            ].map((inc, incIdx) => (
              <div
                key={incIdx}
                style={{
                  borderLeft: '2px solid rgba(255,255,255,0.06)',
                  paddingLeft: '20px',
                  position: 'relative'
                }}
              >
                {/* Dot bullet indicator */}
                <div style={{
                  position: 'absolute',
                  left: '-5px',
                  top: '4px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: inc.desc.includes('Resolved') ? '#f59e0b' : '#3ecf8e',
                  border: '2px solid var(--bg-app)'
                }} />
                
                <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', margin: '0 0 6px 0' }}>{inc.date}</h5>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                  {inc.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Embedded Pulse ping styles */}
      <style jsx global>{`
        .pulse-ping {
          position: absolute;
          display: inline-flex;
          height: 100%;
          width: 100%;
          border-radius: 50%;
          background-color: #3ecf8e;
          opacity: 0.65;
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
