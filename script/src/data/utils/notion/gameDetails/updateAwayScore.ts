import { Client } from "@notionhq/client";
import chalk from "chalk";

interface IUpdateAwayScore {
  notion: Client;
  page: any;
  value: number | null | undefined;
  teamName: string | null;
}

export const updateQ1Away = async ({
  notion,
  page,
  value,
  teamName,
}: IUpdateAwayScore) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Extérieur - Q1": {
            number: value as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(
          `Failed to update away score (Q1 → ${teamName}) : ${error.message}`
        )
      );
    }
  }
};

export const updateQ2Away = async ({
  notion,
  page,
  value,
  teamName,
}: IUpdateAwayScore) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Extérieur - Q2": {
            number: value as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(
          `Failed to update away score (Q2 → ${teamName}) : ${error.message}`
        )
      );
    }
  }
};

export const updateQ3Away = async ({
  notion,
  page,
  value,
  teamName,
}: IUpdateAwayScore) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Extérieur - Q3": {
            number: value as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(
          `Failed to update away score (Q3 → ${teamName}) : ${error.message}`
        )
      );
    }
  }
};

export const updateQ4Away = async ({
  notion,
  page,
  value,
  teamName,
}: IUpdateAwayScore) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Extérieur - Q4": {
            number: value as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(
          `Failed to update away score (Q4 → ${teamName}) : ${error.message}`
        )
      );
    }
  }
};

export const updateOT1Away = async ({
  notion,
  page,
  value,
  teamName,
}: IUpdateAwayScore) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Extérieur - OT1": {
            number: value as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(
          `Failed to update away score (OT1 → ${teamName}) : ${error.message}`
        )
      );
    }
  }
};

export const updateOT2Away = async ({
  notion,
  page,
  value,
  teamName,
}: IUpdateAwayScore) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Extérieur - OT2": {
            number: value as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(
          `Failed to update away score (OT2 → ${teamName}) : ${error.message}`
        )
      );
    }
  }
};

export const updateOT3Away = async ({
  notion,
  page,
  value,
  teamName,
}: IUpdateAwayScore) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Extérieur - OT3": {
            number: value as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(
          `Failed to update away score (OT3 → ${teamName}) : ${error.message}`
        )
      );
    }
  }
};

export const updateFinalAway = async ({
  notion,
  page,
  value,
  teamName,
}: IUpdateAwayScore) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Extérieur - Final": {
            number: value as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(
          `Failed to update away score (Final → ${teamName}) : ${error.message}`
        )
      );
    }
  }
};
