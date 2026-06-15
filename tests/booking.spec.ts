import { test, expect } from '@playwright/test'

test.describe('Booking Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/booking')
  })

  test('renders booking page with service list', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('احجز موعدك')
    await expect(page.locator('text=حلاقة شعر كلاسيكية')).toBeVisible()
    await expect(page.locator('text=بكيدج العريس')).toBeVisible()
  })

  test('displays contact info', async ({ page }) => {
    await expect(page.locator('text=0201069389235')).toBeVisible()
    await expect(page.locator('text=كفرتصفا - كفرشكر - قليوبية')).toBeVisible()
  })

  test('service link opens WhatsApp with preselected service', async ({ page }) => {
    const serviceLinks = page.locator('a[href*="wa.me"]')
    const count = await serviceLinks.count()
    expect(count).toBeGreaterThan(0)
    const href = await serviceLinks.first().getAttribute('href')
    expect(href).toContain('0201069389235')
  })
})
