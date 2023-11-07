import chalk from "chalk";
import { Page } from "puppeteer";

const getTeamsColor = async (
  page: Page,
  homeTeamName: string,
  awayTeamName: string
) => {
  try {
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
  } catch (error: any) {
    console.error(
      chalk.bgRed(
        `Failed to get teams colors (${homeTeamName} / ${awayTeamName}) : ${error.message}`
      )
    );
    return {
      home: null,
      away: null,
    };
  }
};

export default getTeamsColor;
