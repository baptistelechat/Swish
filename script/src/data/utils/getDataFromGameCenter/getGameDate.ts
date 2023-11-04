import { Page } from "puppeteer";

export const getGameDay = async (page: Page) => {
  return await page.evaluate(() => {
    // All games elements
    const gameElements = Array.from(document.querySelectorAll(".game-result"));

    return gameElements.map((gameElement) => {
      // Game day
      const dateElement = gameElement.querySelector(
        ".championship-day"
      ) as HTMLDivElement;

      if (dateElement) {
        const championshipPresentation = dateElement.innerText.trim();
        const date = !championshipPresentation.includes("LEADERS")
          ? championshipPresentation.split(" - ")[1]
          : championshipPresentation.split(" - ")[2];

        return date;
      }

      return null;
    });
  });
};

export const getGameHour = async (page: Page) => {
  return await page.evaluate(() => {
    // All games elements
    const gameElements = Array.from(document.querySelectorAll(".game-result"));

    return gameElements.map((gameElement) => {
      // Game hour
      const timeElement = gameElement.querySelector(
        ".hour > a"
      ) as HTMLAnchorElement;

      if (timeElement) {
        const [hours, minutes] = timeElement.innerHTML.split(":").map(Number);
        return { hours, minutes };
      }
      return { hours: 0, minutes: 0 };
    });
  });
};
