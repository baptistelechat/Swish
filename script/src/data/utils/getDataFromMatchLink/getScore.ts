import { Page } from "puppeteer";
import { IScore } from "../../interfaces/IScore";
import { TPeriod } from "../../interfaces/TPeriod";

const getScore = async (page: Page) => {
  await Promise.race([
    page.waitForSelector(".period-scores-desktop > div"),
    page.waitForSelector("span.location"),
  ]);

  return await page.evaluate(() => {
    // Score
    const scoreContainerElement = document.querySelector(
      ".period-scores-desktop > div"
    ) as HTMLDivElement;

    const activePeriodElement = document.querySelector(".activePeriod");

    const gameClockTimeElement = document.querySelector(
      ".game-clock-time-value"
    );

    const locationSpan = document.querySelector("span.location");

    if (locationSpan) {
      return {
        period: "Live",
        q1: {
          home: 0,
          away: 0,
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
          home: null,
          away: null,
        },
      } as IScore;
    }

    if (scoreContainerElement) {
      const q1Home = scoreContainerElement.querySelector(
        "table > tbody > tr:nth-child(1) > td:nth-child(1)"
      ) as HTMLTableElement;
      const q2Home = scoreContainerElement.querySelector(
        "table > tbody > tr:nth-child(1) > td:nth-child(2)"
      ) as HTMLTableElement;
      const q3Home = scoreContainerElement.querySelector(
        "table > tbody > tr:nth-child(1) > td:nth-child(3)"
      ) as HTMLTableElement;
      const q4Home = scoreContainerElement.querySelector(
        "table > tbody > tr:nth-child(1) > td:nth-child(4)"
      ) as HTMLTableElement;
      const ot1Home = scoreContainerElement.querySelector(
        "table > tbody > tr:nth-child(1) > td:nth-child(5)"
      ) as HTMLTableElement;
      const ot2Home = scoreContainerElement.querySelector(
        "table > tbody > tr:nth-child(1) > td:nth-child(6)"
      ) as HTMLTableElement;
      const ot3Home = scoreContainerElement.querySelector(
        "table > tbody > tr:nth-child(1) > td:nth-child(7)"
      ) as HTMLTableElement;

      const q1Away = scoreContainerElement.querySelector(
        "table > tbody > tr:nth-child(2) > td:nth-child(1)"
      ) as HTMLTableElement;
      const q2Away = scoreContainerElement.querySelector(
        "table > tbody > tr:nth-child(2) > td:nth-child(2)"
      ) as HTMLTableElement;
      const q3Away = scoreContainerElement.querySelector(
        "table > tbody > tr:nth-child(2) > td:nth-child(3)"
      ) as HTMLTableElement;
      const q4Away = scoreContainerElement.querySelector(
        "table > tbody > tr:nth-child(2) > td:nth-child(4)"
      ) as HTMLTableElement;
      const ot1Away = scoreContainerElement.querySelector(
        "table > tbody > tr:nth-child(2) > td:nth-child(5)"
      ) as HTMLTableElement;
      const ot2Away = scoreContainerElement.querySelector(
        "table > tbody > tr:nth-child(2) > td:nth-child(6)"
      ) as HTMLTableElement;
      const ot3Away = scoreContainerElement.querySelector(
        "table > tbody > tr:nth-child(2) > td:nth-child(7)"
      ) as HTMLTableElement;

      const currentPeriod = () => {
        if (activePeriodElement && gameClockTimeElement) {
          if (
            activePeriodElement.innerHTML === "Q2" &&
            (gameClockTimeElement.innerHTML === "Terminé" ||
              gameClockTimeElement.innerHTML === "00:00")
          ) {
            return "Mi-temps";
          }
          if (gameClockTimeElement.innerHTML !== "Terminé") {
            return activePeriodElement.innerHTML as TPeriod;
          }
        }

        return "Live";
      };

      const score: IScore = {
        period: currentPeriod(),
        q1: {
          home: q1Home ? Number(q1Home.innerHTML) : null,
          away: q1Away ? Number(q1Away.innerHTML) : null,
        },
        q2: {
          home: q2Home ? Number(q2Home.innerHTML) : null,
          away: q2Away ? Number(q2Away.innerHTML) : null,
        },
        q3: {
          home: q3Home ? Number(q3Home.innerHTML) : null,
          away: q3Away ? Number(q3Away.innerHTML) : null,
        },
        q4: {
          home: q4Home ? Number(q4Home.innerHTML) : null,
          away: q4Away ? Number(q4Away.innerHTML) : null,
        },
        ot1: {
          home: ot1Home ? Number(ot1Home.innerHTML) : null,
          away: ot1Away ? Number(ot1Away.innerHTML) : null,
        },
        ot2: {
          home: ot2Home ? Number(ot2Home.innerHTML) : null,
          away: ot2Away ? Number(ot2Away.innerHTML) : null,
        },
        ot3: {
          home: ot3Home ? Number(ot3Home.innerHTML) : null,
          away: ot3Away ? Number(ot3Away.innerHTML) : null,
        },
        final: {
          home: null,
          away: null,
        },
      };

      return score;
    }
    const defaultScore: IScore = {
      period: "A venir",
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
        home: null,
        away: null,
      },
    };

    return defaultScore;
  });
};

export default getScore;
