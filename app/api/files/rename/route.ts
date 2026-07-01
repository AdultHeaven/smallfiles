// app/api/files/rename/route.ts
import { NextResponse } from 'next/server';
import { createServerSideClient } from '../../../../lib/supabase/server';
import { FileRepository } from '../../../../repositories/file.repository';

export async function POST(request: Request) {
  try {
    const supabase = createServerSideClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { fileId, newName } = await request.json();

    if (!fileId || !newName) {
      return NextResponse.json({ error: 'Missing fileId or newName.' }, { status: 400 });
    }

    const fileRepo = new FileRepository();

    const updatedFile = await fileRepo.renameFile(fileId, user.id, newName);

    if (!updatedFile) {
      return NextResponse.json({ error: 'Failed to rename file or access forbidden.' }, { status: 500 });
    }

    return NextResponse.json(updatedFile);
  } catch (err: any) {
    console.error('Error renaming file:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
