// app/download/[id]/DownloadDetails.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Download, 
  Copy, 
  AlertTriangle, 
  QrCode, 
  CheckCircle, 
  Loader2, 
  Repeat, 
  Gauge, 
  Maximize, 
  Minimize,
  Upload,
  ArrowRight,
  X
} from 'lucide-react';

interface FileDetails {
  id: string;
  original_name: string;
  size: number;
  created_at: string;
  mime_type: string;
}

export default function DownloadDetails({ file, downloadUrl }: { file: FileDetails; downloadUrl: string }) {
  const [copied, setCopied] = useState(false);
  const [showAbuseModal, setShowAbuseModal] = useState(false);
  const [abuseReason, setAbuseReason] = useState('');
  const [reporting, setReporting] = useState(false);
  const [reported, setReported] = useState(false);
  const [showQr, setShowQr] = useState(false);

  // Custom Video Player States
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const fileUrl = typeof window !== 'undefined' ? `${window.location.origin}/download/${file.id}` : '';

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReportAbuse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!abuseReason.trim()) return;

    setReporting(true);
    try {
      const res = await fetch('/api/abuse-reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileId: file.id, reason: abuseReason }),
      });

      if (res.ok) {
        setReported(true);
        setAbuseReason('');
        setTimeout(() => {
          setReported(false);
          setShowAbuseModal(false);
        }, 3000);
      } else {
        alert('Failed to submit report. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting report.');
    } finally {
      setReporting(false);
    }
  };

  const renderPreview = () => {
    if (!file.mime_type) return null;

    const isImage = file.mime_type.startsWith('image/');
    const isVideo = file.mime_type.startsWith('video/');
    const isAudio = file.mime_type.startsWith('audio/');

    if (!isImage && !isVideo && !isAudio) return null;

    return (
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        overflow: 'hidden',
      }}>
        {isImage && (
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'var(--bg-app)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            padding: '16px',
          }}>
            <img
              src={downloadUrl}
              alt={file.original_name}
              style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: 'var(--radius-sm)' }}
            />
          </div>
        )}

        {isVideo && (
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '12px' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              backgroundColor: '#000000',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-color)'
            }}>
              {/* Filename Floating Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                padding: '12px 16px',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 500,
                zIndex: 10,
                pointerEvents: 'none',
                opacity: 0.9,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {file.original_name}
              </div>

              <video
                ref={videoRef}
                src={downloadUrl}
                controls
                loop={isLooping}
                style={{ width: '100%', maxHeight: '550px', display: 'block' }}
              />
            </div>

            {/* Video Controls Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              padding: '8px 12px',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.85rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {/* Loop Option Button */}
                <button
                  type="button"
                  onClick={() => setIsLooping(!isLooping)}
                  className={`btn ${isLooping ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '6px 12px', fontSize: '0.75rem', gap: '6px', minHeight: '32px' }}
                >
                  <Repeat size={12} />
                  <span>{isLooping ? 'Looping' : 'Loop'}</span>
                </button>

                {/* Speed Dropdown */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-app)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  height: '32px'
                }}>
                  <Gauge size={12} style={{ color: 'var(--text-muted)' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>Speed:</span>
                  <select
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                    className="custom-select"
                    style={{ paddingRight: '12px' }}
                  >
                    <option value="0.5" style={{ backgroundColor: 'var(--bg-card)' }}>0.5x</option>
                    <option value="1" style={{ backgroundColor: 'var(--bg-card)' }}>1.0x</option>
                    <option value="1.25" style={{ backgroundColor: 'var(--bg-card)' }}>1.25x</option>
                    <option value="1.5" style={{ backgroundColor: 'var(--bg-card)' }}>1.5x</option>
                    <option value="2" style={{ backgroundColor: 'var(--bg-card)' }}>2.0x</option>
                  </select>
                  <span style={{ pointerEvents: 'none', marginLeft: '-10px', display: 'flex', alignItems: 'center' }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </span>
                </div>
              </div>

              {/* Theater Mode Toggle */}
              <button
                type="button"
                onClick={() => setIsTheaterMode(!isTheaterMode)}
                className="btn btn-secondary desktop-only"
                style={{ padding: '6px 12px', fontSize: '0.75rem', gap: '6px', minHeight: '32px' }}
              >
                {isTheaterMode ? <Minimize size={12} /> : <Maximize size={12} />}
                <span>{isTheaterMode ? 'Shrink' : 'Theater'}</span>
              </button>
            </div>
          </div>
        )}

        {isAudio && (
          <div style={{
            width: '100%',
            backgroundColor: 'var(--bg-app)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            padding: '16px',
          }}>
            <audio
              src={downloadUrl}
              controls
              style={{ width: '100%' }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center', width: '100%' }}>
      <div className="card" style={{ width: '100%', maxWidth: isTheaterMode ? '1000px' : '600px', display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', transition: 'max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
        
        {/* Header */}
        <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, wordBreak: 'break-all', marginBottom: '8px' }}>
            {file.original_name}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Uploaded on {new Date(file.created_at).toLocaleDateString()} • {formatSize(file.size)}
          </p>
        </div>

        {/* Media Preview Container */}
        {renderPreview()}

        {/* Action Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a
            href={`/api/files/download/${file.id}`}
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '1rem', gap: '10px' }}
          >
            <Download size={20} />
            Download File
          </a>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button onClick={handleCopy} className="btn btn-secondary" style={{ gap: '8px' }}>
              <Copy size={16} />
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button onClick={() => setShowQr(!showQr)} className="btn btn-secondary" style={{ gap: '8px' }}>
              <QrCode size={16} />
              {showQr ? 'Hide QR' : 'Show QR'}
            </button>
          </div>
        </div>

        {/* QR Code Container */}
        {showQr && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '20px', 
            backgroundColor: 'var(--bg-app)', 
            borderRadius: 'var(--radius-md)', 
            border: '1px solid var(--border-color)' 
          }} className="animate-fade-in">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(fileUrl)}`}
              alt="Download Page QR Code"
              style={{ borderRadius: 'var(--radius-sm)', backgroundColor: '#ffffff', padding: '8px' }}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Scan QR code to download on mobile</span>
          </div>
        )}

        {/* Footer actions */}
        <div style={{ display: 'flex', justifyContent: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
          <button
            onClick={() => setShowAbuseModal(true)}
            style={{ background: 'none', border: 'none', color: 'var(--error-color)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', cursor: 'pointer', opacity: 0.8 }}
          >
            <AlertTriangle size={14} />
            Report Abuse
          </button>
        </div>
      </div>

      {/* High-converting SaaS Conversion Card */}
      <div 
        className="card animate-fade-in" 
        style={{ 
          width: '100%',
          maxWidth: '600px',
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '16px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(139, 92, 246, 0.03) 100%)',
          border: '1px dashed rgba(96, 165, 250, 0.25)',
          padding: '28px 24px'
        }}
      >
        <div style={{
          padding: '10px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'rgba(96, 165, 250, 0.08)',
          color: '#60a5fa',
          border: '1px solid rgba(96, 165, 250, 0.15)',
          display: 'inline-flex'
        }}>
          <Upload size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            Want to share your own files?
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', maxWidth: '400px', margin: '0 auto', lineHeight: 1.5 }}>
            Upload folders, documents, images, and videos up to 1 GB completely free. Fast direct R2 transit.
          </p>
        </div>
        <Link 
          href="/register" 
          className="btn btn-primary" 
          style={{ padding: '8px 20px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
        >
          <span>Start Uploading Free</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Abuse Report Modal */}
      {showAbuseModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px'
        }} onClick={() => setShowAbuseModal(false)}>
          <div 
            className="card animate-fade-in" 
            style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '20px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Report File Abuse</h2>
              <button 
                onClick={() => setShowAbuseModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {reported ? (
              <div style={{ textAlign: 'center', padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={48} style={{ color: 'var(--success-color)' }} />
                <p style={{ fontWeight: 600 }}>Thank you for your report</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Our team will review this file immediately.</p>
              </div>
            ) : (
              <form onSubmit={handleReportAbuse} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Reason for report</label>
                  <textarea
                    className="form-input"
                    rows={4}
                    style={{ resize: 'none', height: '100px' }}
                    placeholder="Please specify why this file violates our Terms of Service (e.g. copyright infringement, malware, illegal content)..."
                    value={abuseReason}
                    onChange={(e) => setAbuseReason(e.target.value)}
                    required
                    disabled={reporting}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAbuseModal(false)}
                    disabled={reporting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger"
                    disabled={reporting}
                  >
                    {reporting ? <Loader2 className="animate-spin" size={16} /> : 'Submit Report'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
