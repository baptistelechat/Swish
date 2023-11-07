import { Client } from "@notionhq/client";
import chalk from "chalk";
import dayjs from "dayjs";
import os from "os";
import { IGameWithoutDetails } from "../../interfaces/IGame";
import getMatchId from "../gameData/getMatchId";
import getPageByMatch from "./getPageByMatch";

const addNewGame = async (game: IGameWithoutDetails) => {
  // OS
  const systemOS = os.platform();

  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const matchId = getMatchId(game);

  const matchExist = (await getPageByMatch(matchId)).exist;

  if (!matchExist) {
    try {
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
              start: dayjs(game.date)
                .hour(
                  systemOS === "linux"
                    ? dayjs(game.date).hour() - 1
                    : dayjs(game.date).hour()
                )
                .toISOString(),
            },
          },
          "Journée de championnat": {
            rich_text: [
              {
                type: "text",
                text: {
                  content: game.championshipDayNumber as string,
                  link: null,
                },
              },
            ],
          },
          Championnat: {
            select: {
              name: game.championshipName as string,
            },
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
    } catch (error: any) {
      console.error(
        chalk.bgRed(`Failed to create new page : ${error.message}`)
      );
    }
  }
};

export default addNewGame;
