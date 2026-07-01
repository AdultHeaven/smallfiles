// lib/r2/upload.ts
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2Client, BUCKET_NAME } from './client';

interface SignedUploadParams {
  key: string;
  contentType: string;
  expiresInSeconds?: number;
}

/**
 * Generates a presigned upload URL for direct browser uploads.
 */
export async function getSignedUploadUrl({
  key,
  contentType,
  expiresInSeconds = 3600, // 1 hour default
}: SignedUploadParams): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(r2Client, command, { expiresIn: expiresInSeconds });
}
