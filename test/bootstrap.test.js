import puppeteer from "puppeteer";

before(async function () {
  global.browser = await puppeteer.launch({
    headless: "shell",
    args: [],
  });
});
