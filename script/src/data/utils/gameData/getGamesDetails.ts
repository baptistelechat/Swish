import { Page } from "puppeteer";
import { IGameDetails, IGameWithoutDetails } from "../../interfaces/IGame";
import getMatchLink from "../getDataFromGameCenter/getMatchLink";
import getLocation from "../getDataFromMatchLink/getLocation";
import getScore from "../getDataFromMatchLink/getScore";
import getTeamsColor from "../getDataFromMatchLink/getTeamsColor";

const getGamesDetails = async (
  page: Page,
  gameWithoutDetails: IGameWithoutDetails[]
) => {
  const [matchLinks] = await Promise.all([getMatchLink(page)]);

  const gamesDetails: IGameDetails[] = [];

  for (let index = 0; index < matchLinks.length; index++) {
    const matchLink = matchLinks[index].link;

    if (matchLink) {
      await page.goto(matchLink);

      const homeTeamName = gameWithoutDetails[index].home.name;
      const awayTeamName = gameWithoutDetails[index].away.name;

      if (homeTeamName && awayTeamName) {
        const [colors, location, score] = await Promise.all([
          getTeamsColor(page, homeTeamName, awayTeamName),
          getLocation(page, homeTeamName, awayTeamName),
          getScore(page, homeTeamName, awayTeamName),
        ]);

        const gameDetail: IGameDetails = {
          colors,
          location,
          score,
        };

        gamesDetails.push(gameDetail);
      }
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
