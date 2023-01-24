const { test, expect } = require("@playwright/test");

test("test", async ({ page }) => {
  test.setTimeout(60000);
  // Go to https://netology.ru/free/management#/
  await page.goto("https://netology.ru/free/management#/", { timeout: 60000 });

  // Click a
  await page.click("[class=\"node_modules-@netology-shared-src-reallyShared-ui-kit-old-components-v1-Logo--logo--q4NN9 node_modules-@netology-shared-src-reallyShared-ui-kit-old-components-v1-Logo--black-text--Gj_Ox node_modules-@netology-shared-src-reallyShared-ui-kit-old-components-v1-Logo--active--k1spp\"]");
  await expect(page).toHaveURL("https://netology.ru/");

  // Click text=Учиться бесплатно
  await page.click("text=Учиться бесплатно");
  await expect(page).toHaveURL("https://netology.ru/free");

  page.click("[data-direction=\"management\"]");

  //
  await page.click("[class=\"src-Landings-pages-FreeProducts-components-Courses-components-CourseCard--title--QnzhW\"]");
  await expect(page).toHaveURL(
    "https://netology.ru/programs/product-project-marathon"
  );
});

//////////////////////////////////////////////////////

const { email, password } = require("../user.mjs");

test("validTest", async ({ page }) => {
  test.setTimeout(100000);

  await page.goto("https://netology.ru");

  // Click text=Войти
  await page.click("text=Войти");
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  // Click [placeholder="Email"]
  await page.click('[placeholder="Email"]');
  // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', email);
  // Click [placeholder="Пароль"]
  await page.click('[placeholder="Пароль"]');
  // Fill [placeholder="Пароль"]
  await page.fill('[placeholder="Пароль"]', password);
  // Click [data-testid="login-submit-btn"]
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://netology.ru/profile' }*/),
    page.click('[data-testid="login-submit-btn"]'),
  ]);
  await expect(
    page.locator(".src-components-pages-Profile-Programs--title--Kw5NH")
  ).toHaveText("Мои курсы и профессии");
});

//////////////////////////////////////////////////////

test("invalidTest", async ({ page }) => {
  test.setTimeout(100000);

  await page.goto("https://netology.ru");

  // Click text=Войти
  await page.click("text=Войти");
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  // Click [placeholder="Email"]
  await page.click('[placeholder="Email"]');
  // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', "unkown1@mail.ru");
  // Click [placeholder="Пароль"]
  await page.click('[placeholder="Пароль"]');
  // Fill [placeholder="Пароль"]
  await page.fill('[placeholder="Пароль"]', "unkown");
  // Click [data-testid="login-submit-btn"]
  await Promise.all([
    //page.waitForNavigation(/*{ url: 'https://netology.ru/profile' }*/),
    page.click('[data-testid="login-submit-btn"]'),
  ]);
  await expect(
    page.locator("[data-testid=\"login-error-hint\"]")
  ).toHaveText("Вы ввели неправильно логин или пароль");
});
