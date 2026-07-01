// app/api/abuse-reports/route.ts
import { NextResponse } from 'next/server';
import { FileRepository } from '../../../repositories/file.repository';

export async function POST(request: Request) {
  try {
    const { fileId, reason } = await request.json();

    if (!fileId || !reason) {
      return NextResponse.json({ error: 'Missing required parameters: fileId, reason' }, { status: 400 });
    }

    const fileRepo = new FileRepository();
    
    // Get reporter IP address from headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';

    const success = await fileRepo.submitAbuseReport(fileId, reason, ip);

    if (!success) {
      return NextResponse.json({ error: 'Failed to record report.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Error submitting abuse report:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
