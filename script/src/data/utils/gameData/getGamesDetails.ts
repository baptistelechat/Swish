import { Page } from "puppeteer";
import { IGameDetails } from "../../interfaces/IGame";
import getMatchLink from "../getDataFromGameCenter/getMatchLink";
import getLocation from "../getDataFromMatchLink/getLocation";
import getScore from "../getDataFromMatchLink/getScore";
import getTeamsColor from "../getDataFromMatchLink/getTeamsColor";

const getGamesDetails = async (page: Page) => {
  const [matchLinks] = await Promise.all([getMatchLink(page)]);

  const gamesDetails: IGameDetails[] = [];

  for (let index = 0; index < matchLinks.length; index++) {
    const matchLink = matchLinks[index].link;

    if (matchLink) {
      await page.goto(matchLink);

      const [colors, location, score] = await Promise.all([
        getTeamsColor(page),
        getLocation(page),
        getScore(page),
      ]);

      const gameDetail: IGameDetails = {
        colors,
        location,
        score,
      };

      gamesDetails.push(gameDetail);
    } else {
      gamesDetails.push({
        colors: {
          home: null,
          away: null,
        },
        location: null,
        score: {
          period: matchLinks[index].period,
          q1: {
            home: null,
            away: null,
          },
          q2: {
            home: null,
            away: null,
          },
          q3: {
            home: null,
            away: null,
          },
          q4: {
            home: null,
            away: null,
          },
          ot1: {
            home: null,
            away: null,
          },
          ot2: {
            home: null,
            away: null,
          },
          ot3: {
            home: null,
            away: null,
          },
          final: {
            home: matchLinks[index].final ? matchLinks[index].final.home : null,
            away: matchLinks[index].final ? matchLinks[index].final.away : null,
          },
        },
      });
    }
  }
  return gamesDetails;
};

export default getGamesDetails;
