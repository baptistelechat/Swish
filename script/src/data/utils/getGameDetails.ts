import { Page } from "puppeteer";
import { getLocation } from "./getDataFromMatchLink/getLocation";
import { IGameDetails } from "../interfaces/IGame";
import { getScore } from "./getDataFromMatchLink/getScore";
import { getMatchLink } from "./getDataFromGameCenter/getMatchLink";

export const getGameDetails = async (page: Page) => {
  const [matchLinks] = await Promise.all([getMatchLink(page)]);

  const gameDetails: IGameDetails[] = [];

  for (let index = 0; index < matchLinks.length; index++) {
    const matchLink = matchLinks[index].link;

    if (matchLink) {
      await page.goto(matchLink);

      const [location, score] = await Promise.all([
        getLocation(page),
        getScore(page),
      ]);

      const gameDetail: IGameDetails = {
        location,
        score,
      };

      gameDetails.push(gameDetail);
    } else {
      gameDetails.push({
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
            home: matchLinks[index].final.home,
            away: matchLinks[index].final.away,
          },
        },
      });
    }
  }
  return gameDetails;
};
