import { test, expect } from '@playwright/test'

test.describe('Admin Pages', () => {
  test('admin login page renders correctly', async ({ page }) => {
    await page.goto('/admin/login')
    await expect(page.locator('text=Admin Panel')).toBeVisible()
    await expect(page.locator('text=ZEDA BARBER SHOP')).toBeVisible()
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })

  test('admin pages redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/admin/services')
    await page.waitForURL('**/admin/login')
    await expect(page).toHaveURL(/\/admin\/login/)
  })

  test('login form has working toggle for password visibility', async ({ page }) => {
    await page.goto('/admin/login')
    const passwordInput = page.locator('input[type="password"]')
    const toggleBtn = page.locator('button:has(svg.lucide-eye)')
    await expect(passwordInput).toBeVisible()
    await toggleBtn.click()
    await expect(page.locator('input[type="text"]')).toBeVisible()
  })
})
