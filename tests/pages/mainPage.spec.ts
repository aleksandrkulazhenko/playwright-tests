import { test, expect } from '../fixtures/mainPage';
import { MainPage } from '../models/MainPage';

// let mainPage: MainPage;

test.describe('Тесты главной страницы', () => {
  test('Проверка отображения элементов навигации хедера', async ({ mainPage }) => {
    await mainPage.checkElementsVisability();
  });

  test('Проверка названий элементов навигации хедера', async ({ mainPage }) => {
    await mainPage.checkElementsText();
  });

  test('Проверка атрибутов href элементов навигацци хедера', async ({ mainPage }) => {
    await mainPage.checkElementsHrefAttribute();
  });

  test('Проверка возможности изменения Light/Night Mode', async ({ mainPage }) => {
    await test.step('Нажатие на иконку переключения лайт мода', async () => {
      await mainPage.clickSwitchLightModeIcon();
    });
    await test.step('Проверка смены атрибута href', async () => {
      await mainPage.checkDataThemeAttributeValue('light');
    });
    await test.step('Нажатие на иконку переключения дарк мода', async () => {
      await mainPage.clickSwitchLightModeIcon();
    });
    await test.step('Проверка смены значения атрибута href', async () => {
      await mainPage.checkDataThemeAttributeValue('dark');
    });
  });

  test(`Проверка стилей со светлой темой`, async ({ mainPage }) => {
    await test.step('Установка светлой темы', async () => {
      await mainPage.setLightMode();
    });
    await test.step('Скриншотная проверка с активной светлой темой', async () => {
      await mainPage.checkLayoutWidthLightMode();
    });
  });
  test(`Проверка стилей с темной темой`, async ({ mainPage }) => {
    await test.step('Установка темной темы', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('Скриншотная проверка с активной темной темой', async () => {
      await mainPage.checkLayoutWidthDarkMode();
    });
  });
});

//expect.soft позволяет проверять все написанные тесты, даже если один упадет, soft() рагантирует проверку
//оставшихся тестов, но в результате весь тест будет считаться упавшим
