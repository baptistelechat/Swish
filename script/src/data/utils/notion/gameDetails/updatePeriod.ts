import { Client } from "@notionhq/client";
import { TPeriod } from "../../../interfaces/TPeriod";
import chalk from "chalk";

const updatePeriod = async (
  notion: Client,
  page: any,
  property: TPeriod | undefined
) => {
  if (property) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          Période: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: property as string,
                  link: null,
                },
              },
            ],
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(`Failed to update period : ${error.message}`)
      );
    }
  }
};

export default updatePeriod;
