import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import FileContentFooter from '@/components/FileContentFooter';
import EmbedDetails from './EmbedDetails';

interface PageProps {
  params: {
    id?: string[];
  };
}

export function parseEmbedTarget(segments: string[] = []): {
  embedUrl: string;
  fileName: string;
  cleanPath: string;
} {
  let raw = segments.join('/');

  try {
    raw = decodeURIComponent(raw);
  } catch {
    // fallback if decoding fails
  }

  // Remove leading protocol slashes or schemas if passed like https:/ or http://
  const hasHttp = /^https?:\/+/i.test(raw);
  const withoutProtocol = raw.replace(/^https?:\/+/i, '');

  const fileditchDomains = [
    'embedditch.st',
    'fileditchvids.st',
    'itsfileditchfiles.st',
    'fileditchfiles.st',
    'fileditchfiles.me',
    'new.fileditch.com',
    'fileditch.com',
  ];

  let isFileditch = false;
  let subPath = withoutProtocol;

  for (const domain of fileditchDomains) {
    if (withoutProtocol.toLowerCase().startsWith(domain + '/')) {
      isFileditch = true;
      subPath = withoutProtocol.substring(domain.length + 1);
      break;
    } else if (withoutProtocol.toLowerCase() === domain) {
      isFileditch = true;
      subPath = '';
      break;
    }
  }

  const cleanPath = (isFileditch ? subPath : withoutProtocol).replace(/^\/+/, '');
  let embedUrl = '';

  if (
    isFileditch ||
    (!withoutProtocol.includes('://') &&
      !withoutProtocol.includes('.com/') &&
      !withoutProtocol.includes('.org/') &&
      !withoutProtocol.includes('.net/') &&
      !withoutProtocol.includes('.me/') &&
      !withoutProtocol.includes('.st/'))
  ) {
    embedUrl = `https://embedditch.st/${cleanPath}`;
  } else if (hasHttp) {
    embedUrl = raw;
  } else {
    embedUrl = `https://${withoutProtocol}`;
  }

  // Determine display file name from last URL segment
  const urlParts = cleanPath.split('?')[0].split('#')[0].split('/').filter(Boolean);
  const lastPart = urlParts[urlParts.length - 1] || 'Embedded Video';
  const fileName = lastPart;

  return {
    embedUrl,
    fileName,
    cleanPath,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const segments = params.id || [];
  if (segments.length === 0) {
    return {
      title: 'Embed Video Player - WalkFiles',
    };
  }

  const { fileName } = parseEmbedTarget(segments);

  return {
    title: `Watch ${fileName} - WalkFiles`,
    description: `Stream and preview ${fileName} with high-speed direct CDN links and zero limits on WalkFiles.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function EmbedPage({ params }: PageProps) {
  const segments = params.id || [];
  if (segments.length === 0) {
    notFound();
  }

  const { embedUrl, fileName, cleanPath } = parseEmbedTarget(segments);

  if (!cleanPath) {
    notFound();
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-app)',
      }}
    >
      {/* Dynamic Header */}
      <Navbar isMinimal={true} />

      <main
        style={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
        }}
      >
        <EmbedDetails
          embedUrl={embedUrl}
          fileName={fileName}
          cleanPath={cleanPath}
        />
      </main>

      {/* Standard File Content Footer with Abuse & DMCA links to admin@walkfiles.com */}
      <FileContentFooter fileName={fileName} fileId={cleanPath} />
    </div>
  );
}
