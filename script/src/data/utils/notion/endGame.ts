import { Client } from "@notionhq/client";
import { IGame } from "../../interfaces/IGame";
import getMatchId from "../gameData/getMatchId";
import getPageByMatch from "./getPageByMatch";
import {
  updateFinalAway,
  updateOT3Away,
  updateOT2Away,
  updateOT1Away,
  updateQ4Away,
} from "./gameDetails/updateAwayScore";
import {
  updateFinalHome,
  updateOT3Home,
  updateOT2Home,
  updateOT1Home,
  updateQ4Home,
} from "./gameDetails/updateHomeScore";

const endGame = async (game: IGame) => {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const matchId = getMatchId(game);

  const page = (await getPageByMatch(matchId)).page as any;
  const matchExist = (await getPageByMatch(matchId)).exist;

  if (matchExist) {
    const properties = page.properties;
    const finalHome = game.score?.final.home;
    const finalAway = game.score?.final.away;

    // Home
    const q1Home = properties["Domicile - Q1"].number;
    const q2Home = properties["Domicile - Q2"].number;
    const q3Home = properties["Domicile - Q3"].number;
    const q4Home = properties["Domicile - Q4"].number;
    const ot1Home = properties["Domicile - OT1"].number;
    const ot2Home = properties["Domicile - OT2"].number;
    const ot3Home = properties["Domicile - OT3"].number;
    const homeTeamName = properties["Domicile - Nom"].rich_text[0].text.content;

    // Away
    const q1Away = properties["Extérieur - Q1"].number;
    const q2Away = properties["Extérieur - Q2"].number;
    const q3Away = properties["Extérieur - Q3"].number;
    const q4Away = properties["Extérieur - Q4"].number;
    const ot1Away = properties["Extérieur - OT1"].number;
    const ot2Away = properties["Extérieur - OT2"].number;
    const ot3Away = properties["Extérieur - OT3"].number;
    const awayTeamName = properties["Domicile - Nom"].rich_text[0].text.content;

    await updateFinalHome({
      notion,
      page,
      value: game.score?.final.home,
      teamName: homeTeamName,
    });

    await updateFinalAway({
      notion,
      page,
      value: game.score?.final.away,
      teamName: awayTeamName,
    });

    const updateOt3 =
      finalHome &&
      q1Home &&
      q2Home &&
      q3Home &&
      q4Home &&
      ot1Home &&
      ot2Home &&
      ot3Home &&
      finalAway &&
      q1Away &&
      q2Away &&
      q3Away &&
      q4Away &&
      ot1Away &&
      ot2Away&&
      ot3Away;

    if (updateOt3) {
      console.log("pass ot3")
      await updateOT3Home({
        notion,
        page,
        value:
          finalHome - (q1Home + q2Home + q3Home + q4Home + ot1Home + ot2Home),
        teamName: homeTeamName,
      });
      await updateOT3Away({
        notion,
        page,
        value:
          finalAway - (q1Away + q2Away + q3Away + q4Away + ot1Away + ot2Away),
        teamName: awayTeamName,
      });
    }

    const updateOt2 =
      finalHome &&
      q1Home &&
      q2Home &&
      q3Home &&
      q4Home &&
      ot1Home &&
      ot2Home &&
      ot3Home === null &&
      finalAway &&
      q1Away &&
      q2Away &&
      q3Away &&
      q4Away &&
      ot1Away &&
      ot2Away &&
      ot3Away === null;

    if (updateOt2) {
      console.log("pass ot2");
      await updateOT2Home({
        notion,
        page,
        value: finalHome - (q1Home + q2Home + q3Home + q4Home + ot1Home),
        teamName: homeTeamName,
      });
      await updateOT2Away({
        notion,
        page,
        value: finalAway - (q1Away + q2Away + q3Away + q4Away + ot1Away),
        teamName: awayTeamName,
      });
    }

    const updateOt1 =
      finalHome &&
      q1Home &&
      q2Home &&
      q3Home &&
      q4Home &&
      ot1Home &&
      ot2Home === null &&
      ot3Home === null &&
      finalAway &&
      q1Away &&
      q2Away &&
      q3Away &&
      q4Away &&
      ot1Away &&
      ot2Away === null &&
      ot3Away === null;

    if (updateOt1) {
      console.log("pass ot1");
      await updateOT1Home({
        notion,
        page,
        value: finalHome - (q1Home + q2Home + q3Home + q4Home),
        teamName: homeTeamName,
      });
      await updateOT1Away({
        notion,
        page,
        value: finalAway - (q1Away + q2Away + q3Away + q4Away),
        teamName: awayTeamName,
      });
    }

    const updateQ4 =
      finalHome &&
      q1Home &&
      q2Home &&
      q3Home &&
      q4Home &&
      ot1Home === null &&
      ot2Home === null &&
      ot3Home === null &&
      finalAway &&
      q1Away &&
      q2Away &&
      q3Away &&
      q4Away &&
      ot1Away === null;
    ot2Away === null && ot3Away === null;

    if (updateQ4) {
      console.log("pass q4"); 
      await updateQ4Home({
        notion,
        page,
        value: finalHome - (q1Home + q2Home + q3Home),
        teamName: homeTeamName,
      });
      await updateQ4Away({
        notion,
        page,
        value: finalAway - (q1Away + q2Away + q3Away),
        teamName: awayTeamName,
      });
    }
  }
};

export default endGame;
