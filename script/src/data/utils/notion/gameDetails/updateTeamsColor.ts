import { Client } from "@notionhq/client";
import chalk from "chalk";

interface IUpdateColor {
  notion: Client;
  page: any;
  value: string | null;
  teamName: string | null;
}

export const updateColorHome = async ({
  notion,
  page,
  value,
  teamName,
}: IUpdateColor) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Domicile - Couleur": {
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
        chalk.bgRed(`Failed to update color (${teamName}) : ${error.message}`)
      );
    }
  }
};

export const updateColorAway = async ({
  notion,
  page,
  value,
  teamName,
}: IUpdateColor) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Extérieur - Couleur": {
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
        chalk.bgRed(`Failed to update color (${teamName}) : ${error.message}`)
      );
    }
  }
};
