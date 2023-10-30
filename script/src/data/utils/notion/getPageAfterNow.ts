import { Client } from "@notionhq/client";
import dayjs from "dayjs";


const getPageAfterNow = async () => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  // Remplace avec l'ID de ta base de données
  const databaseId = process.env.NOTION_GAME_DATABASE_ID as string;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Date",
      date: {
        after: dayjs().toISOString(),
      },
    },
  });

  return response.results;
};

export default getPageAfterNow;
