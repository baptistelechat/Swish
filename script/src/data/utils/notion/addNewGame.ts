import dayjs from "dayjs";
import { IGameWithoutDetails } from "../../interfaces/IGame";
import { Client } from "@notionhq/client";
import getPageByMatch from "./getPageByMatch";
import { match } from "assert";
import getMatchId from "../gameData/getMatchId";

const addNewGame = async (game: IGameWithoutDetails) => {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const matchId = getMatchId(game);

  const matchExist = (await getPageByMatch(matchId)).exist;

  if (!matchExist) {
    await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: process.env.NOTION_GAME_DATABASE_ID as string,
      },
      properties: {
        Match: {
          title: [
            {
              text: {
                content: matchId,
              },
            },
          ],
        },
        Date: {
          date: {
            start: dayjs(game.date).toISOString(),
          },
        },
        "Journée de championnat": {
          number: game.championshipDayNumber as number,
        },
        "Domicile - Nom": {
          rich_text: [
            {
              type: "text",
              text: {
                content: game.home.name as string,
                link: null,
              },
            },
          ],
        },
        "Domicile - Logo (sm)": {
          url: game.home.logo?.sm as string,
        },
        "Domicile - Logo (md)": {
          url: game.home.logo?.md as string,
        },
        "Domicile - Logo (lg)": {
          url: game.home.logo?.lg as string,
        },
        "Extérieur - Nom": {
          rich_text: [
            {
              type: "text",
              text: {
                content: game.away.name as string,
                link: null,
              },
            },
          ],
        },
        "Extérieur - Logo (sm)": {
          url: game.away.logo?.sm as string,
        },
        "Extérieur - Logo (md)": {
          url: game.away.logo?.md as string,
        },
        "Extérieur - Logo (lg)": {
          url: game.away.logo?.lg as string,
        },
      },
    });
  }
};

export default addNewGame;
