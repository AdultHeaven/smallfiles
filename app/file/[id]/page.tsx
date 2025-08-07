'use client';

import { notFound } from 'next/navigation';
import { FileDown } from 'lucide-react';
import Link from 'next/link';
import '../../filePage.css';
import Script from 'next/script';
import DownloadInstructions from '../../components/DownloadInstructions';


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
    <div className="page-wrapper">

         <Script
        src="/mobilepopup.js"
        strategy="afterInteractive" // Ensures it runs after hydration
      />

      <Script
  src="//cdn.tsyndicate.com/sdk/v1/p.js"
  data-ts-spot="f0f128801be54eec98db0136d58d0583"
  strategy="afterInteractive"
  async
  defer
/>

      {/* ==== HEADER ==== */}
      <header className="header">
        <Link href="/" className="site-name">SmallFiles.fun</Link>
        <Link href="/" className="upload-cta">+ Upload File</Link>
      </header>
      {/* ==== MAIN CONTENT ==== */}
      <main className="file-wrapper">
    <div className="desktop-only center-banner">
        <a
          href="https://t.mbsrv2.com/384478/9403/0?target=pops&file_id=613430&aff_sub5=SF_006OG000004lmDN&aff_sub4=AT_0002"
          target="_blank"
        >
          <img
            src="https://www.imglnkx.com/9403/ADV-1207_DESIGN-21652_72890_Mainstream.png"
            width="728" height="90"
            alt="ad"
          />
        </a>
      </div>

      <div className="mobile-only center-banner">
        <a
          href="https://t.mbsrv2.com/384478/9403/0?target=pops&file_id=613426&aff_sub5=SF_006OG000004lmDN&aff_sub4=AT_0002"
          target="_blank"
        >
          <img
            src="https://www.imglnkx.com/9403/ADV-1207_DESIGN-21652_300100_Mainstream.png"
            width="300"
            height="100"
            alt="ad"
          />
        </a>
      </div>      <div className="preview-container">
          {isPlayableVideo ? (
            <video controls className="media-preview">
              <source src={fileUrl} type={`video/${ext}`} />
              Your browser does not support the video tag.
            </video>
          ) : isImage ? (
            <img src={fileUrl} alt="Uploaded File" className="media-preview" />
          ) : (
            <div className="fallback-box">
              <FileDown size={48} />
              <p className="filename">{id}</p>
              {ext === 'mov' && (
                <p style={{ color: '#888', fontSize: '0.9rem' }}>
                  This file may not play in your browser. Please download to view.
                </p>
              )}
            </div>
          )}
        </div>
      <DownloadInstructions  fileType="video" />
    <div className="desktop-only center-banner">
        <a
          href="https://t.mbsrv2.com/384478/9403/0?target=pops&file_id=613419&aff_sub5=SF_006OG000004lmDN&aff_sub4=AT_0002"
          target="_blank"
        >
          <img
            src="https://www.imglnkx.com/9403/ADV-21652_DESIGN-21652_72890.jpg"
            width="728" height="90"
            alt="ad"
          />
        </a>
      </div>

      <div className="mobile-only center-banner">
        <a
          href="https://t.mbsrv2.com/384478/9403/0?target=pops&file_id=613422&aff_sub5=SF_006OG000004lmDN&aff_sub4=AT_0002"
          target="_blank"
        >
          <img
            src="https://www.imglnkx.com/9403/ADV-21652_DESIGN-21652_300100.jpg"
            width="300"
            height="100"
            alt="ad"
          />
        </a>
      </div>     
        {/* <a href={fileUrl} download className="download-button">
          <FileDown size={18} />
          <span>Download File</span>
        </a> */}
      </main>

      {/* ==== FOOTER ==== */}
      <footer className="footer">
        <div className="footer-links">
          <a href="/contact">Contact Us</a> | <a href="/dmca">DMCA</a>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} SmallFiles.fun — All rights reserved.
        </div>
      </footer>
    </div>
  );
}
