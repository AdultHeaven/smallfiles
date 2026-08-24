'use client';

import React, { useEffect, useRef } from 'react';

export default function AdsterraNative() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear container to prevent duplicate scripts on re-renders
    containerRef.current.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';
    wrapper.style.justifyContent = 'center';
    wrapper.style.margin = '20px 0';
    wrapper.style.width = '100%';

    const nativeBox = document.createElement('div');
    nativeBox.style.minHeight = '50px';
    nativeBox.style.display = 'flex';
    nativeBox.style.justifyContent = 'center';
    nativeBox.style.width = '100%';

    const s = document.createElement('script');
    s.async = true;
    s.setAttribute('data-cfasync', 'false');
    s.src = 'https://roomsmergeshipwreck.com/aab82868cadb44d8a198e3bf3af362a0/invoke.js';

    const divContainer = document.createElement('div');
    divContainer.id = 'container-aab82868cadb44d8a198e3bf3af362a0';

    nativeBox.appendChild(s);
    nativeBox.appendChild(divContainer);
    wrapper.appendChild(nativeBox);

    containerRef.current.appendChild(wrapper);
  }, []);

  return <div ref={containerRef} style={{ width: '100%' }} />;
}
