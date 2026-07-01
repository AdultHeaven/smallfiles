// app/api/files/download/[id]/route.ts
import { NextResponse } from 'next/server';
import { FileRepository } from '../../../../../repositories/file.repository';
import { getDownloadUrl } from '../../../../../lib/r2';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: 'Missing file ID.' }, { status: 400 });
    }

    const fileRepo = new FileRepository();
    const file = await fileRepo.getFileById(id);

    if (!file) {
      return NextResponse.json({ error: 'File not found.' }, { status: 404 });
    }

    // 1. Increment download count
    await fileRepo.incrementDownloadCount(id);

    // 2. Resolve R2 download URL
    const downloadUrl = await getDownloadUrl({
      key: file.r2_key,
      isPublic: file.is_public,
      filename: file.original_name,
    });

    // 3. Redirect user directly to download destination
    return NextResponse.redirect(downloadUrl);
  } catch (err: any) {
    console.error('Error during download redirect:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
