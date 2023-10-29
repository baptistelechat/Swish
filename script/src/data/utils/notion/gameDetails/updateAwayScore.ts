import { Client } from "@notionhq/client";

export const updateQ1Away = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    await notion.pages.update({
      page_id: page.id,
      properties: {
        "Extérieur - Q1": {
          number: property as number,
        },
      },
    });
  }
};

export const updateQ2Away = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    await notion.pages.update({
      page_id: page.id,
      properties: {
        "Extérieur - Q2": {
          number: property as number,
        },
      },
    });
  }
};

export const updateQ3Away = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    await notion.pages.update({
      page_id: page.id,
      properties: {
        "Extérieur - Q3": {
          number: property as number,
        },
      },
    });
  }
};

export const updateQ4Away = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    await notion.pages.update({
      page_id: page.id,
      properties: {
        "Extérieur - Q4": {
          number: property as number,
        },
      },
    });
  }
};

export const updateOT1Away = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    await notion.pages.update({
      page_id: page.id,
      properties: {
        "Extérieur - OT1": {
          number: property as number,
        },
      },
    });
  }
};

export const updateOT2Away = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    await notion.pages.update({
      page_id: page.id,
      properties: {
        "Extérieur - OT2": {
          number: property as number,
        },
      },
    });
  }
};

export const updateOT3Away = async (
  notion: Client,
  page: any,
  property: number | null | undefined
) => {
  if (property) {
    await notion.pages.update({
      page_id: page.id,
      properties: {
        "Extérieur - OT3": {
          number: property as number,
        },
      },
    });
  }
};
