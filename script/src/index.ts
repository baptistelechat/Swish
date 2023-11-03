import puppeteer from "puppeteer";
import cron from "node-cron";
import dotenv from "dotenv";
import chalk from "chalk";
import { scrapedUrl } from "./data/constants/scrapedUrl";
import { getCurrentTimestamp } from "./data/utils/getCurrentTimestamp";
import { getGamesData } from "./data/utils/gameData/getGamesData";
import { retryDelay } from "./data/utils/retryDelay";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import getPagesAfterNow from "./data/utils/notion/getPagesAfterNow";
import getNotFinishedPages from "./data/utils/notion/getNotFinishedPages";

dayjs.extend(customParseFormat);

// Load environment variables from .env file
dotenv.config();

const maxRetries = 3;

const launchScraping = async (retries = 0) => {
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

    const url = scrapedUrl[1];

    // Go to Game center
    await page.goto(url.path);
    console.log("");
    console.log(chalk.underline(`Navigated to ${url.id} :`));

    // Attendre que la div avec l'id game-center-result soit visible
    await page.waitForSelector(
      '#game-center-result[style="visibility: visible;"]'
    );

    const gamesData = await getGamesData(page);

    await browser.close();
    console.log("");
    console.log(chalk.bgGreen("🏁 Scraping complete"));
    console.log("");

    return gamesData;
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

// Schedule the script to run periodically
(async () => {
  console.log(chalk.cyan(`🚀 Lancement ...`));
  cron.schedule("0 9 * * * ", async () => {
    console.log(chalk.yellow(`⌛ Lancement quotidien - 9h00`));
    await launchScraping();

    setTimeout(async () => {
      const scheduledGames = (await getPagesAfterNow()) as any[];

      const dates = scheduledGames.map((game) => {
        return game.properties.Date.date.start;
      });

      const datesUniques = [...new Set(dates)]; // TODO sort date

      console.log(chalk.bgCyan("📅 Prochaine tâches :"));
      console.log(datesUniques);
      console.log("");

      const defaultCurrentJob = {
        cronString: "",
        date: "",
      };

      let currentJob = defaultCurrentJob;

      datesUniques.map(async (date, index) => {
        const convertedDate = dayjs(date);
        const cronString = `${convertedDate.minute()} ${convertedDate.hour()} * * ${convertedDate.day()}`;

        if (currentJob.cronString === "") {
          currentJob = {
            cronString,
            date,
          };
        }

        cron.schedule(cronString, async () => {
          console.log(chalk.yellow(`⌛ Tâche principale - ${cronString}`));

          if (currentJob.cronString === cronString) {
            await launchScraping();
          }

          const task = cron.schedule(`*/3 * * * *`, async () => {
            console.log(chalk.yellow(`⌛ Boucle 3min - ${cronString}`));

            if (currentJob.cronString === cronString) {
              await launchScraping();
              setTimeout(async () => {
                const notFinishedPages = await getNotFinishedPages(date);

                if (notFinishedPages.length === 0) {
                  if (datesUniques[index + 1]) {
                    const newConvertedDate = dayjs(datesUniques[index + 1]);
                    const newCronString = `${newConvertedDate.minute()} ${newConvertedDate.hour()} * * ${newConvertedDate.day()}`;

                    task.stop();
                    console.log(chalk.yellow(`⌛ Stop - ${cronString}`));

                    currentJob = {
                      cronString: newCronString,
                      date: datesUniques[index + 1],
                    };
                  } else {
                    task.stop();
                    console.log(chalk.yellow(`⌛ Stop - ${cronString}`));

                    currentJob = defaultCurrentJob;
                  }
                }
              }, 30 * 1000);
            }
          });
        });
      });
    }, 30 * 1000);
  });
})();
