import { Page } from "puppeteer";

export const getLocation = async (page: Page) => {
  await page.waitForSelector(".sw-fixture-info-summary");

  return await page.evaluate(() => {
    // Location
    const locationElement = document.querySelector(
      ".sw-fixture-info-summary"
    ) as HTMLSpanElement;

    if (locationElement) {
      const location = locationElement.innerHTML
        .trim()
        .split(",")[1]
        .split(" - ")[1]
        .split("<span")[0];
      return location;
    }

    return null;
  });
};
