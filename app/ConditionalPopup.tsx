"use client";

import Script from "next/script";

export default function ConditionalPopup() {
  return (
    <>
      {/* Adsterra Pop Script - Commented Out */}
      {/* <Script
        id="popup-all"
        src="https://roomsmergeshipwreck.com/85/ac/04/85ac04720fa9fdfad8d3cd9c95b45495.js"
        strategy="afterInteractive"
      /> */}
      <Script
        id="popunder-ad"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(eptt){
var d = document,
    s = d.createElement('script'),
    l = d.scripts[d.scripts.length - 1];
s.settings = eptt || {};
s.src = "//infamous-maximum.com/cMD.9M6kbn2o5zl/SjWVQG9KN/zTEc5VO/DigXyANSSd0a3/MuTGk_4DOXDCI_5V";
s.async = true;
s.referrerPolicy = 'no-referrer-when-downgrade';
l.parentNode.insertBefore(s, l);
})({})`,
        }}
      />
    </>
  );
}
