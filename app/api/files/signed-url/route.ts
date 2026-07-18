// app/api/files/signed-url/route.ts
import { NextResponse } from 'next/server';
import { createServerSideClient } from '../../../../lib/supabase/server';
import { ProfileRepository } from '../../../../repositories/profile.repository';
import { getSignedUploadUrl } from '../../../../lib/r2';

export async function POST(request: Request) {
  try {
    const supabase = createServerSideClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    const { filename, fileSize, contentType } = await request.json();

    if (!filename || !fileSize || !contentType) {
      return NextResponse.json({ error: 'Missing required parameters: filename, fileSize, contentType' }, { status: 400 });
    }

    const profileRepo = new ProfileRepository();
    const profile = await profileRepo.getProfileWithPlan(user.id);

    if (!profile) {
      return NextResponse.json({ error: 'User profile not found.' }, { status: 404 });
    }

    const plan = profile.plan;

    // 1. Check max file size
    if (fileSize > plan.max_file_size) {
      const maxMB = (plan.max_file_size / (1024 * 1024)).toFixed(0);
      return NextResponse.json(
        { error: `File size exceeds the maximum limit of ${maxMB}MB for your plan.` },
        { status: 400 }
      );
    }

    // 2. Check total storage limit
    const projectedStorage = Number(profile.storage_used) + fileSize;
    if (projectedStorage > plan.storage_limit) {
      return NextResponse.json(
        { error: `Not enough storage. You need ${(fileSize / (1024 * 1024)).toFixed(2)}MB, but you only have ${((plan.storage_limit - Number(profile.storage_used)) / (1024 * 1024)).toFixed(2)}MB free.` },
        { status: 400 }
      );
    }



    // 4. Check daily upload limit (enforced on all plans)
    const dailyUploads = await profileRepo.getDailyUploadCount(user.id);
    if (dailyUploads >= plan.daily_upload_limit) {
      return NextResponse.json(
        { error: `Daily upload limit reached. You can upload up to ${plan.daily_upload_limit} files per 24 hours.` },
        { status: 400 }
      );
    }

    // Generate unique key and signed upload URL
    const ext = filename.split('.').pop() || '';
    const uniqueKey = `${crypto.randomUUID()}${ext ? `.${ext}` : ''}`;
    const signedUrl = await getSignedUploadUrl({
      key: uniqueKey,
      contentType,
    });

    return NextResponse.json({
      signedUrl,
      key: uniqueKey,
    });
  } catch (err: any) {
    console.error('Error generating signed url:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
