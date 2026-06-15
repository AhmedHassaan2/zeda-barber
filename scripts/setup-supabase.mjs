import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env.local')
const envContent = readFileSync(envPath, 'utf-8')
const envVars = Object.fromEntries(
  envContent.split('\n').filter(Boolean).map(l => {
    const eq = l.indexOf('=')
    return eq > 0 ? [l.slice(0, eq).trim(), l.slice(eq + 1).trim()] : null
  }).filter(Boolean)
)

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = envVars.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function createBuckets() {
  for (const name of ['service-images', 'gallery-images', 'hairstyle-images', 'team-images']) {
    const { error } = await supabase.storage.createBucket(name, {
      public: true,
      fileSizeLimit: 5242880,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    })
    if (error && !error.message.includes('already exists')) console.error(`  ✗ ${name}: ${error.message}`)
    else console.log(`  ✓ ${name}`)
  }
}

async function createAdminUser() {
  const email = 'admin@zeda.com'
  const password = 'ZedaAdmin2024!'
  const { data: existing } = await supabase.auth.admin.listUsers()
  const found = existing?.users?.find(u => u.email === email)
  if (found) {
    console.log(`  ✓ Admin user exists: ${email}`)
    return
  }
  const { error } = await supabase.auth.admin.createUser({
    email, password, email_confirm: true,
  })
  if (error) console.error(`  ✗ Admin user: ${error.message}`)
  else console.log(`  ✓ Admin: ${email} / ${password}`)
}

async function seedServices() {
  const services = [
    { title_ar: 'حلاقة شعر كلاسيكية', title_en: 'Classic Haircut', description_ar: 'حلاقة عصرية بتقنيات كلاسيكية احترافية', order_index: 1 },
    { title_ar: 'تهذيب وتصفيف اللحية', title_en: 'Beard Grooming', description_ar: 'تشذيب وتصفيف اللحية بأعلى دقة', order_index: 2 },
    { title_ar: 'عناية كاملة بالوجه', title_en: 'Facial Care', description_ar: 'جلسة عناية متكاملة للبشرة', order_index: 3 },
    { title_ar: 'حلاقة شبابية عصرية', title_en: 'Modern Youth Cut', description_ar: 'أحدث صيحات الحلاقة الشبابية', order_index: 4 },
    { title_ar: 'قص أطفال', title_en: 'Kids Haircut', description_ar: 'قص شعر الأطفال بأسلوب لطيف', order_index: 5 },
    { title_ar: 'تنظيف عميق للبشرة', title_en: 'Deep Skin Cleaning', description_ar: 'إزالة الرؤوس السوداء وتنظيف عميق', order_index: 6 },
    { title_ar: 'بكيدج العريس', title_en: 'Groom Package', description_ar: 'باقة متكاملة ليوم زفافك', order_index: 7 },
  ]
  for (const s of services) {
    const { error } = await supabase.from('services').upsert(s, { onConflict: 'title_ar', ignoreDuplicates: true })
    if (error) console.error(`  ✗ ${s.title_ar}: ${error.message}`)
    else console.log(`  ✓ ${s.title_ar}`)
  }
}

async function main() {
  console.log('\n=== ZEDA Supabase Setup ===\n')
  console.log('Creating storage buckets...')
  await createBuckets()
  console.log('\nCreating admin user...')
  await createAdminUser()
  console.log('\nSeeding services...')
  await seedServices()
  console.log('\n✓ Setup complete!')
}

main().catch(console.error)
