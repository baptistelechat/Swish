import { Client } from "@notionhq/client";
import chalk from "chalk";

interface IUpdateHomeScore {
  notion: Client;
  page: any;
  value: number | null | undefined;
  teamName: string | null;
}

export const updateQ1Home = async ({
  notion,
  page,
  value,
  teamName,
}: IUpdateHomeScore) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Domicile - Q1": {
            number: value as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(
          `Failed to update home score (Q1 → ${teamName}) : ${error.message}`
        )
      );
    }
  }
};

export const updateQ2Home = async ({
  notion,
  page,
  value,
  teamName,
}: IUpdateHomeScore) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Domicile - Q2": {
            number: value as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(
          `Failed to update home score (Q2 → ${teamName}) : ${error.message}`
        )
      );
    }
  }
};

export const updateQ3Home = async ({
  notion,
  page,
  value,
  teamName,
}: IUpdateHomeScore) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Domicile - Q3": {
            number: value as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(
          `Failed to update home score (Q3 → ${teamName}) : ${error.message}`
        )
      );
    }
  }
};

export const updateQ4Home = async ({
  notion,
  page,
  value,
  teamName,
}: IUpdateHomeScore) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Domicile - Q4": {
            number: value as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(
          `Failed to update home score (Q4 → ${teamName}) : ${error.message}`
        )
      );
    }
  }
};

export const updateOT1Home = async ({
  notion,
  page,
  value,
  teamName,
}: IUpdateHomeScore) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Domicile - OT1": {
            number: value as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(
          `Failed to update home score (OT1 → ${teamName}) : ${error.message}`
        )
      );
    }
  }
};

export const updateOT2Home = async ({
  notion,
  page,
  value,
  teamName,
}: IUpdateHomeScore) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Domicile - OT2": {
            number: value as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(
          `Failed to update home score (OT2 → ${teamName}) : ${error.message}`
        )
      );
    }
  }
};

export const updateOT3Home = async ({
  notion,
  page,
  value,
  teamName,
}: IUpdateHomeScore) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Domicile - OT3": {
            number: value as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(
          `Failed to update home score (OT3 → ${teamName}) : ${error.message}`
        )
      );
    }
  }
};

export const updateFinalHome = async ({
  notion,
  page,
  value,
  teamName,
}: IUpdateHomeScore) => {
  if (value) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Domicile - Final": {
            number: value as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(
          `Failed to update home score (Final → ${teamName}) : ${error.message}`
        )
      );
    }
  }
};
