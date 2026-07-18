-- schema.sql
-- WalkFiles Database Schema Setup
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create plans table
CREATE TABLE IF NOT EXISTS public.plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  storage_limit BIGINT NOT NULL,       -- total storage limit in bytes (5368709120 for 5GB)
  max_file_size BIGINT NOT NULL,       -- max size per file in bytes (157286400 for 150MB)
  daily_upload_limit INT NOT NULL,     -- maximum files allowed to upload in 24h
  retention_days INT NULL,             -- inactive retention period in days (NULL = never delete)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on plans
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to plans
CREATE POLICY "Anyone can view plans" 
  ON public.plans 
  FOR SELECT 
  USING (true);

-- Insert default free plan limits (5GB storage, 150MB max size, 50 daily uploads, no retention)
INSERT INTO public.plans (id, name, storage_limit, max_file_size, daily_upload_limit, retention_days)
VALUES ('free', 'Free', 5368709120, 157286400, 50, NULL)
ON CONFLICT (id) DO UPDATE 
SET 
  name = EXCLUDED.name,
  storage_limit = EXCLUDED.storage_limit,
  max_file_size = EXCLUDED.max_file_size,
  daily_upload_limit = EXCLUDED.daily_upload_limit,
  retention_days = EXCLUDED.retention_days;

-- Insert default pro plan limits (25GB storage, 2GB max file size, 50 daily uploads, NULL retention)
INSERT INTO public.plans (id, name, storage_limit, max_file_size, daily_upload_limit, retention_days)
VALUES ('pro', 'Pro', 26843545600, 2147483648, 50, NULL)
ON CONFLICT (id) DO UPDATE 
SET 
  name = EXCLUDED.name,
  storage_limit = EXCLUDED.storage_limit,
  max_file_size = EXCLUDED.max_file_size,
  daily_upload_limit = EXCLUDED.daily_upload_limit,
  retention_days = EXCLUDED.retention_days;


-- 2. Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  plan_id TEXT REFERENCES public.plans(id) DEFAULT 'free' NOT NULL,
  storage_used BIGINT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can read own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Create storage increment helper function
CREATE OR REPLACE FUNCTION public.increment_storage_used(user_id_param UUID, increment_by BIGINT)
RETURNS BIGINT AS $$
DECLARE
  new_storage BIGINT;
BEGIN
  UPDATE public.profiles
  SET storage_used = GREATEST(0, storage_used + increment_by),
      updated_at = timezone('utc'::text, now())
  WHERE id = user_id_param
  RETURNING storage_used INTO new_storage;
  RETURN new_storage;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create download count increment helper function
CREATE OR REPLACE FUNCTION public.increment_download_count(file_id_param UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.files
  SET download_count = download_count + 1,
      last_downloaded_at = timezone('utc'::text, now())
  WHERE id = file_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 3. Create PostgreSQL trigger to automatically create profile on sign-up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, plan_id, storage_used)
  VALUES (new.id, new.email, 'free', 0)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if it already exists, then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 4. Create files table
CREATE TABLE IF NOT EXISTS public.files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  original_name TEXT NOT NULL,
  extension TEXT,
  size BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  r2_key TEXT NOT NULL UNIQUE,
  download_count INT DEFAULT 0 NOT NULL,
  is_public BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NULL,
  deleted_at TIMESTAMP WITH TIME ZONE NULL,
  last_downloaded_at TIMESTAMP WITH TIME ZONE NULL
);

-- Enable RLS on files
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;

-- Create policies for files
CREATE POLICY "Users can read own files or public files" 
  ON public.files 
  FOR SELECT 
  USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can insert own files" 
  ON public.files 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update own files" 
  ON public.files 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own files" 
  ON public.files 
  FOR DELETE 
  USING (auth.uid() = user_id);


-- 5. Create database indexes on files
CREATE INDEX IF NOT EXISTS idx_files_user_id ON public.files(user_id);
CREATE INDEX IF NOT EXISTS idx_files_created_at_desc ON public.files(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_files_is_public ON public.files(is_public);


-- 6. Create abuse_reports table
CREATE TABLE IF NOT EXISTS public.abuse_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_id UUID REFERENCES public.files ON DELETE CASCADE NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  reporter_ip TEXT
);

-- Enable RLS on abuse_reports
ALTER TABLE public.abuse_reports ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting abuse reports
CREATE POLICY "Anyone can insert abuse reports" 
  ON public.abuse_reports 
  FOR INSERT 
  WITH CHECK (true);


-- 7. Create inactive files retrieval helper function
CREATE OR REPLACE FUNCTION public.get_expired_files()
RETURNS TABLE (
  id UUID,
  user_id UUID,
  r2_key TEXT,
  size BIGINT,
  original_name TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT f.id, f.user_id, f.r2_key, f.size, f.original_name
  FROM public.files f
  JOIN public.profiles pr ON f.user_id = pr.id
  JOIN public.plans p ON pr.plan_id = p.id
  WHERE p.retention_days IS NOT NULL
    AND COALESCE(f.last_downloaded_at, f.created_at) < (timezone('utc'::text, now()) - (p.retention_days || ' days')::INTERVAL);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 8. Migration: Update plans table for WalkFiles pricing tier additions
-- Run this block in the Supabase SQL Editor if you are upgrading from an older version.
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS price_monthly NUMERIC(10,2);
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS storage_bytes BIGINT;
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS max_file_size_bytes BIGINT;
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS ads_enabled BOOLEAN DEFAULT true;
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS download_speed_tier TEXT DEFAULT 'basic';
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS priority_support BOOLEAN DEFAULT false;
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS analytics_level TEXT DEFAULT 'none';
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS password_links BOOLEAN DEFAULT false;
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS link_expiration BOOLEAN DEFAULT false;
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS bulk_upload BOOLEAN DEFAULT false;
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS early_access BOOLEAN DEFAULT false;
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;

-- Update the existing plans with new columns
UPDATE public.plans 
SET 
  slug = 'free',
  price_monthly = 0.00,
  storage_bytes = 5368709120,
  max_file_size_bytes = 157286400,
  retention_days = NULL,
  ads_enabled = true,
  download_speed_tier = 'basic',
  priority_support = false,
  analytics_level = 'none',
  password_links = false,
  link_expiration = false,
  bulk_upload = false,
  early_access = false,
  active = true,
  sort_order = 0
WHERE id = 'free';

UPDATE public.plans 
SET 
  slug = 'pro',
  price_monthly = 4.99,
  storage_limit = 107374184000, -- 100 GB
  max_file_size = 2147483648, -- 2 GB
  storage_bytes = 107374184000, -- 100 GB
  max_file_size_bytes = 2147483648, -- 2 GB
  daily_upload_limit = 50,
  ads_enabled = false,
  download_speed_tier = 'highest',
  priority_support = false,
  analytics_level = 'advanced',
  password_links = true,
  link_expiration = true,
  bulk_upload = true,
  early_access = true,
  active = true,
  sort_order = 2
WHERE id = 'pro';

-- Insert Starter plan limits (25GB storage, 2GB max file size, 50 daily uploads, no retention)
INSERT INTO public.plans (id, name, slug, price_monthly, storage_limit, max_file_size, storage_bytes, max_file_size_bytes, daily_upload_limit, retention_days, ads_enabled, download_speed_tier, priority_support, analytics_level, password_links, link_expiration, bulk_upload, early_access, active, sort_order)
VALUES ('starter', 'Starter', 'starter', 1.49, 26843545600, 2147483648, 26843545600, 2147483648, 50, NULL, false, 'fast', false, 'basic', true, true, false, false, true, 1)
ON CONFLICT (id) DO UPDATE
SET 
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  price_monthly = EXCLUDED.price_monthly,
  storage_limit = EXCLUDED.storage_limit,
  max_file_size = EXCLUDED.max_file_size,
  daily_upload_limit = EXCLUDED.daily_upload_limit,
  retention_days = EXCLUDED.retention_days,
  ads_enabled = EXCLUDED.ads_enabled,
  download_speed_tier = EXCLUDED.download_speed_tier,
  priority_support = EXCLUDED.priority_support,
  analytics_level = EXCLUDED.analytics_level,
  password_links = EXCLUDED.password_links,
  link_expiration = EXCLUDED.link_expiration,
  bulk_upload = EXCLUDED.bulk_upload,
  early_access = EXCLUDED.early_access,
  active = EXCLUDED.active,
  sort_order = EXCLUDED.sort_order;

-- Insert Elite plan limits (500GB storage, 2GB max file size, 50 daily uploads, no retention)
INSERT INTO public.plans (id, name, slug, price_monthly, storage_limit, max_file_size, storage_bytes, max_file_size_bytes, daily_upload_limit, retention_days, ads_enabled, download_speed_tier, priority_support, analytics_level, password_links, link_expiration, bulk_upload, early_access, active, sort_order)
VALUES ('elite', 'Elite', 'elite', 19.99, 536870912000, 2147483648, 536870912000, 2147483648, 50, NULL, false, 'premium', true, 'advanced', true, true, true, true, true, 3)
ON CONFLICT (id) DO UPDATE
SET 
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  price_monthly = EXCLUDED.price_monthly,
  storage_limit = EXCLUDED.storage_limit,
  max_file_size = EXCLUDED.max_file_size,
  storage_bytes = EXCLUDED.storage_bytes,
  max_file_size_bytes = EXCLUDED.max_file_size_bytes,
  daily_upload_limit = EXCLUDED.daily_upload_limit,
  retention_days = EXCLUDED.retention_days,
  ads_enabled = EXCLUDED.ads_enabled,
  download_speed_tier = EXCLUDED.download_speed_tier,
  priority_support = EXCLUDED.priority_support,
  analytics_level = EXCLUDED.analytics_level,
  password_links = EXCLUDED.password_links,
  link_expiration = EXCLUDED.link_expiration,
  bulk_upload = EXCLUDED.bulk_upload,
  early_access = EXCLUDED.early_access,
  active = EXCLUDED.active,
  sort_order = EXCLUDED.sort_order;
 
 
-- 9. Migration: Add short_code column to files table
ALTER TABLE public.files ADD COLUMN IF NOT EXISTS short_code TEXT UNIQUE;
CREATE INDEX IF NOT EXISTS idx_files_short_code ON public.files(short_code);
