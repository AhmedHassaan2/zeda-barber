import { test, expect } from '@playwright/test'

test.describe('Gallery Page', () => {
  test('displays gallery grid with images and videos', async ({ page }) => {
    await page.goto('/gallery')
    await expect(page.locator('h1')).toContainText('معرض الأعمال')
    await expect(page.locator('text=العودة للرئيسية')).toBeVisible()
    const images = page.locator('img')
    const count = await images.count()
    expect(count).toBeGreaterThan(0)
  })

  test('navigates back to home via back link', async ({ page }) => {
    await page.goto('/gallery')
    await page.locator('text=العودة للرئيسية').click()
    await expect(page).toHaveURL('/')
  })
})
