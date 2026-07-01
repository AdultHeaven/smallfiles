// app/api/files/route.ts
import { NextResponse } from 'next/server';
import { createServerSideClient } from '../../../lib/supabase/server';
import { FileRepository } from '../../../repositories/file.repository';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') ?? '';
    const limit = Math.min(50, parseInt(searchParams.get('limit') ?? '10'));
    const offset = parseInt(searchParams.get('offset') ?? '0');

    const supabase = createServerSideClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const fileRepo = new FileRepository();
    const result = await fileRepo.getFilesByUserId(user.id, { search, limit, offset });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Error fetching files:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
