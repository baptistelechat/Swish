import dayjs from "dayjs";
import "dayjs/locale/fr";
import calendar from "dayjs/plugin/calendar";
import isBetween from "dayjs/plugin/isBetween";
import { IGame } from "../../interfaces/IGame";

dayjs.extend(calendar);
dayjs.extend(isBetween);

const getProgress = (gameData: IGame): string => {
  const date = gameData.date;
  const homeTeam = gameData.home.name;
  const awayTeam = gameData.away.name;
  const q1Home = gameData.score?.q1.home ? gameData.score?.q1.home : 0;
  const q1Away = gameData.score?.q1.away ? gameData.score?.q1.away : 0;
  const q2Home = gameData.score?.q2.home ? gameData.score?.q2.home : 0;
  const q2Away = gameData.score?.q2.away ? gameData.score?.q2.away : 0;
  const q3Home = gameData.score?.q3.home ? gameData.score?.q3.home : 0;
  const q3Away = gameData.score?.q3.away ? gameData.score?.q3.away : 0;
  const q4Home = gameData.score?.q4.home ? gameData.score?.q4.home : 0;
  const q4Away = gameData.score?.q4.away ? gameData.score?.q4.away : 0;
  const ot1Home = gameData.score?.ot1.home ? gameData.score?.ot1.home : 0;
  const ot1Away = gameData.score?.ot1.away ? gameData.score?.ot1.away : 0;
  const ot2Home = gameData.score?.ot2.home ? gameData.score?.ot2.home : 0;
  const ot2Away = gameData.score?.ot2.away ? gameData.score?.ot2.away : 0;
  const ot3Home = gameData.score?.ot3.home ? gameData.score?.ot3.home : 0;
  const ot3Away = gameData.score?.ot3.away ? gameData.score?.ot3.away : 0;
  const finalHome = gameData.score?.final.home ? gameData.score?.final.home : 0;
  const finalAway = gameData.score?.final.away ? gameData.score?.final.away : 0;
  const period = gameData.score?.period;

  // Fin de match
  if (period === "Fin") {
    return `🏆 Fin du match / ${homeTeam} (${finalHome}) → ${awayTeam} (${finalAway})`;
  }

  // Prolongation
  if (period === "OT3") {
    return `⌛ 3ème prolongation en cours → ${homeTeam} (${
      q1Home + q2Home + q3Home + q4Home + ot1Home + ot2Home + ot3Home
    }) / ${awayTeam} (${
      q1Away + q2Away + q3Away + q4Away + ot1Away + ot2Away + ot3Away
    })`;
  }

  if (period === "OT2") {
    return `⌛ 2ème prolongation en cours → ${homeTeam} (${
      q1Home + q2Home + q3Home + q4Home + ot1Home + ot2Home
    }) / ${awayTeam} (${
      q1Away + q2Away + q3Away + q4Away + ot1Away + ot2Away
    })`;
  }

  if (period === "OT1") {
    return `⌛ 1ère prolongation en cours → ${homeTeam} (${
      q1Home + q2Home + q3Home + q4Home + ot1Home
    }) / ${awayTeam} (${q1Away + q2Away + q3Away + q4Away + ot1Away})`;
  }

  // 3ème quart-temps
  if (period === "Q4") {
    return `⌛ 4ème quart-temps en cours → ${homeTeam} (${
      q1Home + q2Home + q3Home + q4Home
    }) / ${awayTeam} (${q1Away + q2Away + q3Away + q4Away})`;
  }
  if (period === "Q3") {
    return `⌛ 3ème quart-temps en cours → ${homeTeam} (${
      q1Home + q2Home + q3Home
    }) / ${awayTeam} (${q1Away + q2Away + q3Away})`;
  }

  // 2ème quart-temps
  if (period === "Mi-temps") {
    return `⌛ Fin du 2ème quart-temps (Mi-temps) → ${homeTeam} (${
      q1Home + q2Home
    }) / ${awayTeam} (${q1Away + q2Away})`;
  }

  // 1er quart-temps
  if (period === "Q2") {
    return `⌛ 2ème quart-temps en cours → ${homeTeam} (${
      q1Home + q2Home
    }) / ${awayTeam} (${q1Away + q2Away})`;
  }
  if (period === "Q1") {
    return `⌛ 1er quart-temps en cours → ${homeTeam} (${q1Home}) / ${awayTeam} (${q1Away})`;
  }

  // A venir
  if (period === "A venir") {
    const formatDay = `${dayjs(date).date().toString().padStart(2, "0")}/${(
      dayjs(date).month() + 1
    )
      .toString()
      .padStart(2, "0")}/${dayjs(date).year()}`;

    const time = `${dayjs(date).hour().toString().padStart(2, "0")}:${dayjs(
      date
    )
      .minute()
      .toString()
      .padStart(2, "0")}`;

    const firstDayOfNextWeek = dayjs().startOf("week").day(1);
    const lastDayOfNextWeek = dayjs().endOf("week").day(7);

    if (dayjs(date).isSame(dayjs(), "day")) {
      return `📍 Match à venir (Aujourd'hui - ${time}) → ${homeTeam} / ${awayTeam}`;
    }

    if (dayjs(date).isBetween(firstDayOfNextWeek, lastDayOfNextWeek)) {
      const capitalize = (day: string) => {
        return `${day[0].toUpperCase()}${day.slice(1)}`;
      };

      const day = capitalize(dayjs(date).locale("fr").format("dddd"));

      return `📅 Match à venir (${day} - ${time}) → ${homeTeam} / ${awayTeam}`;
    }

    return `📅 Match à venir (${formatDay} - ${time}) → ${homeTeam} / ${awayTeam}`;
  }

  // Live
  if (period === "Live") {
    return `⌛ Match en cours → ${homeTeam} / ${awayTeam}`;
  }

  return `⌛🏀⌛🏀⌛🏀⌛ → ${homeTeam} / ${awayTeam}`;
};

export default getProgress;
