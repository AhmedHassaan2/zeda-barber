-- =============================================
-- ZEDA BARBER SHOP - Database Schema
-- Run this in Supabase SQL Editor FIRST
-- Then run scripts/storage-policies.sql
-- =============================================
-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_ar TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  price DECIMAL(10,2),
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery items table
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT CHECK (type IN ('image', 'video')) DEFAULT 'image',
  image_url TEXT,
  video_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hairstyles (reference images for AI try-on)
CREATE TABLE IF NOT EXISTS hairstyles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  image_url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team members
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  role_ar TEXT DEFAULT '',
  role_en TEXT DEFAULT '',
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES
  ('site_name_ar', 'ط²ظٹط¯ط§ ظ„ظ„ط­ظ„ط§ظ‚ط©'),
  ('site_name_en', 'ZEDA BARBER SHOP'),
  ('whatsapp_booking', '0201069389235'),
  ('whatsapp_dev', '0201022677775'),
  ('address_ar', 'ظƒظپط±طھطµظپط§ - ظƒظپط±ط´ظƒط± - ظ‚ظ„ظٹظˆط¨ظٹط©'),
  ('address_en', 'Kafr Tasfa - Kafr Shukr - Al Qalyubia'),
  ('dev_name_ar', 'ط£ط­ظ…ط¯ ط­ط³ط§ظ†'),
  ('dev_name_en', 'Ahmed Hassaan'),
  ('dev_company', 'ط¥ظ†ط¬ط§ط² ظ…ظٹط¯ظٹط§')
ON CONFLICT (key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE hairstyles ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Public read hairstyles" ON hairstyles FOR SELECT USING (true);
CREATE POLICY "Public read team" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);

-- Authenticated admin full access policies
CREATE POLICY "Admin all services" ON services FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update services" ON services FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete services" ON services FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin all gallery" ON gallery_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update gallery" ON gallery_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete gallery" ON gallery_items FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin all hairstyles" ON hairstyles FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update hairstyles" ON hairstyles FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete hairstyles" ON hairstyles FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin all team" ON team_members FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update team" ON team_members FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete team" ON team_members FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin all settings" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update settings" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete settings" ON site_settings FOR DELETE USING (auth.role() = 'authenticated');