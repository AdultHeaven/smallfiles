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

export async function POST(request: Request) {
  try {
    const supabase = createServerSideClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { planId } = await request.json();
    if (!planId) {
      return NextResponse.json({ error: 'Missing target planId.' }, { status: 400 });
    }

    const profileRepo = new ProfileRepository();
    const profile = await profileRepo.getProfileWithPlan(user.id);
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found.' }, { status: 404 });
    }

    // Fetch all plans to locate target plan limits
    const plans = await profileRepo.getAllPlans();
    const targetPlan = plans.find(p => p.id === planId);

    if (!targetPlan) {
      return NextResponse.json({ error: 'Target plan not found.' }, { status: 404 });
    }

    // Verify storage bounds if downgrading
    if (Number(profile.storage_used) > targetPlan.storage_limit) {
      const usedMB = (Number(profile.storage_used) / (1024 * 1024)).toFixed(1);
      const limitMB = (targetPlan.storage_limit / (1024 * 1024)).toFixed(1);
      return NextResponse.json({
        error: `Cannot downgrade plan. Your current storage usage (${usedMB} MB) exceeds the target plan's storage limit (${limitMB} MB). Please delete some files first.`
      }, { status: 400 });
    }

    // Update the profile's plan_id
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ plan_id: planId, updated_at: new Date().toISOString() })
      .eq('id', user.id);

    if (updateError) {
      console.error('Error switching user plan:', updateError);
      return NextResponse.json({ error: 'Failed to update plan. Please try again.' }, { status: 500 });
    }

    // Fetch updated profile
    const updatedProfile = await profileRepo.getProfileWithPlan(user.id);
    return NextResponse.json({
      success: true,
      message: `Plan changed successfully to ${targetPlan.name}.`,
      profile: updatedProfile
    });
  } catch (err: any) {
    console.error('Error switching plan:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
