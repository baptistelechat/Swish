import { Page } from "puppeteer";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { IGame } from "../interfaces/IGame";
import { getGameDetails } from "./getGameDetails";
import { getGamesWithoutDetails } from "./getGamesWithoutDetails";
import chalk from "chalk";
import { getProgress } from "./getProgress";

dayjs.extend(customParseFormat);

export const getGamesData = async (page: Page) => {
  const gamesWithoutDetails = await getGamesWithoutDetails(page);

  // TODO Enregistrement Notion + Créer tache CRON

  const gameDetails = await getGameDetails(page);

  const gamesData: IGame[] = gamesWithoutDetails.map(
    (gamesWithoutDetails, index) => {
      const gameDetail = gameDetails[index];

      const { date, championshipDayNumber, home, away } = gamesWithoutDetails;
      const { location, score } = gameDetail;

      const gameData: IGame = {
        date,
        championshipDayNumber,
        home,
        away,
        location,
        score,
      };

      const progress = getProgress(gameData);
      console.log(chalk.bgBlue(progress));

      return gameData;
    }
  );

  // console.log(gamesData);

  return gamesData;
};
