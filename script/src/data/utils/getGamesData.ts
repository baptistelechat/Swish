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
import {
  getAwayTeamLogo,
  getHomeTeamLogo,
} from "./getDataFromGameCenter/getTeamLogo";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const getGamesData = async (page: Page) => {
  const [
    dates,
    times,
    championshipDays,
    homeTeamNames,
    homeTeamLogos,
    awayTeamNames,
    awayTeamLogos,
  ] = await Promise.all([
    getGameDay(page),
    getGameHour(page),
    getChampionshipDayNumber(page),
    getHomeTeamName(page),
    getHomeTeamLogo(page),
    getAwayTeamName(page),
    getAwayTeamLogo(page),
  ]);

  const convertedGames: IGame[] = dates.map((date, index) => {
    const time = times[index];
    const championshipDay = championshipDays[index];
    const homeTeamName = homeTeamNames[index];
    const homeTeamLogo = homeTeamLogos[index];
    const awayTeamName = awayTeamNames[index];
    const awayTeamLogo = awayTeamLogos[index];

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
        logo: homeTeamLogo,
      },
      away: {
        name: awayTeamName,
        logo: awayTeamLogo,
      },
    };
  });

  console.log(convertedGames);

  return convertedGames;
};
