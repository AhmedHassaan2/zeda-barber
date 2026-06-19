import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { join } from "path";

const BASE = "https://zeda-barber.vercel.app";
const SCREENSHOT_DIR = join(process.cwd(), "screenshots");
mkdirSync(SCREENSHOT_DIR, { recursive: true });

const errors = [];

async function test(label, fn) {
  try {
    await fn();
    console.log(`  ✓ ${label}`);
  } catch (e) {
    console.log(`  ✗ ${label}: ${e.message}`);
    errors.push({ label, error: e.message });
  }
}

async function takeScreenshots(page, name) {
  const viewports = [
    { width: 375, height: 812, label: "mobile" },
    { width: 768, height: 1024, label: "tablet" },
    { width: 1280, height: 800, label: "desktop" },
    { width: 1920, height: 1080, label: "wide" },
  ];
  for (const vp of viewports) {
    await page.setViewportSize(vp);
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: join(SCREENSHOT_DIR, `${name}-${vp.label}.png`),
      fullPage: true,
    });
  }
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  console.log("\n=== HOMEPAGE TESTS ===");

  const desktopCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await desktopCtx.newPage();

  page.on("pageerror", (err) => errors.push({ label: "Page error", error: err.message }));

  await test("Loads homepage (200)", async () => {
    const res = await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
    if (!res || res.status() !== 200) throw new Error(`Status: ${res?.status()}`);
  });

  await test("Header with ZEDA logo", async () => {
    await page.waitForSelector('header img[alt="ZEDA"]', { timeout: 5000 });
  });

  await test("Hero video element", async () => {
    const video = page.locator("video");
    const count = await video.count();
    if (count === 0) throw new Error("No video element");
  });

  await test("Hero has large ZEDA logo", async () => {
    const heroLogo = page.locator("section").first().locator('img[alt="ZEDA"]');
    const count = await heroLogo.count();
    if (count === 0) throw new Error("No ZEDA logo in hero");
  });

  await test("Hero has 'سيب نفسك' in marquee strip", async () => {
    const text = page.locator("section").first().locator("text=سيب نفسك");
    await text.waitFor({ state: "visible", timeout: 5000 });
  });

  await test("Language toggle button exists in header", async () => {
    const langBtn = page.locator('header button:has-text("EN")');
    await langBtn.waitFor({ state: "visible", timeout: 5000 });
  });

  await test("Booking button links to /booking", async () => {
    const bookingBtn = page.locator('a[href="/booking"]').first();
    await bookingBtn.waitFor({ state: "visible", timeout: 5000 });
  });

  await test("Services section visible", async () => {
    await page.waitForSelector("text=خدماتنا", { timeout: 5000 });
    await page.waitForSelector("text=حلاقة شعر كلاسيكية", { timeout: 5000 });
  });

  await test("Services use icons (Material Symbols)", async () => {
    const icons = page.locator("section").filter({ hasText: "خدماتنا" }).locator(".material-symbols-outlined");
    const count = await icons.count();
    if (count < 7) throw new Error(`Only ${count} service icons`);
  });

  await test("Gallery section on homepage with 3 columns", async () => {
    await page.waitForSelector("text=معرض أعمالنا", { timeout: 5000 });
    const imgs = page.locator("section").filter({ hasText: "معرض أعمالنا" }).locator("img");
    const count = await imgs.count();
    if (count < 3) throw new Error(`Only ${count} gallery images on homepage`);
  });

  await test("Gallery images are grayscale on homepage", async () => {
    const gallerySection = page.locator("section").filter({ hasText: "معرض أعمالنا" });
    const imgs = gallerySection.locator("img.grayscale");
    const count = await imgs.count();
    if (count === 0) throw new Error("No grayscale images on homepage gallery");
  });

  await test("Team section with all 5 barbers", async () => {
    await page.waitForSelector("text=فريق العمل", { timeout: 5000 });
    const barbers = ["زيدا", "معاذ", "مصطفى", "محمد", "عبدالله"];
    for (const b of barbers) {
      const el = page.locator("section").filter({ hasText: "فريق العمل" }).locator(`text=${b}`);
      await el.first().waitFor({ state: "visible", timeout: 3000 });
    }
  });

  await test("Team image is grayscale by default", async () => {
    const teamImg = page.locator("section").filter({ hasText: "فريق العمل" }).locator("img.grayscale");
    const count = await teamImg.count();
    if (count === 0) throw new Error("No grayscale team image");
  });

  await test("Barber strip with circular indicators", async () => {
    const dots = page.locator("section").filter({ hasText: "فريق العمل" }).locator(".rounded-full");
    const count = await dots.count();
    if (count < 5) throw new Error(`Only ${count} barber indicators`);
  });

  await test("CTA section", async () => {
    await page.waitForSelector("text=كرسيك في انتظارك", { timeout: 5000 });
  });

  await test("CTA button links to /booking", async () => {
    const ctaBtn = page.locator("text=كرسيك في انتظارك").locator("..").locator('a[href="/booking"]');
    await ctaBtn.first().waitFor({ state: "visible", timeout: 5000 });
  });

  await test("Footer with Ahmed Hassaan and Engaz logo", async () => {
    const footer = page.locator("footer");
    await footer.locator('a:has-text("Ahmed Hassaan")').waitFor({ state: "visible", timeout: 5000 });
    await footer.locator('img[alt="إنجاز ميديا"]').waitFor({ state: "visible", timeout: 5000 });
    await footer.locator("text=01069389235").first().waitFor({ state: "visible", timeout: 5000 });
  });

  await test("Footer has 2 columns with contact and developer info", async () => {
    const footer = page.locator("footer");
    await footer.locator("text=بيانات الاتصال").waitFor({ state: "visible", timeout: 5000 });
    await footer.locator("text=المطور").waitFor({ state: "visible", timeout: 5000 });
  });

  await test("Header nav links use translations", async () => {
    const contactLink = page.locator('header a:has-text("اتصل بنا")');
    await contactLink.first().waitFor({ state: "visible", timeout: 5000 });
  });

  await test("Screenshots: homepage at all viewports", async () => {
    await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
    await takeScreenshots(page, "homepage");
  });

  await test("Mobile: hamburger menu visible at 375px", async () => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForSelector('button[aria-label="Toggle menu"]', { timeout: 5000 });
  });

  console.log("\n=== BOOKING PAGE ===");

  await test("Booking page loads (200)", async () => {
    const res = await page.goto(`${BASE}/booking`, { waitUntil: "networkidle", timeout: 30000 });
    if (!res || res.status() !== 200) throw new Error(`Status: ${res?.status()}`);
  });

  await test("Booking step 1: services list", async () => {
    await page.waitForSelector("h2:has-text('اختر الخدمات')", { timeout: 5000 });
    await page.waitForSelector("text=حلاقة شعر كلاسيكية", { timeout: 5000 });
  });

  await test("Complete step 1->2->3 flow", async () => {
    await page.goto(`${BASE}/booking`, { waitUntil: "networkidle", timeout: 30000 });
    await page.locator("button:has-text('حلاقة شعر كلاسيكية')").first().click();
    await page.locator("button:has-text('متابعة')").first().click();
    await page.waitForSelector("text=اختر الحلاق", { timeout: 5000 });
    await page.locator("button:has-text('زيدا')").first().click();
    await page.locator("button:has-text('متابعة')").first().click();
    await page.waitForSelector("text=اختر الموعد", { timeout: 5000 });
  });

  await test("Screenshots: booking page", async () => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE}/booking`, { waitUntil: "networkidle", timeout: 30000 });
    await takeScreenshots(page, "booking");
  });

  console.log("\n=== GALLERY PAGE ===");

  await test("Gallery page loads (200)", async () => {
    const res = await page.goto(`${BASE}/gallery`, { waitUntil: "networkidle", timeout: 30000 });
    if (!res || res.status() !== 200) throw new Error(`Status: ${res?.status()}`);
  });

  await test("Gallery has images", async () => {
    const imgs = page.locator("main img");
    const count = await imgs.count();
    if (count < 3) throw new Error(`Only ${count} images`);
  });

  await test("Screenshots: gallery page", async () => {
    await takeScreenshots(page, "gallery");
  });

  console.log("\n=== SERVICES PAGE ===");

  await test("Services page loads (200)", async () => {
    const res = await page.goto(`${BASE}/services`, { waitUntil: "networkidle", timeout: 30000 });
    if (!res || res.status() !== 200) throw new Error(`Status: ${res?.status()}`);
  });

  await test("All 7 services listed", async () => {
    const names = ["حلاقة شعر كلاسيكية", "تهذيب وتصفيف اللحية", "عناية كاملة بالوجه", "حلاقة شبابية عصرية", "قص أطفال", "تنظيف عميق للبشرة", "بكيدج العريس"];
    for (const name of names) {
      await page.locator(`h3:has-text("${name}")`).first().waitFor({ state: "visible", timeout: 3000 });
    }
  });

  await test("Services page booking buttons link to /booking", async () => {
    const buttons = page.locator('a[href="/booking"]');
    const count = await buttons.count();
    if (count < 7) throw new Error(`Only ${count} booking links on services page`);
  });

  await test("Screenshots: services page", async () => {
    await takeScreenshots(page, "services");
  });

  console.log("\n=== CONTACT PAGE ===");

  await test("Contact page loads (200)", async () => {
    const res = await page.goto(`${BASE}/contact`, { waitUntil: "networkidle", timeout: 30000 });
    if (!res || res.status() !== 200) throw new Error(`Status: ${res?.status()}`);
  });

  await test("Contact info visible", async () => {
    await page.waitForSelector("text=تواصل معنا", { timeout: 5000 });
    await page.locator("main").locator("text=01069389235").waitFor({ state: "visible", timeout: 5000 });
  });

  await test("Contact booking button links to /booking", async () => {
    const btn = page.locator('a[href="/booking"]');
    await btn.first().waitFor({ state: "visible", timeout: 5000 });
  });

  await test("Screenshots: contact page", async () => {
    await takeScreenshots(page, "contact");
  });

  console.log("\n=== LANGUAGE TOGGLE ===");

  await test("Toggle language AR→EN changes header text", async () => {
    await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
    const langBtn = page.locator('header button:has-text("EN")');
    await langBtn.click();
    await page.waitForTimeout(1000);
    await page.waitForSelector('header a:has-text("Gallery")', { timeout: 5000 });
    const langBtnEn = page.locator('header button:has-text("AR")');
    await langBtnEn.waitFor({ state: "visible", timeout: 5000 });
    await langBtnEn.click();
    await page.waitForTimeout(500);
    await page.waitForSelector('header a:has-text("معرض الأعمال")', { timeout: 5000 });
  });

  await browser.close();

  console.log(`\n${"=".repeat(40)}`);
  console.log(`Tests: ${errors.length ? "FAILED" : "ALL PASSED"}`);
  console.log(`Errors: ${errors.length}`);
  console.log(`Screenshots: screenshots/`);
  if (errors.length > 0) {
    errors.forEach((e, i) => console.log(`  ${i + 1}. ${e.label}: ${e.message}`));
    process.exit(1);
  }
}

run().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
