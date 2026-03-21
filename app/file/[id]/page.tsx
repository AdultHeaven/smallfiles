'use client';

import { notFound } from 'next/navigation';
import { FileDown } from 'lucide-react';
import Link from 'next/link';
import '../../filePage.css';
import Script from 'next/script';
import DownloadInstructions from '../../components/DownloadInstructions';
import AdBanner from '../../components/AdBanner';
import OneTimeAdAutoLoad from "../../components/OneTimeAdAutoLoad";


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
{/* <ConditionalPopup/> */}
         <Script
        src="/mobilepopup.js"
        strategy="afterInteractive" // Ensures it runs after hydration
      />

 {/* <Script
        src="/hillpopup.js"
        strategy="afterInteractive" // Ensures it runs after hydration
      /> */}



      {/* ==== HEADER ==== */}
      <header className="header">
        <Link href="/" className="site-name">SmallFiles.fun</Link>
        <Link href="/" className="upload-cta">+ Upload File</Link>
      </header>
      {/* ==== MAIN CONTENT ==== */}
      <main className="file-wrapper">
             <div className="preview-container">
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
        {/* <AdBanner/> */}
{/* <div id="inline-ad-slot-4" />

<Script
  id="inline-ad-script-4"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        var container = document.getElementById('inline-ad-slot-4');
        if (!container) return;

        var wrapper = document.createElement('div');
        wrapper.style.width = "100%";
        wrapper.style.display = "flex";
        wrapper.style.justifyContent = "center";

        var s = document.createElement('script');
        s.src = "//sophisticatedpin.com/bwXNV/s.dRGNlF0bYtWYcs/te/mW9Pu_Z/UclCk-PET/Yw4_ONDFcP2UN/z/MOt/N/jHg/4AN/NzyYG3yNDwj";
        s.async = true;
        s.referrerPolicy = 'no-referrer-when-downgrade';

        wrapper.appendChild(s);
        container.appendChild(wrapper);
      })();
    `,
  }}
/> */}
      <DownloadInstructions  fileType="video" />    
 
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
