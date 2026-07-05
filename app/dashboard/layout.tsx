// app/dashboard/layout.tsx
import React from 'react';
import { redirect } from 'next/navigation';
import { createServerSideClient } from '../../lib/supabase/server';
import { ProfileRepository } from '../../repositories/profile.repository';
import Sidebar from '@/components/Sidebar';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSideClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const profileRepo = new ProfileRepository();
  const profile = await profileRepo.getProfileWithPlan(user.id);

  if (!profile) {
    // If the profile trigger is still executing or not completed, we can show a loader or create a temporary fallback
    redirect('/login?error=profile-not-found');
  }

  return (
    <div className="app-container">
      {/* Reusable Sidebar */}
      <Sidebar
        storageUsed={Number(profile.storage_used)}
        storageLimit={Number(profile.plan.storage_limit)}
        planId={profile.plan_id}
      />

      {/* Main Panel */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
