import { Page } from "puppeteer";

export const getHomeTeamLogo = async (page: Page) => {
  return await page.evaluate(() => {
    // All games elements
    const gameElements = Array.from(document.querySelectorAll(".game-result"));

    return gameElements.map((gameElement) => {
      // Home team logo
      const HomeTeamLogoElement = gameElement.querySelector(
        ".left .logo>img"
      ) as HTMLImageElement;

      if (HomeTeamLogoElement) {
        const sm = HomeTeamLogoElement.src;
        const md = HomeTeamLogoElement.src.replace("sm", "md");
        const lg = HomeTeamLogoElement.src.replace("sm", "lg");

        return { sm, md, lg };
      }

      return null;
    });
  });
};

export const getAwayTeamLogo = async (page: Page) => {
  return await page.evaluate(() => {
    // All games elements
    const gameElements = Array.from(document.querySelectorAll(".game-result"));

    return gameElements.map((gameElement) => {
      // Away team logo
      const AwayTeamLogoElement = gameElement.querySelector(
        ".right .logo>img"
      ) as HTMLImageElement;

      if (AwayTeamLogoElement) {
        const sm = AwayTeamLogoElement.src;
        const md = AwayTeamLogoElement.src.replace("sm", "md");
        const lg = AwayTeamLogoElement.src.replace("sm", "lg");

        return { sm, md, lg };
      }

      return null;
    });
  });
};
