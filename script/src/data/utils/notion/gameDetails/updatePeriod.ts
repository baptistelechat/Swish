import { Client } from "@notionhq/client";
import { TPeriod } from "../../../interfaces/TPeriod";

const updatePeriod = async (
  notion: Client,
  page: any,
  property: TPeriod | undefined
) => {
  if (property) {
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
  }
};

export default updatePeriod;
