import { chromium } from 'playwright';

const BASE = 'https://fat7t-5er.vercel.app';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Login
  await page.goto(`${BASE}/en/admin/login`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, 2000));

  const emailInput = await page.$('input[type="email"], input[name="email"]');
  const passwordInput = await page.$('input[type="password"]');
  if (emailInput && passwordInput) {
    await emailInput.fill('super@fat7t5er.com');
    await passwordInput.fill('Admin@123456');
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) await submitBtn.click();
  }
  await new Promise(r => setTimeout(r, 5000));

  // Test media API
  const result = await page.evaluate(async () => {
    try {
      const res = await fetch('/api/admin/media');
      const text = await res.text();
      return { status: res.status, body: text.substring(0, 2000) };
    } catch (e) {
      return { status: 0, body: e.message };
    }
  });

  console.log('=== Media API Test ===');
  console.log('Status:', result.status);
  console.log('Body:', result.body);

  await browser.close();
}

main().catch(e => console.error(e));
