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
import getPageAfterNow from "./data/utils/notion/getPageAfterNow";

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
    console.log(`Navigated to ${url.id}`);

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

    const gamesData = await getGamesData(page);

    await browser.close();
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
  await launchScraping();

  setTimeout(async () => {
    const scheduledGames = await getPageAfterNow();

    console.log(scheduledGames.length);
  }, 30 * 1000);

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

// (async () => {
//   // Lancer le scraping tous les jours à 9h
//   cron.schedule("0 9 * * *", async () => {
//     await launchScraping();

//     if (gamesData) {
//       // Parcourir les matchs pour planifier les tâches de lancement
//       for (const game of gamesData) {
//         const matchDateTime = dayjs(game.date);

//         if (game.score) {
//           const period = game.score.period as string;

//           // Vérifier si le match a déjà commencé
//           if (dayjs().isAfter(matchDateTime) && period !== "FIN") {
//             // Mettez ici la logique de scraping
//             launchScraping();
//           } else {
//             // Planifier le scraping au début du match
//             cron.schedule(
//               `${matchDateTime.minute()} ${matchDateTime.hour()} * * ${matchDateTime.day()}`,
//               async () => {
//                 if (dayjs().isAfter(matchDateTime) && period !== "FIN") {
//                   // Mettez ici la logique de scraping
//                   launchScraping();
//                 }
//               }
//             );
//           }
//         }
//       }
//     }
//   });
// })();
