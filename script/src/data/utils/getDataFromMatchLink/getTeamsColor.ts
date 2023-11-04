import { Page } from "puppeteer";

const getTeamsColor = async (page: Page) => {
  await Promise.race([
    page.waitForSelector(".sw-fixture-info-summary"),
    page.waitForSelector("span.location"),
  ]);

  return await page.evaluate(() => {
    // Home color
    const homeColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--sw-fixture-competitor-home-color");
    // Home color
    const awayColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--sw-fixture-competitor-away-color");

    return {
      home: homeColor,
      away: awayColor,
    };
  });
};

export default getTeamsColor;
