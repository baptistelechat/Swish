import dayjs from "dayjs";
import { Page } from "puppeteer";
import { IGameWithoutDetails } from "../../interfaces/IGame";
import getChampionshipDayNumber from "../getDataFromGameCenter/getChampionshipDayNumber";
import getChampionshipName from "../getDataFromGameCenter/getChampionshipName";
import { getGameDay, getGameHour } from "../getDataFromGameCenter/getGameDate";
import {
  getAwayTeamLogo,
  getHomeTeamLogo,
} from "../getDataFromGameCenter/getTeamLogo";
import {
  getAwayTeamName,
  getHomeTeamName,
} from "../getDataFromGameCenter/getTeamName";

const getGamesWithoutDetails = async (page: Page) => {
  const [
    dates,
    times,
    championshipNames,
    championshipDays,
    homeTeamNames,
    homeTeamLogos,
    awayTeamNames,
    awayTeamLogos,
  ] = await Promise.all([
    getGameDay(page),
    getGameHour(page),
    getChampionshipName(page),
    getChampionshipDayNumber(page),
    getHomeTeamName(page),
    getHomeTeamLogo(page),
    getAwayTeamName(page),
    getAwayTeamLogo(page),
  ]);

  const gamesWithoutDetails: IGameWithoutDetails[] = dates.map(
    (date, index) => {
      const time = times[index];
      const championshipName = championshipNames[index];
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
              .toDate()
          : null,
        championshipName: championshipName ? championshipName : null,
        championshipDayNumber: championshipDay ? championshipDay : null,
        home: {
          name: homeTeamName,
          logo: homeTeamLogo,
        },
        away: {
          name: awayTeamName,
          logo: awayTeamLogo,
        },
      };
    }
  );

  return gamesWithoutDetails;
};

export default getGamesWithoutDetails;
