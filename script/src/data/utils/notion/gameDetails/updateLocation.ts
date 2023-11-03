import { Client } from "@notionhq/client";
import chalk from "chalk";

interface IUpdateLocation {
  notion: Client;
  page: any;
  value: string | null;
  homeTeamName: string | null;
  awayTeamName: string | null;
}

const updateLocation = async ({
  notion,
  page,
  value,
  homeTeamName,
  awayTeamName,
}: IUpdateLocation) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          Lieu: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: value as string,
                  link: null,
                },
              },
            ],
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(
          `Failed to create new page (${homeTeamName} / ${awayTeamName}) : ${error.message}`
        )
      );
    }
  }
};

export default updateLocation;
