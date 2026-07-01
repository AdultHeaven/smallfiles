// app/api/files/create/route.ts
import { NextResponse } from 'next/server';
import { createServerSideClient } from '../../../../lib/supabase/server';
import { FileRepository } from '../../../../repositories/file.repository';
import { ProfileRepository } from '../../../../repositories/profile.repository';

export async function POST(request: Request) {
  try {
    const supabase = createServerSideClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { name, size, mimeType, r2Key, isPublic = true } = await request.json();

    if (!name || !size || !mimeType || !r2Key) {
      return NextResponse.json({ error: 'Missing required metadata.' }, { status: 400 });
    }

    const fileRepo = new FileRepository();
    const profileRepo = new ProfileRepository();

    const ext = name.split('.').pop() || null;

    // Create the DB record
    const newFile = await fileRepo.createFile({
      user_id: user.id,
      name,
      original_name: name,
      extension: ext,
      size,
      mime_type: mimeType,
      r2_key: r2Key,
      is_public: isPublic,
    });

    if (!newFile) {
      return NextResponse.json({ error: 'Failed to record file details.' }, { status: 500 });
    }

    // Increment user storage used
    await profileRepo.updateStorageUsed(user.id, size);

    return NextResponse.json(newFile);
  } catch (err: any) {
    console.error('Error registering file:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
