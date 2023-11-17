import { Client } from "@notionhq/client";
import dayjs from "dayjs";

const getGamesIdBeforeToday = async () => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  // Remplace avec l'ID de ta base de données
  const databaseId = process.env.NOTION_GAME_DATABASE_ID as string;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Date",
      date: {
        before: dayjs().hour(0).minute(0).toISOString(),
      },
    },
  });

  const results = response.results as any[];
  const gamesId = results.map(
    (result) => result.properties.Match.title[0].text.content
  ) as string[];

  return gamesId;
};

export default getGamesIdBeforeToday;
