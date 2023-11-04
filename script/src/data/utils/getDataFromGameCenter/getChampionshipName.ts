import { Page } from "puppeteer";

const getChampionshipName = async (page: Page) => {
  return await page.evaluate(() => {
    const gameElements = Array.from(document.querySelectorAll(".game-result"));

    return gameElements.map((gameElement) => {
      const championship = window.location.href.split("/")[3];

      if (championship === "elite") {
        return "ELITE";
      }

      if (championship === "pro-b") {
        return "PRO B";
      }

      if (championship === "espoirs-elite") {
        return "ESPOIRS ELITE";
      }

      if (championship === "espoirs-pro-b") {
        return "ESPOIRS PRO B";
      }
    });
  });
};

export default getChampionshipName