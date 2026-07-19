"use client";

import { useEffect, useRef } from "react";

export default function ContentAdBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous contents
    containerRef.current.innerHTML = "";

    // Create the script element
    const scriptEl = document.createElement("script");
    scriptEl.type = "text/javascript";
    
    // Set the script content
    scriptEl.innerHTML = `
      (function(yhk){
      var d = document,
          s = d.createElement('script'),
          l = d.scripts[d.scripts.length - 1];
      s.settings = yhk || {};
      s.src = "//illustrious-consideration.com/bpX.VjsHdyGsl/0iYyWCcG/heAm-9XuKZaU/lvkRPGTYcgyZMwz/g/0yNWjyEftAN/zSIhzgOHDBQJ2WNdQk";
      s.async = true;
      s.referrerPolicy = 'no-referrer-when-downgrade';
      if (l && l.parentNode) {
        l.parentNode.insertBefore(s, l);
      } else {
        d.head.appendChild(s);
      }
      })({})
    `;

    // Append script to container to execute it
    containerRef.current.appendChild(scriptEl);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "24px 0", minHeight: "50px", width: "100%" }}>
      <div ref={containerRef} style={{ width: "100%", display: "flex", justifyContent: "center" }} />
    </div>
  );
}
