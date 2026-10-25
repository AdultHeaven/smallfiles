'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdBannersBelowUpload from '@/components/AdBannersBelowUpload';

import {
  Code,
  Copy,
  Download,
  AlertTriangle,
  QrCode,
  CheckCircle,
  Loader2,
  ArrowRight,
  Upload,
  X,
  Play,
  ExternalLink
} from 'lucide-react';

interface EmbedDetailsProps {
  embedUrl: string;
  fileName: string;
  cleanPath: string;
}

export default function EmbedDetails({
  embedUrl,
  fileName,
  cleanPath,
}: EmbedDetailsProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [showAbuseModal, setShowAbuseModal] = useState(false);
  const [abuseReason, setAbuseReason] = useState('');
  const [reporting, setReporting] = useState(false);
  const [reported, setReported] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  const ext = fileName.includes('.')
    ? fileName.split('.').pop()?.toLowerCase() || 'mp4'
    : 'mp4';

  const truncateMiddle = (name: string, maxLen = 24) => {
    if (!name || name.length <= maxLen) return name;
    const extIndex = name.lastIndexOf('.');
    const fileExt = extIndex !== -1 ? name.substring(extIndex) : '';
    const baseName = extIndex !== -1 ? name.substring(0, extIndex) : name;
    const targetLength = maxLen - fileExt.length - 3;
    if (targetLength <= 0) return name;
    const startChars = Math.ceil(targetLength / 2);
    const endChars = Math.floor(targetLength / 2);
    return `${baseName.substring(0, startChars)}...${baseName.substring(
      baseName.length - endChars
    )}${fileExt}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyEmbed = () => {
    const embedCode = `<iframe src="${embedUrl}" style="width:100%;aspect-ratio:16/9;border:0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy" title="${fileName.replace(
      /"/g,
      '&quot;'
    )}"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  const handleReportAbuse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!abuseReason.trim()) return;

    setReporting(true);
    try {
      const res = await fetch('/api/abuse-reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileId: cleanPath, reason: abuseReason }),
      });

      if (res.ok) {
        setReported(true);
        setAbuseReason('');
        setTimeout(() => {
          setReported(false);
          setShowAbuseModal(false);
        }, 3000);
      } else {
        // Fallback email client if API reports error
        const mailto = `mailto:admin@walkfiles.com?subject=Embed%20Abuse%20Report:%20${encodeURIComponent(
          fileName
        )}&body=${encodeURIComponent(
          `Abuse Report regarding embed:\nFile: ${fileName}\nURL: ${pageUrl}\nReason: ${abuseReason}`
        )}`;
        window.location.href = mailto;
        setReported(true);
        setShowAbuseModal(false);
      }
    } catch {
      const mailto = `mailto:admin@walkfiles.com?subject=Embed%20Abuse%20Report:%20${encodeURIComponent(
        fileName
      )}&body=${encodeURIComponent(
        `Abuse Report regarding embed:\nFile: ${fileName}\nURL: ${pageUrl}\nReason: ${abuseReason}`
      )}`;
      window.location.href = mailto;
      setShowAbuseModal(false);
    } finally {
      setReporting(false);
    }
  };

  return (
    <div
      className="preview-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        width: '100%',
        maxWidth: '1080px',
        margin: '0 auto',
      }}
    >
      {/* NOTE: No popunder ad scripts or overlays on this page per requirements */}

      {/* Split Layout: Left Preview, Right Sidebar */}
      <div className="split-layout">
        {/* Left Side: Previewer Panel with Embedded Video Player */}
        <div className="preview-pane">
          <div
            className="video-preview-wrapper"
            style={{
              width: '100%',
              height: '100%',
              minHeight: '400px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000000',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
            }}
          >
            <iframe
              src={embedUrl}
              style={{
                width: '100%',
                height: '100%',
                minHeight: '400px',
                aspectRatio: '16/9',
                border: 0,
                display: 'block',
              }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title={fileName}
            />
          </div>
        </div>

        {/* Right Side: Meta-Information & Actions */}
        <div className="sidebar-pane">
          {/* Desktop details card */}
          <div className="card shadow-premium sidebar-card desktop-only-card">
            {/* File Info */}
            <div>
              <h1 className="file-title">{fileName}</h1>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '8px',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                  }}
                >
                  {ext} Video
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: '#34d399',
                    fontWeight: 600,
                  }}
                >
                  Embed Stream
                </span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="actions-stack">
              <a
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary main-download-btn"
                title="Download original file from source"
              >
                <Download size={16} />
                <span>Download File</span>
              </a>

              <div className="actions-grid">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="btn btn-secondary action-btn-sec"
                  title="Copy direct share link"
                >
                  <Copy size={13} />
                  <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowQr(!showQr)}
                  className="btn btn-secondary action-btn-sec"
                  title="View QR Code for mobile"
                >
                  <QrCode size={13} />
                  <span>{showQr ? 'Hide QR' : 'Show QR'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopyEmbed}
                className="btn btn-secondary action-btn-sec"
                style={{
                  width: '100%',
                  fontSize: '0.75rem',
                  gap: '6px',
                  marginTop: '2px',
                }}
                title="Copy HTML embed code for your website"
              >
                <Code size={13} />
                <span>{copiedEmbed ? 'Embed Code Copied!' : 'Copy Embed Code'}</span>
              </button>
            </div>

            {/* QR Code */}
            {showQr && (
              <div className="qr-container animate-fade-in">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(
                    pageUrl
                  )}`}
                  alt="QR Code"
                  className="qr-image"
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Scan to open stream on mobile
                </span>
              </div>
            )}

            {/* Report Abuse Link */}
            <div className="sidebar-card-footer">
              <button
                type="button"
                onClick={() => setShowAbuseModal(true)}
                className="report-abuse-btn"
                title="Report file abuse"
              >
                <AlertTriangle size={13} />
                <span>Report Abuse</span>
              </button>
            </div>
          </div>

          {/* Mobile details card: super compact 2-line layout */}
          <div className="card sidebar-card mobile-only-card">
            {/* Line 1: Truncated Filename & Info on Left, Embed Button on Right */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                gap: '12px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <h2 className="mobile-file-title" title={fileName}>
                  {truncateMiddle(fileName, 24)}
                </h2>
                <span className="mobile-file-meta">
                  {ext.toUpperCase()} &bull; Embed Player
                </span>
              </div>
              <a
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mobile-download-btn"
                title="Download original file"
              >
                <Download size={13} />
                <span>Download</span>
              </a>
            </div>

            {/* Line 2: Small Action Icons Row */}
            <div className="mobile-action-row">
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="btn btn-secondary mobile-action-btn"
                  title="Copy Link"
                >
                  <Copy size={12} />
                  <span>{copiedLink ? 'Copied' : 'Link'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyEmbed}
                  className="btn btn-secondary mobile-action-btn"
                  title="Copy Embed Code"
                >
                  <Code size={12} />
                  <span>{copiedEmbed ? 'Copied' : 'Embed'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowQr(!showQr)}
                  className="btn btn-secondary mobile-action-btn"
                  title="QR Code"
                >
                  <QrCode size={12} />
                  <span>QR</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setShowAbuseModal(true)}
                className="report-abuse-btn mobile-report-btn"
              >
                <AlertTriangle size={12} />
                <span>Report</span>
              </button>
            </div>

            {/* Mobile QR Display */}
            {showQr && (
              <div
                className="qr-container animate-fade-in"
                style={{ padding: '8px', alignSelf: 'center', marginTop: '4px' }}
              >
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
                    pageUrl
                  )}`}
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
              Upload folders, documents, images, and videos up to 50 GB completely free. Fast direct cloud transit.
            </p>
          </div>
        </div>
        <Link href="/register" className="btn btn-primary conversion-btn">
          <span>Upload Files Free</span>
          <ArrowRight size={12} />
        </Link>
      </div>

      {/* Ad Banners below upload section - Banner ad kept, no pop ads */}
      <AdBannersBelowUpload />

      {/* Abuse Modal */}
      {showAbuseModal && (
        <div className="modal-backdrop" onClick={() => setShowAbuseModal(false)}>
          <div
            className="card animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '440px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              padding: '24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                Report File Abuse
              </h2>
              <button
                type="button"
                onClick={() => setShowAbuseModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>
            {reported ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '16px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <CheckCircle size={40} style={{ color: 'var(--success-color)' }} />
                <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                  Thank you for your report
                </p>
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.8rem',
                  }}
                >
                  Our team will review this file immediately.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleReportAbuse}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>
                    Reason for report
                  </label>
                  <textarea
                    className="form-input"
                    rows={4}
                    style={{
                      resize: 'none',
                      height: '90px',
                      fontSize: '0.85rem',
                    }}
                    placeholder="Describe the violation (e.g. copyright, malware, illegal content)..."
                    value={abuseReason}
                    onChange={(e) => setAbuseReason(e.target.value)}
                    required
                    disabled={reporting}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'flex-end',
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                    onClick={() => setShowAbuseModal(false)}
                    disabled={reporting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger"
                    style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                    disabled={reporting}
                  >
                    {reporting ? (
                      <Loader2 className="animate-spin" size={14} />
                    ) : (
                      'Submit Report'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Styled HTML layout variables (matches f folder aesthetic 100%) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .file-title {
          font-size: 1.25rem;
          font-weight: 800;
          word-break: break-all;
          overflow-wrap: break-word;
          color: var(--text-primary);
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .desktop-only-card {
          display: flex !important;
        }
        .mobile-only-card {
          display: none !important;
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
          background-color: #000000;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 0;
          min-height: 400px;
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
          .video-preview-wrapper {
            background-color: transparent !important;
            max-height: 360px;
            min-height: unset !important;
            border-radius: var(--radius-md);
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          }
          .video-preview-wrapper iframe {
            min-height: 220px !important;
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
      `,
        }}
      />
    </div>
  );
}
