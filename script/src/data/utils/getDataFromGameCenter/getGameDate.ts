import { Page } from "puppeteer";

export const getGameDay = async (page: Page) => {
  return await page.evaluate(() => {
    // All games elements
    const gameElements = Array.from(document.querySelectorAll(".game-result"));

    return gameElements.map((gameElement) => {
      // Game day
      const dateElements = gameElement.querySelector(
        ".championship-day"
      ) as HTMLDivElement;
      const dateString = dateElements.innerText.trim().split(" - ")[1];
      return dateElements ? dateString : null;
    });
  });
};

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
