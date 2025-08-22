import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const shouldSkipRule = (ruleId: string) => {
  // Add rules to skip if they are known false positives in your UI lib
  return [
    // Example: 'color-contrast'
  ].includes(ruleId)
}

test.describe('Accessibility', () => {
  test('home page has no serious accessibility violations', async ({ page }) => {
    await page.goto('/')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()

    const serious = results.violations.filter(v => v.impact === 'serious' || v.impact === 'critical')
      .filter(v => !shouldSkipRule(v.id))

    if (serious.length) {
      console.log('Accessibility issues:', JSON.stringify(serious, null, 2))
    }

    expect(serious, 'No serious/critical a11y violations expected').toHaveLength(0)
  })
})
