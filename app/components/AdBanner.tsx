"use client";

import { useEffect, useRef } from "react";

export default function AdBanner() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Define ad options on window
    (window as any).atOptions = {
      key: "6c660c59be65016ae4348790d15e4a62",
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
    };

    // Create script tag
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//roomsmergeshipwreck.com/6c660c59be65016ae4348790d15e4a62/invoke.js";

    // Clear container before injecting
    adRef.current.innerHTML = "";
    adRef.current.appendChild(script);
  }, []);

  return    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <div ref={adRef} style={{ width: 300, height: 250 }} />
    </div>;
}
