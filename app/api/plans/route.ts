// app/api/plans/route.ts
import { NextResponse } from 'next/server';
import { ProfileRepository } from '../../../repositories/profile.repository';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const profileRepo = new ProfileRepository();
    const plans = await profileRepo.getAllPlans();
    return NextResponse.json(plans);
  } catch (err: any) {
    console.error('Error fetching plans in API:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
