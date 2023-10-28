import { Page } from "puppeteer";
import { IGame } from "../interfaces/IGame";

export const getProgress = (
  gameData: IGame
): string => {
  const homeTeam = gameData.home.name;
  const awayTeam = gameData.away.name;
  const q1Home = gameData.score?.q1.home;
  const q1Away = gameData.score?.q1.away;
  const q2Home = gameData.score?.q2.home;
  const q2Away = gameData.score?.q2.away;
  const q3Home = gameData.score?.q3.home;
  const q3Away = gameData.score?.q3.away;
  const q4Home = gameData.score?.q4.home;
  const q4Away = gameData.score?.q4.away;
  const ot1Home = gameData.score?.ot1.home;
  const ot1Away = gameData.score?.ot1.away;
  const ot2Home = gameData.score?.ot2.home;
  const ot2Away = gameData.score?.ot2.away;
  const finalHome = gameData.score?.final.home;
  const finalAway = gameData.score?.final.away;
  const period = gameData.score?.period;

  // Fin de match
  if (period === "Fin") {
    return `🏀 Fin du match - ${homeTeam} (${finalHome}) - ${awayTeam} (${finalAway})`;
  }

  // Prolongation
  if (period === "OT3") {
    if (
      q1Home &&
      q1Away &&
      q2Home &&
      q2Away &&
      q3Home &&
      q3Away &&
      q4Home &&
      q4Away &&
      ot1Home &&
      ot1Away &&
      ot2Home &&
      ot2Away
    ) {
      return `🏀 Fin de la prolongation 2 (OT3 en cours) - ${homeTeam} (${
        q1Home + q2Home + q3Home + q4Home + ot1Home + ot2Home
      }) - ${awayTeam} (${
        q1Away + q2Away + q3Away + q4Away + ot1Away + ot2Away
      })`;
    }
  }

  if (period === "OT2") {
    if (
      q1Home &&
      q1Away &&
      q2Home &&
      q2Away &&
      q3Home &&
      q3Away &&
      q4Home &&
      q4Away &&
      ot1Home &&
      ot1Away
    ) {
      return `🏀 Fin de la prolongation 1 (OT2 en cours) - ${homeTeam} (${
        q1Home + q2Home + q3Home + q4Home + ot1Home
      }) - ${awayTeam} (${q1Away + q2Away + q3Away + q4Away + ot1Away})`;
    }
  }

  if (period === "OT1") {
    if (
      q1Home &&
      q1Away &&
      q2Home &&
      q2Away &&
      q3Home &&
      q3Away &&
      q4Home &&
      q4Away
    ) {
      return `🏀 Fin du 4ème quart-temps (OT1 en cours) - ${homeTeam} (${
        q1Home + q2Home + q3Home + q4Home
      }) - ${awayTeam} (${q1Away + q2Away + q3Away + q4Away})`;
    }
  }

  // 3ème quart-temps
  if (period === "Q4") {
    if (q1Home && q1Away && q2Home && q2Away && q3Home && q3Away) {
      return `🏀 Fin du 3ème quart-temps (Q4 en cours) - ${homeTeam} (${
        q1Home + q2Home + q3Home
      }) - ${awayTeam} (${q1Away + q2Away + q3Away})`;
    }
  }

  // 2ème quart-temps
  if (period === "Mi-temps") {
    if (q1Home && q1Away && q2Home && q2Away) {
      return `🏀 Fin du 2ème quart-temps (Mi-temps) - ${homeTeam} (${
        q1Home + q2Home
      }) - ${awayTeam} (${q1Away + q2Away})`;
    }
  }

  // 1er quart-temps
  if (period === "Q2") {
    if (q1Home && q1Away) {
      return `🏀 Fin du 1er quart-temps (Q2 en cours) - ${homeTeam} (${q1Home}) - ${awayTeam} (${q1Away})`;
    }
  }

  return "⌛🏀⌛🏀⌛🏀⌛";
};
