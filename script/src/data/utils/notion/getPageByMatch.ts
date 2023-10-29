import { Client } from "@notionhq/client";

const getPageByMatch = async (match: string) => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  // Remplace avec l'ID de ta base de données
  const databaseId = process.env.NOTION_GAME_DATABASE_ID as string;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Match",
      rich_text: {
        equals: match,
      },
    },
  });

  return { exist: response.results.length > 0, page: response.results[0] };
};

export default getPageByMatch;
