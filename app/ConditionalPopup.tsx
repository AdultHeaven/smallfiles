"use client";

import Script from "next/script";

export default function ConditionalPopup() {
  return (
    <Script id="popup-all" strategy="afterInteractive">
      {`
        (function(mqt){
        var d = document,
            s = d.createElement('script'),
            l = d.scripts[d.scripts.length - 1];
        s.settings = mqt || {};
        s.src = "//infamous-maximum.com/cbDA9W6_b.2n5bl/SsWyQI9TNPzYE_5OO/DDgPyhNoSE0b3nMpTzkm4XOYDiIX5I";
        s.async = true;
        s.referrerPolicy = 'no-referrer-when-downgrade';
        if (l && l.parentNode) {
          l.parentNode.insertBefore(s, l);
        } else {
          d.head.appendChild(s);
        }
        })({})
      `}
    </Script>
  );
}
