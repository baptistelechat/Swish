import { Page } from "puppeteer";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { IGame } from "../interfaces/IGame";

dayjs.extend(customParseFormat);

export const getGamesData = async (page: Page) => {
  const games = await page.evaluate(() => {
    // All games elements
    const gameElements = Array.from(document.querySelectorAll(".game-result"));

    return gameElements.map((gameElement) => {
      // Championship Day
      const championshipDayNumber = () => {
        const championshipDayNumberElement = gameElement.querySelector(
          ".championship-day"
        ) as HTMLDivElement;
        return championshipDayNumberElement
          ? championshipDayNumberElement.innerText
              .trim()
              .split("ÈRE")[0]
              .split("ÈME")[0]
          : null;
      };

      // Game day
      const date = () => {
        const dateElements = gameElement.querySelector(
          ".championship-day"
        ) as HTMLDivElement;
        const dateString = dateElements.innerText.trim().split(" - ")[1];

        return dateElements ? dateString : null;
      };

      // Game hour
      const time = () => {
        const timeElements = gameElement.querySelector(
          ".hour > a"
        ) as HTMLSpanElement;

        const [hours, minutes] = timeElements.innerHTML.split(":").map(Number);
        return { hours, minutes };
      };

      // Return raw dato
      return {
        date: date(),
        time: time(),
        championshipDay: championshipDayNumber(),
      };
    });
  });

  const convertedGames: IGame[] = games.map((game) => ({
    date: game.date
      ? dayjs(game.date, "DD.MM.YYYY")
          .set("hours", game.time.hours)
          .set("minutes", game.time.minutes)
          .add(1, "day")
          .add(1, "hour")
          .toDate()
      : null,
    championshipDayNumber: game.championshipDay ? Number(game.championshipDay) : null,
  }));

  console.log(convertedGames);

  return convertedGames;
};
