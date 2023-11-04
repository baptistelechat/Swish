import { Client } from "@notionhq/client";
import { IGame } from "../../interfaces/IGame";
import getMatchId from "../gameData/getMatchId";
import {
  updateOT1Away,
  updateOT2Away,
  updateOT3Away,
  updateQ1Away,
  updateQ2Away,
  updateQ3Away,
  updateQ4Away,
} from "./gameDetails/updateAwayScore";
import {
  updateOT1Home,
  updateOT2Home,
  updateOT3Home,
  updateQ1Home,
  updateQ2Home,
  updateQ3Home,
  updateQ4Home,
} from "./gameDetails/updateHomeScore";
import updateLocation from "./gameDetails/updateLocation";
import updatePeriod from "./gameDetails/updatePeriod";
import {
  updateColorAway,
  updateColorHome,
} from "./gameDetails/updateTeamsColor";
import getPageByMatch from "./getPageByMatch";

const updateGame = async (game: IGame) => {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const matchId = getMatchId(game);

  const page = (await getPageByMatch(matchId)).page as any;
  const matchExist = (await getPageByMatch(matchId)).exist;

  if (matchExist) {
    const properties = page.properties;
    await updatePeriod({
      notion,
      page,
      value: game.score?.period,
      homeTeamName: game.home.name,
      awayTeamName: game.away.name,
    });

    if (properties.Lieu.rich_text.length === 0) {
      await updateLocation({
        notion,
        page,
        value: game.location,
        homeTeamName: game.home.name,
        awayTeamName: game.away.name,
      });
    }

    if (properties["Domicile - Couleur"].rich_text.length === 0) {
      await updateColorHome({
        notion,
        page,
        value: game.colors.home,
        teamName: game.home.name,
      });
    }

    if (properties["Extérieur - Couleur"].rich_text.length === 0) {
      await updateColorAway({
        notion,
        page,
        value: game.colors.away,
        teamName: game.home.name,
      });
    }

    if (game.score?.period !== "Fin") {
      // Home
      await updateQ1Home({
        notion,
        page,
        value: game.score?.q1.home,
        teamName: game.home.name,
      });
      await updateQ2Home({
        notion,
        page,
        value: game.score?.q2.home,
        teamName: game.home.name,
      });
      await updateQ3Home({
        notion,
        page,
        value: game.score?.q3.home,
        teamName: game.home.name,
      });
      await updateQ4Home({
        notion,
        page,
        value: game.score?.q4.home,
        teamName: game.home.name,
      });
      await updateOT1Home({
        notion,
        page,
        value: game.score?.ot1.home,
        teamName: game.home.name,
      });
      await updateOT2Home({
        notion,
        page,
        value: game.score?.ot2.home,
        teamName: game.home.name,
      });
      await updateOT3Home({
        notion,
        page,
        value: game.score?.ot3.home,
        teamName: game.home.name,
      });

      // Away
      await updateQ1Away({
        notion,
        page,
        value: game.score?.q1.away,
        teamName: game.away.name,
      });
      await updateQ2Away({
        notion,
        page,
        value: game.score?.q2.away,
        teamName: game.away.name,
      });
      await updateQ3Away({
        notion,
        page,
        value: game.score?.q3.away,
        teamName: game.away.name,
      });
      await updateQ4Away({
        notion,
        page,
        value: game.score?.q4.away,
        teamName: game.away.name,
      });
      await updateOT1Away({
        notion,
        page,
        value: game.score?.ot1.away,
        teamName: game.away.name,
      });
      await updateOT2Away({
        notion,
        page,
        value: game.score?.ot2.away,
        teamName: game.away.name,
      });
      await updateOT3Away({
        notion,
        page,
        value: game.score?.ot3.away,
        teamName: game.away.name,
      });
    }
  }
};

export default updateGame;
