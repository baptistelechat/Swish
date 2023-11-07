import chalk from "chalk";
import { Page } from "puppeteer";

const getLocation = async (
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
      // Location
      const locationElement = document.querySelector(
        ".sw-fixture-info-summary"
      ) as HTMLSpanElement;

      const locationSpan = document.querySelector("span.location");
      if (locationSpan) {
        return locationSpan.innerHTML.trim();
      }
      if (locationElement) {
        const location = locationElement.innerHTML
          .trim()
          .split(",")[1]
          .split(" - ")[1]
          .split("<span")[0];
        return location;
      }

      return null;
    });
  } catch (error: any) {
    console.error(
      chalk.bgRed(
        `Failed to get location (${homeTeamName} / ${awayTeamName}) : ${error.message}`
      )
    );
    return null;
  }
};

export default getLocation;
