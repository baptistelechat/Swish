import chalk from "chalk";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Page } from "puppeteer";
import { IGame } from "../../interfaces/IGame";
import addNewGame from "../notion/addNewGame";
import endGame from "../notion/endGame";
import updateGame from "../notion/updateGame";
import getGamesDetails from "./getGamesDetails";
import getGamesWithoutDetails from "./getGamesWithoutDetails";
import getProgress from "./getProgress";

dayjs.extend(customParseFormat);

const getGamesData = async (page: Page) => {
  const gamesWithoutDetails = await getGamesWithoutDetails(page);

  gamesWithoutDetails.map(async (game) => {
    await addNewGame(game);
  });

  const gamesDetails = await getGamesDetails(page);

  const gamesData: IGame[] = gamesWithoutDetails.map(
    (gameWithoutDetails, index) => {
      const gameDetails = gamesDetails[index];

      const { date, championshipName, championshipDayNumber, home, away } =
        gameWithoutDetails;
      const { colors, location, score } = gameDetails;

      const gameData: IGame = {
        date,
        championshipName,
        championshipDayNumber,
        home,
        away,
        colors,
        location,
        score,
      };

      if (location) {
        updateGame(gameData);
      }

      if (score?.period === "Fin") {
        endGame(gameData);
      }

      const progress = getProgress(gameData);

      if (
        progress.includes("Match à venir") ||
        progress.includes("Fin du match")
      ) {
        console.log(chalk.gray(progress));
      } else {
        console.log(progress);
      }

      return gameData;
    }
  );

  // console.log(gamesData);

  return gamesData;
};

export default getGamesData;
