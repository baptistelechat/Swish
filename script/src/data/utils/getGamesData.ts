import { Page } from "puppeteer";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { IGame } from "../interfaces/IGame";
import { getChampionshipDayNumber } from "./getDataFromGameCenter/getChampionshipDayNumber";
import { getGamesDay } from "./getDataFromGameCenter/getGameDay";
import { getGameHour } from "./getDataFromGameCenter/getGameHour";

dayjs.extend(customParseFormat);

export const getGamesData = async (page: Page) => {
  const [dates, times, championshipDays] = await Promise.all([
    getGamesDay(page),
    getGameHour(page),
    getChampionshipDayNumber(page),
  ]);

  const convertedGames: IGame[] = dates.map((date, index) => {
    const time = times[index];
    const championshipDay = championshipDays[index];

    return {
      date: date
        ? dayjs(date, "DD.MM.YYYY")
            .set("hours", time.hours)
            .set("minutes", time.minutes)
            .add(1, "day")
            .add(1, "hour")
            .toDate()
        : null,
      championshipDayNumber: championshipDay ? Number(championshipDay) : null,
    };
  });

  console.log(convertedGames);

  return convertedGames;
};
