import { Page } from "puppeteer";

export const getGameHour = async (page: Page) => {
  return await page.evaluate(() => {
    // All games elements
    const gameElements = Array.from(document.querySelectorAll(".game-result"));

    return gameElements.map((gameElement) => {
      // Game hour
      const timeElements = gameElement.querySelector(
        ".hour > a"
      ) as HTMLSpanElement;

      const [hours, minutes] = timeElements.innerHTML.split(":").map(Number);
      return { hours, minutes };
    });
  });
};
