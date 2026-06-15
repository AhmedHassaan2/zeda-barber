-- =============================================
-- ZEDA BARBER SHOP - Supabase Setup Guide
-- =============================================
-- 
-- Step 1: Run supabase-schema.sql in SQL Editor
-- Step 2: Run this script in SQL Editor
-- Step 3: Create admin user from Auth dashboard
-- Step 4: Create storage buckets
--
-- =============================================

-- Storage bucket RLS policies
-- Create these AFTER creating buckets in the dashboard/API

-- Allow public read access to all storage objects
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id IN ('service-images', 'gallery-images', 'hairstyle-images', 'team-images'));

-- Allow authenticated users to upload/update/delete
CREATE POLICY "Authenticated upload" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND bucket_id IN ('service-images', 'gallery-images', 'hairstyle-images', 'team-images'));
CREATE POLICY "Authenticated update" ON storage.objects FOR UPDATE USING (auth.role() = 'authenticated' AND bucket_id IN ('service-images', 'gallery-images', 'hairstyle-images', 'team-images'));
CREATE POLICY "Authenticated delete" ON storage.objects FOR DELETE USING (auth.role() = 'authenticated' AND bucket_id IN ('service-images', 'gallery-images', 'hairstyle-images', 'team-images'));