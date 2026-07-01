// app/dashboard/upload/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import UploadZone from '@/components/UploadZone';

export default function DashboardUploadPage() {
  const router = useRouter();

  const handleUploadSuccess = () => {
    // Refresh the router to update layout storage indicator
    router.refresh();
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>Upload Files</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Select or drag files to upload directly to Cloudflare R2 secure storage.
        </p>
      </div>

      <UploadZone onUploadSuccess={handleUploadSuccess} />
    </div>
  );
}
