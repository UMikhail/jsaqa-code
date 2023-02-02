const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;

const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, getText, vip, standart } = require("../../lib/commands.js");
const { generateDays, generateMoviTime } = require("../../lib/util.js");
var {setDefaultTimeout} = require("cucumber");
setDefaultTimeout(60 * 1000);

Before(async function () {
    const browser = await puppeteer.launch({
      args: ["--disable-setuid-sandbox", "--disable-dev-shm-usage"],
      headless: false,
      slowMo: 50,
    });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
  }
);

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru/client/index.php`);
});

When("user chooses by day {string}", async function (string) {
  await generateDays(this.page, string);
});

When("user chooses movie {string} show {string}", async function (string, string2) {
  return await generateMoviTime(this.page, string, string2);
});

When("user chooses seat Vip {string}", async function (string) {
  return await vip(this.page, string);
});

When("user chooses seat {string}, {string}", async function (string, string2) {
  return await standart(this.page, string, string2);
});

When("user click {string}", async function (string) {
  return await clickElement(this.page, string);
});

Then("user sees text {string}", async function (string) {
  const actual = await getText(this.page, ".ticket__check-title");
  const expected = await string;
  expect(actual).contains(expected);
});

Then("user sees the reserved seat {string}", async function (string) {
  const actual = await getText(this.page, "main > section > div > p:nth-child(2) > span");
  const expected = await string;
  expect(actual).contains(expected);
});

Then("user sees the header {string}", async function (string) {
  const actual = await getText(this.page, "h2");
  const expected = await string;
  expect(actual).contains(expected);
});

Then("user should not see the page title {string}", async function (string) {
  string = await ".ticket__check-title";
  const finalSelector = await this.page.$(string);
  expect(finalSelector).to.be.null;
});
