// app/api/profile/route.ts
import { NextResponse } from 'next/server';
import { createServerSideClient } from '../../../lib/supabase/server';
import { ProfileRepository } from '../../../repositories/profile.repository';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createServerSideClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const profileRepo = new ProfileRepository();
    const profile = await profileRepo.getProfileWithPlan(user.id);

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found.' }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (err: any) {
    console.error('Error in profile API:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
