import { test, expect, Page, Locator } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  href?: string;
}

const elements: Elements[] = [
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo Playwright',
    text: 'Playwright',
    href: '/',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
    text: 'Docs',
    href: '/docs/intro',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'MCP', exact: true }),
    name: 'MCP link',
    text: 'MCP',
    href: '/mcp/introduction',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'CLI', exact: true }),
    name: 'CLI link',
    text: 'CLI',
    href: '/agent-cli/introduction',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    name: 'API link',
    text: 'API',
    href: '/docs/api/class-playwright',
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js button',
    text: 'Node.js',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub icon',
    href: 'https://github.com/microsoft/playwright',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord icon',
    href: 'https://aka.ms/playwright/discord',
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Switch between dark and light',
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Ctrl+K)' }),
    name: 'Search input',
  },
];

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });
  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`Проверка названия элемента ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });
  });

  test('Проверка названий элементов навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`Проверка текста элемента ${name}`, async () => {
          await expect.soft(locator(page)).toContainText(text);
        });
      }
    });
  });

  test('Проверка атрибутов href элементов навигацци хедера', async ({ page }) => {
    elements.forEach(({ locator, name, href }) => {
      if (href) {
        test.step(`Проверка атрибута href элемента ${name}`, async () => {
          await expect.soft(locator(page)).toHaveAttribute('href', href);
        });
      }
    });
  });

  test('Проверка возможности изменения Light/Night Mode', async ({ page }) => {
    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('Проверка заголовка страницы', async ({ page }) => {
    // await expect(page.locator('h1').locator('span')).toHaveText('Playwright');
    await expect
      .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
      .toBeVisible();
    await expect
      .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
      .toContainText(
        'Playwright enables reliable web automation for testing, scripting, and AI agents.',
      );
  });

  test('Проверка работы кнопки Get started', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
    await expect
      .soft(page.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', '/docs/intro');
  });
});

//expect.soft позволяет проверять все написанные тесты, даже если один упадет, soft() рагантирует проверку
//оставшихся тестов, но в результате весь тест будет считаться упавшим
