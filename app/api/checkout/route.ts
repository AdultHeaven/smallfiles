import { NextResponse } from 'next/server';
import { Polar } from '@polar-sh/sdk';
import { createServerSideClient } from '../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN || '',
  server: (process.env.POLAR_ENV as 'sandbox' | 'production') || 'sandbox',
});

// Map local database plan IDs to Polar Product ID environment variables
const PLAN_PRODUCT_MAP: Record<string, string | undefined> = {
  starter: process.env.POLAR_PRODUCT_ID_STARTER,
  pro: process.env.POLAR_PRODUCT_ID_PRO,
  elite: process.env.POLAR_PRODUCT_ID_ELITE,
};

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

    const productId = PLAN_PRODUCT_MAP[planId.toLowerCase()];
    if (!productId) {
      return NextResponse.json(
        { error: `Polar Product ID is not configured for plan: ${planId}` },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Create Polar checkout session
    const checkout = await polar.checkouts.create({
      products: [productId],
      successUrl: `${appUrl}/dashboard/settings?session_id={CHECKOUT_ID}`,
      // Pass the user's ID as external customer ID to link the customer to our database user
      externalCustomerId: user.id,
      customerEmail: user.email,
    });

    return NextResponse.json({
      success: true,
      url: checkout.url,
    });
  } catch (err: any) {
    console.error('Error creating Polar checkout session:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error.' },
      { status: 500 }
    );
  }
}
