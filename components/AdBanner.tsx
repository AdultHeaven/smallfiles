'use client';

import React, { useEffect, useRef } from 'react';

export default function AdBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear container to avoid duplicate scripts on re-render
    containerRef.current.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.style.alignItems = 'center';
    wrapper.style.margin = '20px 0';
    wrapper.style.width = '100%';

    const bannerBox = document.createElement('div');
    bannerBox.style.minHeight = '250px';
    bannerBox.style.width = '300px';
    bannerBox.style.display = 'flex';
    bannerBox.style.justifyContent = 'center';

    // Directly assign atOptions to top window context for full popunder support
    (window as any).atOptions = {
      'key' : '1c45f1e48300724fb8735f20e1eb080a',
      'format' : 'iframe',
      'height' : 250,
      'width' : 300,
      'params' : {}
    };

    const sInvoke = document.createElement('script');
    sInvoke.type = 'text/javascript';
    sInvoke.src = 'https://roomsmergeshipwreck.com/1c45f1e48300724fb8735f20e1eb080a/invoke.js';

    bannerBox.appendChild(sInvoke);
    wrapper.appendChild(bannerBox);

    containerRef.current.appendChild(wrapper);
  }, []);

  return <div ref={containerRef} style={{ width: '100%' }} />;
}



