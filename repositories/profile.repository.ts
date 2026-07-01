// repositories/profile.repository.ts
import { createAdminClient } from '../lib/supabase/admin';

export interface Plan {
  id: string;
  name: string;
  storage_limit: number;
  max_file_size: number;
  daily_upload_limit: number;
  retention_days: number | null;
}

export interface ProfileWithPlan {
  id: string;
  email: string;
  plan_id: string;
  storage_used: number;
  created_at: string;
  updated_at: string;
  plan: Plan;
}

export class ProfileRepository {
  private supabase = createAdminClient();

  /**
   * Retrieves a user profile combined with their active plan limitations.
   */
  async getProfileWithPlan(userId: string): Promise<ProfileWithPlan | null> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select(`
        *,
        plan:plans(*)
      `)
      .eq('id', userId)
      .single();

    if (error || !data) {
      console.error('Error fetching profile with plan:', error);
      return null;
    }

    return data as unknown as ProfileWithPlan;
  }

  /**
   * Updates the user's storage usage in the database.
   * Can accept positive or negative values (for file additions or deletions).
   */
  async updateStorageUsed(userId: string, bytesChange: number): Promise<number | null> {
    // We fetch current storage_used, modify it, and update it.
    // In PostgreSQL, doing it in a single transaction or query avoids race conditions.
    const { data, error } = await this.supabase.rpc('increment_storage_used', {
      user_id_param: userId,
      increment_by: bytesChange,
    });

    if (error) {
      // If RPC is not set up, fall back to select-then-update
      const profile = await this.getProfileWithPlan(userId);
      if (!profile) return null;

      const newStorage = Math.max(0, Number(profile.storage_used) + bytesChange);
      const { error: updateError } = await this.supabase
        .from('profiles')
        .update({ storage_used: newStorage, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (updateError) {
        console.error('Error fallback updating storage used:', updateError);
        return null;
      }
      return newStorage;
    }

    return data as number;
  }

  /**
   * Retrieves the number of uploads completed by a user in the last 24 hours.
   */
  async getDailyUploadCount(userId: string): Promise<number> {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const { count, error } = await this.supabase
      .from('files')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', oneDayAgo.toISOString());

    if (error) {
      console.error('Error counting daily uploads:', error);
      return 0;
    }

    return count || 0;
  }

  /**
   * Retrieves the current number of files owned by the user.
   */
  async getTotalFileCount(userId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('files')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error) {
      console.error('Error counting total files:', error);
      return 0;
    }

    return count || 0;
  }
}
