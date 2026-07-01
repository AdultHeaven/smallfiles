'use client';

import { notFound } from 'next/navigation';
import { FileDown } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
type Props = {
  params: { id: string };
};

const videoExts = ['mp4', 'webm'];
const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];

const CDN_BASE = process.env.NEXT_PUBLIC_BUNNY_PULLZONE_URL || 'https://smallfiles.b-cdn.net';

export default function FilePage({ params }: Props) {
  const { id } = params;

  if (!id || !id.includes('.')) return notFound();

  const ext = id.split('.').pop()?.toLowerCase();
  const fileUrl = `${CDN_BASE}/${id}`;

  const isPlayableVideo = ext && videoExts.includes(ext);
  const isImage = ext && imageExts.includes(ext);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      <title>{id} — WalkFiles Preview</title>

      {/* ==== HEADER ==== */}
      <Navbar />

      {/* ==== MAIN CONTENT ==== */}
      <main style={{
        flexGrow: 1,
        padding: '100px 24px 80px 24px',
        maxWidth: '720px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center'
      }}>
        {/* File Preview Card */}
        <div className="card animate-fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px' }}>
          {/* Header Title */}
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, wordBreak: 'break-all', marginBottom: '6px' }}>
              {id}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
              File Share Link • Direct R2 CDN Delivery
            </p>
          </div>

          {/* Media Preview Box */}
          <div style={{
            width: '100%',
            backgroundColor: '#000000',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border-color)',
            minHeight: '200px'
          }}>
            {isPlayableVideo ? (
              <video controls style={{ width: '100%', maxHeight: '500px', display: 'block' }}>
                <source src={fileUrl} type={`video/${ext}`} />
                Your browser does not support the video tag.
              </video>
            ) : isImage ? (
              <img src={fileUrl} alt="Uploaded File" style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }} />
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                padding: '40px 20px',
                textAlign: 'center',
                color: 'var(--text-secondary)'
              }}>
                <FileDown size={48} style={{ color: 'var(--text-muted)' }} />
                <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{id}</p>
                {ext === 'mov' && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    This file may not play in your browser. Please download to view.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Download Action */}
          <a
            href={fileUrl}
            download
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.95rem', textDecoration: 'none' }}
          >
            <FileDown size={18} />
            <span>Download File</span>
          </a>
        </div>

      </main>

      {/* ==== FOOTER ==== */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '30px 24px',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-secondary)',
        backgroundColor: 'rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '8px' }}>
          <Link href="/contact" style={{ color: 'var(--text-secondary)' }}>Contact Us</Link>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <Link href="/dmca" style={{ color: 'var(--text-secondary)' }}>DMCA Policy</Link>
        </div>
        <div>
          © {new Date().getFullYear()} WalkFiles. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
