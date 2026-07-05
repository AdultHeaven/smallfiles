import { NextResponse } from 'next/server';
import { validateEvent, WebhookVerificationError } from '@polar-sh/sdk/webhooks';
import { createAdminClient } from '../../../../lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = await request.text();
  const headers = Object.fromEntries(request.headers.entries());
  const secret = process.env.POLAR_WEBHOOK_SECRET;

  if (!secret) {
    console.error('POLAR_WEBHOOK_SECRET is not configured.');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  let event: any;
  try {
    event = validateEvent(body, headers, secret);
  } catch (err) {
    if (err instanceof WebhookVerificationError) {
      console.warn('Webhook verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 403 });
    }
    console.error('Error validating Polar webhook event:', err);
    return NextResponse.json({ error: 'Validation error.' }, { status: 400 });
  }

  const { type, data } = event;
  console.log(`Received Polar webhook event: ${type}`);

  // Create the reverse mapping of product IDs to plan IDs
  const PRODUCT_PLAN_MAP: Record<string, string> = {};
  if (process.env.POLAR_PRODUCT_ID_STARTER) {
    PRODUCT_PLAN_MAP[process.env.POLAR_PRODUCT_ID_STARTER] = 'starter';
  }
  if (process.env.POLAR_PRODUCT_ID_PRO) {
    PRODUCT_PLAN_MAP[process.env.POLAR_PRODUCT_ID_PRO] = 'pro';
  }
  if (process.env.POLAR_PRODUCT_ID_ELITE) {
    PRODUCT_PLAN_MAP[process.env.POLAR_PRODUCT_ID_ELITE] = 'elite';
  }

  const supabase = createAdminClient();

  try {
    switch (type) {
      case 'subscription.created':
      case 'subscription.updated':
      case 'subscription.active': {
        const customer = data.customer;
        const externalCustomerId = customer?.externalId || customer?.external_id;
        const productId = data.productId || data.product_id;
        const status = data.status;

        if (!externalCustomerId) {
          console.warn('No external customer ID associated with subscription:', data.id);
          return NextResponse.json({ received: true });
        }

        const targetPlan = PRODUCT_PLAN_MAP[productId];
        if (!targetPlan) {
          console.warn('Unknown Polar product ID:', productId);
          return NextResponse.json({ received: true });
        }

        // Check if the subscription is active or trialing
        if (status === 'active' || status === 'trialing') {
          // Upgrade user in DB
          const { error } = await supabase
            .from('profiles')
            .update({ plan_id: targetPlan, updated_at: new Date().toISOString() })
            .eq('id', externalCustomerId);

          if (error) {
            console.error(`Failed to upgrade user ${externalCustomerId} to ${targetPlan}:`, error);
            return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
          }
          console.log(`Successfully upgraded user ${externalCustomerId} to plan: ${targetPlan}`);
        } else if (status === 'canceled' || status === 'unpaid' || status === 'incomplete_expired') {
          // Downgrade user in DB
          const { error } = await supabase
            .from('profiles')
            .update({ plan_id: 'free', updated_at: new Date().toISOString() })
            .eq('id', externalCustomerId);

          if (error) {
            console.error(`Failed to downgrade user ${externalCustomerId}:`, error);
            return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
          }
          console.log(`Successfully downgraded user ${externalCustomerId} to plan: free`);
        }
        break;
      }

      case 'subscription.revoked': {
        const customer = data.customer;
        const externalCustomerId = customer?.externalId || customer?.external_id;

        if (!externalCustomerId) {
          console.warn('No external customer ID associated with subscription revocation:', data.id);
          return NextResponse.json({ received: true });
        }

        // Revocation always downgrades user to free
        const { error } = await supabase
          .from('profiles')
          .update({ plan_id: 'free', updated_at: new Date().toISOString() })
          .eq('id', externalCustomerId);

        if (error) {
          console.error(`Failed to revoke access / downgrade user ${externalCustomerId}:`, error);
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
        }
        console.log(`Successfully revoked access and downgraded user ${externalCustomerId} to free`);
        break;
      }

      default:
        console.log(`Unhandled webhook event type: ${type}`);
    }

    return NextResponse.json({ received: true });
  } catch (dbErr) {
    console.error('Database error processing webhook:', dbErr);
    return NextResponse.json({ error: 'Database processing error' }, { status: 500 });
  }
}
