// lib/r2/download.ts
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2Client, BUCKET_NAME } from './client';

interface DownloadUrlParams {
  key: string;
  isPublic?: boolean;
  expiresInSeconds?: number;
  filename?: string;
}

/**
 * Returns either a direct public CDN download URL or a presigned private URL.
 */
export async function getDownloadUrl({
  key,
  isPublic = true,
  expiresInSeconds = 3600, // 1 hour default
  filename,
}: DownloadUrlParams): Promise<string> {
  if (isPublic && process.env.R2_PUBLIC_URL) {
    const baseUrl = process.env.R2_PUBLIC_URL.replace(/\/$/, '');
    const url = `${baseUrl}/${key}`;
    return filename ? `${url}?filename=${encodeURIComponent(filename)}` : url;
  }

  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ResponseContentDisposition: filename
      ? `attachment; filename="${encodeURIComponent(filename)}"`
      : undefined,
  });

  return getSignedUrl(r2Client, command, { expiresIn: expiresInSeconds });
}
