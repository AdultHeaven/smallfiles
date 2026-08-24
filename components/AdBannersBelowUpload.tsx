'use client';

import React from 'react';
import AdsterraNative from './AdsterraNative';
import AdBanner from './AdBanner';

export default function AdBannersBelowUpload() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        margin: '24px 0',
        width: '100%',
      }}
    >
      <AdsterraNative />
      <AdBanner />
    </div>
  );
}

