import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('renders hero section with ZEDA branding', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('ZEDA')
    await expect(page.locator('text=ZEDA BARBER SHOP')).toBeVisible()
  })

  test('renders navigation links', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('nav')
    await expect(nav.locator('text=الرئيسية').first()).toBeVisible()
    await expect(nav.locator('text=معرض الأعمال').first()).toBeVisible()
    await expect(nav.locator('text=جرب تسريحتك').first()).toBeVisible()
    await expect(nav.locator('text=احجز موعد').first()).toBeVisible()
  })

  test('language toggle switches between AR and EN', async ({ page }) => {
    await page.goto('/')
    const toggle = page.locator('button:has(svg.lucide-globe)')
    await expect(page.locator('nav >> text=Gallery').first()).not.toBeVisible()
    await toggle.first().click()
    await expect(page.locator('nav >> text=Gallery').first()).toBeVisible()
  })

  test('book now button links to WhatsApp', async ({ page }) => {
    await page.goto('/')
    const bookBtn = page.locator('a[href*="wa.me"]').first()
    await expect(bookBtn).toBeVisible()
    const href = await bookBtn.getAttribute('href')
    expect(href).toContain('0201069389235')
  })

  test('services section is present', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=خدماتنا').first()).toBeVisible()
    await expect(page.locator('text=حلاقة شعر كلاسيكية')).toBeVisible()
    await expect(page.locator('text=بكيدج العريس')).toBeVisible()
  })

  test('gallery preview section is present', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=معرض أعمالنا')).toBeVisible()
    await expect(page.locator('text=شاهد المزيد')).toBeVisible()
  })

  test('team section is present', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=فريق العمل').first()).toBeVisible()
  })

  test('footer contains developer info and social links', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Ahmed Hassaan')).toBeVisible()
    await expect(page.locator('text=إنجاز ميديا')).toBeVisible()
    await expect(page.locator('text=ZEDA BARBER SHOP. All rights reserved.')).toBeVisible()
  })
})
