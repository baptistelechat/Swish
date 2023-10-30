import { Client } from "@notionhq/client";
import chalk from "chalk";

export const updateQ1Away = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Extérieur - Q1": {
            number: property as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(`Failed to update away score : ${error.message}`)
      );
    }
  }
};

export const updateQ2Away = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Extérieur - Q2": {
            number: property as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(`Failed to update away score : ${error.message}`)
      );
    }
  }
};

export const updateQ3Away = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Extérieur - Q3": {
            number: property as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(`Failed to update away score : ${error.message}`)
      );
    }
  }
};

export const updateQ4Away = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Extérieur - Q4": {
            number: property as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(`Failed to update away score : ${error.message}`)
      );
    }
  }
};

export const updateOT1Away = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Extérieur - OT1": {
            number: property as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(`Failed to update away score : ${error.message}`)
      );
    }
  }
};

export const updateOT2Away = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Extérieur - OT2": {
            number: property as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(`Failed to update away score : ${error.message}`)
      );
    }
  }
};

export const updateOT3Away = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Extérieur - OT3": {
            number: property as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(`Failed to update away score : ${error.message}`)
      );
    }
  }
};
