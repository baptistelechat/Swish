import puppeteer, { Page } from "puppeteer";
import cron from "node-cron";
import dotenv from "dotenv";
import chalk from "chalk";

import { IUrl } from "./data/interfaces/IUrl";
import { scrapedUrl } from "./data/constants/scrapedUrl";
import { cronScheduleEveryMinute } from "./data/constants/cronSchedule";
import { getCurrentTimestamp } from "./data/utils/getCurrentTimestamp";
import { getGamesData } from "./data/utils/getGamesData";

// Load environment variables from .env file
dotenv.config();

const scrapePages = async (urls: IUrl[]) => {
  const timestamp = getCurrentTimestamp();

  console.log("");
  console.log(chalk.bgGray(`🚀 ${timestamp}`));
  console.log(chalk.bgCyan("🚩 Starting scraping..."));

  let browser;

  try {
    browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      defaultViewport: { width: 1920, height: 1080 },
      headless: false,
      // headless: "new",
    });
    const page = await browser.newPage();

    // Go to Game center
    await page.goto(scrapedUrl[0].path);
    console.log(`Navigated to ${scrapedUrl[0].id}`);

    // Attendre que la div avec l'id game-center-result soit visible
    await page.waitForSelector(
      '#game-center-result[style="visibility: visible;"]'
    );

    // console.log("test");

    await getGamesData(page);

    await browser.close();
    console.log(chalk.bgGreen("🏁 Scraping complete"));
    console.log("");
  } catch (error) {
    console.error(chalk.bgRed("Scraping failed:", error));

    if (browser) {
      await browser.close();
    }
  }
};

const launchScraping = async () => {
  await scrapePages(scrapedUrl);
};

// Schedule the script to run periodically
(async () => {
  launchScraping();

  // cron.schedule(cronScheduleEveryMinute, async () => {
  //   launchScraping();
  // });
})();
