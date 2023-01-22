const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
    devtools: true,
  });
  const page = await browser.newPage();
  await page.goto("https://netology.ru", { timeout: 60000 });
  await page.click("text=Каталог курсов");
  await page.pause();

  //assertion
  await browser.close();
})();

//import { email } from "./user.js";
//import { password } from "./user.js";

// const { chromium } = require("playwright");

// (async () => {
//   const browser = await chromium.launch({
//     headless: false,
//     slowMo: 1000,
//     devtools: true,
//   });
//   const page = await browser.newPage();
//   await page.goto("https://netology.ru", { timeout: 90000 });

//   // Click text=Войти
//   await page.click("text=Войти");
//   //await expect(page).toHaveURL("https://netology.ru/?modal=sign_in", {
//     //timeout: 60000,
//   //});
//   // Click [placeholder="Email"]
//   await page.click('[placeholder="Email"]');
//   // Fill [placeholder="Email"]
//   await page.fill('[placeholder="Email"]', email );
//   // Click [placeholder="Пароль"]
//   await page.click('[placeholder="Пароль"]');
//   // Fill [placeholder="Пароль"]
//   await page.fill('[placeholder="Пароль"]', password );
//   // Click [data-testid="login-submit-btn"]
//   await Promise.all([
//     page.waitForNavigation(/*{ url: 'https://netology.ru/profile' }*/),
//     page.click('[data-testid="login-submit-btn"]', { timeout: 60000 }),
//   ]);
//   const title = page.locator(
//     "src-components-pages-Profile-Programs--title--Kw5NH"
//   );
//   //await expect(title).toHaveText("Мои курсы и профессии");
//   //assertion
//   await browser.close();
// })();
