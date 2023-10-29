import { Client } from "@notionhq/client";
import { IGame } from "../../interfaces/IGame";
import getPageByMatch from "./getPageByMatch";
import updateLocation from "./gameDetails/updateLocation";
import {
  updateOT1Home,
  updateOT2Home,
  updateOT3Home,
  updateQ1Home,
  updateQ2Home,
  updateQ3Home,
  updateQ4Home,
} from "./gameDetails/updateHomeScore";
import getMatchId from "../gameData/getMatchId";
import {
  updateQ1Away,
  updateQ2Away,
  updateQ3Away,
  updateQ4Away,
  updateOT1Away,
  updateOT2Away,
  updateOT3Away,
} from "./gameDetails/updateAwayScore";
import updatePeriod from "./gameDetails/updatePeriod";

const updateGame = async (game: IGame) => {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const matchId = getMatchId(game);

  const page = (await getPageByMatch(matchId)).page as any;
  const properties = page.properties;

  await updatePeriod(notion, page, game.score?.period);

  if (properties.Lieu.rich_text.length === 0) {
    await updateLocation(notion, page, game.location);
  }

  if (game.score?.period !== "Fin") {
    // Home
    await updateQ1Home(notion, page, game.score?.q1.home);
    await updateQ2Home(notion, page, game.score?.q2.home);
    await updateQ3Home(notion, page, game.score?.q3.home);
    await updateQ4Home(notion, page, game.score?.q4.home);
    await updateOT1Home(notion, page, game.score?.ot1.home);
    await updateOT2Home(notion, page, game.score?.ot2.home);
    await updateOT3Home(notion, page, game.score?.ot3.home);
    // Away
    await updateQ1Away(notion, page, game.score?.q1.away);
    await updateQ2Away(notion, page, game.score?.q2.away);
    await updateQ3Away(notion, page, game.score?.q3.away);
    await updateQ4Away(notion, page, game.score?.q4.away);
    await updateOT1Away(notion, page, game.score?.ot1.away);
    await updateOT2Away(notion, page, game.score?.ot2.away);
    await updateOT3Away(notion, page, game.score?.ot3.away);
  }
};

export default updateGame;
