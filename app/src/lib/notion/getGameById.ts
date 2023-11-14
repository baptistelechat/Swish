"use server";
import { Client } from "@notionhq/client";

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

  return results[0];
};

export default getGameById;
