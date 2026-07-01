// lib/r2/client.ts
import { S3Client } from '@aws-sdk/client-s3';

if (typeof window !== 'undefined') {
  throw new Error('R2 S3 Client should only be loaded on the server.');
}

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || '';
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || '';
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || '';

// Fallback client for build phase to prevent module import crash
export const r2Client = new S3Client({
  region: 'auto',
  endpoint: R2_ACCOUNT_ID ? `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com` : 'https://dummy.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID || 'dummy',
    secretAccessKey: R2_SECRET_ACCESS_KEY || 'dummy',
  },
});

export const BUCKET_NAME = process.env.R2_BUCKET || 'walkfiles';

