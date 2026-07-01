// app/download/[id]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { FileRepository } from '../../../repositories/file.repository';
import DownloadDetails from './DownloadDetails';
import Navbar from '@/components/Navbar';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const fileRepo = new FileRepository();
  const file = await fileRepo.getFileById(params.id);

  if (!file) {
    return {
      title: 'File Not Found — WalkFiles',
    };
  }

  const formatSize = (bytes: number) => {
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return {
    title: `Download ${file.original_name} (${formatSize(file.size)}) — WalkFiles`,
    description: `Download ${file.original_name} securely. Host and share files for free with WalkFiles cloud storage.`,
  };
}

export default async function DownloadPage({ params }: PageProps) {
  const fileRepo = new FileRepository();
  const file = await fileRepo.getFileById(params.id);

  if (!file) {
    notFound();
  }

  // Fetch direct R2 download URL
  const { getDownloadUrl } = await import('../../../lib/r2');
  const downloadUrl = await getDownloadUrl({
    key: file.r2_key,
    isPublic: file.is_public,
    filename: file.original_name,
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      {/* Dynamic Header */}
      <Navbar isMinimal={true} />

      <main style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <DownloadDetails file={file} downloadUrl={downloadUrl} />
      </main>

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '24px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        © {new Date().getFullYear()} WalkFiles. Cloud sharing made simple.
      </footer>
    </div>
  );
}
