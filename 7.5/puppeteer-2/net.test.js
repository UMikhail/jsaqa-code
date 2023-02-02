const { expect } = require("chai");
const { clickElement, getText, vip, standart } = require("./lib/commands");
const { generateDays, generateMoviTime } = require("./lib/util");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000);
});

afterEach(() => {
  page.close();
});

describe("booking", () => {
  beforeEach(async () => {
    await page.goto("http://qamid.tmweb.ru/client/index.php", {
      timeout: 60000,
    });
  });

  test("booking a VIP seat", async () => {
    await generateDays(page, "5");
    await generateMoviTime(page, "3", "2");
    await page.waitForSelector("h1");
    await vip(page, "1");
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector("h1");
    const actual = await getText(page, "h2.ticket__check-title");
    expect(actual).contain("Вы выбрали билеты:");
  }, 10000);

  test("booking two standard seats", async () => {
    await generateDays(page, "6");
    await generateMoviTime(page, "1", "2");
    await page.waitForSelector("h1");
    await standart(page, "2", "1");
    await standart(page, "2", "2");
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector("h1");
    const actual = await getText(page, "main > section > div > p:nth-child(2) > span", (text) => text.textContent);
    const expected = "2/1, 2/2";
    expect(actual).contain(expected);
  }, 20000);

  test("the place is not booked", async () => {
    await generateDays(page, "3");
    await generateMoviTime(page, "1", "2");
    await page.waitForSelector("h1");
    const disabledButton = await page.$(".acceptin-button[disabled]");
    const buttonOff = (await disabledButton) !== null;
    expect(buttonOff).equals(true);
  }, 10000);
});
