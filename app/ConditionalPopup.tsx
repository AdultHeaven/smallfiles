"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function ConditionalPopup() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();
      const mobile =
        /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(ua);
      setIsMobile(mobile);
    }
  }, []);

  if (isMobile === null) return null; // wait until detection is done

  return (
    <>
      {isMobile ? (
        <Script
          id="popup-mobile"
          src="/mobilepopup.js"
          strategy="afterInteractive" // runs after hydration
        />
      ) : (
        <Script
          id="popup-pc"
          src="/popupPC.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
