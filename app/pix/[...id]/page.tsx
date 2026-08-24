// // File: app/file/[...id]/page.tsx
// 'use client';

// import { notFound } from 'next/navigation';
// import Link from 'next/link';
// import { useState, useMemo } from 'react';
// import '../../filePagePix.css';
// import Script from 'next/script';

// type Props = { params: { id: string[] } };

// export default function FilePage({ params }: Props) {
//   const { id } = params;
//   if (!id || id.length === 0) return notFound();

//   const filePath = id.join('/');
//   const embedUrl = useMemo(() => `https://pixeldrain.com/${filePath}?embed&style=classic`, [filePath]);
//   const originalUrl = useMemo(() => `https://pixeldrain.com/${filePath}`, [filePath]);

//   const [loaded, setLoaded] = useState(false);
//   const [copied, setCopied] = useState(false);

//   async function copyEmbed() {
//     try {
//       await navigator.clipboard.writeText(embedUrl);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1200);
//     } catch {
//       setCopied(false);
//     }
//   }

//   return (
//     <div className="pf-root">
//       <Script src="https://roomsmergeshipwreck.com/85/ac/04/85ac04720fa9fdfad8d3cd9c95b45495.js" strategy="afterInteractive" />

//       {/* Header */}
//       <header className="pf-header pf-header-min">
//         <div className="pf-header-left">
// <Link href="/" className="pf-logo">
//   Small<span style={{ color: "#4da3ff" }}>Files</span>.fun
// </Link>
//         </div>

//         <div className="pf-actions">
//        <Link
//   href="/"
//   className="pf-pill pf-ghost pf-upload-btn"
//   title="Go to homepage to upload"
// >
//   Upload
// </Link>
//         </div>
//       </header>

//       {/* Main content */}
//       <main className="pf-main pf-main-min">
//         <section className="player-stage">
//           <div className="player-card">
//             {!loaded && (
//               <div className="player-skeleton" aria-hidden>
//                 <div className="sk-rect" />
//                 <div className="sk-spinner" />
//               </div>
//             )}

//             <iframe
//               src={embedUrl}
//               title={`Pixeldrain: ${filePath}`}
//               className={`player-iframe ${loaded ? 'ready' : ''}`}
//               allow="autoplay; fullscreen; encrypted-media"
//               allowFullScreen
//               loading="lazy"
//               onLoad={() => setLoaded(true)}
//             />
//           </div>
//         </section>
//       </main>

//       <footer className="pf-footer" role="contentinfo">
//         <div className="pf-footer-inner">
//           <div className="pf-foot-left">
//             <span className="brand-min">SmallFiles.fun</span>
//           </div>

//           <div className="pf-foot-links">
//             <a href="/dmca">DMCA</a>
//           </div>

//           <div className="pf-foot-right">
//             <span className="copyright">© {new Date().getFullYear()}</span>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useRef, useState, useMemo } from 'react';
import '../../filePagePix.css';
import Script from 'next/script';
import OneTimeAdAutoLoad from "../../components/OneTimeAdAutoLoad";
import ContentAdBanner from '@/components/ContentAdBanner';
import AdsterraNative from '@/components/AdsterraNative';


type Props = { params: { id: string[] } };

export default function FilePage({ params }: Props) {
  const { id } = params;
  if (!id || id.length === 0) return notFound();

  const filePath = id.join('/');
  const embedUrl = useMemo(
    () => `https://pixeldrain.com/${filePath}?embed&style=classic`,
    [filePath]
  );

  const [loaded, setLoaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // show overlay after 3 seconds
    overlayTimeoutRef.current = window.setTimeout(() => {
      setShowOverlay(true);
    }, 3000);

    return () => {
      if (overlayTimeoutRef.current) {
        clearTimeout(overlayTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="pf-root">

      <OneTimeAdAutoLoad />

      {/* Header */}
      <header className="pf-header pf-header-min">
        <div className="pf-header-left">
          <Link href="/" className="pf-logo">
            Walk<span style={{ color: '#4da3ff' }}>Files</span>.com
          </Link>
        </div>

        <div className="pf-actions">
          <Link
            href="/"
            className="pf-pill pf-ghost pf-upload-btn"
            title="Go to homepage to upload"
          >
            Upload
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="pf-main pf-main-min">
        <section className="player-stage">
          <div className="player-card">
            {!loaded && (
              <div className="player-skeleton" aria-hidden>
                <div className="sk-rect" />
                <div className="sk-spinner" />
              </div>
            )}

            <iframe
              src={embedUrl}
              className={`player-iframe ${loaded ? 'ready' : ''} ${
                showOverlay ? 'blocked' : ''
              }`}
              allow="autoplay; fullscreen; encrypted-media"
              allowFullScreen
              loading="lazy"
              onLoad={() => setLoaded(true)}
            />
          </div>
        </section>

        {/* High CTR / High CPM Direct Non-sandboxed Adsterra Ads */}
        <AdsterraNative />
        <ContentAdBanner />
      </main>

      {/* Transparent overlay */}
      {showOverlay && (
        <div
          className="pf-click-overlay"
          onClick={() => setShowOverlay(false)}
        />
      )}

      
       <footer className="pf-footer" role="contentinfo">
         <div className="pf-footer-inner">
           <div className="pf-foot-left">
             <span className="brand-min">WalkFiles.com</span>
           </div>

           <div className="pf-foot-links">
             <a href="/dmca">DMCA</a>
           </div>

           <div className="pf-foot-right">
             <span className="copyright">© {new Date().getFullYear()}</span>
           </div>
         </div>
       </footer>
    </div>
  );
}
