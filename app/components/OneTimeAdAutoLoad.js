"use client";

import { useEffect } from "react";

export default function OneTimeAdAutoLoad() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prevent multiple ad injections in case of re-renders
    if (window.__adAlreadyLoaded) return;
    window.__adAlreadyLoaded = true;

    // 1️⃣ Create and inject the ad script immediately
    const script = document.createElement("script");
    script.src = "https://tinysentgrowled.com/43/4b/c6/434bc6f3f3a3615a603923aca7a94e6e.js";
    script.type = "text/javascript";
    script.async = true;
    document.head.appendChild(script);

    console.log("[Ad] Script loaded automatically once on page start");

    // 2️⃣ Optional: Remove the script after 10 seconds (turn off)
    const timer = setTimeout(() => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
        console.log("[Ad] Script removed after running once");
      }
    }, 10000); // 10 seconds — adjust this if needed

    // 3️⃣ Cleanup when component unmounts
    return () => {
      clearTimeout(timer);
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      window.__adAlreadyLoaded = false; // optional reset on full page reload
    };
  }, []);

  return null;
}
