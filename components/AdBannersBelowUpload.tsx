'use client';

import React, { useEffect, useRef } from 'react';

export default function AdBannersBelowUpload() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear container to avoid duplicate scripts/containers on re-renders
    containerRef.current.innerHTML = '';

    // Wrapper container for centering & styling
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';
    wrapper.style.justifyContent = 'center';
    wrapper.style.gap = '20px';
    wrapper.style.margin = '24px 0';
    wrapper.style.width = '100%';

    // --- Banner 1 ---
    const banner1Box = document.createElement('div');
    banner1Box.style.minHeight = '50px';
    banner1Box.style.display = 'flex';
    banner1Box.style.justifyContent = 'center';
    banner1Box.style.width = '100%';

    const s1 = document.createElement('script');
    s1.async = true;
    s1.setAttribute('data-cfasync', 'false');
    s1.src = 'https://roomsmergeshipwreck.com/aab82868cadb44d8a198e3bf3af362a0/invoke.js';

    const div1 = document.createElement('div');
    div1.id = 'container-aab82868cadb44d8a198e3bf3af362a0';

    banner1Box.appendChild(s1);
    banner1Box.appendChild(div1);

    // --- Banner 2 (300x250 iframe) ---
    const banner2Box = document.createElement('div');
    banner2Box.style.minHeight = '250px';
    banner2Box.style.width = '300px';
    banner2Box.style.display = 'flex';
    banner2Box.style.justifyContent = 'center';

    const s2Config = document.createElement('script');
    s2Config.type = 'text/javascript';
    s2Config.text = `
      atOptions = {
        'key' : '1c45f1e48300724fb8735f20e1eb080a',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;

    const s2Invoke = document.createElement('script');
    s2Invoke.type = 'text/javascript';
    s2Invoke.src = 'https://roomsmergeshipwreck.com/1c45f1e48300724fb8735f20e1eb080a/invoke.js';

    banner2Box.appendChild(s2Config);
    banner2Box.appendChild(s2Invoke);

    wrapper.appendChild(banner1Box);
    wrapper.appendChild(banner2Box);

    containerRef.current.appendChild(wrapper);
  }, []);

  return <div ref={containerRef} style={{ width: '100%' }} />;
}
