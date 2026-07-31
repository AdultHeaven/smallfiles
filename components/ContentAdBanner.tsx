"use client";

import { useEffect, useRef } from "react";

export default function ContentAdBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const nativeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Inject 300x250 Banner Ad
    if (bannerRef.current && bannerRef.current.children.length === 0) {
      const iframe = document.createElement("iframe");
      iframe.width = "300";
      iframe.height = "250";
      iframe.style.border = "none";
      iframe.style.overflow = "hidden";
      iframe.scrolling = "no";
      iframe.title = "Ad Banner 300x250";
      
      bannerRef.current.appendChild(iframe);

      const iframeDoc = iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>html, body { margin:0; padding:0; display:flex; justify-content:center; align-items:center; background:transparent; overflow:hidden; }</style>
            </head>
            <body>
              <script type="text/javascript">
                atOptions = {
                  'key' : '1c45f1e48300724fb8735f20e1eb080a',
                  'format' : 'iframe',
                  'height' : 250,
                  'width' : 300,
                  'params' : {}
                };
              </script>
              <script type="text/javascript" src="https://roomsmergeshipwreck.com/1c45f1e48300724fb8735f20e1eb080a/invoke.js"></script>
            </body>
          </html>
        `);
        iframeDoc.close();
      }
    }

    // 2. Inject Native Ad
    if (nativeRef.current && nativeRef.current.children.length === 0) {
      const iframe = document.createElement("iframe");
      iframe.width = "100%";
      iframe.height = "300";
      iframe.style.border = "none";
      iframe.style.overflow = "hidden";
      iframe.scrolling = "no";
      iframe.title = "Ad Native Container";

      nativeRef.current.appendChild(iframe);

      const iframeDoc = iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>html, body { margin:0; padding:0; width:100%; background:transparent; }</style>
            </head>
            <body>
              <div id="container-aab82868cadb44d8a198e3bf3af362a0"></div>
              <script async="async" data-cfasync="false" src="https://roomsmergeshipwreck.com/aab82868cadb44d8a198e3bf3af362a0/invoke.js"></script>
            </body>
          </html>
        `);
        iframeDoc.close();
      }
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", margin: "24px 0", width: "100%" }}>
      <div ref={bannerRef} style={{ width: "300px", minHeight: "250px", display: "flex", justifyContent: "center" }} />
      <div ref={nativeRef} style={{ width: "100%", minHeight: "300px", display: "flex", justifyContent: "center" }} />
    </div>
  );
}



