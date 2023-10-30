import { Client } from "@notionhq/client";
import chalk from "chalk";

const updateLocation = async (
  notion: Client,
  page: any,
  property: string | null
) => {
  if (property) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          Lieu: {
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
        chalk.bgRed(`Failed to create new page : ${error.message}`)
      );
    }
  }
};

export default updateLocation;
