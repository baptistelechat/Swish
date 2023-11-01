import { Client } from "@notionhq/client";

const getNotFinishedPages = async (date: string) => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  // Remplace avec l'ID de ta base de données
  const databaseId = process.env.NOTION_GAME_DATABASE_ID as string;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Date",
      date: {
        equals: date,
      },
    },
  });

  const results = response.results;

  const notStartOrFinishedPeriod = ["A venir", "Fin"];

  const notFinishedPages = results.filter((page) => {
    const currentPage = page as any;
    const period = currentPage.properties.Période.rich_text[0].text.content;
    return !notStartOrFinishedPeriod.includes(period);
  });

  return notFinishedPages;
};

export default getNotFinishedPages;
