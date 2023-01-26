let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
  await page.setDefaultNavigationTimeout(100000); // задаём тайм-аут
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    //await page.setDefaultTimeout(100000); // задаём тайм-аут
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  });

  test("The first link attribute", async () => {
    //await page.setDefaultNavigationTimeout(100000); // задаём тайм-аут
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    //await page.setDefaultTimeout(100000); // задаём тайм-аут
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  });
});

describe("Github page tests 2", () => {
  test("Test1 the h1 header content'", async () => {
    //await page.setDefaultTimeout(100000); // задаём тайм-аут
    await page.goto("https://github.com/trending");
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("Trending repositories on GitHub today · GitHub");
  }, 60000);

  test("Test2 the h1 header content'", async () => {
    //await page.setDefaultTimeout(100000); // задаём тайм-аут
    await page.goto("https://github.com/collections");
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("Collections · GitHub");
  }, 60000);

  test("Test3 the h1 header content'", async () => {
    //await page.setDefaultTimeout(100000);                   // задаём тайм-аут
    await page.goto("https://github.com/sponsors/explore");
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("Explore GitHub Sponsors · GitHub");
  }, 60000);
});
