import { Page } from "puppeteer";
import { TPeriod } from "../../interfaces/TPeriod";

const getMatchLink = async (page: Page) => {
  return await page.evaluate(() => {
    // All games elements
    const gameElements = Array.from(document.querySelectorAll(".game-result"));

    return gameElements.map((gameElement) => {
      // Match Link
      const liveButtonElement = gameElement.querySelector(
        ".link > a > button"
      ) as HTMLButtonElement;

      const btwElement = gameElement.querySelector(".btw") as HTMLSpanElement;

      const finalHomeScoreElement = gameElement.querySelector(
        "div.state > span:nth-child(2)"
      ) as HTMLDivElement;
      const finalAwayScoreElement = gameElement.querySelector(
        "div.state > span:nth-child(4)"
      ) as HTMLDivElement;

      if (btwElement) {
        if (btwElement.innerHTML === "FIN") {
          let finalHome = "";
          let finalAway = "";

          if (finalHomeScoreElement) {
            finalHome = finalHomeScoreElement.innerHTML;
          }
          if (finalAwayScoreElement) {
            finalAway = finalAwayScoreElement.innerHTML;
          }

          return {
            period: "Fin",
            link: null,
            final: {
              home: Number(finalHome),
              away: Number(finalAway),
            },
          } as {
            period: TPeriod;
            link: string | null;
            final: {
              home: number | null;
              away: number | null;
            };
          };
        }
      }

      if (liveButtonElement) {
        liveButtonElement.innerHTML.trim() === "LIVE";
        const matchLinkElement = gameElement.querySelector(
          ".link > a "
        ) as HTMLAnchorElement;
        if (matchLinkElement) {
          return matchLinkElement.href.includes("game-center-resume")
            ? ({ period: "Live", link: matchLinkElement.href } as {
                period: TPeriod;
                link: string | null;
                final: {
                  home: number | null;
                  away: number | null;
                };
              })
            : ({ period: "A venir", link: null } as {
                period: TPeriod;
                link: string | null;
                final: {
                  home: number | null;
                  away: number | null;
                };
              });
        }
      }

      return { period: "A venir", link: null } as {
        period: TPeriod;
        link: string | null;
        final: {
          home: number | null;
          away: number | null;
        };
      };
    });
  });
};

export default getMatchLink;
