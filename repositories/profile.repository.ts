// repositories/profile.repository.ts
import { createAdminClient } from '../lib/supabase/admin';

export interface Plan {
  id: string;
  name: string;
  slug: string;
  price_monthly: number;
  storage_limit: number;
  max_file_size: number;
  daily_upload_limit: number;
  retention_days: number | null;
  ads_enabled: boolean;
  download_speed_tier: string;
  priority_support: boolean;
  analytics_level: string;
  password_links: boolean;
  link_expiration: boolean;
  bulk_upload: boolean;
  early_access: boolean;
  active: boolean;
  sort_order: number;
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

export function mapPlanDetails(p: any): Plan {
  if (!p) return {} as Plan;
  
  const defaults: Record<string, Partial<Plan>> = {
    free: {
      slug: 'free',
      price_monthly: 0,
      storage_limit: 53687091200,
      max_file_size: 157286400,
      daily_upload_limit: 50,
      retention_days: null,
      ads_enabled: true,
      download_speed_tier: 'basic',
      priority_support: false,
      analytics_level: 'none',
      password_links: false,
      link_expiration: false,
      bulk_upload: false,
      early_access: false,
      active: true,
      sort_order: 0
    },
    starter: {
      slug: 'starter',
      price_monthly: 1.49,
      storage_limit: 26843545600,
      max_file_size: 2147483648,
      daily_upload_limit: 50,
      retention_days: null,
      ads_enabled: false,
      download_speed_tier: 'fast',
      priority_support: false,
      analytics_level: 'basic',
      password_links: true,
      link_expiration: true,
      bulk_upload: false,
      early_access: false,
      active: true,
      sort_order: 1
    },
    pro: {
      slug: 'pro',
      price_monthly: 4.99,
      storage_limit: 107374182400,
      max_file_size: 2147483648,
      daily_upload_limit: 50,
      retention_days: null,
      ads_enabled: false,
      download_speed_tier: 'highest',
      priority_support: false,
      analytics_level: 'advanced',
      password_links: true,
      link_expiration: true,
      bulk_upload: true,
      early_access: true,
      active: true,
      sort_order: 2
    },
    elite: {
      slug: 'elite',
      price_monthly: 19.99,
      storage_limit: 536870912000,
      max_file_size: 2147483648,
      daily_upload_limit: 50,
      retention_days: null,
      ads_enabled: false,
      download_speed_tier: 'premium',
      priority_support: true,
      analytics_level: 'advanced',
      password_links: true,
      link_expiration: true,
      bulk_upload: true,
      early_access: true,
      active: true,
      sort_order: 3
    }
  };

  const planId = p.id || 'free';
  const planDefault = defaults[planId] || defaults.free;

  return {
    id: p.id,
    name: p.name || planDefault.name || 'Free',
    slug: p.slug || planDefault.slug || 'free',
    price_monthly: typeof p.price_monthly === 'number' ? p.price_monthly : Number(p.price_monthly || planDefault.price_monthly || 0),
    storage_limit: typeof p.storage_limit === 'number' ? p.storage_limit : (typeof p.storage_bytes === 'number' ? p.storage_bytes : Number(p.storage_limit || p.storage_bytes || planDefault.storage_limit || 53687091200)),
    max_file_size: typeof p.max_file_size === 'number' ? p.max_file_size : (typeof p.max_file_size_bytes === 'number' ? p.max_file_size_bytes : Number(p.max_file_size || p.max_file_size_bytes || planDefault.max_file_size || 157286400)),
    daily_upload_limit: typeof p.daily_upload_limit === 'number' ? p.daily_upload_limit : Number(p.daily_upload_limit || planDefault.daily_upload_limit || 50),
    retention_days: p.retention_days !== undefined ? p.retention_days : (planDefault.retention_days ?? null),
    ads_enabled: p.ads_enabled !== undefined ? p.ads_enabled : (planDefault.ads_enabled ?? true),
    download_speed_tier: p.download_speed_tier || planDefault.download_speed_tier || 'basic',
    priority_support: p.priority_support !== undefined ? p.priority_support : (planDefault.priority_support ?? false),
    analytics_level: p.analytics_level || planDefault.analytics_level || 'none',
    password_links: p.password_links !== undefined ? p.password_links : (planDefault.password_links ?? false),
    link_expiration: p.link_expiration !== undefined ? p.link_expiration : (planDefault.link_expiration ?? false),
    bulk_upload: p.bulk_upload !== undefined ? p.bulk_upload : (planDefault.bulk_upload ?? false),
    early_access: p.early_access !== undefined ? p.early_access : (planDefault.early_access ?? false),
    active: p.active !== undefined ? p.active : (planDefault.active ?? true),
    sort_order: typeof p.sort_order === 'number' ? p.sort_order : (planDefault.sort_order ?? 0),
  };
}

export class ProfileRepository {
  private supabase = createAdminClient();

  /**
   * Retrieves all available plans from the database, sorted by their order.
   */
  async getAllPlans(): Promise<Plan[]> {
    const { data, error } = await this.supabase
      .from('plans')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      // Return hardcoded default plans list if table is empty or column missing
      return [
        mapPlanDetails({ id: 'free', name: 'Free' }),
        mapPlanDetails({ id: 'starter', name: 'Starter' }),
        mapPlanDetails({ id: 'pro', name: 'Pro' }),
        mapPlanDetails({ id: 'elite', name: 'Elite' }),
      ];
    }

    return data.map(item => mapPlanDetails(item));
  }

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

    const profileData = data as any;
    profileData.plan = mapPlanDetails(profileData.plan);

    return profileData as ProfileWithPlan;
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
