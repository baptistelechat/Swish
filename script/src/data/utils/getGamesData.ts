import { Page } from "puppeteer";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { IGame } from "../interfaces/IGame";
import { getChampionshipDayNumber } from "./getDataFromGameCenter/getChampionshipDayNumber";
import {
  getAwayTeamName,
  getHomeTeamName,
} from "./getDataFromGameCenter/getTeamName";
import { getGameDay, getGameHour } from "./getDataFromGameCenter/getGameDate";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const getGamesData = async (page: Page) => {
  const [dates, times, championshipDays, homeTeamNames, awayTeamNames] =
    await Promise.all([
      getGameDay(page),
      getGameHour(page),
      getChampionshipDayNumber(page),
      getHomeTeamName(page),
      getAwayTeamName(page),
    ]);

  const convertedGames: IGame[] = dates.map((date, index) => {
    const time = times[index];
    const championshipDay = championshipDays[index];
    const homeTeamName = homeTeamNames[index];
    const awayTeamName = awayTeamNames[index];

    return {
      date: date
        ? dayjs(date, "DD.MM.YYYY")
            .hour(time.hours)
            .minute(time.minutes)
            .utc()
            .tz("Europe/Paris")
            .toDate()
        : null,
      championshipDayNumber: championshipDay ? Number(championshipDay) : null,
      home: {
        name: homeTeamName,
      },
      away: {
        name: awayTeamName,
      },
    };
  });

  console.log(convertedGames);

  return convertedGames;
};
