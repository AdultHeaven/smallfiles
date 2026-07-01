// app/api/cron/cleanup/route.ts
import { NextResponse } from 'next/server';
import { createAdminClient } from '../../../../lib/supabase/admin';
import { deleteObject } from '../../../../lib/r2';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    const secretKey = process.env.CRON_SECRET || 'walkfiles-cleanup-default-key';

    // Simple security validation for triggering cleanups
    if (key !== secretKey) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const supabase = createAdminClient();

    // 1. Fetch all expired files based on their owners' plans
    const { data: expiredFiles, error: rpcError } = await supabase.rpc('get_expired_files');

    if (rpcError) {
      console.error('Error invoking get_expired_files RPC:', rpcError);
      return NextResponse.json({ error: 'Database RPC query failed.' }, { status: 500 });
    }

    if (!expiredFiles || expiredFiles.length === 0) {
      return NextResponse.json({ message: 'No expired files found for cleanup.', count: 0 });
    }

    console.log(`Starting cleanup for ${expiredFiles.length} expired files...`);
    const results = [];

    // 2. Perform cleanup actions for each file
    for (const file of expiredFiles) {
      const { id, user_id, r2_key, size, original_name } = file;

      try {
        // A. Remove object from R2
        await deleteObject(r2_key);

        // B. Remove metadata row from database
        const { error: dbDeleteErr } = await supabase
          .from('files')
          .delete()
          .eq('id', id);

        if (dbDeleteErr) {
          throw new Error(`DB Delete Error: ${dbDeleteErr.message}`);
        }

        // C. Update storage used on profile
        const { error: profileUpdateErr } = await supabase.rpc('increment_storage_used', {
          user_id_param: user_id,
          increment_by: -BigInt(size),
        });

        if (profileUpdateErr) {
          console.error(`Warning: failed to update storage size for user ${user_id}:`, profileUpdateErr.message);
        }

        results.push({ id, original_name, status: 'success' });
      } catch (err: any) {
        console.error(`Failed to clean up file ${original_name} (${id}):`, err.message || err);
        results.push({ id, original_name, status: 'failed', error: err.message || 'Unknown error' });
      }
    }

    return NextResponse.json({
      message: 'Cleanup job completed.',
      total_processed: expiredFiles.length,
      results,
    });
  } catch (error: any) {
    console.error('Global error in cleanup cron:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
