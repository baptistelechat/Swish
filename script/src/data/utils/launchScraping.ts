import chalk from "chalk";
import os from "os";
import puppeteer from "puppeteer";
import { scrapedUrl } from "../constants/scrapedUrl";
import getGamesData from "./gameData/getGamesData";
import getCurrentTimestamp from "./getCurrentTimestamp";
import retryDelay from "./retryDelay";

const maxRetries = 3;

const launchScraping = async (retries = 0) => {
  const timestamp = getCurrentTimestamp();

  console.log("");
  console.log(chalk.bgGray(`🚀 ${timestamp}`));
  console.log(chalk.bgCyan("🚩 Starting scraping..."));

  let browser;

  try {
    const systemOS = os.platform();
    if (process.env.HEADLESS === "1") {
      if (systemOS === "linux") {
        browser = await puppeteer.launch({
          args: ["--no-sandbox"],
          executablePath: "/usr/bin/chromium-browser",
          // defaultViewport: { width: 1920, height: 1080 },
          // headless: false,
          headless: "new",
        });
      } else {
        browser = await puppeteer.launch({
          args: ["--no-sandbox"],
          // defaultViewport: { width: 1920, height: 1080 },
          // headless: false,
          headless: "new",
        });
      }
    }

    if (process.env.HEADLESS === "0") {
      if (systemOS === "linux") {
        browser = await puppeteer.launch({
          args: ["--no-sandbox"],
          executablePath: "/usr/bin/chromium-browser",
          defaultViewport: { width: 1920, height: 1080 },
          headless: false,
          // headless: "new",
        });
      } else {
        browser = await puppeteer.launch({
          args: ["--no-sandbox"],
          defaultViewport: { width: 1920, height: 1080 },
          headless: false,
          // headless: "new",
        });
      }
    }

    if (browser) {
      const page = await browser.newPage();

      // ELITE
      const eliteUrl = scrapedUrl[0];

      // Go to Game center
      await page.goto(eliteUrl.path);
      console.log("");
      console.log(chalk.underline(`Navigated to ${eliteUrl.id} :`));

      // Attendre que la div avec l'id game-center-result soit visible
      await page.waitForSelector(
        '#game-center-result[style="visibility: visible;"]'
      );

      await getGamesData(page);

      // PRO B
      const proBUrl = scrapedUrl[1];

      // Go to Game center
      await page.goto(proBUrl.path);
      console.log("");
      console.log(chalk.underline(`Navigated to ${proBUrl.id} :`));

      // Attendre que la div avec l'id game-center-result soit visible
      await page.waitForSelector(
        '#game-center-result[style="visibility: visible;"]'
      );

      await getGamesData(page);

      // ESPOIRS ElITE
      const eliteEspoirsUrl = scrapedUrl[2];

      // Go to Game center
      await page.goto(eliteEspoirsUrl.path);
      console.log("");
      console.log(chalk.underline(`Navigated to ${eliteEspoirsUrl.id} :`));

      // Attendre que la div avec l'id game-center-result soit visible
      await page.waitForSelector(
        '#game-center-result[style="visibility: visible;"]'
      );

      await getGamesData(page);

      // ESPOIRS PRO B
      const proBEspoirsUrl = scrapedUrl[3];

      // Go to Game center
      await page.goto(proBEspoirsUrl.path);
      console.log("");
      console.log(chalk.underline(`Navigated to ${proBEspoirsUrl.id} :`));

      // Attendre que la div avec l'id game-center-result soit visible
      await page.waitForSelector(
        '#game-center-result[style="visibility: visible;"]'
      );

      await getGamesData(page);

      await browser.close();
      console.log("");
      console.log(chalk.bgGreen("🏁 Scraping complete"));
      console.log("");
    }
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
      await launchScraping(retries + 1);
    } else {
      console.error(chalk.bgRed("Max retries reached. Exiting..."));
      // Forcefully exit the script with a non-zero exit code
      process.exit(1);
    }
  }
};

export default launchScraping;
