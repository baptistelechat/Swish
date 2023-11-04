import { Page } from "puppeteer";

const getChampionshipDayNumber = async (page: Page) => {
  return await page.evaluate(() => {
    const gameElements = Array.from(document.querySelectorAll(".game-result"));

    return gameElements.map((gameElement) => {
      // Championship day number
      const championshipDayNumberElement = gameElement.querySelector(
        ".championship-day"
      ) as HTMLDivElement;

      if (championshipDayNumberElement) {
        const championshipPresentation =
          championshipDayNumberElement.innerText.trim();
        const championshipDayNumber = !championshipPresentation.includes(
          "LEADERS"
        )
          ? `${window.location.href
              .split("/")[3]
              .replaceAll("-", " ")
              .toUpperCase()} - ${
              championshipPresentation.split("ÈRE")[0].split("ÈME")[0]
            }`
          : `${championshipPresentation
              .split(" - ")[0]
              .replace("PROB", "PRO B")} - ${
              championshipPresentation
                .split(" - ")[1]
                .split("ÈRE")[0]
                .split("ÈME")[0]
            }`;

        return championshipDayNumber;
      }

      return null;
    });
  });
};

export default getChampionshipDayNumber
