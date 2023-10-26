import { Page } from "puppeteer";

export const getHomeTeamName = async (page: Page) => {
  return await page.evaluate(() => {
    // All games elements
    const gameElements = Array.from(document.querySelectorAll(".game-result"));

    return gameElements.map((gameElement) => {
      // Home team name
      const HomeTeamNameElement = gameElement.querySelector(
        ".home_team"
      ) as HTMLDivElement;
      return HomeTeamNameElement ? HomeTeamNameElement.innerText.trim() : null;
    });
  });
};

export const getAwayTeamName = async (page: Page) => {
  return await page.evaluate(() => {
    // All games elements
    const gameElements = Array.from(document.querySelectorAll(".game-result"));

    return gameElements.map((gameElement) => {
      // Away team name
      const AwayTeamNameElement = gameElement.querySelector(
        ".road_team"
      ) as HTMLDivElement;
      return AwayTeamNameElement ? AwayTeamNameElement.innerText.trim() : null;
    });
  });
};
