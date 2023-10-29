import { IGame, IGameWithoutDetails } from "../../interfaces/IGame";

const getMatchId = (game: IGameWithoutDetails | IGame) => {
  const formatDate = () => {
    const stringifyDate = game.date?.toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
      dateStyle: "short",
    });

    if (stringifyDate) {
      const [day, month, year] = stringifyDate?.split("/");
      return `${year}${month}${day}`;
    }
    return "";
  };

  const match = `${game.championshipDayNumber}_${formatDate()}_${
    game.home.name
  }_${game.away.name}`;

  return match;
};

export default getMatchId;
