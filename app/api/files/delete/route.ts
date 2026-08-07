// app/api/files/delete/route.ts
import { NextResponse } from 'next/server';
import { createServerSideClient } from '../../../../lib/supabase/server';
import { FileRepository } from '../../../../repositories/file.repository';
import { ProfileRepository } from '../../../../repositories/profile.repository';
import { deleteObject } from '../../../../lib/r2';

export async function POST(request: Request) {
  try {
    const supabase = createServerSideClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { fileId } = await request.json();

    if (!fileId) {
      return NextResponse.json({ error: 'Missing fileId.' }, { status: 400 });
    }

    const fileRepo = new FileRepository();
    const profileRepo = new ProfileRepository();

    const file = await fileRepo.getFileById(fileId);

    if (!file) {
      return NextResponse.json({ error: 'File not found.' }, { status: 404 });
    }

    if (file.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden. You do not own this file.' }, { status: 403 });
    }

    // 1. Delete from object storage
    try {
      await deleteObject(file.r2_key);
    } catch (r2Error) {
      console.error('Error deleting object from R2 (proceeding anyway):', r2Error);
    }

    // 2. Delete from Supabase DB
    const success = await fileRepo.deleteFile(fileId, user.id);

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete file from database.' }, { status: 500 });
    }

    // 3. Subtract from user storage used
    await profileRepo.updateStorageUsed(user.id, -file.size);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Error deleting file:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
