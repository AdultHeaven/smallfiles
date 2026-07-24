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
    s.src = "https://roomsmergeshipwreck.com/85/ac/04/85ac04720fa9fdfad8d3cd9c95b45495.js";
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
