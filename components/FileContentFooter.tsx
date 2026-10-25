'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, FileText, Mail } from 'lucide-react';

interface FileContentFooterProps {
  fileName?: string;
  fileId?: string;
  className?: string;
}

export default function FileContentFooter({
  fileName,
  fileId,
  className = '',
}: FileContentFooterProps) {
  const currentYear = new Date().getFullYear();

  const fileIdentifier = fileName || fileId;
  const abuseSubject = fileIdentifier
    ? `File Abuse Report: ${fileIdentifier}`
    : 'File Abuse Report';
  const abuseBody = fileIdentifier
    ? `Hello WalkFiles Team,\n\nI would like to report abuse / copyright infringement regarding the following file:\nFile: ${fileIdentifier}\n\nDetails of the violation:\n`
    : `Hello WalkFiles Team,\n\nI would like to report a file abuse violation.\n\nDetails of the violation:\n`;

  const abuseMailto = `mailto:admin@walkfiles.com?subject=${encodeURIComponent(
    abuseSubject
  )}&body=${encodeURIComponent(abuseBody)}`;

  return (
    <footer className={`file-content-footer ${className}`} role="contentinfo">
      <div className="file-footer-container">
        {/* Left: Brand & Copyright */}
        <div className="file-footer-left">
          <span className="file-footer-copy">
            &copy; {currentYear}{' '}
            <Link href="/" className="file-footer-brand">
              WalkFiles
            </Link>
          </span>
          <span className="file-footer-dot" aria-hidden="true">
            &bull;
          </span>
          <span className="file-footer-tagline">
            Cloud sharing made simple
          </span>
        </div>

        {/* Center: Legal & Abuse Links */}
        <nav className="file-footer-nav" aria-label="Footer Legal Navigation">
          <a
            href={abuseMailto}
            className="file-footer-link file-footer-link-abuse"
            title="Report file abuse or copyright infringement"
          >
            <ShieldAlert size={14} className="file-footer-icon file-footer-icon-abuse" />
            <span>Report Abuse</span>
          </a>

          <span className="file-footer-separator" aria-hidden="true">
            &bull;
          </span>

          <Link
            href="/dmca"
            className="file-footer-link"
            title="DMCA Copyright Policy & Takedowns"
          >
            <FileText size={14} className="file-footer-icon" />
            <span>DMCA Policy</span>
          </Link>

          <span className="file-footer-separator" aria-hidden="true">
            &bull;
          </span>

          <Link
            href="/contact"
            className="file-footer-link"
            title="Contact Support"
          >
            <span>Contact</span>
          </Link>
        </nav>

        {/* Right: Direct Admin Mail Badge */}
        <div className="file-footer-right">
          <a
            href="mailto:admin@walkfiles.com?subject=Abuse%20/%20DMCA%20Inquiry"
            className="file-footer-email-badge"
            title="Email WalkFiles Admin for Abuse & DMCA inquiries"
          >
            <Mail size={13} className="file-footer-email-icon" />
            <span className="file-footer-email-label">Abuse &amp; DMCA:</span>
            <span className="file-footer-email-addr">admin@walkfiles.com</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
