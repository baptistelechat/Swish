import { Client } from "@notionhq/client";

const updateLocation = async (
  notion: Client,
  page: any,
  property: string | null
) => {
  if (property) {
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
  }
};

export default updateLocation;
