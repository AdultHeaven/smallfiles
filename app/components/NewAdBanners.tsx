"use client";

import { useEffect, useRef } from "react";

export default function NewAdBanners() {
  const containerAdRef = useRef<HTMLDivElement>(null);
  const iframeAdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Load the container-based ad (container-aab82868cadb44d8a198e3bf3af362a0)
    if (containerAdRef.current) {
      containerAdRef.current.innerHTML = "";
      
      const containerDiv = document.createElement("div");
      containerDiv.id = "container-aab82868cadb44d8a198e3bf3af362a0";
      containerAdRef.current.appendChild(containerDiv);

      const script1 = document.createElement("script");
      script1.type = "text/javascript";
      script1.async = true;
      script1.setAttribute("data-cfasync", "false");
      script1.src = "https://roomsmergeshipwreck.com/aab82868cadb44d8a198e3bf3af362a0/invoke.js";
      containerAdRef.current.appendChild(script1);
    }

    // 2. Load the key-based iframe ad (1c45f1e48300724fb8735f20e1eb080a)
    if (iframeAdRef.current) {
      iframeAdRef.current.innerHTML = "";
      
      (window as any).atOptions = {
        key: "1c45f1e48300724fb8735f20e1eb080a",
        format: "iframe",
        height: 250,
        width: 300,
        params: {},
      };

      const script2 = document.createElement("script");
      script2.type = "text/javascript";
      script2.src = "https://roomsmergeshipwreck.com/1c45f1e48300724fb8735f20e1eb080a/invoke.js";
      iframeAdRef.current.appendChild(script2);
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", width: "100%", marginTop: "24px", marginBottom: "24px" }}>
      {/* Container-based Ad */}
      <div ref={containerAdRef} style={{ width: "100%", display: "flex", justifyContent: "center" }} />
      
      {/* Iframe-based Ad */}
      <div ref={iframeAdRef} style={{ width: 300, height: 250, display: "flex", justifyContent: "center" }} />
    </div>
  );
}
