import { Client } from "@notionhq/client";
import { TPeriod } from "../../../interfaces/TPeriod";
import chalk from "chalk";

interface IUpdatePeriod {
  notion: Client;
  page: any;
  value: TPeriod | undefined;
  homeTeamName: string | null;
  awayTeamName: string | null;
}

const updatePeriod = async ({
  notion,
  page,
  value,
  homeTeamName,
  awayTeamName,
}: IUpdatePeriod) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          Période: {
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
          `Failed to update period (${homeTeamName} / ${awayTeamName}) : ${error.message}`
        )
      );
    }
  }
};

export default updatePeriod;
