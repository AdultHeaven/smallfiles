'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { loadDownloadAd } from '../../../lib/ads';
import AdBannersBelowUpload from '@/components/AdBannersBelowUpload';

import { 
  Download, 
  Copy, 
  AlertTriangle, 
  QrCode, 
  CheckCircle, 
  Loader2, 
  Eye, 
  Maximize2,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  ArrowRight,
  Upload,
  X
} from 'lucide-react';



interface FileDetails {
  id: string;
  original_name: string;
  size: number;
  created_at: string;
  mime_type: string;
  download_count: number;
  short_code: string | null;
}

export default function DownloadDetails({ file, downloadUrl }: { file: FileDetails; downloadUrl: string }) {
  const [copied, setCopied] = useState(false);
  const [showAbuseModal, setShowAbuseModal] = useState(false);
  const [abuseReason, setAbuseReason] = useState('');
  const [reporting, setReporting] = useState(false);
  const [reported, setReported] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const fileUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/f/${file.short_code || file.id}` 
    : '';

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

  const truncateMiddle = (name: string, maxLen = 22) => {
    if (!name || name.length <= maxLen) return name;
    const extIndex = name.lastIndexOf('.');
    const ext = extIndex !== -1 ? name.substring(extIndex) : '';
    const baseName = extIndex !== -1 ? name.substring(0, extIndex) : name;
    const targetLength = maxLen - ext.length - 3;
    if (targetLength <= 0) return name;
    const startChars = Math.ceil(targetLength / 2);
    const endChars = Math.floor(targetLength / 2);
    return `${baseName.substring(0, startChars)}...${baseName.substring(baseName.length - endChars)}${ext}`;
  };

  const isImage = file.mime_type?.startsWith('image/');
  const isVideo = file.mime_type?.startsWith('video/');
  const isAudio = file.mime_type?.startsWith('audio/');

  const getFileIcon = () => {
    const ext = file.original_name.split('.').pop()?.toLowerCase();
    if (isImage) return <FileImage size={48} style={{ color: 'var(--accent-color)' }} />;
    if (isVideo) return <FileVideo size={48} style={{ color: '#8b5cf6' }} />;
    if (isAudio) return <FileAudio size={48} style={{ color: 'var(--warning-color)' }} />;
    if (['zip', 'rar', 'tar', 'gz', '7z'].includes(ext || '')) {
      return <FileArchive size={48} style={{ color: 'var(--success-color)' }} />;
    }
    return <FileText size={48} style={{ color: 'var(--text-secondary)' }} />;
  };

  return (
    <div className="preview-container" style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', maxWidth: '1080px', margin: '0 auto' }}>

      
      {/* Split Layout: Left Preview, Right Sidebar */}
      <div className="split-layout">
        
        {/* Left Side: Previewer Panel */}
        <div className="preview-pane">
          {isImage && (
            <div className="image-preview-wrapper">
              <button 
                type="button" 
                onClick={() => setIsFullScreen(true)}
                className="btn btn-secondary fs-toggle"
                title="View Fullscreen"
              >
                <Maximize2 size={14} />
              </button>
              <img
                src={downloadUrl}
                alt={file.original_name}
                className="preview-image"
              />
            </div>
          )}

          {isVideo && (
            <div className="video-preview-wrapper" style={{ width: '100%' }}>
              <video
                src={downloadUrl}
                controls
                playsInline
                preload="metadata"
                className="preview-video"
                style={{ width: '100%', maxHeight: '520px', display: 'block', objectFit: 'contain' }}
              />
            </div>
          )}

          {isAudio && (
            <div className="audio-preview-wrapper">
              <div style={{ marginBottom: '16px' }}>{getFileIcon()}</div>
              <audio
                src={downloadUrl}
                controls
                style={{ width: '100%', maxWidth: '400px' }}
              />
            </div>
          )}

          {!isImage && !isVideo && !isAudio && (
            <div className="generic-preview-wrapper">
              {getFileIcon()}
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginTop: '16px', color: 'var(--text-primary)' }}>
                No Preview Available
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Preview is not supported for this file type.
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Meta-Information & Actions */}
        <div className="sidebar-pane">
          
          {/* Desktop details card */}
          <div className="card shadow-premium sidebar-card desktop-only-card">
            {/* File Info */}
            <div>
              <h1 className="file-title">
                {file.original_name}
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span>{formatSize(file.size)}</span>
                <span>•</span>
                <span>{new Date(file.created_at).toLocaleDateString()}</span>
              </p>
            </div>

            {/* Main Action Buttons */}
            <div className="actions-stack">
              <a
                href={`/api/files/download/${file.id}`}
                className="btn btn-primary main-download-btn"
                onClick={loadDownloadAd}
              >
                <Download size={16} />
                <span>Download File</span>
              </a>

              <div className="actions-grid">
                <button onClick={handleCopy} className="btn btn-secondary action-btn-sec">
                  <Copy size={13} />
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
                <button onClick={() => setShowQr(!showQr)} className="btn btn-secondary action-btn-sec">
                  <QrCode size={13} />
                  <span>{showQr ? 'Hide QR' : 'Show QR'}</span>
                </button>
              </div>
            </div>

            {/* QR Code */}
            {showQr && (
              <div className="qr-container animate-fade-in">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(fileUrl)}`}
                  alt="QR Code"
                  className="qr-image"
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Scan to download on mobile</span>
              </div>
            )}

            {/* Report Abuse Link */}
            <div className="sidebar-card-footer">
              <button
                onClick={() => setShowAbuseModal(true)}
                className="report-abuse-btn"
              >
                <AlertTriangle size={13} />
                <span>Report Abuse</span>
              </button>
            </div>
          </div>

          {/* Mobile details card: super compact 2-line layout */}
          <div className="card sidebar-card mobile-only-card">
            {/* Line 1: Truncated Filename & Info on Left, Download Button on Right */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                <h2 className="mobile-file-title" title={file.original_name}>
                  {truncateMiddle(file.original_name, 24)}
                </h2>
                <span className="mobile-file-meta">
                  {formatSize(file.size)} • {new Date(file.created_at).toLocaleDateString()}
                </span>
              </div>
              <a
                href={`/api/files/download/${file.id}`}
                className="btn btn-primary mobile-download-btn"
                onClick={loadDownloadAd}
              >
                <Download size={13} />
                <span>Download</span>
              </a>
            </div>

            {/* Line 2: Small Action Icons Row */}
            <div className="mobile-action-row">
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={handleCopy} className="btn btn-secondary mobile-action-btn">
                  <Copy size={12} />
                  <span>{copied ? 'Copied' : 'Link'}</span>
                </button>
                <button onClick={() => setShowQr(!showQr)} className="btn btn-secondary mobile-action-btn">
                  <QrCode size={12} />
                  <span>QR</span>
                </button>
              </div>
              <button
                onClick={() => setShowAbuseModal(true)}
                className="report-abuse-btn mobile-report-btn"
              >
                <AlertTriangle size={12} />
                <span>Report</span>
              </button>
            </div>

            {/* Mobile QR Display */}
            {showQr && (
              <div className="qr-container animate-fade-in" style={{ padding: '8px', alignSelf: 'center', marginTop: '4px' }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(fileUrl)}`}
                  alt="QR Code"
                  className="qr-image"
                  style={{ width: '80px', height: '80px' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conversion Banner */}
      <div className="card conversion-card animate-fade-in">
        <div className="conversion-info">
          <div className="upload-icon-wrapper">
            <Upload size={16} />
          </div>
          <div className="conversion-text">
            <h3>Want to share your own files?</h3>
            <p>
              Upload folders, documents, images, and videos up to 5 GB completely free. Fast direct cloud transit.
            </p>
          </div>
        </div>
        <Link href="/register" className="btn btn-primary conversion-btn">
          <span>Upload Files Free</span>
          <ArrowRight size={12} />
        </Link>
      </div>

      {/* Ad Banners below upload section */}
      <AdBannersBelowUpload />




      {/* Image Full Screen Modal Overlay */}
      {isFullScreen && isImage && (
        <div className="fs-overlay" onClick={() => setIsFullScreen(false)}>
          <button className="fs-close" onClick={() => setIsFullScreen(false)}>
            <X size={24} />
          </button>
          <img src={downloadUrl} alt={file.original_name} className="fs-image" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* Abuse Modal */}
      {showAbuseModal && (
        <div className="modal-backdrop" onClick={() => setShowAbuseModal(false)}>
          <div 
            className="card animate-fade-in" 
            style={{ width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Report File Abuse</h2>
              <button onClick={() => setShowAbuseModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            {reported ? (
              <div style={{ textAlign: 'center', padding: '16px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={40} style={{ color: 'var(--success-color)' }} />
                <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Thank you for your report</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Our team will review this file immediately.</p>
              </div>
            ) : (
              <form onSubmit={handleReportAbuse} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Reason for report</label>
                  <textarea
                    className="form-input"
                    rows={4}
                    style={{ resize: 'none', height: '90px', fontSize: '0.85rem' }}
                    placeholder="Describe the violation (e.g. copyright, malware, illegal content)..."
                    value={abuseReason}
                    onChange={(e) => setAbuseReason(e.target.value)}
                    required
                    disabled={reporting}
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => setShowAbuseModal(false)} disabled={reporting}>Cancel</button>
                  <button type="submit" className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '0.75rem' }} disabled={reporting}>
                    {reporting ? <Loader2 className="animate-spin" size={14} /> : 'Submit Report'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Styled HTML layout variables */}
      <style dangerouslySetInnerHTML={{ __html: `
        .file-title {
          font-size: 1.25rem;
          font-weight: 800;
          word-break: break-all;
          overflow-wrap: break-word;
          color: var(--text-primary);
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .split-layout {
          display: flex;
          width: 100%;
          gap: 28px;
        }
        .preview-pane {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
          min-height: 400px;
          max-height: 600px;
          position: relative;
          overflow: hidden;
        }
        .sidebar-pane {
          width: 320px;
          flex-shrink: 0;
        }
        .sidebar-card {
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: 100%;
        }
        .sidebar-card-footer {
          margin-top: auto;
          display: flex;
          justify-content: center;
          border-top: 1px solid var(--border-color);
          padding-top: 16px;
        }
        .action-btn-sec {
          gap: 6px;
          font-size: 0.75rem;
          padding: 8px 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .actions-stack {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .actions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .report-abuse-btn {
          background: none;
          border: none;
          color: var(--error-color);
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .report-abuse-btn:hover {
          opacity: 1;
        }
        .image-preview-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 100%;
          max-height: 100%;
        }
        .preview-image {
          max-width: 100%;
          max-height: 520px;
          object-fit: contain;
          border-radius: var(--radius-md);
        }
        .fs-toggle {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 6px !important;
          min-height: unset !important;
          background-color: rgba(15,15,17,0.7) !important;
          backdrop-filter: blur(4px);
          border-color: rgba(255,255,255,0.08) !important;
          z-index: 10;
        }
        .fs-toggle:hover {
          background-color: rgba(255,255,255,0.1) !important;
        }
        .video-preview-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .preview-video {
          width: 100%;
          max-height: 550px;
          display: block;
        }
        .audio-preview-wrapper, .generic-preview-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 100%;
        }
        .main-download-btn {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-color: rgba(16, 185, 129, 0.25);
          color: #ffffff !important;
          font-weight: 700 !important;
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.15);
        }
        .main-download-btn:hover {
          background: linear-gradient(135deg, #3ecf8e 0%, #10b981 100%);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.25);
          transform: translateY(-1px);
        }
        .qr-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 14px;
          background-color: var(--bg-app);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }
        .qr-image {
          border-radius: var(--radius-sm);
          background-color: #ffffff;
          padding: 6px;
        }
        .fs-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(3, 3, 3, 0.95);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          cursor: zoom-out;
        }
        .fs-close {
          position: absolute;
          top: 24px;
          right: 24px;
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        .fs-close:hover {
          opacity: 1;
        }
        .fs-image {
          max-width: 90vw;
          max-height: 90vh;
          object-fit: contain;
          border-radius: var(--radius-sm);
          box-shadow: 0 20px 50px rgba(0,0,0,0.8);
        }
        .conversion-card {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, rgba(139, 92, 246, 0.02) 100%) !important;
          border: 1px dashed rgba(96, 165, 250, 0.2) !important;
          padding: 20px 24px !important;
        }
        .conversion-info {
          display: flex;
          align-items: center;
          gap: 16px;
          text-align: left;
        }
        .upload-icon-wrapper {
          padding: 8px;
          border-radius: var(--radius-md);
          background-color: rgba(96, 165, 250, 0.08);
          color: #60a5fa;
          border: 1px solid rgba(96, 165, 250, 0.15);
          display: flex;
          flex-shrink: 0;
        }
        .conversion-text h3 {
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 2px;
          font-family: var(--font-display);
        }
        .conversion-text p {
          color: var(--text-secondary);
          font-size: 0.75rem;
          line-height: 1.4;
        }
        .conversion-btn {
          padding: 8px 16px !important;
          font-size: 0.75rem !important;
          display: inline-flex !important;
          align-items: center;
          gap: 4px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .desktop-only-card {
          display: flex !important;
        }
        .mobile-only-card {
          display: none !important;
        }
        @media (max-width: 768px) {
          .split-layout {
            flex-direction: column;
            gap: 16px;
          }
          .sidebar-pane {
            width: 100%;
          }
          .desktop-only-card {
            display: none !important;
          }
          .mobile-only-card {
            display: flex !important;
            flex-direction: column !important;
            gap: 10px !important;
            padding: 10px 12px !important;
            border-radius: var(--radius-md) !important;
          }
          .mobile-file-title {
            font-size: 0.8rem !important;
            font-weight: 700 !important;
            margin: 0 !important;
            color: var(--text-primary) !important;
            line-height: 1.2 !important;
            text-overflow: ellipsis !important;
            overflow: hidden !important;
            white-space: nowrap !important;
          }
          .mobile-file-meta {
            font-size: 0.65rem !important;
            color: var(--text-secondary) !important;
          }
          .mobile-download-btn {
            padding: 4px 10px !important;
            font-size: 0.7rem !important;
            height: 28px !important;
            border-radius: var(--radius-sm) !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 4px !important;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
            color: #ffffff !important;
          }
          .mobile-action-row {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            width: 100% !important;
            gap: 8px !important;
            border-top: 1px solid var(--border-color) !important;
            padding-top: 8px !important;
          }
          .mobile-action-btn {
            padding: 4px 8px !important;
            font-size: 0.65rem !important;
            height: 24px !important;
            border-radius: var(--radius-sm) !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 4px !important;
          }
          .mobile-report-btn {
            background: none !important;
            border: none !important;
            color: var(--error-color) !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 4px !important;
            font-size: 0.65rem !important;
            cursor: pointer !important;
            opacity: 0.7 !important;
          }
          .preview-pane {
            min-height: unset;
            height: auto;
            max-height: 400px;
            padding: 0;
            background-color: transparent !important;
            border: none !important;
          }
          .preview-image {
            max-height: 360px;
            border-radius: var(--radius-md);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          }
          .video-preview-wrapper {
            background-color: transparent !important;
            max-height: 360px;
            border-radius: var(--radius-md);
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          }
          .preview-video {
            max-height: 360px !important;
            border-radius: var(--radius-md);
          }
          .sidebar-card-footer {
            display: none !important;
          }
          .conversion-card {
            flex-direction: column !important;
            text-align: center !important;
            padding: 12px !important;
            gap: 10px !important;
          }
          .conversion-info {
            flex-direction: column !important;
            text-align: center !important;
            gap: 8px !important;
          }
          .upload-icon-wrapper {
            display: none !important;
          }
          .conversion-text h3 {
            font-size: 0.8rem !important;
            text-align: center !important;
          }
          .conversion-text p {
            font-size: 0.65rem !important;
            line-height: 1.3 !important;
            text-align: center !important;
          }
          .conversion-btn {
            width: 100% !important;
            justify-content: center !important;
            font-size: 0.7rem !important;
            padding: 6px 12px !important;
          }
        }
      `}} />
    </div>
  );
}
