import { test, expect } from '@playwright/test'

test.describe('AI Hair Try-On Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ai-hair')
  })

  test('renders page with title and description', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('جرب تسريحتك الجديدة')
    await expect(page.locator('text=AI Experience')).toBeVisible()
  })

  test('displays hairstyle options', async ({ page }) => {
    const styles = page.locator('button >> img')
    const count = await styles.count()
    expect(count).toBe(8)
  })

  test('upload area is clickable', async ({ page }) => {
    const uploadZone = page.locator('text=اضغط أو اسحب صورتك هنا')
    await expect(uploadZone).toBeVisible()
  })

  test('back navigation works', async ({ page }) => {
    await page.locator('text=العودة للرئيسية').click()
    await expect(page).toHaveURL('/')
  })
})
