export function loadDownloadAd() {
  if (typeof window === 'undefined') return;

  // Prevent multiple injections
  if ((window as any).__downloadAdLoaded) return;
  (window as any).__downloadAdLoaded = true;

  try {
    const d = document;
    const s = d.createElement('script');
    
    // Inject settings if any (equivalent to `s.settings = digj || {};`)
    (s as any).settings = {};
    s.src = "//infamous-maximum.com/cxDG9e6Nb.2y5MltS-W/Qp9SNgz/Em5HO/DHgJyqNtSj0-3UMtTzkz4UOcDUIv5A";
    s.async = true;
    s.referrerPolicy = 'no-referrer-when-downgrade';

    // Find the last script or first script on page to insert before, or fallback to head
    const targetScript = d.scripts[d.scripts.length - 1] || d.getElementsByTagName('script')[0];
    if (targetScript && targetScript.parentNode) {
      targetScript.parentNode.insertBefore(s, targetScript);
    } else {
      d.head.appendChild(s);
    }
    console.log("[Ad] Script loaded dynamically on download click.");
  } catch (err) {
    console.error("Failed to load ad script:", err);
  }
}
