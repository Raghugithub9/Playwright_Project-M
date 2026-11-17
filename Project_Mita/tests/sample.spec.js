const { test, expect } = require('@playwright/test');

test.describe('ExpoFlamenco - Homepage', () => {

  test('TC01 - Verify homepage loads successfully', async ({ page }) => {

    const response = await page.goto('/');

    expect(response.status()).toBeLessThan(400);

    await expect(page).toHaveTitle(/ExpoFlamenco/i);

    await expect(page.locator('body')).toBeVisible();
  });


  test('TC02 - Verify main navigation is displayed', async ({ page }) => {

    await page.goto('/');

    const navigationItems = [
      'Magazine',
      'Studio',
      'Events',
      'Academy',
      'Community',
      'Podcast',
      'TV'
    ];

    for (const item of navigationItems) {
      await expect(
        page.getByRole('link', { name: new RegExp(`^${item}$`, 'i') })
      ).toBeVisible();
    }
  });


  test('TC03 - Verify Shop link is available', async ({ page }) => {

    await page.goto('/');

   const shopLink = page.locator(
    'a[href="https://expoflamenco.shop"]'
  ).first();

  await expect(shopLink).toBeVisible();
  });


  test('TC04 - Verify Login link is available', async ({ page }) => {

    await page.goto('/');

    await expect(
      page.getByRole('link', { name: /login/i })
    ).toBeVisible();
  });


  test('TC05 - Verify homepage contains flamenco content', async ({ page }) => {

    await page.goto('/');

    await expect(
      page.getByText(/Flamenco news/i).first()
    ).toBeVisible();
  });


  test('TC06 - Verify Events section exists', async ({ page }) => {

    await page.goto('/');

    await expect(
      page.getByText(/Events Agenda/i).first()
    ).toBeVisible();
  });


  test('TC07 - Verify newsletter section exists', async ({ page }) => {

    await page.goto('/');

    await expect(
      page.getByText(/Subscribe to our FREE newsletter/i)
    ).toBeVisible();
  });

});