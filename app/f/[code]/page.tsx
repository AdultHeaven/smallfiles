import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { FileRepository } from '../../../repositories/file.repository';
import ShortLinkDetails from './ShortLinkDetails';
import Navbar from '@/components/Navbar';

export const revalidate = 604800; // Cache for 1 week (604800 seconds)

interface PageProps {
  params: {
    code: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const fileRepo = new FileRepository();
  // Fetch by short code first, fallback to UUID lookup just in case
  let file = await fileRepo.getFileByShortCode(params.code);
  if (!file) {
    file = await fileRepo.getFileById(params.code);
  }

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
    description: `Securely stream, preview, and download ${file.original_name} (${formatSize(file.size)}) instantly. WalkFiles provides high-speed file transfers with direct CDN links and zero limits.`,
  };
}

export default async function ShortLinkPage({ params }: PageProps) {
  const fileRepo = new FileRepository();
  // Fetch by short code first, fallback to UUID lookup just in case
  let file = await fileRepo.getFileByShortCode(params.code);
  if (!file) {
    file = await fileRepo.getFileById(params.code);
  }

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
        <ShortLinkDetails file={file} downloadUrl={downloadUrl} />
      </main>

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '24px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        © {new Date().getFullYear()} WalkFiles. Cloud sharing made simple.
      </footer>
    </div>
  );
}
