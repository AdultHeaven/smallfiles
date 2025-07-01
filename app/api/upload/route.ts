// Location: app/api/upload/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  const storageZone = process.env.BUNNY_STORAGE_ZONE;
  const accessKey = process.env.BUNNY_STORAGE_ZONE_PASSWORD;
  const pullZoneHostname = process.env.BUNNY_PULL_ZONE_HOSTNAME;

  if (!storageZone || !accessKey || !pullZoneHostname) {
    console.error('Missing Bunny CDN environment variables');
    return NextResponse.json(
      { error: 'Server configuration error.' },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const clientFilename = formData.get('filename') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    // If client provided a filename, use it. Else, generate a new UUID name.
    const fallbackExt = file.name.split('.').pop() || 'bin';
    const finalFilename = clientFilename || `${randomUUID()}.${fallbackExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadUrl = `https://storage.bunnycdn.com/${storageZone}/${finalFilename}`;

    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        AccessKey: accessKey,
        'Content-Type': 'application/octet-stream',
      },
      body: buffer,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Bunny CDN upload failed:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      return NextResponse.json(
        { error: 'Failed to upload file.', details: errorText },
        { status: response.status }
      );
    }

    const publicUrl = `https://${pullZoneHostname}/${finalFilename}`;
    return NextResponse.json({ url: publicUrl });

  } catch (err) {
    console.error('Unexpected error during upload:', err);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
