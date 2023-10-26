import { Page } from "puppeteer";

export const getChampionshipDayNumber = async (page: Page) => {
  return await page.evaluate(() => {
    const gameElements = Array.from(document.querySelectorAll(".game-result"));

    return gameElements.map((gameElement) => {
      // Championship day number
      const championshipDayNumberElement = gameElement.querySelector(
        ".championship-day"
      ) as HTMLDivElement;
      return championshipDayNumberElement
        ? championshipDayNumberElement.innerText
            .trim()
            .split("ÈRE")[0]
            .split("ÈME")[0]
        : null;
    });
  });
};
