"use client";

import { useEffect, useState } from "react";

export default function ContentAdBanner() {
  const [bannerSrc, setBannerSrc] = useState<string>("");
  const [nativeSrc, setNativeSrc] = useState<string>("");

  useEffect(() => {
    // Generate Blob URL for 300x250 Banner
    const bannerHtml = `<!DOCTYPE html>
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
</html>`;

    // Generate Blob URL for Native Ad
    const nativeHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>html, body { margin:0; padding:0; width:100%; background:transparent; }</style>
  </head>
  <body>
    <div id="container-aab82868cadb44d8a198e3bf3af362a0"></div>
    <script async="async" data-cfasync="false" src="https://roomsmergeshipwreck.com/aab82868cadb44d8a198e3bf3af362a0/invoke.js"></script>
  </body>
</html>`;

    const bBlob = new Blob([bannerHtml], { type: "text/html" });
    const nBlob = new Blob([nativeHtml], { type: "text/html" });

    const bUrl = URL.createObjectURL(bBlob);
    const nUrl = URL.createObjectURL(nBlob);

    setBannerSrc(bUrl);
    setNativeSrc(nUrl);

    return () => {
      URL.revokeObjectURL(bUrl);
      URL.revokeObjectURL(nUrl);
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", margin: "24px 0", width: "100%" }}>
      {bannerSrc && (
        <iframe
          src={bannerSrc}
          width="300"
          height="250"
          style={{ border: "none", overflow: "hidden", background: "transparent" }}
          scrolling="no"
          title="Ad Banner Top"
        />
      )}
      {nativeSrc && (
        <iframe
          src={nativeSrc}
          width="100%"
          height="300"
          style={{ border: "none", overflow: "hidden", background: "transparent" }}
          scrolling="no"
          title="Ad Banner Native"
        />
      )}
    </div>
  );
}




