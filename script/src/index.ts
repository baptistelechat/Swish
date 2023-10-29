import puppeteer from "puppeteer";
import cron from "node-cron";
import dotenv from "dotenv";
import chalk from "chalk";

import { IUrl } from "./data/interfaces/IUrl";
import { scrapedUrl } from "./data/constants/scrapedUrl";
import { getCurrentTimestamp } from "./data/utils/getCurrentTimestamp";
import { getGamesData } from "./data/utils/gameData/getGamesData";
import { retryDelay } from "./data/utils/retryDelay";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

// Load environment variables from .env file
dotenv.config();

const maxRetries = 3;

const scrapePages = async (urls: IUrl[], retries = 0) => {
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

    // const getActiveGames = async () => {
    //   return await page.evaluate(() => {
    //     const monthFilterElement = document.querySelector(".month-filter");

    //     if (monthFilterElement) {
    //       const currentDate = monthFilterElement.getAttribute("current_date");

    //       return currentDate;
    //     }
    //     return null;
    //   });
    // };

    // const activeGames = await getActiveGames();

    // const isToday = dayjs().isSame(dayjs(activeGames, "DD/MM/YYYY"));

    // console.log([dayjs(), dayjs(activeGames, "DD/MM/YYYY")]);

    // console.log(isToday);

    await getGamesData(page);

    await browser.close();
    console.log(chalk.bgGreen("🏁 Scraping complete"));
    console.log("");
  } catch (error) {
    console.error(chalk.bgRed("Scraping failed:", error));
    if (browser) {
      await browser.close();
    }

    if (retries < maxRetries) {
      console.log(
        `Retrying after ${retryDelay(0, 0, 10) / 1000} seconds... (${
          retries + 1
        }/${maxRetries})`
      );
      await new Promise((resolve) => setTimeout(resolve, retryDelay(0, 0, 10)));
      await scrapePages(urls, retries + 1);
    } else {
      console.error(chalk.bgRed("Max retries reached. Exiting..."));
      // Forcefully exit the script with a non-zero exit code
      process.exit(1);
    }
  }
};

const launchScraping = async () => {
  await scrapePages(scrapedUrl);
};

// Schedule the script to run periodically
(async () => {
  launchScraping();
  // const today = dayjs();
  // const hour = today.hour();
  // const minute = today.minute();

  // console.log(chalk.bgYellow(`⌛ ${minute + 1} ${hour} * * *`));

  // cron.schedule(`${minute + 1} ${hour} * * *`, async () => {
  //   launchScraping();
  // });

  // cron.schedule("*/2 * * * *", async () => {
  //   launchScraping();
  // });
})();
