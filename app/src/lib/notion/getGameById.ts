"use server";
import { Game } from "@/types/Game";
import { Client } from "@notionhq/client";
import convertNotionProperty from "./convertNotionProperty";

const getGameById = async (matchId: string) => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  // Remplace avec l'ID de ta base de données
  const databaseId = process.env.NOTION_GAME_DATABASE_ID as string;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Match",
      title: {
        equals: matchId,
      },
    },
  });

  const results = response.results as any[];

  if (results.length === 0) {
    return undefined;
  }

  const properties = results[0].properties;

  const result: { [key: string]: any } = {};

  for (const key in properties) {
    if (Object.prototype.hasOwnProperty.call(properties[key], "type")) {
      const type = properties[key].type;
      const data = convertNotionProperty(properties[key], type);
      result[key] = data;
    }
  }

  const sortedKeys = Object.keys(result).sort();

  const sortedResult: { [key: string]: any } = {};

  sortedKeys.forEach((key) => {
    sortedResult[key] = result[key];
  });

  return sortedResult as Game;
};

export default getGameById;
