import puppeteer from "puppeteer";
import cron from "node-cron";
import dotenv from "dotenv";
import chalk from "chalk";

import { IUrl } from "./data/interfaces/IUrl";
import { scrapedUrl } from "./data/constants/scrapedUrl";
import { cronScheduleEveryMinute } from "./data/constants/cronSchedule";
import { getCurrentTimestamp } from "./data/utils/getCurrentTimestamp";

// Load environment variables from .env file
dotenv.config();

async function scrapePages(urls: IUrl[], retries = 0) {
  const timestamp = getCurrentTimestamp();

  console.log("");
  console.log(chalk.bgGray(`🚀 ${timestamp}`));
  console.log(chalk.bgCyan("🚩 Starting scraping..."));

  let browser;

  try {
    browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      headless: false,
      // headless: "new",
    });
    const page = await browser.newPage();

    // Login
    await page.goto(scrapedUrl[3].path);
    console.log(`Navigated to ${scrapedUrl[3].id}`);

    await browser.close();
    console.log(chalk.bgGreen("🏁 Scraping complete"));
    console.log("");
  } catch (error) {
    console.error(chalk.bgRed("Scraping failed:", error));

    if (browser) {
      await browser.close();
    }
  }
}

const launchScraping = async () => {
  await scrapePages(scrapedUrl);
};

// Schedule the script to run periodically
(async () => {
  launchScraping();

  cron.schedule(cronScheduleEveryMinute, async () => {
    launchScraping();
  });
})();
