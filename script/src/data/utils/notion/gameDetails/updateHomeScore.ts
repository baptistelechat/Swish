import { Client } from "@notionhq/client";
import chalk from "chalk";

export const updateQ1Home = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Domicile - Q1": {
            number: property as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(`Failed to update home score : ${error.message}`)
      );
    }
  }
};

export const updateQ2Home = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Domicile - Q2": {
            number: property as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(`Failed to update home score : ${error.message}`)
      );
    }
  }
};

export const updateQ3Home = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Domicile - Q3": {
            number: property as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(`Failed to update home score : ${error.message}`)
      );
    }
  }
};

export const updateQ4Home = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Domicile - Q4": {
            number: property as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(`Failed to update home score : ${error.message}`)
      );
    }
  }
};

export const updateOT1Home = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Domicile - OT1": {
            number: property as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(`Failed to update home score : ${error.message}`)
      );
    }
  }
};

export const updateOT2Home = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Domicile - OT2": {
            number: property as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(`Failed to update home score : ${error.message}`)
      );
    }
  }
};

export const updateOT3Home = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    try {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Domicile - OT3": {
            number: property as number,
          },
        },
      });
    } catch (error: any) {
      console.error(
        chalk.bgRed(`Failed to update home score : ${error.message}`)
      );
    }
  }
};
