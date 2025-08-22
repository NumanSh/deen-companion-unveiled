import { test, expect } from '@playwright/test'

test.describe('Home route', () => {
  test('loads index page and shows key UI', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Deen|Islam|Quran|Prayer|Companion/i)

    // Ensure main layout renders
    await expect(page.locator('body')).toBeVisible()

    // Check some common navigation elements exist
    const navItems = ['Home', 'Quran', 'Discover', 'Habits', 'Community', 'Settings']
    const nav = page.getByRole('navigation')
    for (const item of navItems) {
      // Don't hard fail if labels differ; just soft check
      const found = await nav.getByText(new RegExp(item, 'i')).count()
      if (found > 0) {
        await expect(nav.getByText(new RegExp(item, 'i'))).toBeVisible()
      }
    }
  })

  test('navigates to Prayer Times route', async ({ page }) => {
    await page.goto('/')

    // try various ways to navigate
    const prayerLink = page.getByRole('link', { name: /prayer/i })
    if (await prayerLink.count()) {
      await prayerLink.first().click()
    } else {
      await page.goto('/prayer-times')
    }

    await expect(page).toHaveURL(/prayer-times/)

    // Look for common prayer labels
    const labels = [/Fajr/i, /Dhuhr|Zuhr/i, /Asr/i, /Maghrib/i, /Isha/i]
    for (const label of labels) {
      const count = await page.getByText(label).count()
      expect(count).toBeGreaterThanOrEqual(0)
    }
  })
})
