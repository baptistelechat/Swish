import { Client } from "@notionhq/client";

export const updateQ1Home = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    await notion.pages.update({
      page_id: page.id,
      properties: {
        "Domicile - Q1": {
          number: property as number,
        },
      },
    });
  }
};

export const updateQ2Home = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    await notion.pages.update({
      page_id: page.id,
      properties: {
        "Domicile - Q2": {
          number: property as number,
        },
      },
    });
  }
};

export const updateQ3Home = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    await notion.pages.update({
      page_id: page.id,
      properties: {
        "Domicile - Q3": {
          number: property as number,
        },
      },
    });
  }
};

export const updateQ4Home = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    await notion.pages.update({
      page_id: page.id,
      properties: {
        "Domicile - Q4": {
          number: property as number,
        },
      },
    });
  }
};

export const updateOT1Home = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    await notion.pages.update({
      page_id: page.id,
      properties: {
        "Domicile - OT1": {
          number: property as number,
        },
      },
    });
  }
};

export const updateOT2Home = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    await notion.pages.update({
      page_id: page.id,
      properties: {
        "Domicile - OT2": {
          number: property as number,
        },
      },
    });
  }
};

export const updateOT3Home = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    await notion.pages.update({
      page_id: page.id,
      properties: {
        "Domicile - OT3": {
          number: property as number,
        },
      },
    });
  }
};
